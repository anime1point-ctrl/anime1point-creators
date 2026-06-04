/**
 * HOME SECTIONS — Configurable homepage section layout.
 *
 * Each section maps to a video pool in Home.jsx:
 *   'trending'   → TRENDING_VIDEOS
 *   'latest'     → LATEST_VIDEOS
 *   'hidden-gem' → HIDDEN_GEM_VIDEOS
 *   'featured'   → FeaturedCreatorsSection (special render, no videos)
 *
 * In Phase 2, this config lives in the database and is editable via
 * the Admin > Homepage Sections panel. For Phase 1 it reads/writes via localStorage.
 */

export const HOME_SECTIONS_DEFAULT = [
  {
    id: 'trending',
    title: 'Trending Discussions',
    tag: '🔥 Most Watched',
    enabled: true,
    order: 1,
    maxItems: 6,
    liveBadge: false,
    categoryFilter: null,
  },
  {
    id: 'latest',
    title: 'Latest Uploads',
    tag: '⚡ Just Dropped',
    enabled: true,
    order: 2,
    maxItems: 6,
    liveBadge: true,
    categoryFilter: null,
  },
  {
    id: 'featured',
    title: 'Featured Creators',
    tag: '✦ Spotlight',
    enabled: true,
    order: 3,
    maxItems: 6,
    liveBadge: false,
    categoryFilter: null,
  },
  {
    id: 'hidden-gem',
    title: 'Hidden Gems',
    tag: '💎 Underrated Picks',
    enabled: true,
    order: 4,
    maxItems: 6,
    liveBadge: false,
    categoryFilter: null,
  },
]

const LS_KEY = 'a1p_home_sections'

export function getHomeSections() {
  try {
    const stored = localStorage.getItem(LS_KEY)
    return stored ? JSON.parse(stored) : HOME_SECTIONS_DEFAULT
  } catch {
    return HOME_SECTIONS_DEFAULT
  }
}

export function saveHomeSections(sections) {
  localStorage.setItem(LS_KEY, JSON.stringify(sections))
}

export function resetHomeSections() {
  localStorage.removeItem(LS_KEY)
}
