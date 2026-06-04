// v2 - unique video IDs per creator, gradient placeholders for unlinked videos
export const VIDEOS = [
  // ── anime1point (Official) ── REAL YouTube video IDs ──
  { id: 'ZVmqQk1GbqE', title: 'Tensura S4E6 - Rimuru vs Ivarage Full Breakdown', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-05-28' },
  { id: 'OCzmKRgsRag', title: 'Tensura S4E5 - The True Demon Lord Power Explained', creatorId: 'anime1point', category: 'anime', section: 'trending', publishedAt: '2026-05-21' },
  { id: 'UeLgwcrGVnk', title: 'Tensura S4E4 - Milim Secret Finally Revealed', creatorId: 'anime1point', category: 'anime', section: 'latest', publishedAt: '2026-05-14' },
  { id: 'jEiEpR3w4Ek', title: 'Tensura S4E2 - Rimuru Cabinet of Ministers', creatorId: 'anime1point', category: 'anime', section: 'latest', publishedAt: '2026-04-30' },
  { id: 'B74XQSfhW1g', title: 'Tensura S4E1 - Season 4 First Impressions Review', creatorId: 'anime1point', category: 'anime', section: 'featured', publishedAt: '2026-04-09' },
  { id: 'bN534x05wBU', title: 'One Piece 1159 - Full Chapter Breakdown', creatorId: 'anime1point', category: 'manga', section: 'trending', publishedAt: '2026-05-25' },
  { id: 'wvxjzpJW8aE', title: 'Tensura LN vs Anime - Key Story Differences', creatorId: 'anime1point', category: 'novels', section: 'featured', publishedAt: '2026-05-10' },
  { id: 'nyJ_8jVKJKc', title: 'Dragon Ball Daima - Is It Actually Good?', creatorId: 'anime1point', category: 'anime', section: 'hidden-gem', publishedAt: '2026-04-15' },

  // ── tensura-daily ── placeholder IDs (creator not yet on platform) ──
  { id: 'tdaily_vid_01', title: 'Daily Tensura - Who Is The Strongest Demon Lord?', creatorId: 'tensura-daily', category: 'anime', section: 'trending', publishedAt: '2026-05-29' },
  { id: 'tdaily_vid_02', title: 'Rimuru vs Diablo - Who Wins in Season 4?', creatorId: 'tensura-daily', category: 'anime', section: 'latest', publishedAt: '2026-05-22' },
  { id: 'tdaily_vid_03', title: 'Milim Nava Full Character Analysis', creatorId: 'tensura-daily', category: 'anime', section: 'featured', publishedAt: '2026-05-08' },
  { id: 'tdaily_vid_04', title: 'Every Tensura Named Monster Ranked', creatorId: 'tensura-daily', category: 'anime', section: 'hidden-gem', publishedAt: '2026-04-20' },
  { id: 'tdaily_vid_05', title: 'Veldora Tempest - From Prison to Freedom', creatorId: 'tensura-daily', category: 'anime', section: 'trending', publishedAt: '2026-05-15' },

  // ── manga-sensei ── placeholder IDs ──
  { id: 'msensei_vid_01', title: 'One Piece 1159 - Gear 5 Lore We Missed', creatorId: 'manga-sensei', category: 'manga', section: 'trending', publishedAt: '2026-05-27' },
  { id: 'msensei_vid_02', title: 'Bleach TYBW Manga vs Anime - Full Comparison', creatorId: 'manga-sensei', category: 'manga', section: 'latest', publishedAt: '2026-05-20' },
  { id: 'msensei_vid_03', title: 'Black Clover - Asta True Power Explained', creatorId: 'manga-sensei', category: 'manga', section: 'featured', publishedAt: '2026-05-06' },
  { id: 'msensei_vid_04', title: 'Jujutsu Kaisen - Gojo vs Sukuna Full Recap', creatorId: 'manga-sensei', category: 'manga', section: 'hidden-gem', publishedAt: '2026-04-22' },
  { id: 'msensei_vid_05', title: 'Demon Slayer - What the Manga Does Better', creatorId: 'manga-sensei', category: 'manga', section: 'trending', publishedAt: '2026-05-13' },

  // ── novel-nexus ── placeholder IDs ──
  { id: 'novnex_vid_01', title: 'Overlord LN Vol 17 - The Final Arc Begins', creatorId: 'novel-nexus', category: 'novels', section: 'trending', publishedAt: '2026-05-26' },
  { id: 'novnex_vid_02', title: 'Re Zero - Why Arc 5 Is The Series Best', creatorId: 'novel-nexus', category: 'novels', section: 'latest', publishedAt: '2026-05-19' },
  { id: 'novnex_vid_03', title: 'Tensura LN - Everything After The Anime Ends', creatorId: 'novel-nexus', category: 'novels', section: 'featured', publishedAt: '2026-05-05' },
  { id: 'novnex_vid_04', title: 'Sword Art Online LN - The Underrated Alicization', creatorId: 'novel-nexus', category: 'novels', section: 'hidden-gem', publishedAt: '2026-04-18' },
  { id: 'novnex_vid_05', title: 'Konosuba LN - Why The Books Are Funnier', creatorId: 'novel-nexus', category: 'novels', section: 'trending', publishedAt: '2026-05-12' },

  // ── shonen-spotlight ── placeholder IDs ──
  { id: 'shspot_vid_01', title: 'Dragon Ball Daima Episode 10 - Full Review', creatorId: 'shonen-spotlight', category: 'anime', section: 'trending', publishedAt: '2026-05-30' },
  { id: 'shspot_vid_02', title: 'Naruto - Top 10 Fights That Changed Everything', creatorId: 'shonen-spotlight', category: 'anime', section: 'latest', publishedAt: '2026-05-23' },
  { id: 'shspot_vid_03', title: 'My Hero Academia Final Season - Is It Worth It?', creatorId: 'shonen-spotlight', category: 'anime', section: 'featured', publishedAt: '2026-05-09' },
  { id: 'shspot_vid_04', title: 'Bleach TYBW Part 3 - Everything We Know', creatorId: 'shonen-spotlight', category: 'anime', section: 'hidden-gem', publishedAt: '2026-04-25' },
  { id: 'shspot_vid_05', title: 'Hunter x Hunter - Will It Ever Come Back?', creatorId: 'shonen-spotlight', category: 'anime', section: 'trending', publishedAt: '2026-05-16' },

  // ── isekai-insider ── placeholder IDs ──
  { id: 'isinsd_vid_01', title: 'Top 10 Isekai of 2026 Ranked', creatorId: 'isekai-insider', category: 'anime', section: 'trending', publishedAt: '2026-05-28' },
  { id: 'isinsd_vid_02', title: 'Reincarnated as a Slime vs Overlord - Who Wins?', creatorId: 'isekai-insider', category: 'anime', section: 'latest', publishedAt: '2026-05-21' },
  { id: 'isinsd_vid_03', title: 'Isekai Light Novels You Must Read Before The Anime', creatorId: 'isekai-insider', category: 'novels', section: 'featured', publishedAt: '2026-05-07' },
  { id: 'isinsd_vid_04', title: 'The Best Hidden Gem Isekai Anime of All Time', creatorId: 'isekai-insider', category: 'anime', section: 'hidden-gem', publishedAt: '2026-04-23' },
  { id: 'isinsd_vid_05', title: 'Isekai Manga You Should Read Right Now', creatorId: 'isekai-insider', category: 'manga', section: 'trending', publishedAt: '2026-05-14' },

  // ── panel-by-panel ── placeholder IDs ──
  { id: 'pxpanel_vid_01', title: 'One Piece Nika Panel - Why It Changed Manga Art', creatorId: 'panel-by-panel', category: 'manga', section: 'trending', publishedAt: '2026-05-27' },
  { id: 'pxpanel_vid_02', title: 'Berserk - How Miura Art Tells The Story', creatorId: 'panel-by-panel', category: 'manga', section: 'latest', publishedAt: '2026-05-20' },
  { id: 'pxpanel_vid_03', title: 'Attack on Titan - The Final Panel Breakdown', creatorId: 'panel-by-panel', category: 'manga', section: 'featured', publishedAt: '2026-05-06' },
  { id: 'pxpanel_vid_04', title: 'Vagabond - Why It Is The Greatest Manga Ever Drawn', creatorId: 'panel-by-panel', category: 'manga', section: 'hidden-gem', publishedAt: '2026-04-19' },
  { id: 'pxpanel_vid_05', title: 'Chainsaw Man Art - Fujimoto Visual Language', creatorId: 'panel-by-panel', category: 'manga', section: 'trending', publishedAt: '2026-05-13' },

  // ── ln-scholar ── placeholder IDs ──
  { id: 'lnschl_vid_01', title: 'Overlord World Building - The Deep Lore Guide', creatorId: 'ln-scholar', category: 'novels', section: 'trending', publishedAt: '2026-05-26' },
  { id: 'lnschl_vid_02', title: 'Re Zero LN - Everything The Anime Cut', creatorId: 'ln-scholar', category: 'novels', section: 'latest', publishedAt: '2026-05-19' },
  { id: 'lnschl_vid_03', title: 'Tensura Web Novel vs Light Novel - Key Differences', creatorId: 'ln-scholar', category: 'novels', section: 'featured', publishedAt: '2026-05-05' },
  { id: 'lnschl_vid_04', title: 'Mushoku Tensei LN - The Full Story You Need to Know', creatorId: 'ln-scholar', category: 'novels', section: 'hidden-gem', publishedAt: '2026-04-21' },
  { id: 'lnschl_vid_05', title: 'Sword Art Online Progressive LN - Worth Reading?', creatorId: 'ln-scholar', category: 'novels', section: 'trending', publishedAt: '2026-05-11' },

  // ── seasonal-scout ── placeholder IDs ──
  { id: 'seasct_vid_01', title: 'Spring 2026 Anime First Impressions Ranked', creatorId: 'seasonal-scout', category: 'anime', section: 'trending', publishedAt: '2026-05-25' },
  { id: 'seasct_vid_02', title: 'Winter 2026 Anime - Final Verdicts', creatorId: 'seasonal-scout', category: 'anime', section: 'latest', publishedAt: '2026-05-18' },
  { id: 'seasct_vid_03', title: 'Top 5 Anime of 2026 So Far', creatorId: 'seasonal-scout', category: 'anime', section: 'featured', publishedAt: '2026-05-04' },
  { id: 'seasct_vid_04', title: 'Most Underrated Anime of Spring 2026', creatorId: 'seasonal-scout', category: 'anime', section: 'hidden-gem', publishedAt: '2026-04-17' },
  { id: 'seasct_vid_05', title: 'Seasonal Rankings - Spring vs Winter 2026', creatorId: 'seasonal-scout', category: 'anime', section: 'trending', publishedAt: '2026-05-10' },

  // ── hidden-gem-hunter ── placeholder IDs ──
  { id: 'hgmhnt_vid_01', title: 'Top 10 Forgotten Isekai That Deserve More Views', creatorId: 'hidden-gem-hunter', category: 'anime', section: 'trending', publishedAt: '2026-05-24' },
  { id: 'hgmhnt_vid_02', title: 'The Best Anime That Nobody Watched in 2025', creatorId: 'hidden-gem-hunter', category: 'anime', section: 'latest', publishedAt: '2026-05-17' },
  { id: 'hgmhnt_vid_03', title: 'Hidden Gem Alert - 5 Anime You Need To Watch Now', creatorId: 'hidden-gem-hunter', category: 'anime', section: 'featured', publishedAt: '2026-05-03' },
  { id: 'hgmhnt_vid_04', title: 'Underrated Manga That Never Got an Anime', creatorId: 'hidden-gem-hunter', category: 'manga', section: 'hidden-gem', publishedAt: '2026-04-16' },
  { id: 'hgmhnt_vid_05', title: 'Why These 3 Anime Deserve a Second Season', creatorId: 'hidden-gem-hunter', category: 'anime', section: 'trending', publishedAt: '2026-05-09' },
]

export const TRENDING_VIDEOS = VIDEOS.filter(v => v.section === 'trending')
export const LATEST_VIDEOS = VIDEOS.filter(v => v.section === 'latest')
export const HIDDEN_GEM_VIDEOS = VIDEOS.filter(v => v.section === 'hidden-gem')
export const FEATURED_VIDEOS = VIDEOS.filter(v => v.section === 'featured')
