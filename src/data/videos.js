// Real Anime1Point channel videos
// All videos belong to creatorId: 'anime1point'
// Categories: anime | manga | novels
// Sections: trending | latest | hidden-gem | featured

export const VIDEOS = [
  // ── Tensura Season 4 (Latest Episodes) ──
  { id: '_4xtVj881w4', title: 'Tensura S4 Ep 86 - Episode 14 [English Dub] Review', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-06-01' },
  { id: 'nyJ_8jVKJKc', title: 'Tensura S4 Ep 85 - Episode 13 [English Dub] Review', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-05-25' },
  { id: 'ommA4DBy5RQ', title: 'Tensura S4 Ep 84 - Episode 12 [English Dub] Review', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-05-18' },
  { id: 'ZVmqQk1GbqE', title: 'Tensura S4 Ep 83 - Episode 11 [English Dub] Review', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-05-11' },
  { id: '3izJIv1NrW8', title: 'Tensura S4 Ep 82 - Episode 10 [English Dub] Review', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-05-04' },
  { id: 'OCzmKRgsRag', title: 'Tensura S4 Ep 81 - Episode 9 [English Dub] Review', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-04-27' },

  // ── Tensura Season 4 (Latest - Episodes 7-8) ──
  { id: 'UeLgwcrGVnk', title: 'Tensura S4 Ep 80 - Season 4 Episode 8 P2 [English Dub] Review', creatorId: 'anime1point', category: 'anime', section: 'latest', publishedAt: '2026-04-20' },
  { id: 'jEiEpR3w4Ek', title: 'Tensura S4 Ep 80 - Season 4 Episode 8 P1 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'latest', publishedAt: '2026-04-13' },
  { id: 'B74XQSfhW1g', title: 'Tensura S4 Ep 79 - Season 4 Episode 7 P2 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'latest', publishedAt: '2026-04-06' },
  { id: 'bN534x05wBU', title: 'Tensura S4 Ep 79 - Season 4 Episode 7 P1 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'latest', publishedAt: '2026-03-30' },

  // ── Tensura Season 4 (Featured - Episodes 5-6) ──
  { id: 'wvxjzpJW8aE', title: 'Tensura S4 Ep 78 - Season 4 Episode 6 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'featured', publishedAt: '2026-03-09' },
  { id: 'mG9X9EZPCj0', title: 'Tensura S4 Ep 77 - Season 4 Episode 5 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'featured', publishedAt: '2026-02-09' },
  { id: '7E77-vVSgW4', title: 'Tensura S4 Ep 76 - Season 4 Episode 4 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'featured', publishedAt: '2026-01-05' },
  { id: 'oIUdlnnaLdk', title: 'Tensura S4 Ep 75 - Season 4 Episode 3 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'featured', publishedAt: '2025-12-07' },

  // ── Tensura Season 4 (Start of Season) ──
  { id: '2Xdf0q4LtlE', title: 'Tensura S4 Ep 74 - Season 4 Episode 2 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'hidden-gem', publishedAt: '2025-11-30' },
  { id: 'l8-VrpOQH48', title: 'Tensura S4 Ep 73 - Season 4 Episode 1 [English Sub] Review', creatorId: 'anime1point', category: 'anime', section: 'hidden-gem', publishedAt: '2025-10-05' },

  // ── Character Spotlights & Shorts ──
  { id: 'o_PazOqPg0I', title: 'Milim Nava: The Day Dragon Princess Became a Demon Lord | Tensura S4', creatorId: 'anime1point', category: 'anime', section: 'hidden-gem', publishedAt: '2026-04-20' },
  { id: 'in86TnE00c8', title: 'Hinata vs Veldora - Who Really Wins? | Tensura S4', creatorId: 'anime1point', category: 'anime', section: 'hidden-gem', publishedAt: '2025-11-09' },

  // ── Manga & Other Content ──
  { id: 'rOUNmBiTJVs', title: 'Rimuru vs Ivarage - The Full Fight Breakdown | Tensura Manga', creatorId: 'anime1point', category: 'manga', section: 'trending', publishedAt: '2025-10-05' },
  { id: 'E9i_CfCcK8M', title: 'One Piece Chapter 1159 Breakdown', creatorId: 'anime1point', category: 'manga', section: 'trending', publishedAt: '2025-10-05' },
]

export const TRENDING_VIDEOS = VIDEOS.filter(v => v.section === 'trending')
export const LATEST_VIDEOS = VIDEOS.filter(v => v.section === 'latest')
export const HIDDEN_GEM_VIDEOS = VIDEOS.filter(v => v.section === 'hidden-gem')
export const FEATURED_VIDEOS = VIDEOS.filter(v => v.section === 'featured')
