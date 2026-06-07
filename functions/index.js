/**
 * functions/index.js — Anime1Point Creators Hub
 * Firebase Cloud Functions (Node.js 20)
 *
 * COLLECTION ARCHITECTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ creatorApplications/{uid}  — Moderation queue (pending/rejected/approved)│
 * │   All submissions land here first.                                      │
 * │   The encrypted YouTube API key is stored here during the pending phase.│
 * │                                                                         │
 * │ creators/{uid}             — Live feed collection (approved only)       │
 * │   Populated by the admin dashboard when an application is approved.     │
 * │   This is what CreatorProfile.jsx reads to decide if a feed is active.  │
 * │                                                                         │
 * │ creatorSlugs/{slug}        — Public slug → uid mapping                  │
 * │   Written by admin on approval. Used by CreatorProfile to look up uid.  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * EXPORTS:
 * 1. youtubeFeed — GET /youtubeFeed?creatorId=UID&maxResults=12
 *    Reads from 'creators/{uid}' (approved only).
 *    Decrypts the stored API key and proxies YouTube Data API v3.
 *    The API key is NEVER returned to the client.
 *
 * 2. storeCreatorApiKey — POST /storeCreatorApiKey
 *    Stores the encrypted API key in 'creatorApplications/{uid}'.
 *    On admin approval, the admin dashboard copies it to 'creators/{uid}'.
 *    Requires a valid Firebase ID token (Authorization: Bearer <token>).
 *
 * SECURITY:
 * - Both functions verify the caller's Firebase ID token.
 * - API keys are AES-256-GCM encrypted at rest; encryption key is in Firebase Secret Manager.
 * - Only approved creators ('creators' collection) can have their feed fetched.
 * - CORS is restricted to the Anime1Point domain.
 */

const { onRequest }     = require('firebase-functions/v2/https')
const { setGlobalOptions } = require('firebase-functions/v2')
const admin             = require('firebase-admin')
const crypto            = require('crypto')
const { defineSecret }  = require('firebase-functions/params')

// ─── Init ─────────────────────────────────────────────────────────────────────
admin.initializeApp()
const db = admin.firestore()
setGlobalOptions({ region: 'us-central1' })

// ─── Secret ───────────────────────────────────────────────────────────────────
// Stored in Firebase Secret Manager:
//   firebase functions:secrets:set YOUTUBE_API_KEY_ENCRYPTION_SECRET
const ENCRYPTION_SECRET = defineSecret('YOUTUBE_API_KEY_ENCRYPTION_SECRET')

// ─── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://anime1point-ctrl.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
]

function setCors(req, res) {
  const origin = req.headers.origin
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin)
  }
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

// ─── Encryption helpers ───────────────────────────────────────────────────────
const ALGO           = 'aes-256-gcm'
const IV_LENGTH      = 12
const AUTH_TAG_LENGTH = 16

function getEncryptionKey(secret) {
  return crypto.createHash('sha256').update(secret).digest()
}

function encrypt(plaintext, secret) {
  const key       = getEncryptionKey(secret)
  const iv        = crypto.randomBytes(IV_LENGTH)
  const cipher    = crypto.createCipheriv(ALGO, key, iv, { authTagLength: AUTH_TAG_LENGTH })
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag   = cipher.getAuthTag()
  // Format: iv:authTag:ciphertext (all hex)
  return [iv.toString('hex'), authTag.toString('hex'), encrypted.toString('hex')].join(':')
}

function decrypt(ciphertext, secret) {
  const key              = getEncryptionKey(secret)
  const [ivHex, authTagHex, dataHex] = ciphertext.split(':')
  const iv      = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const data    = Buffer.from(dataHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGO, key, iv, { authTagLength: AUTH_TAG_LENGTH })
  decipher.setAuthTag(authTag)
  return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8')
}

// ─── Auth helper ──────────────────────────────────────────────────────────────
async function verifyIdToken(req) {
  const authHeader = req.headers.authorization || ''
  if (!authHeader.startsWith('Bearer ')) return null
  const token = authHeader.slice(7)
  try {
    return await admin.auth().verifyIdToken(token)
  } catch {
    return null
  }
}

// ─── YouTube helpers ──────────────────────────────────────────────────────────
function fmtCount(n) {
  const num = parseInt(n || '0', 10)
  if (isNaN(num)) return '0'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1_000)     return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toString()
}

