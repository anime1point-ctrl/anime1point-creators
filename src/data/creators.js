/**
 * CREATORS — Official Anime1Point channel only
 * Community creators will be added here when they join the platform
 * Shape: id, name, handle, official, category, avatar (initials),
 *        avatarGradient, bio, tags, youtubeUrl, youtubeChannelId, status
 */
export const CREATORS = [
  {
    id: 'anime1point',
    name: 'Anime1Point',
    handle: '@anime1point',
    official: true,
    category: 'anime',
    avatar: 'A1',
    avatarGradient: 'linear-gradient(135deg,#e63946,#7b2fff)',
    bio: 'The flagship Anime1Point channel. Focused on That Time I Got Reincarnated as a Slime (Tensura) Season 4 — episode reviews, English Dub reactions, manga breakdowns, character analysis and lore deep dives. 1.58K subscribers and growing.',
    tags: ['Tensura Season 4', 'Episode Reviews', 'English Dub', 'Manga Breakdown', 'Lore Deep Dives'],
    youtubeUrl: 'https://www.youtube.com/@anime1point',
    youtubeChannelId: 'UCXbs_3dDTMTwjsHGSxDdOAQ',
    status: 'approved',
    featured: true,
  },
]

export const APPROVED_CREATORS = CREATORS.filter(c => c.status === 'approved')
export const FEATURED_CREATORS = CREATORS.filter(c => c.featured)
export const CREATOR_MAP = Object.fromEntries(CREATORS.map(c => [c.id, c]))
