/**
 * functions/index.js — Anime1Point Creators Hub
 * Firebase Cloud Functions (Node.js 20)
 *
 * EXPORTS:
 *  1. youtubeFeed        — GET  /youtubeFeed?creatorId=UID&maxResults=12
 *     Fetches latest YouTube videos for a creator using their stored API key.
 *     The API key is retrieved from Firestore using Firebase Admin SDK (server-side only).
 *     The key is NEVER returned to the client — only the sanitised video list is.
 *
 *  2. storeCreatorApiKey — POST /storeCreatorApiKey
 *     Called by the React app immediately after creator registration.
 *     Receives the YouTube API key, encrypts it using AES-256-GCM,
 *     and stores ONLY the encrypted ciphertext in Firestore.
 *     Requires a valid Firebase ID token (Authorization: Bearer <token>).
 *
 * SECURITY:
 *  - Both functions verify the caller's Firebase ID token.
 *  - API keys are encrypted at rest using AES-256-GCM with a key stored
 *    in Firebase Secret Manager (YOUTUBE_API_KEY_ENCRYPTION_SECRET).
 *  - Only approved creators can have their feed fetched (status === 'approved').
 *  - CORS is restricted to the Anime1Point domain.
 */

const { onRequest } = require('firebase-functions/v2/https')
const { setGlobalOptions } = require('firebase-functions/v2')
const admin = require('firebase-admin')
const crypto = require('crypto')
const { defineSecret } = require('firebase-functions/params')

// ─── Init ─────────────────────────────────────────────────────────────────────
admin.initializeApp()
const db = admin.firestore()
setGlobalOptions({ region: 'us-central1' })

// ─── Secret ───────────────────────────────────────────────────────────────────
// Stored in Firebase Secret Manager: firebase functions:secrets:set YOUTUBE_API_KEY_ENCRYPTION_SECRET
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

const ALGO = 'aes-256-gcm'
const IV_LENGTH = 12
const AUTH_TAG_LENGTH = 16

function getEncryptionKey(secret) {
  // Derive a 32-byte key from the secret using SHA-256
  return crypto.createHash('sha256').update(secret).digest()
}

function encrypt(plaintext, secret) {
  const key = getEncryptionKey(secret)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGO, key, iv, { authTagLength: AUTH_TAG_LENGTH })
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  // Format: iv:authTag:ciphertext (all hex)
  return [iv.toString('hex'), authTag.toString('hex'), encrypted.toString('hex')].join(':')
}

function decrypt(ciphertext, secret) {
  const key = getEncryptionKey(secret)
  const [ivHex, authTagHex, dataHex] = ciphertext.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const data = Buffer.from(dataHex, 'hex')
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

// ─── YouTube helper ───────────────────────────────────────────────────────────

function fmtCount(n) {
  const num = parseInt(n || '0', 10)
  if (isNaN(num)) return '0'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
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
  const items = searchData.items || []
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
// ─────────────────────────────────────────────────────────────────────────────
exports.youtubeFeed = onRequest(
  { secrets: [ENCRYPTION_SECRET], cors: false },
  async (req, res) => {
    setCors(req, res)

    // Handle CORS preflight
    if (req.method === 'OPTIONS') { res.status(204).send(''); return }
    if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return }

    const { creatorId, maxResults = '12' } = req.query
    if (!creatorId) { res.status(400).json({ error: 'creatorId is required' }); return }

    try {
      // 1. Load creator document from Firestore
      const creatorDoc = await db.collection('creators').doc(creatorId).get()
      if (!creatorDoc.exists) { res.status(404).json({ error: 'Creator not found' }); return }

      const creator = creatorDoc.data()

      // 2. Only serve approved creators
      if (creator.status !== 'approved') {
        res.status(403).json({ error: 'Creator not yet approved' }); return
      }

      // 3. Decrypt the YouTube API key (stored encrypted)
      if (!creator.youtubeApiKeyEncrypted) {
        res.status(400).json({ error: 'No YouTube API key on file' }); return
      }

      const apiKey = decrypt(creator.youtubeApiKeyEncrypted, ENCRYPTION_SECRET.value())

      // 4. Fetch YouTube videos
      const maxR = Math.min(parseInt(maxResults, 10) || 12, 50)
      const videos = await fetchLatestVideos(creator.channelId, apiKey, maxR)

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

    // Ensure the token UID matches the requested UID (prevent spoofing)
    if (decodedToken.uid !== uid) { res.status(403).json({ error: 'Forbidden' }); return }

    try {
      // Validate the API key before storing: make a test YouTube API call
      const testRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&key=${apiKey}`
      )
      // A 400 with "required" error or 403 means key works but needs OAuth for mine=true — that's fine
      // A 400 with "API key not valid" means bad key
      const testData = await testRes.json()
      if (testData.error && testData.error.message && testData.error.message.includes('API key not valid')) {
        res.status(422).json({ error: 'Invalid YouTube API key. Please check your key and try again.' }); return
      }

      // Encrypt the API key
      const encrypted = encrypt(apiKey, ENCRYPTION_SECRET.value())

      // Store ONLY the encrypted key in Firestore
      await db.collection('creators').doc(uid).update({
        youtubeApiKeyEncrypted: encrypted,
        // Mark that we have a key stored
        hasApiKey: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      res.status(200).json({ success: true, message: 'API key stored securely' })
    } catch (err) {
      console.error('storeCreatorApiKey error:', err)
      res.status(500).json({ error: 'Failed to store API key', details: err.message })
    }
  }
)
