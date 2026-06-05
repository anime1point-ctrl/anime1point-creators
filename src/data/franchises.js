// Anime1Point Creators Hub — Franchise Registry
// Sprint 5.1: Canonical franchise taxonomy

export const FRANCHISES = [
  { id: 'tensura',         label: 'That Time I Got Reincarnated as a Slime', shortLabel: 'Tensura',        category: 'anime',        emoji: '💙' },
  { id: 're-zero',         label: 'Re:Zero',                                  shortLabel: 'Re:Zero',        category: 'anime',        emoji: '❤️' },
  { id: 'overlord',        label: 'Overlord',                                 shortLabel: 'Overlord',       category: 'light-novel',  emoji: '💀' },
  { id: 'mushoku-tensei',  label: 'Mushoku Tensei',                           shortLabel: 'Mushoku Tensei', category: 'light-novel',  emoji: '✨' },
  { id: 'wistoria',        label: 'Wistoria: Wand and Sword',                 shortLabel: 'Wistoria',       category: 'anime',        emoji: '🪄' },
  { id: 'bookworm',        label: 'Ascendance of a Bookworm',                 shortLabel: 'Bookworm',       category: 'light-novel',  emoji: '📚' },
  { id: 'cote',            label: 'Classroom of the Elite',                   shortLabel: 'CotE',           category: 'light-novel',  emoji: '🏫' },
  { id: 'one-piece',       label: 'One Piece',                                shortLabel: 'One Piece',      category: 'manga',        emoji: '⚓' },
  { id: 'dragon-ball',     label: 'Dragon Ball',                              shortLabel: 'Dragon Ball',    category: 'anime',        emoji: '⭐' },
  { id: 'naruto',          label: 'Naruto / Boruto',                          shortLabel: 'Naruto',         category: 'anime',        emoji: '🌀' },
  { id: 'bleach',          label: 'Bleach',                                   shortLabel: 'Bleach',         category: 'anime',        emoji: '⚡' },
  { id: 'jjk',             label: 'Jujutsu Kaisen',                           shortLabel: 'JJK',            category: 'manga',        emoji: '👻' },
  { id: 'demon-slayer',    label: 'Demon Slayer',                             shortLabel: 'Demon Slayer',   category: 'anime',        emoji: '🔥' },
  { id: 'chainsaw-man',    label: 'Chainsaw Man',                             shortLabel: 'Chainsaw Man',   category: 'manga',        emoji: '⛏️' },
  { id: 'attack-on-titan', label: 'Attack on Titan',                          shortLabel: 'AoT',            category: 'anime',        emoji: '🌑' },
  { id: 'berserk',         label: 'Berserk',                                  shortLabel: 'Berserk',        category: 'manga',        emoji: '⚔️' },
  { id: 'kingdom',         label: 'Kingdom',                                  shortLabel: 'Kingdom',        category: 'manga',        emoji: '🛡️' },
  { id: 'vagabond',        label: 'Vagabond',                                 shortLabel: 'Vagabond',       category: 'manga',        emoji: '🎯' },
  { id: 'witch-hat',       label: 'Witch Hat Atelier',                        shortLabel: 'Witch Hat',      category: 'manga',        emoji: '🎩' },
  { id: 'jojo',            label: "JoJo's Bizarre Adventure",                 shortLabel: 'JoJo',           category: 'manga',        emoji: '🍿' },
  { id: 'evangelion',      label: 'Neon Genesis Evangelion',                  shortLabel: 'Evangelion',     category: 'anime',        emoji: '🔮' },
  { id: 'frieren',         label: "Frieren: Beyond Journey's End",            shortLabel: 'Frieren',        category: 'manga',        emoji: '🌿' },
  { id: 'avatar',          label: 'Avatar: The Last Airbender',               shortLabel: 'Avatar',         category: 'anime',        emoji: '🌪️' },
  { id: 'multi',           label: 'Multi-Franchise',                          shortLabel: 'Multi',          category: 'anime',        emoji: '🌌' },
]

export const FRANCHISE_MAP = Object.fromEntries(FRANCHISES.map(f => [f.id, f]))

export const FRANCHISES_BY_CATEGORY = {
  anime:          FRANCHISES.filter(f => f.category === 'anime'        && f.id !== 'multi'),
  manga:          FRANCHISES.filter(f => f.category === 'manga'),
  'light-novel':  FRANCHISES.filter(f => f.category === 'light-novel'),
  multi:          FRANCHISES.filter(f => f.id === 'multi'),
}
