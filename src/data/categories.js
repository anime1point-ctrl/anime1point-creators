export const CATEGORIES = [
  { id: 'anime', label: 'Anime', icon: String.fromCodePoint(127820), badgeClass: 'badge-anime', gradient: 'from-accent to-purple', description: 'Episode breakdowns on YouTube.' },
  { id: 'manga', label: 'Manga', icon: String.fromCodePoint(128214), badgeClass: 'badge-manga', gradient: 'from-accent2 to-accent', description: 'Chapter reviews and manga analysis.' },
  { id: 'novels', label: 'Light Novels', icon: String.fromCodePoint(128218), badgeClass: 'badge-novels', gradient: 'from-teal to-purple', description: 'Light novel and web novel reviews.' },
]
export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))
