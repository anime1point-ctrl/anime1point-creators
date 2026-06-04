export const CATEGORIES = [
  { id: 'anime',      label: 'Anime',        icon: String.fromCodePoint(127820), badgeClass: 'badge-anime',   gradient: 'from-accent to-purple',  description: 'Episode breakdowns, analysis, and reviews.' },
  { id: 'manga',      label: 'Manga',        icon: String.fromCodePoint(128214), badgeClass: 'badge-manga',   gradient: 'from-accent2 to-accent', description: 'Chapter reviews and manga analysis.' },
  { id: 'novels',     label: 'Light Novels', icon: String.fromCodePoint(128218), badgeClass: 'badge-novels',  gradient: 'from-teal to-purple',    description: 'Light novel and web novel reviews.' },
  // 'light-novel' is an alias for 'novels' used in video data — kept for compatibility
  { id: 'light-novel', label: 'Light Novels', icon: String.fromCodePoint(128218), badgeClass: 'badge-novels', gradient: 'from-teal to-purple',    description: 'Light novel and web novel content.' },
]

// Primary categories shown in UI filters (no duplicate light-novel)
export const CATEGORIES_UI = CATEGORIES.filter(c => c.id !== 'light-novel')

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))
