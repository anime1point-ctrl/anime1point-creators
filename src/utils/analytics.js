/**
 * analytics.js — Lightweight event tracking for Anime1Point Creators Hub
 *
 * Events fired:
 *   video_opened          — user clicks a video card to open the modal
 *   video_played          — iframe embed begins playing (real YouTube ID)
 *   youtube_clicked       — user clicks "Watch on YouTube" on a profile
 *   subscribe_clicked     — user clicks "Subscribe" in the video modal footer
 *   creator_profile_viewed — user navigates to a creator profile page
 *   search_performed      — user submits a search query
 *   related_video_clicked — user clicks a related video suggestion
 *   claim_profile_clicked — user clicks "Claim Profile" on a creator page
 *
 * Drop-in compatible with Umami, Plausible, or Google Analytics 4.
 * Falls back to console.debug in development if no analytics provider found.
 *
 * To connect Umami: add <script> tag to index.html with data-website-id.
 * To connect Plausible: add <script> tag to index.html with data-domain.
 * To connect GA4: initialise gtag() in index.html.
 */

const isDev = import.meta.env.DEV

/**
 * track(eventName, props)
 * Sends an analytics event to whichever provider is active.
 * Safe to call even if no provider is loaded.
 */
export function track(eventName, props = {}) {
  try {
    // Umami
    if (typeof window.umami !== "undefined") {
      window.umami.track(eventName, props)
      return
    }
    // Plausible
    if (typeof window.plausible !== "undefined") {
      window.plausible(eventName, { props })
      return
    }
    // Google Analytics 4
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", eventName, props)
      return
    }
    // Development fallback
    if (isDev) {
      console.debug("[Analytics]", eventName, props)
    }
  } catch (e) {
    // Never let analytics errors affect the user
    if (isDev) console.warn("[Analytics] Error:", e)
  }
}

// ── Typed event helpers ────────────────────────────────────────

export const Analytics = {
  videoOpened: (videoId, title, creatorName) =>
    track("video_opened", { video_id: videoId, title, creator: creatorName }),

  videoPlayed: (videoId, title, creatorName) =>
    track("video_played", { video_id: videoId, title, creator: creatorName }),

  youtubeClicked: (creatorId, creatorName) =>
    track("youtube_clicked", { creator_id: creatorId, creator: creatorName }),

  subscribeClicked: (creatorId, creatorName) =>
    track("subscribe_clicked", { creator_id: creatorId, creator: creatorName }),

  creatorProfileViewed: (creatorId, creatorName) =>
    track("creator_profile_viewed", { creator_id: creatorId, creator: creatorName }),

  searchPerformed: (query, videoCount, creatorCount) =>
    track("search_performed", { query, video_results: videoCount, creator_results: creatorCount }),

  relatedVideoClicked: (fromVideoId, toVideoId, reason) =>
    track("related_video_clicked", { from: fromVideoId, to: toVideoId, reason }),

  claimProfileClicked: (creatorId, creatorName) =>
    track("claim_profile_clicked", { creator_id: creatorId, creator: creatorName }),
          }
