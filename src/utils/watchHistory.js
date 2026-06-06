// src/utils/watchHistory.js
// Tracks per-user watch history and click counts using localStorage.
// No backend. No accounts. Works immediately.

const CLICKS_KEY = 'a1p_videoClicks'
const HISTORY_KEY = 'a1p_watchHistory'
const SESSION_KEY = 'a1p_sessionClicks'
const MAX_HISTORY = 20  // keep last 20 watched videos

// ── Click Counting ─────────────────────────────────────────────

/**
 * Increment click count for a video.
 * Uses sessionStorage to prevent repeat counts within the same session.
 */
export function trackVideoClick(videoId) {
  // Only count once per session per video (anti-spam)
  const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}')
  if (session[videoId]) return
  session[videoId] = true
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))

  // Increment persisted click count
  const clicks = JSON.parse(localStorage.getItem(CLICKS_KEY) || '{}')
  clicks[videoId] = (clicks[videoId] || 0) + 1
  localStorage.setItem(CLICKS_KEY, JSON.stringify(clicks))
}

/**
 * Get click count for a specific video.
 */
export function getVideoClickCount(videoId) {
  const clicks = JSON.parse(localStorage.getItem(CLICKS_KEY) || '{}')
  return clicks[videoId] || 0
}

/**
 * Get click counts for multiple video IDs at once.
 * Returns an object: { videoId: count }
 */
export function getBulkClickCounts(videoIds) {
  const clicks = JSON.parse(localStorage.getItem(CLICKS_KEY) || '{}')
  const result = {}
  videoIds.forEach(id => { result[id] = clicks[id] || 0 })
  return result
}

// ── Watch History ──────────────────────────────────────────────

/**
 * Add a video to watch history (most-recent first, deduplicated).
 */
export function addToWatchHistory(video) {
  const history = getWatchHistory().filter(v => v.id !== video.id)
  history.unshift({ id: video.id, title: video.title, creatorId: video.creatorId, watchedAt: Date.now() })
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)))
}

/**
 * Get the full watch history array.
 */
export function getWatchHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
}

/**
 * Check if a video has been watched.
 */
export function hasWatched(videoId) {
  return getWatchHistory().some(v => v.id === videoId)
}
