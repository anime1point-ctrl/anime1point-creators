// Sprint 5.1: Category standardisation — canonical IDs: anime | manga | light-novel
// 'novels' alias retired. All routes and data use 'light-novel' exclusively.

export const CATEGORIES = [
  { id: 'anime',        label: 'Anime',        icon: String.fromCodePoint(127820), badgeClass: 'badge-anime',   gradient: 'from-accent to-purple',   description: 'Episode breakdowns, analysis, and reviews.' },
  { id: 'manga',        label: 'Manga',        icon: String.fromCodePoint(128214), badgeClass: 'badge-manga',   gradient: 'from-accent2 to-accent',  description: 'Chapter reviews and manga analysis.' },
  { id: 'light-novel',  label: 'Light Novels', icon: String.fromCodePoint(128218), badgeClass: 'badge-novels',  gradient: 'from-teal to-purple',     description: 'Light novel and web novel reviews.' },
  ]

// All three categories shown in UI — no duplicates, no aliases
export const CATEGORIES_UI = CATEGORIES

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))
