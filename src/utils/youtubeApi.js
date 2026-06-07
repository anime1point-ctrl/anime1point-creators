/**
 * youtubeApi.js — Anime1Point Creators Hub
  *
   * Fetches real-time YouTube data for a creator's channel using their
    * YouTube Data API v3 key — stored securely in Firestore, never exposed
     * to the client. All API calls go through a Firebase Cloud Function proxy.
      *
       * SECURITY MODEL:
        * - Creator submits their YouTube API key during registration.
         * - Key is stored ENCRYPTED in Firestore (server-side only).
          * - React app calls the Cloud Function /youtubeFeed with the creator's UID.
           * - Cloud Function retrieves the key using Firebase Admin SDK (secure),
            *   calls YouTube Data API v3, and returns the sanitised video list.
             * - The YouTube API key is NEVER sent to or from the browser.
              */

              // Cloud Function proxy URL — set VITE_YT_PROXY_URL in .env for local dev
              const YT_PROXY_URL =
                (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_YT_PROXY_URL) ||
                  'https://us-central1-anime1point-hub.cloudfunctions.net/youtubeFeed'

                  /**
                   * Fetch latest videos for a creator via the secure Cloud Function proxy.
                    * The creator's YouTube API key is NEVER exposed to the client.
                     *
                      * @param {string} creatorFirestoreId  Firestore document ID of the creator
                       * @param {number} [maxResults=12]     Number of videos to fetch (max 50)
                        * @returns {Promise<YouTubeVideo[]>}
                         */
                         export async function fetchCreatorVideos(creatorFirestoreId, maxResults = 12) {
                           if (!creatorFirestoreId) return []

                             const url = new URL(YT_PROXY_URL)
                               url.searchParams.set('creatorId', creatorFirestoreId)
                                 url.searchParams.set('maxResults', String(maxResults))

                                   const res = await fetch(url.toString(), {
                                       method: 'GET',
                                           headers: { 'Content-Type': 'application/json' },
                                             })

                                               if (!res.ok) {
                                                   const err = await res.json().catch(() => ({}))
                                                       throw new Error(err.error || `YouTube proxy error: ${res.status}`)
                                                         }

                                                           const data = await res.json()
                                                             return (data.videos || []).map(normaliseVideo)
                                                             }

                                                             /**
                                                              * Normalise a raw video object from the Cloud Function into a consistent shape.
                                                               * @param {object} v
                                                                * @returns {YouTubeVideo}
                                                                 */
                                                                 function normaliseVideo(v) {
                                                                   return {
                                                                       id:           v.id || '',
                                                                           title:        v.title || 'Untitled',
                                                                               description:  v.description || '',
                                                                                   thumbnail:    v.thumbnail || getBestThumbnail(v.id),
                                                                                       publishedAt:  v.publishedAt || '',
                                                                                           publishedFmt: v.publishedAt ? formatDate(v.publishedAt) : '',
                                                                                               viewCount:    formatYTCount(v.viewCount),
                                                                                                   likeCount:    formatYTCount(v.likeCount),
                                                                                                       duration:     formatDuration(v.duration),
                                                                                                           channelId:    v.channelId || '',
                                                                                                               channelTitle: v.channelTitle || '',
                                                                                                                 }
                                                                                                                 }
                                                                                                                 
                                                                                                                 /**
                                                                                                                  * @typedef {Object} YouTubeVideo
                                                                                                                   * @property {string} id
                                                                                                                    * @property {string} title
                                                                                                                     * @property {string} description
                                                                                                                      * @property {string} thumbnail
                                                                                                                       * @property {string} publishedAt   ISO 8601
                                                                                                                        * @property {string} publishedFmt  Human readable (e.g. "Jun 7, 2026")
                                                                                                                         * @property {string} viewCount     Formatted (e.g. "12.4K views")
                                                                                                                          * @property {string} likeCount     Formatted (e.g. "1.2K")
                                                                                                                           * @property {string} duration      Formatted (e.g. "12:34")
                                                                                                                            * @property {string} channelId
                                                                                                                             * @property {string} channelTitle
                                                                                                                              */
                                                                                                                              
                                                                                                                              /**
                                                                                                                               * Format a raw YouTube integer count to a human-readable string.
                                                                                                                                * @param {string|number} count
                                                                                                                                 * @returns {string}
                                                                                                                                  */
                                                                                                                                  export function formatYTCount(count) {
                                                                                                                                    const n = parseInt(count, 10)
                                                                                                                                      if (isNaN(n)) return '—'
                                                                                                                                        if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
                                                                                                                                          if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
                                                                                                                                            return n.toString()
                                                                                                                                            }
                                                                                                                                            
                                                                                                                                            /**
                                                                                                                                             * Convert ISO 8601 duration (PT4M30S) to readable string (4:30).
                                                                                                                                              * @param {string} iso
                                                                                                                                               * @returns {string}
                                                                                                                                                */
                                                                                                                                                export function formatDuration(iso) {
                                                                                                                                                  if (!iso) return ''
                                                                                                                                                    const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
                                                                                                                                                      if (!m) return ''
                                                                                                                                                        const h = parseInt(m[1] || '0', 10)
                                                                                                                                                          const mn = parseInt(m[2] || '0', 10)
                                                                                                                                                            const s = parseInt(m[3] || '0', 10)
                                                                                                                                                              if (h > 0) return `${h}:${String(mn).padStart(2, '0')}:${String(s).padStart(2, '0')}`
                                                                                                                                                                return `${mn}:${String(s).padStart(2, '0')}`
                                                                                                                                                                }
                                                                                                                                                                
                                                                                                                                                                /**
                                                                                                                                                                 * Format ISO 8601 date to a readable string.
                                                                                                                                                                  * @param {string} iso
                                                                                                                                                                   * @returns {string}
                                                                                                                                                                    */
                                                                                                                                                                    export function formatDate(iso) {
                                                                                                                                                                      try {
                                                                                                                                                                          return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                                                                                                                                                            } catch {
                                                                                                                                                                                return iso
                                                                                                                                                                                  }
                                                                                                                                                                                  }
                                                                                                                                                                                  
                                                                                                                                                                                  /**
                                                                                                                                                                                   * Get the best available thumbnail URL for a YouTube video ID.
                                                                                                                                                                                    * @param {string} videoId
                                                                                                                                                                                     * @returns {string}
                                                                                                                                                                                      */
                                                                                                                                                                                      export function getBestThumbnail(videoId) {
                                                                                                                                                                                        if (!videoId) return ''
                                                                                                                                                                                          return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
                                                                                                                                                                                          }
