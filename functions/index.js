/**
 * functions/index.js — Anime1Point Creators Hub
 * Firebase Cloud Functions (Node.js 20)
 *
 * COLLECTION ARCHITECTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ creatorApplications/{uid} — Moderation queue (pending/rejected/approved)│
 * │ creators/{uid}            — Live approved creators only                 │
 * │ creatorSlugs/{slug}       — Public slug → uid mapping                   │
 * │ viewers/{uid}             — Viewer profiles                             │
 * │ creatorRatings/{docId}    — One rating per viewer per creator           │
 * │   docId format: {creatorId}_{viewerUid}                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * EXPORTS:
 * 1. youtubeFeed        — GET  /youtubeFeed?creatorId=UID&maxResults=12
 * 2. storeCreatorApiKey — POST /storeCreatorApiKey { uid, apiKey }
 * 3. submitRating       — POST /submitRating { creatorId, rating }
 *    Atomically writes the rating doc + updates ratingAverage/ratingCount
 *    on the creator document using a Firestore transaction.
 *    Rate-limited: one rating per viewer per creator (updates allowed).
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
  return crypto.createHash('sha256').update(secret).digest()
}

function encrypt(plaintext, secret) {
  const key = getEncryptionKey(secret)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGO, key, iv, { authTagLength: AUTH_TAG_LENGTH })
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
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

// ─── YouTube helpers ──────────────────────────────────────────────────────────
function fmtCount(n) {
  const num = parseInt(n || '0', 10)
  if (isNaN(num)) return '0'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return num.toString()
}

async function fetchLatestVideos(channelId, apiKey, maxResults = 12) {
  const YT = 'https://www.googleapis.com/youtube/v3'
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
  const statsRes = await fetch(
    `${YT}/videos?part=statistics,contentDetails,snippet&id=${videoIds}&key=${apiKey}`
  )
  if (!statsRes.ok) {
    const err = await statsRes.json()
    throw new Error(err.error?.message || 'YouTube videos fetch failed')
  }
  const statsData = await statsRes.json()
  return (statsData.items || []).map(v => ({
    id: v.id,
    title: v.snippet.title,
    description: (v.snippet.description || '').substring(0, 200),
    thumbnail: v.snippet.thumbnails?.high?.url || v.snippet.thumbnails?.default?.url || '',
    publishedAt: v.snippet.publishedAt,
    viewCount: fmtCount(v.statistics?.viewCount),
    likeCount: fmtCount(v.statistics?.likeCount),
    duration: v.contentDetails?.duration || '',
    channelId: v.snippet.channelId,
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
    if (req.method === 'OPTIONS') { res.status(204).send(''); return }
    if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return }

    const { creatorId, maxResults = '12' } = req.query
    if (!creatorId) { res.status(400).json({ error: 'creatorId is required' }); return }

    try {
      const creatorDoc = await db.collection('creators').doc(creatorId).get()
      if (!creatorDoc.exists) { res.status(404).json({ error: 'Creator not found' }); return }
      const creator = creatorDoc.data()
      if (creator.status !== 'approved') {
        res.status(403).json({ error: 'Creator not yet approved' }); return
      }
      if (!creator.youtubeApiKeyEncrypted) {
        res.status(400).json({ error: 'No YouTube API key on file' }); return
      }
      const apiKey = decrypt(creator.youtubeApiKeyEncrypted, ENCRYPTION_SECRET.value())
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
// POST /storeCreatorApiKey  { uid, apiKey }
// ─────────────────────────────────────────────────────────────────────────────
exports.storeCreatorApiKey = onRequest(
  { secrets: [ENCRYPTION_SECRET], cors: false },
  async (req, res) => {
    setCors(req, res)
    if (req.method === 'OPTIONS') { res.status(204).send(''); return }
    if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return }

    const decodedToken = await verifyIdToken(req)
    if (!decodedToken) { res.status(401).json({ error: 'Unauthorized' }); return }

    const { uid, apiKey } = req.body || {}
    if (!uid || !apiKey) { res.status(400).json({ error: 'uid and apiKey are required' }); return }
    if (decodedToken.uid !== uid) { res.status(403).json({ error: 'Forbidden' }); return }

    try {
      const testRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&key=${apiKey}`
      )
      const testData = await testRes.json()
      if (testData.error?.message?.includes('API key not valid')) {
        res.status(422).json({ error: 'Invalid YouTube API key. Please check your key and try again.' })
        return
      }
      const encrypted = encrypt(apiKey, ENCRYPTION_SECRET.value())
      await db.collection('creatorApplications').doc(uid).update({
        youtubeApiKeyEncrypted: encrypted,
        hasApiKey: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      res.status(200).json({ success: true, message: 'API key stored securely in application queue' })
    } catch (err) {
      console.error('storeCreatorApiKey error:', err)
      res.status(500).json({ error: 'Failed to store API key', details: err.message })
    }
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// FUNCTION 3: submitRating
// POST /submitRating  { creatorId: string, rating: number (1-5) }
// Auth: Bearer <Firebase ID token>  (viewer must be signed in)
//
// Logic (atomic Firestore transaction):
//   1. Read existing rating doc {creatorId}_{viewerUid} if any.
//   2. Write / overwrite the rating doc with new rating + timestamps.
//   3. Recalculate ratingAverage + ratingCount on creators/{creatorId}
//      using the delta (old rating removed, new rating added).
//   4. Commit atomically — both writes succeed or both fail.
//
// The aggregate (ratingAverage, ratingCount) lives on the creator document
// so the profile page never needs a separate query.
// ─────────────────────────────────────────────────────────────────────────────
exports.submitRating = onRequest(
  { cors: false },
  async (req, res) => {
    setCors(req, res)
    if (req.method === 'OPTIONS') { res.status(204).send(''); return }
    if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return }

    // 1. Authenticate viewer
    const decodedToken = await verifyIdToken(req)
    if (!decodedToken) { res.status(401).json({ error: 'You must be signed in to rate creators.' }); return }

    const viewerUid = decodedToken.uid
    const { creatorId, rating } = req.body || {}

    // 2. Validate input
    if (!creatorId || typeof creatorId !== 'string') {
      res.status(400).json({ error: 'creatorId is required' }); return
    }
    const ratingNum = parseInt(rating, 10)
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      res.status(400).json({ error: 'Rating must be an integer between 1 and 5' }); return
    }

    // 3. Prevent a viewer from rating their own creator profile
    if (viewerUid === creatorId) {
      res.status(403).json({ error: 'You cannot rate your own creator profile.' }); return
    }

    const ratingDocId = `${creatorId}_${viewerUid}`
    const ratingRef  = db.collection('creatorRatings').doc(ratingDocId)
    const creatorRef = db.collection('creators').doc(creatorId)

    try {
      const result = await db.runTransaction(async (t) => {
        // Read both docs inside the transaction
        const [ratingSnap, creatorSnap] = await Promise.all([
          t.get(ratingRef),
          t.get(creatorRef),
        ])

        // Creator must exist and be approved before it can be rated
        if (!creatorSnap.exists) throw new Error('Creator not found')
        if (creatorSnap.data().status !== 'approved') {
          throw new Error('Creator is not yet approved')
        }

        const now = admin.firestore.FieldValue.serverTimestamp()
        const previousRating = ratingSnap.exists ? ratingSnap.data().rating : null

        // Write the rating document (upsert)
        if (ratingSnap.exists) {
          t.update(ratingRef, { rating: ratingNum, updatedAt: now })
        } else {
          t.set(ratingRef, {
            creatorId,
            viewerUid,
            rating: ratingNum,
            createdAt: now,
            updatedAt: now,
          })
        }

        // Recalculate aggregate on creator document using delta arithmetic.
        // This is O(1) — no need to read all rating docs.
        const currentCount   = creatorSnap.data().ratingCount   || 0
        const currentAverage = creatorSnap.data().ratingAverage || 0
        const currentTotal   = currentAverage * currentCount

        let newCount, newTotal
        if (previousRating !== null) {
          // Updating an existing rating — count stays the same
          newCount = currentCount
          newTotal = currentTotal - previousRating + ratingNum
        } else {
          // New rating
          newCount = currentCount + 1
          newTotal = currentTotal + ratingNum
        }

        const newAverage = newCount > 0 ? Math.round((newTotal / newCount) * 10) / 10 : 0

        t.update(creatorRef, {
          ratingAverage: newAverage,
          ratingCount:   newCount,
        })

        return { newAverage, newCount, previousRating, isUpdate: previousRating !== null }
      })

      res.status(200).json({
        success:      true,
        rating:       ratingNum,
        average:      result.newAverage,
        count:        result.newCount,
        isUpdate:     result.isUpdate,
        message:      result.isUpdate
          ? 'Your rating has been updated!'
          : 'Thanks for rating this creator!',
      })
    } catch (err) {
      console.error('submitRating error:', err)
      const status = err.message.includes('not found') || err.message.includes('not yet approved') ? 404 : 500
      res.status(status).json({ error: err.message })
    }
  }
)