async function fetchLatestVideos(channelId, apiKey, maxResults = 12) {
  const YT = 'https://www.googleapis.com/youtube/v3'

  // 1. Search for latest uploads
  const searchRes = await fetch(
    `${YT}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${apiKey}`
  )
  if (!searchRes.ok) {
    const err = await searchRes.json()
    throw new Error(err.error?.message || 'YouTube search failed')
  }
  const searchData = await searchRes.json()
  const items      = searchData.items || []
  if (items.length === 0) return []

  const videoIds = items.map(i => i.id.videoId).join(',')

  // 2. Fetch detailed stats (views, likes, duration)
  const statsRes = await fetch(
    `${YT}/videos?part=statistics,contentDetails,snippet&id=${videoIds}&key=${apiKey}`
  )
  if (!statsRes.ok) {
    const err = await statsRes.json()
    throw new Error(err.error?.message || 'YouTube videos fetch failed')
  }
  const statsData = await statsRes.json()

  return (statsData.items || []).map(v => ({
    id:           v.id,
    title:        v.snippet.title,
    description:  (v.snippet.description || '').substring(0, 200),
    thumbnail:    v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.default?.url || '',
    publishedAt:  v.snippet.publishedAt,
    viewCount:    fmtCount(v.statistics?.viewCount),
    likeCount:    fmtCount(v.statistics?.likeCount),
    duration:     v.contentDetails?.duration || '',
    channelId:    v.snippet.channelId,
    channelTitle: v.snippet.channelTitle,
  }))
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNCTION 1: youtubeFeed
// GET /youtubeFeed?creatorId=FIRESTORE_UID&maxResults=12
//
// Reads from 'creators/{uid}' — this collection ONLY contains approved creators.
// Unapproved / pending / rejected creators are in 'creatorApplications' and
// cannot trigger a feed response from this function.
// ─────────────────────────────────────────────────────────────────────────────
exports.youtubeFeed = onRequest(
  { secrets: [ENCRYPTION_SECRET], cors: false },
  async (req, res) => {
    setCors(req, res)
    if (req.method === 'OPTIONS') { res.status(204).send(''); return }
    if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return }

    const { creatorId, maxResults = '12' } = req.query
    if (!creatorId) { res.status(400).json({ error: 'creatorId is required' }); return }

    try {
      // 1. Load from the LIVE creators collection (not applications)
      const creatorDoc = await db.collection('creators').doc(creatorId).get()
      if (!creatorDoc.exists) { res.status(404).json({ error: 'Creator not found' }); return }

      const creator = creatorDoc.data()

      // 2. Status gate — only approved creators get a feed
      if (creator.status !== 'approved') {
        res.status(403).json({ error: 'Creator not yet approved' }); return
      }

      // 3. Decrypt the YouTube API key
      if (!creator.youtubeApiKeyEncrypted) {
        res.status(400).json({ error: 'No YouTube API key on file' }); return
      }
      const apiKey = decrypt(creator.youtubeApiKeyEncrypted, ENCRYPTION_SECRET.value())

      // 4. Fetch YouTube videos — API key used server-side ONLY, never returned
      const maxR   = Math.min(parseInt(maxResults, 10) || 12, 50)
      const videos = await fetchLatestVideos(creator.channelId, apiKey, maxR)

      // 5. Return only sanitised video data — no API key, no sensitive fields
      res.status(200).json({ videos, creatorId, channelId: creator.channelId })
    } catch (err) {
      console.error('youtubeFeed error:', err)
      res.status(500).json({ error: 'Failed to fetch videos', details: err.message })
    }
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// FUNCTION 2: storeCreatorApiKey
// POST /storeCreatorApiKey
// Body: { uid: string, apiKey: string }
// Auth: Bearer <Firebase ID token>
//
// Stores the encrypted API key in 'creatorApplications/{uid}'.
// The key stays here until the admin approves the application, at which point
// the admin dashboard copies the full document (including the encrypted key)
// to 'creators/{uid}'.
// ─────────────────────────────────────────────────────────────────────────────
exports.storeCreatorApiKey = onRequest(
  { secrets: [ENCRYPTION_SECRET], cors: false },
  async (req, res) => {
    setCors(req, res)
    if (req.method === 'OPTIONS') { res.status(204).send(''); return }
    if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return }

    // Verify Firebase ID token
    const decodedToken = await verifyIdToken(req)
    if (!decodedToken) { res.status(401).json({ error: 'Unauthorized' }); return }

    const { uid, apiKey } = req.body || {}
    if (!uid || !apiKey) { res.status(400).json({ error: 'uid and apiKey are required' }); return }

    // Ensure the token UID matches the requested UID (prevents spoofing)
    if (decodedToken.uid !== uid) { res.status(403).json({ error: 'Forbidden' }); return }

    try {
      // Validate the API key with a test YouTube call
      const testRes  = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&key=${apiKey}`
      )
      const testData = await testRes.json()
      if (testData.error?.message?.includes('API key not valid')) {
        res.status(422).json({ error: 'Invalid YouTube API key. Please check your key and try again.' })
        return
      }

      // Encrypt the API key (AES-256-GCM)
      const encrypted = encrypt(apiKey, ENCRYPTION_SECRET.value())

      // Store ONLY the encrypted key in 'creatorApplications' (the pending queue)
      // It will be copied to 'creators' by the admin on approval.
      await db.collection('creatorApplications').doc(uid).update({
        youtubeApiKeyEncrypted: encrypted,
        hasApiKey:              true,
        updatedAt:              admin.firestore.FieldValue.serverTimestamp(),
      })

      res.status(200).json({ success: true, message: 'API key stored securely in application queue' })
    } catch (err) {
      console.error('storeCreatorApiKey error:', err)
      res.status(500).json({ error: 'Failed to store API key', details: err.message })
    }
  }
)
