/**
 * HOME SECTIONS — configurable homepage section layout.
 *
 * Each section has:
 *   id       — unique key (matches video 'section' field in videos.js)
 *   title    — display heading
 *   tag      — small section badge
 *   enabled  — show/hide on homepage (admin-toggleable)
 *   order    — render order (lower = higher on page)
 *   maxItems — how many videos to show
 *   liveBadge — show a LIVE badge next to the title
 *
 * In Phase 2 this config is stored in the database and edited via
 * the Admin > Homepage Sections panel. For Phase 1 it is a static
 * JS module that the admin panel reads and writes via localStorage.
 */

export const HOME_SECTIONS_DEFAULT = [
  {
    id: 'trending',
    title: 'Trending Now',
    tag: 'Fire Top Picks',
    enabled: true,
    order: 1,
    maxItems: 6,
    liveBadge: false,
    categoryFilter: null,
  },
  {
    id: 'latest',
    title: 'Latest Published',
    tag: 'Fresh Content',
    enabled: true,
    order: 2,
    maxItems: 6,
    liveBadge: true,
    categoryFilter: null,
  },
  {
    id: 'hidden-gem',
    title: 'Hidden Gems',
    tag: 'Underrated Picks',
    enabled: true,
    order: 3,
    maxItems: 6,
    liveBadge: false,
    categoryFilter: null,
  },
  {
    id: 'featured',
    title: 'Featured Creators',
    tag: 'Spotlight',
    enabled: true,
    order: 4,
    maxItems: 4,
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
