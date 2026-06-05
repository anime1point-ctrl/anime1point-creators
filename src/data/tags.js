// Anime1Point Creators Hub — Tag Registry
// Sprint 5.1: Controlled tag vocabulary (~16 tags max for MVP)
//
// Rules:
//   - All tag ids are lowercase, hyphen-separated
//   - A video may have 1–4 tags
//   - Tags describe FORMAT and TOPIC, not the franchise (franchise field handles that)
//   - Do not add tags outside this list without updating this registry first

export const TAGS = [
  // ── Format tags ──────────────────────────────────────────
  { id: 'episode-review',   label: 'Episode Review',   description: 'Per-episode breakdown or reaction' },
  { id: 'chapter-review',   label: 'Chapter Review',   description: 'Per-chapter manga breakdown' },
  { id: 'season-roundup',   label: 'Season Roundup',   description: 'End-of-season or seasonal overview' },
  { id: 'review',           label: 'Review',            description: 'General series or volume review' },
  { id: 'essay',            label: 'Essay',             description: 'Long-form opinion or cultural commentary' },
  { id: 'ranking',          label: 'Ranking',           description: 'Top lists, best-of, tier lists' },

  // ── Content tags ──────────────────────────────────────────
  { id: 'lore',             label: 'Lore',              description: 'World-building, history, or universe deep dive' },
  { id: 'theory',           label: 'Theory',            description: 'Speculation, predictions, or fan theories' },
  { id: 'analysis',         label: 'Analysis',          description: 'Thematic, narrative, or structural analysis' },
  { id: 'power-scaling',    label: 'Power Scaling',     description: 'Character strength comparisons and tier discussions' },
  { id: 'character-analysis', label: 'Character Analysis', description: 'Deep dive into a specific character' },
  { id: 'fight-breakdown',  label: 'Fight Breakdown',   description: 'Scene-by-scene breakdown of battles or confrontations' },

  // ── Medium-specific tags ──────────────────────────────────
  { id: 'manga-review',     label: 'Manga Review',      description: 'Manga-specific review or chapter discussion' },
  { id: 'ln-review',        label: 'LN Review',         description: 'Light novel volume or arc review' },

  // ── Discovery / editorial tags ────────────────────────────
  { id: 'industry',         label: 'Industry',          description: 'Anime/manga industry news, business, or controversy' },
  { id: 'hidden-gem-pick',  label: 'Hidden Gem Pick',   description: 'Editorial pick of underrated or overlooked content' },
]

export const TAG_MAP = Object.fromEntries(TAGS.map(t => [t.id, t]))

// Convenience: all valid tag ids as a Set (for validation)
export const VALID_TAGS = new Set(TAGS.map(t => t.id))
