/**
 * Shared YouTube ID utilities
 *
 * isRealYouTubeId(id) — canonical form used across all pages.
 *   Returns true only for real 11-character YouTube video IDs.
 *   Rejects: falsy values, placeholder IDs containing '_vid_', non-string input.
 */

/**
 * @param {unknown} id
 * @returns {boolean}
 */
export function isRealYouTubeId(id) {
  if (typeof id !== 'string') return false
  if (!id) return false
  if (id.includes('_vid_')) return false
  return /^[A-Za-z0-9_\-]{11}$/.test(id)
}

/**
 * Returns the YouTube thumbnail URL for a given video ID and quality.
 * Falls back to mqdefault when quality is not specified.
 *
 * @param {string} id
 * @param {'mqdefault'|'hqdefault'|'sddefault'} [quality]
 * @returns {string}
 */
export function youtubeThumbnailUrl(id, quality = 'mqdefault') {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}
