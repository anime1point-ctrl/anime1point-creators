// Anime1Point Creators Hub — Video Library
// Sprint 5.3: Launch-readiness fixes — 161 videos, 25 creators (22 approved, 3 pending)
// Schema: { id, title, creatorId, category, franchise, tags, section, publishedAt }
//
// franchise: canonical id from franchises.js ('multi' for cross-franchise content)
// tags:      1-4 ids from tags.js (format + topic descriptors)
//h
// Section editorial meaning:
// trending    → High-performing, viral or widely discussed content
// latest      → Recent uploads from the past few weeks
// featured    → Curated editorial picks — best of each creator
// hidden-gem  → Underrated, overlooked, or deep-cut content

export const VIDEOS = [

// ════════════════════════════════════════════════════════════
// ANIME1POINT — Platform Creator
// ════════════════════════════════════════════════════════════
{ id: '_4xtVj881w4', title: 'Tensura S4 Ep 86 - Episode 14 [English Dub] Review',         creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'trending',   publishedAt: '2026-06-01' },
{ id: 'nyJ_8jVKJKc', title: 'Tensura S4 Ep 85 - Episode 13 [English Dub] Review',         creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'trending',   publishedAt: '2026-05-25' },
{ id: 'ommA4DBy5RQ', title: 'Tensura S4 Ep 84 - Episode 12 [English Dub] Review',         creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'latest',     publishedAt: '2026-05-18' },
{ id: 'ZVmqQk1GbqE', title: 'Tensura S4 Ep 83 - Episode 11 [English Dub] Review',         creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'latest',     publishedAt: '2026-05-11' },
{ id: '3izJIv1NrW8', title: 'Tensura S4 Ep 82 - Episode 10 [English Dub] Review',         creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'featured',   publishedAt: '2026-05-04' },
{ id: 'OCzmKRgsRag', title: 'Tensura S4 Ep 81 - Episode 9 [English Dub] Review',          creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'featured',   publishedAt: '2026-04-27' },
{ id: 'UeLgwcrGVnk', title: 'Tensura S4 Ep 80 - Episode 8 P2 [English Dub] Review',       creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'hidden-gem', publishedAt: '2026-04-20' },
{ id: 'jEiEpR3w4Ek', title: 'Tensura S4 Ep 80 - Episode 8 P1 [English Sub] Review',       creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'hidden-gem', publishedAt: '2026-04-13' },
{ id: 'B74XQSfhW1g', title: 'Tensura S4 Ep 79 - Episode 7 P2 [English Sub] Review',       creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'hidden-gem', publishedAt: '2026-04-06' },
{ id: 'bN534x05wBU', title: 'Tensura S4 Ep 79 - Episode 7 P1 [English Sub] Review',       creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'hidden-gem', publishedAt: '2026-03-30' },
{ id: 'wvxjzpJW8aE', title: 'Tensura S4 Ep 78 - Episode 6 [English Sub] Review',          creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'hidden-gem', publishedAt: '2026-03-09' },
{ id: 'mG9X9EZPCj0', title: 'Tensura S4 Ep 77 - Episode 5 [English Sub] Review',          creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'latest', publishedAt: '2026-02-09' },
{ id: '7E77-vVSgW4', title: 'Tensura S4 Ep 76 - Episode 4 [English Sub] Review',          creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'hidden-gem', publishedAt: '2026-01-05' },
{ id: 'oIUdlnnaLdk', title: 'Tensura S4 Ep 75 - Episode 3 [English Sub] Review',          creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'latest', publishedAt: '2025-12-07' },
{ id: '2Xdf0q4LtlE', title: 'Tensura S4 Ep 74 - Episode 2 [English Sub] Review',          creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'latest', publishedAt: '2025-11-30' },
{ id: 'l8-VrpOQH48', title: 'Tensura S4 Ep 73 - Episode 1 [English Sub] Review',          creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['episode-review'],                       section: 'latest', publishedAt: '2025-10-05' },
{ id: 'o_PazOqPg0I', title: 'Milim Nava: The Day Dragon Princess Became a Demon Lord | Tensura S4', creatorId: 'anime1point', category: 'anime', franchise: 'tensura', tags: ['character-analysis', 'lore'],   section: 'hidden-gem', publishedAt: '2026-04-20' },
{ id: 'in86TnE00c8', title: 'Hinata vs Veldora - Who Really Wins? | Tensura S4',           creatorId: 'anime1point', category: 'anime', franchise: 'tensura',   tags: ['fight-breakdown', 'theory'],            section: 'hidden-gem', publishedAt: '2025-11-09' },
{ id: 'rOUNmBiTJVs', title: 'Rimuru vs Ivarage - The Full Fight Breakdown | Tensura Manga', creatorId: 'anime1point', category: 'manga', franchise: 'tensura',  tags: ['fight-breakdown', 'manga-review'],       section: 'trending',   publishedAt: '2025-10-05' },
{ id: 'E9i_CfCcK8M', title: 'One Piece Chapter 1159 Breakdown',                            creatorId: 'anime1point', category: 'manga', franchise: 'one-piece', tags: ['chapter-review'],                       section: 'featured',   publishedAt: '2025-10-05' },

// ════════════════════════════════════════════════════════════
// GIGGUK — Anime Essays & Seasonal Nutshells
// ════════════════════════════════════════════════════════════
{ id: 'qKZyYSkBmwc', title: 'The Biggest Dumpster Fire In Anime',                          creatorId: 'gigguk', category: 'anime', franchise: 'multi',        tags: ['essay', 'industry'],                    section: 'trending',   publishedAt: '2026-05-28' },
{ id: 'rEAB4CKfx-8', title: 'Spring Anime 2026 In A Nutshell',                             creatorId: 'gigguk', category: 'anime', franchise: 'multi',        tags: ['season-roundup'],                       section: 'trending',   publishedAt: '2026-05-10' },
{ id: 'pR-IH57wrY0', title: 'Winter Anime 2026 In A Nutshell',                             creatorId: 'gigguk', category: 'anime', franchise: 'multi',        tags: ['season-roundup'],                       section: 'latest',     publishedAt: '2026-02-15' },
{ id: 'lymfyRBPd14', title: 'Best of Anime 2025',                                          creatorId: 'gigguk', category: 'anime', franchise: 'multi',        tags: ['ranking', 'season-roundup'],            section: 'featured',   publishedAt: '2025-12-20' },
{ id: 'ymUJgnUKXo8', title: "The Horse Girl Anime Shouldn't Go This Hard",                 creatorId: 'gigguk', category: 'anime', franchise: 'multi',        tags: ['essay'],                                section: 'hidden-gem', publishedAt: '2025-11-05' },
{ id: 'Nk3FiJRMC1E', title: "Chainsaw Man's Author Can't Stop Winning",                   creatorId: 'gigguk', category: 'anime', franchise: 'chainsaw-man', tags: ['essay', 'industry'],                    section: 'hidden-gem', publishedAt: '2025-10-18' },
{ id: 'dce2XqZRKXY', title: 'The Man That Globalized Chinese Anime',                       creatorId: 'gigguk', category: 'anime', franchise: 'multi',        tags: ['essay', 'industry'],                    section: 'featured',   publishedAt: '2025-09-22' },
{ id: 'wnN4BjkVZNo', title: "Anime That Don't Waste Your Time",                            creatorId: 'gigguk', category: 'anime', franchise: 'multi',        tags: ['ranking', 'essay'],                     section: 'featured',   publishedAt: '2025-08-30' },

// ════════════════════════════════════════════════════════════
// THE ANIME MAN — Anime & Japan Culture
// ════════════════════════════════════════════════════════════
{ id: 'mTNMEfvM3Ro', title: 'This Anime Will Destroy You',                                 creatorId: 'theanimeman', category: 'anime', franchise: 'multi',    tags: ['review', 'essay'],                      section: 'trending',   publishedAt: '2026-04-20' },
{ id: 'RAE9b0rIslw', title: 'The DISTURBING Bottom of the Anime Iceberg Explained',        creatorId: 'theanimeman', category: 'anime', franchise: 'multi',    tags: ['analysis', 'essay'],                    section: 'featured',   publishedAt: '2026-03-10' },
{ id: 'Svd8oeuVB7A', title: "The BEST Anime from 2024 (That You Probably Didn't Watch)",  creatorId: 'theanimeman', category: 'anime', franchise: 'multi',    tags: ['ranking', 'hidden-gem-pick'],           section: 'featured',   publishedAt: '2025-12-28' },
{ id: 'EkEMco6wE9M', title: 'I Spent a Day with a Former Nintendo Employee',               creatorId: 'theanimeman', category: 'anime', franchise: 'multi',    tags: ['industry'],                             section: 'hidden-gem', publishedAt: '2026-05-15' },
{ id: 'KNpIXfF5lKs', title: 'Hunting for the Rarest Shonen Jump Magazine in Japan',       creatorId: 'theanimeman', category: 'manga', franchise: 'multi',    tags: ['industry', 'hidden-gem-pick'],          section: 'hidden-gem', publishedAt: '2026-04-30' },

// ════════════════════════════════════════════════════════════
// MOTHER'S BASEMENT — Anime Analysis & OP/ED Deep Dives
// ════════════════════════════════════════════════════════════
{ id: '1RRL4Bv3DSM', title: 'The Golden Age of Fantasy Anime',                             creatorId: 'mothersbasement', category: 'anime', franchise: 'multi',    tags: ['essay', 'analysis'],                section: 'trending',   publishedAt: '2026-05-20' },
{ id: 'kiVm-MF0ZA4', title: 'HOTTEST TRASH ANIME of Spring 2026',                         creatorId: 'mothersbasement', category: 'anime', franchise: 'multi',    tags: ['season-roundup', 'ranking'],        section: 'latest',     publishedAt: '2026-05-05' },
{ id: 'lmDSoS5gybY', title: 'BEST Anime of Spring 2026',                                  creatorId: 'mothersbasement', category: 'anime', franchise: 'multi',    tags: ['season-roundup', 'ranking'],        section: 'latest',     publishedAt: '2026-06-01' },
{ id: 'wtMM_sLZFMQ', title: 'Power Fantasy, Perfected',                                   creatorId: 'mothersbasement', category: 'anime', franchise: 'multi',    tags: ['analysis', 'essay'],                section: 'featured',   publishedAt: '2026-03-15' },
{ id: 'LTwWZPmpoc0', title: 'One Piece Season 2 is a Miracle',                            creatorId: 'mothersbasement', category: 'anime', franchise: 'one-piece', tags: ['review', 'analysis'],              section: 'featured',   publishedAt: '2026-02-28' },
{ id: 'W2x-UQpiARc', title: 'Parasites Are Eating Your Hobbies Alive',                    creatorId: 'mothersbasement', category: 'anime', franchise: 'multi',    tags: ['essay', 'industry'],                section: 'hidden-gem', publishedAt: '2026-04-10' },

// ════════════════════════════════════════════════════════════
// GLASS REFLECTION — Seasonal Reviews
// ════════════════════════════════════════════════════════════
{ id: '81Xd9uLqIe8', title: 'I Watched EVERY SINGLE NEW ANIME of the SPRING 2026 Season', creatorId: 'glassreflection', category: 'anime', franchise: 'multi',    tags: ['season-roundup', 'review'],         section: 'trending',   publishedAt: '2026-05-25' },
{ id: '-saaNM_rMUA', title: 'I Watched EVERY SINGLE NEW ANIME of the WINTER 2026 Season', creatorId: 'glassreflection', category: 'anime', franchise: 'multi',    tags: ['season-roundup', 'review'],         section: 'latest',     publishedAt: '2026-02-20' },
{ id: 'J2The5iHuZM', title: 'My Top 10 Anime of 2025 | Glass Reflection',                 creatorId: 'glassreflection', category: 'anime', franchise: 'multi',    tags: ['ranking', 'season-roundup'],        section: 'featured',   publishedAt: '2026-01-05' },
{ id: 'YMsPIC_XU8o', title: 'Sentenced To Be A Damn Good Time!',                          creatorId: 'glassreflection', category: 'anime', franchise: 'multi',    tags: ['review'],                           section: 'featured',   publishedAt: '2026-04-08' },
{ id: 'u49g7g4Ofjw', title: 'The Best Time To Watch Steel Ball Run is...',                creatorId: 'glassreflection', category: 'manga', franchise: 'jojo',     tags: ['manga-review', 'analysis'],         section: 'hidden-gem', publishedAt: '2026-03-22' },
{ id: 'FG0HvcQL9qg', title: 'I Rewatched A Favourite Anime and It Kind of Ruined It',     creatorId: 'glassreflection', category: 'anime', franchise: 'multi',    tags: ['review', 'analysis'],               section: 'hidden-gem', publishedAt: '2026-05-12' },

// ════════════════════════════════════════════════════════════
// AH BRANDON REVIEWS — Episode Reviews & Reactions
// ════════════════════════════════════════════════════════════
{ id: 'FcpP1qdbz8k', title: 'WHITE ROOM STUDENT REVEALED - Classroom of the Elite S4 Ep 13', creatorId: 'ahbrandon', category: 'anime', franchise: 'cote',      tags: ['episode-review'],                   section: 'trending',   publishedAt: '2026-06-02' },
{ id: 'xQXd_TN8724', title: "AURA MONSTER IS HERE - Re:Zero S4 Ep 9 Has Me SHOOK",        creatorId: 'ahbrandon', category: 'anime', franchise: 're-zero',       tags: ['episode-review'],                   section: 'trending',   publishedAt: '2026-05-30' },
{ id: 'o82v-4ESYyA', title: "I CAN'T BELIEVE IT - Milim's Fate in TenSura S4 Ep 8 is INSANE", creatorId: 'ahbrandon', category: 'anime', franchise: 'tensura', tags: ['episode-review'],                   section: 'latest',     publishedAt: '2026-05-18' },
{ id: 'A8EAI0LJQg4', title: "I'M SPEECHLESS - Wistoria S2 Ep 8: The Death of Julius",     creatorId: 'ahbrandon', category: 'anime', franchise: 'wistoria',      tags: ['episode-review'],                   section: 'latest',     publishedAt: '2026-05-22' },
{ id: 'EhpuDkdxVlY', title: 'This World Is Forcing Myne to Become a Monster - Bookworm S4 Ep 8', creatorId: 'ahbrandon', category: 'anime', franchise: 'bookworm', tags: ['episode-review'],               section: 'featured',   publishedAt: '2026-05-20' },
{ id: 'udJYXRueI0w', title: "WHAT DID THEY DO?! - Daemons of the Shadow Realm Ep 9",      creatorId: 'ahbrandon', category: 'anime', franchise: 'multi',         tags: ['episode-review'],                   section: 'hidden-gem', publishedAt: '2026-05-16' },

// ════════════════════════════════════════════════════════════
// CHIBI REVIEWS — Anime News & Commentary
// ════════════════════════════════════════════════════════════
{ id: 'SeGTseOKl4A', title: 'People are Wanting Re Zero Season 4 CANCELED and Dropping It', creatorId: 'chibireviewsyt', category: 'anime', franchise: 're-zero', tags: ['industry', 'essay'],              section: 'trending',   publishedAt: '2026-05-28' },
{ id: 'Steb4F40jAQ', title: 'Attack on Titan Creator Calls out Crunchyroll for Blocking Them', creatorId: 'chibireviewsyt', category: 'anime', franchise: 'attack-on-titan', tags: ['industry'],        section: 'latest',     publishedAt: '2026-05-15' },
{ id: 'KYXQqwbIIJs', title: 'Crunchyroll Silences Japan and Blocks Them',                  creatorId: 'chibireviewsyt', category: 'anime', franchise: 'multi',    tags: ['industry'],                         section: 'featured',   publishedAt: '2026-05-01' },
{ id: 'hEWtWLzObYs', title: 'This Hurts Everyone and will Get Anime Banned',               creatorId: 'chibireviewsyt', category: 'anime', franchise: 'multi',    tags: ['industry', 'essay'],                section: 'hidden-gem', publishedAt: '2026-04-20' },

// ════════════════════════════════════════════════════════════
// REALLIFERYAN — Manga Deep Dives (Berserk)
// ════════════════════════════════════════════════════════════
{ id: '0_Keq4SgSOI', title: 'BERSERK Revisited - Volume 17',                              creatorId: 'realliferyan', category: 'manga', franchise: 'berserk',    tags: ['manga-review', 'analysis'],         section: 'trending',   publishedAt: '2026-05-20' },
{ id: 'Ec9xELfuDwE', title: 'BERSERK Revisited - Volume 16',                              creatorId: 'realliferyan', category: 'manga', franchise: 'berserk',    tags: ['manga-review', 'analysis'],         section: 'latest',     publishedAt: '2026-05-06' },
{ id: 'c2kdmDkXtsc', title: 'BERSERK Revisited - Volume 15',                              creatorId: 'realliferyan', category: 'manga', franchise: 'berserk',    tags: ['manga-review', 'analysis'],         section: 'featured',   publishedAt: '2026-04-22' },
{ id: 'BeHuvNHwjNw', title: 'OBSESSION - Review',                                         creatorId: 'realliferyan', category: 'manga', franchise: 'berserk',    tags: ['review', 'hidden-gem-pick'],        section: 'hidden-gem', publishedAt: '2026-04-08' },

// ════════════════════════════════════════════════════════════
// TOTALLY NOT MARK — Manga & Anime Analysis
// ════════════════════════════════════════════════════════════
{ id: 'Sr2xo5dKDkc', title: 'JUJUTSU KAISEN: Culling Game - Blind Review',                creatorId: 'totallynotmark', category: 'manga', franchise: 'jjk',      tags: ['manga-review', 'analysis'],         section: 'trending',   publishedAt: '2026-04-15' },
{ id: 'Rr7-wlQhGKA', title: 'Chainsaw Man: A Massive Review',                             creatorId: 'totallynotmark', category: 'manga', franchise: 'chainsaw-man', tags: ['manga-review', 'analysis'],    section: 'featured',   publishedAt: '2025-12-10' },
{ id: 'Klv62b5X79c', title: "Dragon Ball Super's Remaster has A PROBLEM!",                creatorId: 'totallynotmark', category: 'anime', franchise: 'dragon-ball', tags: ['analysis', 'industry'],        section: 'latest',     publishedAt: '2026-05-28' },
{ id: 'eHVipx46Tw8', title: "Gohan's REAL Age (100% Canon)",                              creatorId: 'totallynotmark', category: 'anime', franchise: 'dragon-ball', tags: ['lore', 'theory'],              section: 'hidden-gem', publishedAt: '2026-04-05' },
{ id: 'tLKYatfJOKM', title: 'Watching Avatar as an ADULT: Book Three (I CHANGED MY MIND)', creatorId: 'totallynotmark', category: 'anime', franchise: 'avatar',  tags: ['review', 'analysis'],             section: 'hidden-gem', publishedAt: '2026-05-20' },
{ id: 'KN0pEQgkg8g', title: 'Watching Avatar as an ADULT: Book Two (TOPH HYPE!!!)',        creatorId: 'totallynotmark', category: 'anime', franchise: 'avatar',   tags: ['review', 'analysis'],             section: 'hidden-gem', publishedAt: '2026-04-28' },

// ════════════════════════════════════════════════════════════
// ANIME BALLS DEEP — Lore & Story Analysis (Tensura, One Piece)
// ════════════════════════════════════════════════════════════
{ id: 'gvjoXIawoRE', title: 'The Fight That Changed RIMURU FOREVER | The ENTIRE Yuuki Kagurazaka Story (TENSURA)', creatorId: 'animeballsdeep', category: 'anime', franchise: 'tensura',  tags: ['lore', 'character-analysis'],       section: 'trending',   publishedAt: '2026-05-15' },
{ id: 'ov7rqWJlB1s', title: "Rimuru's FINAL VOLUME GOD MODE Evolution & All 12 Transformations Explained | Tensura + Novels", creatorId: 'animeballsdeep', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'power-scaling', 'ln-review'], section: 'trending', publishedAt: '2026-05-01' },
{ id: 'QV0zsL7Gero', title: "BROOK'S AWAKENING IS BROKEN! Oda Just Revealed The Straw Hats DEATH GOD!", creatorId: 'animeballsdeep', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'power-scaling'], section: 'latest', publishedAt: '2026-05-28' },
{ id: 'B8550zQM8Ug', title: 'LUFFY GEAR 6 Training IS INSANE! The Moon Arc is Here! One Piece', creatorId: 'animeballsdeep', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'lore'],          section: 'latest',     publishedAt: '2026-05-18' },
{ id: 'xGVVM5aE98I', title: "The TERRIFYING Truth About Will's TRUE Power & Identity | Wistoria Complete Story", creatorId: 'animeballsdeep', category: 'anime', franchise: 'wistoria', tags: ['lore', 'character-analysis'],     section: 'featured',   publishedAt: '2026-04-25' },
{ id: 'yP7URdKC64Y', title: "The TERRIFYING Truth About Qifrey's Identity & Power | Witch Hat Atelier Complete Story", creatorId: 'animeballsdeep', category: 'anime', franchise: 'witch-hat', tags: ['lore', 'character-analysis'], section: 'featured', publishedAt: '2026-04-10' },
{ id: 'fnC7I_-Uw84', title: 'Bad News For Naruto & Sasuke - Boruto Is Running Out Of Time | Two Blue Vortex Ch 34', creatorId: 'animeballsdeep', category: 'manga', franchise: 'naruto', tags: ['chapter-review', 'lore'],        section: 'hidden-gem', publishedAt: '2026-03-30' },
{ id: 'eM7HEJOClXw', title: "ODA JUST MADE IMU TOO STRONG! Luffy & Loki Are FINISHED!",   creatorId: 'animeballsdeep', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'power-scaling'], section: 'hidden-gem', publishedAt: '2026-05-05' },

// ════════════════════════════════════════════════════════════
// BOBSAMURAI — Hidden Gem & Classic Anime Reviews
// ════════════════════════════════════════════════════════════
{ id: 'wzNjhsstG4g', title: 'Worth a Watch? Terminator Zero: Season 1 - Spoiler Free Anime Review', creatorId: 'bobsamurai', category: 'anime', franchise: 'multi', tags: ['review', 'hidden-gem-pick'],       section: 'hidden-gem', publishedAt: '2026-01-10' },
{ id: 'ToTZ6ssJGT0', title: '3 Overlooked 2023 Anime - Suspense, Action, & Romance',      creatorId: 'bobsamurai', category: 'anime', franchise: 'multi',          tags: ['ranking', 'hidden-gem-pick'],       section: 'hidden-gem', publishedAt: '2025-11-20' },
{ id: 'kQnPK4H7_M8', title: 'Migi & Dali - When Originality & Creativity Get Overlooked', creatorId: 'bobsamurai', category: 'anime', franchise: 'multi',          tags: ['review', 'hidden-gem-pick'],        section: 'hidden-gem', publishedAt: '2025-10-15' },
{ id: '-FkMyZn5jeE', title: 'Soul Hunter 1999 - Refreshing & Under Appreciated - Anime Review', creatorId: 'bobsamurai', category: 'anime', franchise: 'multi',   tags: ['review', 'hidden-gem-pick'],        section: 'hidden-gem', publishedAt: '2026-03-05' },
{ id: 'Vbk9dqeMfV0', title: 'Genshi Shounen Ryu - Remarkably Exciting, Unremarkably Dull', creatorId: 'bobsamurai', category: 'anime', franchise: 'multi',         tags: ['review', 'hidden-gem-pick'],        section: 'hidden-gem', publishedAt: '2026-02-14' },
// ════════════════════════════════════════════════════════════
// TEKKING101 — One Piece Weekly Coverage
// ════════════════════════════════════════════════════════════
{ id: '-CWXhC8p6Ec', title: 'One Piece Chapter 1159 Review "Day of Reckoning"', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'lore'], section: 'trending', publishedAt: '2026-06-01' },
{ id: 'x50PBzO8ttI', title: 'One Piece Chapter 1158 Review "The Eve of God Valley"', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'theory'], section: 'trending', publishedAt: '2026-05-25' },
{ id: 'bogAWIQAndI', title: 'One Piece Chapter 1157 Review "A Rock & A Hard Place"', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'fight-breakdown'], section: 'latest', publishedAt: '2026-05-18' },
{ id: 'nJOgWeUbgA0', title: 'One Piece Chapter 1156 Review "The Absolute Strongest"', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'power-scaling'], section: 'latest', publishedAt: '2026-05-11' },
{ id: 'CriPzPq0bUY', title: 'The Ultimate Weapon of The World Government | One Piece Discussion', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['theory', 'lore'], section: 'featured', publishedAt: '2026-04-20' },
{ id: 'xXDq39psRM4', title: 'The JoyBoy Prophecy & The Time Fruit | One Piece Theory', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['lore', 'theory'], section: 'hidden-gem', publishedAt: '2026-03-10' },

// ════════════════════════════════════════════════════════════
// YABOYРOSHI — Seasonal Episode Reactions
// ════════════════════════════════════════════════════════════
{ id: 'w0fBTj-2PwQ', title: 'Who Are You? | Re: Zero S4 Ep 8 Reaction', creatorId: 'yaboyRoshi', category: 'anime', franchise: 're-zero', tags: ['episode-review'], section: 'trending', publishedAt: '2026-05-30' },
{ id: '3iMGg_xGeI0', title: 'Re: Zero S4 Ep 7 Reaction', creatorId: 'yaboyRoshi', category: 'anime', franchise: 're-zero', tags: ['episode-review'], section: 'latest', publishedAt: '2026-05-23' },
{ id: 'i-Ph1Lg7w3k', title: 'THE LAW GOT HANDS!! | Jujutsu Kaisen S3 Ep 9 Reaction', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'jjk', tags: ['episode-review', 'fight-breakdown'], section: 'trending', publishedAt: '2026-05-20' },
{ id: 'zycRBxsIgi8', title: 'MEGUMI UNLOCKED!!! | JuJutsu Kaisen Ep 23 Reaction', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'jjk', tags: ['episode-review'], section: 'latest', publishedAt: '2026-05-13' },
{ id: 'Go67KU89jEA', title: 'A | Bleach: TYBW Ep 27 Reaction [Ep 393]', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'bleach', tags: ['episode-review', 'fight-breakdown'], section: 'featured', publishedAt: '2026-05-05' },
{ id: 'hbG5rgaehDo', title: 'Conspiracy | Dragonball Daima Ep 1 Reaction', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'dragon-ball', tags: ['episode-review'], section: 'hidden-gem', publishedAt: '2026-04-18' },

// ════════════════════════════════════════════════════════════
// FOXEN ANIME — Light Novel Deep Dives
// ════════════════════════════════════════════════════════════
{ id: 'r2beyAdfx4Q', title: 'OVERLORD in A Nutshell', creatorId: 'foxenAnime', category: 'anime', franchise: 'overlord', tags: ['analysis', 'lore'], section: 'trending', publishedAt: '2026-05-28' },
{ id: 'oeY3OUlphLw', title: 'Foxen BEST Anime of 2025! INSANE YEAR', creatorId: 'foxenAnime', category: 'anime', franchise: 'multi', tags: ['ranking', 'season-roundup'], section: 'featured', publishedAt: '2026-04-15' },
{ id: 'G2sjTTGvRaU', title: 'Why Are Upper Moon Demons So OVERPOWERED? (Demon Slayer)', creatorId: 'foxenAnime', category: 'anime', franchise: 'demon-slayer', tags: ['power-scaling', 'analysis'], section: 'trending', publishedAt: '2026-05-10' },
{ id: 'TsY-4Xt3Kzc', title: 'Goodbye! My Attack on Titan Finale REACTION', creatorId: 'foxenAnime', category: 'anime', franchise: 'attack-on-titan', tags: ['review', 'essay'], section: 'featured', publishedAt: '2026-03-22' },
{ id: 'cJuD3kC2j8U', title: 'Am I Watching TOO Much Trash Anime? | Foxen Anime', creatorId: 'foxenAnime', category: 'anime', franchise: 'multi', tags: ['essay', 'industry'], section: 'hidden-gem', publishedAt: '2026-02-28' },
{ id: 'jpcysFeRh2g', title: 'Forgotten Darker Anime That NEED Another Season', creatorId: 'foxenAnime', category: 'anime', franchise: 'multi', tags: ['ranking', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2026-04-05' },

// ════════════════════════════════════════════════════════════
// THE CANIPA EFFECT — Production Analysis
// ════════════════════════════════════════════════════════════
{ id: 'sfeZrH4ERL8', title: "I'm Ending The Canipa Effect (kinda)", creatorId: 'canipa', category: 'anime', franchise: 'multi', tags: ['industry', 'analysis'], section: 'trending', publishedAt: '2026-05-15' },
{ id: '7guCSs-gQs4', title: 'The Two Sides of Studio MAPPA | Anime Studio Spotlight', creatorId: 'canipa', category: 'anime', franchise: 'multi', tags: ['industry', 'analysis'], section: 'featured', publishedAt: '2026-04-08' },
{ id: 'geoPk_Cs9oo', title: "Breaking Down Frieren: Beyond Journey's End Animation", creatorId: 'canipa', category: 'anime', franchise: 'frieren', tags: ['industry', 'analysis'], section: 'featured', publishedAt: '2026-03-15' },
{ id: 'IWZxZfwszfM', title: 'The Strange Production of the FATE/STRANGE FAKE Anime | Animation Spotlight', creatorId: 'canipa', category: 'anime', franchise: 'multi', tags: ['industry', 'analysis'], section: 'hidden-gem', publishedAt: '2026-01-20' },

// ════════════════════════════════════════════════════════════
// SAWYER7MAGE — Bleach & Shonen Analysis
// ════════════════════════════════════════════════════════════
{ id: '4_3s8fQh7oo', title: 'Goodbye to One Piece', creatorId: 'sawyerGaming', category: 'manga', franchise: 'one-piece', tags: ['essay', 'analysis'], section: 'trending', publishedAt: '2026-05-25' },
{ id: 'ef1dsM_ef20', title: 'A Spoilery Look at All Four Ancient Weapons in One Piece', creatorId: 'sawyerGaming', category: 'manga', franchise: 'one-piece', tags: ['lore', 'theory'], section: 'featured', publishedAt: '2026-04-28' },
{ id: 'JQK8nH2_Zjw', title: "The Truth About Joy Boy's Death | One Piece", creatorId: 'sawyerGaming', category: 'manga', franchise: 'one-piece', tags: ['lore', 'theory'], section: 'hidden-gem', publishedAt: '2026-03-30' },
{ id: '4m_D6U_UN30', title: 'We Finally Know the Location of the Last Road Poneglyph | One Piece', creatorId: 'sawyerGaming', category: 'manga', franchise: 'one-piece', tags: ['lore', 'analysis'], section: 'hidden-gem', publishedAt: '2026-04-15' },
{ id: 'IZ6Grf3QpZQ', title: 'Zoro Will Not be the Same After This | One Piece', creatorId: 'sawyerGaming', category: 'manga', franchise: 'one-piece', tags: ['character-analysis', 'analysis'], section: 'latest', publishedAt: '2026-05-18' },

// ════════════════════════════════════════════════════════════
// ANIMEUPROAR — Naruto / Boruto Coverage
// ════════════════════════════════════════════════════════════
{ id: 'GtJbVmuvYpo', title: 'Boruto becomes the STRONGEST! The DEATH of Naruto and Sasuke Foreshadowed!', creatorId: 'animeUproar', category: 'manga', franchise: 'naruto', tags: ['chapter-review', 'theory'], section: 'trending', publishedAt: '2026-06-01' },
{ id: 'kDIwUgiKgIU', title: "The TRAGIC Fate of Naruto and Sasuke! Boruto TIME SKIP & END GAME!", creatorId: 'animeUproar', category: 'manga', franchise: 'naruto', tags: ['chapter-review', 'lore'], section: 'latest', publishedAt: '2026-05-05' },
{ id: '284ro7bpHVM', title: 'All 12 Otsutsuki Clan Members and Their Powers Explained! (Naruto / Boruto)', creatorId: 'animeUproar', category: 'anime', franchise: 'naruto', tags: ['power-scaling', 'lore'], section: 'featured', publishedAt: '2026-04-10' },
{ id: 'fDQQM4Ck2Rs', title: 'Boruto just SHOCKED EVERYONE! The END of Naruto and Sasuke?!', creatorId: 'animeUproar', category: 'anime', franchise: 'naruto', tags: ['character-analysis', 'analysis'], section: 'hidden-gem', publishedAt: '2026-03-01' },

// ════════════════════════════════════════════════════════════
// MANGARAMEN — Classic & Literary Manga
// ════════════════════════════════════════════════════════════
{ id: 'ZKbp1sB3Ef8', title: 'I lost control of this Vinland Saga review.', creatorId: 'totallynotmark', category: 'manga', franchise: 'multi', tags: ['manga-review', 'analysis'], section: 'trending', publishedAt: '2026-05-22' },
{ id: 'QFlijeqPJ_4', title: 'Dandadan: A Totally Blind Review', creatorId: 'totallynotmark', category: 'manga', franchise: 'multi', tags: ['manga-review', 'analysis'], section: 'featured', publishedAt: '2026-04-18' },
{ id: 'x0Bi24d9wx0', title: "Every Change in Dragon Ball Super's Remaster", creatorId: 'totallynotmark', category: 'manga', franchise: 'dragon-ball', tags: ['analysis', 'essay'], section: 'hidden-gem', publishedAt: '2026-03-25' },
{ id: 'bJ73yC3iUFU', title: 'Who BROKE One Punch Man?', creatorId: 'totallynotmark', category: 'manga', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2026-02-10' },

// ════════════════════════════════════════════════════════════
// OTAKU THERAPY — Frieren & Thoughtful Manga
// ════════════════════════════════════════════════════════════
{ id: 'r14QdM9wMGs', title: 'Jujutsu Kaisen has a CONFIDENCE Problem', creatorId: 'totallynotmark', category: 'manga', franchise: 'jjk', tags: ['manga-review', 'analysis'], section: 'trending', publishedAt: '2026-06-01' },
{ id: 'DCI01L2YGhg', title: 'Watching Avatar as an ADULT is... different', creatorId: 'totallynotmark', category: 'anime', franchise: 'avatar', tags: ['review', 'analysis'], section: 'featured', publishedAt: '2026-04-22' },
{ id: 'zytV1VVBQnc', title: 'Ranking EVERY Fight in Dragon Ball Z', creatorId: 'totallynotmark', category: 'manga', franchise: 'dragon-ball', tags: ['ranking', 'analysis'], section: 'featured', publishedAt: '2026-03-14' },
{ id: 'yPpgjEg028o', title: 'Ranking EVERY Fight in Dragon Ball', creatorId: 'totallynotmark', category: 'manga', franchise: 'dragon-ball', tags: ['ranking', 'analysis'], section: 'hidden-gem', publishedAt: '2026-05-10' },

// ════════════════════════════════════════════════════════════
// FOXCLOVER — Anime Essays (Frieren focus)
// ════════════════════════════════════════════════════════════
{ id: 'FJ8-7LXa-8A', title: 'Frieren Changed Me For The Better.', creatorId: 'gigguk', category: 'anime', franchise: 'frieren', tags: ['essay', 'analysis'], section: 'trending', publishedAt: '2026-05-18' },
{ id: 'a9zfJPu2BbE', title: 'This Genre Will Replace Isekai.', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['essay', 'analysis'], section: 'featured', publishedAt: '2026-04-01' },
{ id: 'N8cxqVgS18I', title: 'I Regret Watching This Anime.', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['essay', 'analysis'], section: 'hidden-gem', publishedAt: '2026-03-08' },

// ════════════════════════════════════════════════════════════
// ISEKAI EXPLAINED — LN Source Material Coverage
// ════════════════════════════════════════════════════════════
{ id: 'oBKp98O0MMY', title: 'Every Easter Egg In Isekai Quartet! Overlord, KonoSuba, Re:Zero References', creatorId: 'aninews', category: 'anime', franchise: 'overlord', tags: ['lore', 'analysis'], section: 'trending', publishedAt: '2026-05-20' },
{ id: '4n-CLKaO64k', title: 'What To Expect From The OVERLORD Movie & RE: ZERO Season 3 | Updates', creatorId: 'aninews', category: 'anime', franchise: 'overlord', tags: ['industry', 'analysis'], section: 'featured', publishedAt: '2026-04-28' },
{ id: 'rK4mC543Wyk', title: 'What Happened Between Subaru, Satella & The Witches | Re:Zero Cut Content', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'character-analysis'], section: 'latest', publishedAt: '2026-05-25' },
{ id: '63r3qB8loT4', title: 'The BEST Isekai Are Coming Back! Mushoku Tensei S3, Re:Zero S4 & GATE', creatorId: 'aninews', category: 'anime', franchise: 'multi', tags: ['industry', 'analysis'], section: 'hidden-gem', publishedAt: '2026-03-18' },

// ════════════════════════════════════════════════════════════
// NUXTAKU — Commentary & Community
// ════════════════════════════════════════════════════════════
{ id: 'I2YsJ0uyrG0', title: 'Why I HATE Crunchyroll | Nux Taku', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['essay', 'industry'], section: 'trending', publishedAt: '2026-05-28' },
{ id: 'Pe5xM_mESPY', title: 'Every Anime Controversy Ever...', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['essay', 'industry'], section: 'hidden-gem', publishedAt: '2026-04-14' },

// ════════════════════════════════════════════════════════════
// EXISTING CREATOR BACKFILL — Sprint 5.2 additions
// ════════════════════════════════════════════════════════════

// Gigguk — Fall 2025 + Frieren
{ id: 'v7QXLK1fkn0', title: 'Fall Anime 2025 in a Nutshell', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['season-roundup'], section: 'latest', publishedAt: '2025-12-05' },
{ id: 'CcKF5576UIQ', title: 'Summer Anime 2025 in a Nutshell', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['season-roundup'], section: 'featured', publishedAt: '2025-11-22' },

// Mother's Basement — Frieren OP/ED + JJK
{ id: 'A0j3KaH7vuA', title: 'The Problem With Power Fantasy Anime', creatorId: 'mothersbasement', category: 'anime', franchise: 'multi', tags: ['analysis', 'essay'], section: 'featured', publishedAt: '2025-10-30' },
{ id: 'J-dqcS9qO0s', title: "JJK's New OP Hits Like a Bomb", creatorId: 'mothersbasement', category: 'anime', franchise: 'jjk', tags: ['analysis'], section: 'trending', publishedAt: '2026-04-05' },

// Totally Not Mark — Frieren + Bleach
{ id: 'LY0DmaWrKEM', title: "Everything You Need to Know about Dragon Ball Super's RETURN!", creatorId: 'totallynotmark', category: 'manga', franchise: 'dragon-ball', tags: ['manga-review', 'analysis'], section: 'featured', publishedAt: '2026-03-01' },
{ id: 'pukv8kBtk-g', title: 'Why FANS had to FIX Dragon Ball Z', creatorId: 'totallynotmark', category: 'manga', franchise: 'dragon-ball', tags: ['review', 'analysis'], section: 'featured', publishedAt: '2025-11-18' },
{ id: '9yoge8iZsH0', title: 'Top 20 Fights in Dragon Ball History', creatorId: 'totallynotmark', category: 'anime', franchise: 'dragon-ball', tags: ['ranking', 'analysis'], section: 'hidden-gem', publishedAt: '2026-02-14' },

// Anime Balls Deep — Overlord + Frieren LN
{ id: 'quBRM71-iuI', title: 'All 7 Sages of Destruction and Their Powers Explained! Frieren', creatorId: 'animeballsdeep', category: 'anime', franchise: 'frieren', tags: ['lore', 'character-analysis'], section: 'trending', publishedAt: '2026-05-22' },
{ id: 'GQjPRgOpnFU', title: "Every Sin's FATE in the Sequel EXPLAINED! Seven Deadly Sins", creatorId: 'animeballsdeep', category: 'anime', franchise: 'multi', tags: ['lore', 'analysis'], section: 'featured', publishedAt: '2026-04-30' },

// Glass Reflection — Bleach + JJK
{ id: 'BkmGxph2rOg', title: 'So I watched Demon Slayer: Infinity Castle...', creatorId: 'glassreflection', category: 'anime', franchise: 'demon-slayer', tags: ['review', 'analysis'], section: 'featured', publishedAt: '2026-03-28' },
{ id: 'XAf0mBjpdyQ', title: 'The Solo Leveling Review (S1+S2) | Glass Reflection', creatorId: 'glassreflection', category: 'anime', franchise: 'multi', tags: ['review', 'season-roundup'], section: 'latest', publishedAt: '2026-04-15' },

// The Anime Man — Overlord LN + Mushoku Tensei
{ id: '6OqnOcqmbWI', title: 'Why Should You Even Care About Music in Anime?', creatorId: 'theanimeman', category: 'anime', franchise: 'multi', tags: ['essay', 'industry'], section: 'featured', publishedAt: '2026-03-20' },
{ id: 'Jmv-5nv2Lp8', title: 'The ENTIRE History of Manga, Explained', creatorId: 'theanimeman', category: 'manga', franchise: 'multi', tags: ['essay', 'analysis'], section: 'hidden-gem', publishedAt: '2026-02-10' },



// ════════════════════════════════════════════════════════════
// SPRINT 5.3 — PRIORITY 2 ADDITIONS
// Latest section backfill (7 creators), Demon Slayer activation,
// Evangelion activation, schema comment note added inline
// ════════════════════════════════════════════════════════════

// ── CATEGORY NOTE ──────────────────────────────────────────
// The 'category' field on a video describes the MEDIUM being
// DISCUSSED IN THE VIDEO, not the franchise's source medium.
// e.g. A video reviewing the Frieren ANIME adaptation uses
//      category:'anime' even though franchise 'frieren' is
//      classified as category:'manga' in franchises.js.
//      Both are correct — they describe different things.
// ────────────────────────────────────────────────────────────

// ── THE ANIME MAN — Latest additions ──
{ id: 'RrCknp6o9k4', title: 'I Watched the 100 WORST RATED ANIME So You Dont Have To', creatorId: 'theanimeman', category: 'anime', franchise: 'multi', tags: ['review', 'ranking'], section: 'latest', publishedAt: '2026-05-28' },
{ id: 'f4OkSTbQlwU', title: 'I Asked Anime Fans for their MOST INSANE Opinions...', creatorId: 'theanimeman', category: 'anime', franchise: 'multi', tags: ['essay', 'review'], section: 'latest', publishedAt: '2026-06-02' },

// ── FOXEN ANIME — Latest additions ──
{ id: 'qzjOjngE2os', title: 'So Attack on Titan dropped another FINAL Trailer', creatorId: 'foxenAnime', category: 'anime', franchise: 'attack-on-titan', tags: ['industry', 'analysis'], section: 'latest', publishedAt: '2026-06-01' },
{ id: '5-dOKe6cdPs', title: 'This Anime Season is INSANE', creatorId: 'foxenAnime', category: 'anime', franchise: 'multi', tags: ['season-roundup', 'ranking'], section: 'latest', publishedAt: '2026-05-20' },

// ── THE CANIPA EFFECT — Latest additions ──
{ id: '4wDMyajuesM', title: "Breaking Down TENGOKU-DAIMAKYO's Incredible Animation | Animation Spotlight", creatorId: 'canipa', category: 'anime', franchise: 'multi', tags: ['industry', 'analysis'], section: 'latest', publishedAt: '2026-05-30' },
{ id: 'FcU8txv6K5I', title: 'The NIER: AUTOMATA ANIME Deserved Better | Animation Spotlight', creatorId: 'canipa', category: 'anime', franchise: 'multi', tags: ['industry', 'analysis'], section: 'latest', publishedAt: '2026-05-12' },

// ── MANGARAMEN — Latest additions ──
{ id: 'YY4YVN8Vt7k', title: 'BERSERK Revisited - Volume 14', creatorId: 'realliferyan', category: 'manga', franchise: 'berserk', tags: ['manga-review', 'analysis'], section: 'latest', publishedAt: '2026-06-02' },
{ id: 'KiLPuPPAPws', title: 'BERSERK Revisited - Volume 13', creatorId: 'realliferyan', category: 'manga', franchise: 'berserk', tags: ['manga-review', 'analysis'], section: 'latest', publishedAt: '2026-05-18' },

// ── OTAKU THERAPY — Latest additions ──
{ id: 'fFQBcspzAHg', title: 'Ranking EVERY Fight in Dragon Ball Super', creatorId: 'totallynotmark', category: 'manga', franchise: 'dragon-ball', tags: ['ranking', 'analysis'], section: 'latest', publishedAt: '2026-06-03' },
{ id: 'JpToO7Nd01A', title: 'Vagabond — Is Inoue Ever Coming Back? A Status Report', creatorId: 'otakuTherapy', category: 'manga', franchise: 'vagabond', tags: ['manga-review', 'essay'], section: 'latest', publishedAt: '2026-05-22' },

// ── FOXCLOVER — Latest additions ──
{ id: 'hxL_bLOWgNI', title: 'Anime Doesn’t Get Better Than This.', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['essay', 'analysis'], section: 'latest', publishedAt: '2026-05-28' },
{ id: 'KSxwx4EOZzk', title: 'When An Anime Leaves You Speechless 2', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['essay', 'analysis'], section: 'latest', publishedAt: '2026-05-14' },

// ── NUXTAKU — Latest additions ──
{ id: 'GPtHx-jWxMs', title: 'The NEW Official Top Anime List!', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['industry', 'essay'], section: 'latest', publishedAt: '2026-05-30' },
{ id: 'lsG_Ug0sC0k', title: 'Crunchyroll Anime Awards 2017 - Honest Anime Descriptions', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['season-roundup', 'ranking'], section: 'latest', publishedAt: '2026-06-01' },

// ════════════════════════════════════════════════════════════
// DEMON SLAYER — Franchise Activation (Sprint 5.3)
// ════════════════════════════════════════════════════════════
{ id: 'hIDuavzQfWE', title: 'Shiboyugi: A Spoiler Induced Rant.', creatorId: 'glassreflection', category: 'anime', franchise: 'multi', tags: ['review', 'essay'], section: 'trending', publishedAt: '2026-05-22' },
{ id: 'qUkxvTi06ww', title: 'Spring Anime 2025 In A Nutshell', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['season-roundup'], section: 'featured', publishedAt: '2026-04-12' },
{ id: '_x2VaIf9KPw', title: "Demon Slayer's Elegant Storytelling - What's in an OP?", creatorId: 'mothersbasement', category: 'anime', franchise: 'demon-slayer', tags: ['analysis'], section: 'featured', publishedAt: '2026-05-08' },
{ id: 'wQqnbPkdt5w', title: 'The Hashira Unite | Demon Slayer S4 Ep 8 Reaction', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'demon-slayer', tags: ['episode-review'], section: 'latest', publishedAt: '2026-05-18' },

// ════════════════════════════════════════════════════════════
// EVANGELION — Franchise Activation (Sprint 5.3)
// ════════════════════════════════════════════════════════════
{ id: '9Q93UZd5jCc', title: 'Why I Ran From Evangelion', creatorId: 'totallynotmark', category: 'anime', franchise: 'evangelion', tags: ['review', 'analysis'], section: 'featured', publishedAt: '2026-03-28' },
{ id: 'A5eog52Jsvg', title: "A Cruel Angel's Thesis Explained - What's in an OP? (Evangelion)", creatorId: 'mothersbasement', category: 'anime', franchise: 'evangelion', tags: ['analysis', 'essay'], section: 'featured', publishedAt: '2026-02-14' },
{ id: 'WAk1u5e9K7A', title: 'Winter Anime 2025 In A Nutshell', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['season-roundup'], section: 'hidden-gem', publishedAt: '2025-12-01' },
{ id: '6sFAZEcEhLw', title: 'I Asked 145,769 People to Vote for the BEST ANIME EVER', creatorId: 'theanimeman', category: 'anime', franchise: 'multi', tags: ['review', 'essay'], section: 'hidden-gem', publishedAt: '2026-01-15' },



// ════════════════════════════════════════════════════════════
// SPRINT 5.4 — LIGHT NOVEL VIDEO ADDITIONS (LN001–LN050)
// 50 videos with real YouTube IDs
// ════════════════════════════════════════════════════════════

// ── Major Light Novel Franchises ──
{ id: 'clXgbXf53Kc', title: 'That Time I Got Reincarnated as a Slime — Complete Power Guide', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'power-scaling'], section: 'featured', publishedAt: '2026-05-01' },
{ id: 'S2GpPfi86fw', title: 'Overlord — How Strong Is Ainz Ooal Gown? True Power Explained', creatorId: 'aninews', category: 'light-novel', franchise: 'overlord', tags: ['power-scaling', 'ln-review'], section: 'trending', publishedAt: '2026-05-05' },
{ id: 'apGqAAUH2aU', title: 'Re:Zero — Complete Season 2 Recap & Every Key Death Explained', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'ln-review'], section: 'trending', publishedAt: '2026-05-10' },
{ id: 'eCik7GTUvEc', title: 'Mushoku Tensei — Dark History of Demon Wars & Rudeus Full Story', creatorId: 'aninews', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['lore', 'ln-review'], section: 'featured', publishedAt: '2026-04-20' },
{ id: 'bgXukQt5hMM', title: "Mushoku Tensei — Paul's Full Story & His Reunion With Rudeus", creatorId: 'aninews', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['character-analysis', 'lore'], section: 'trending', publishedAt: '2026-04-15' },
{ id: 'BoCysCn0ZmU', title: 'The Eminence in Shadow — How Cid Was Isekai-ed & The Ending Explained', creatorId: 'aninews', category: 'light-novel', franchise: 'multi', tags: ['lore', 'ln-review'], section: 'featured', publishedAt: '2026-04-10' },
{ id: 'V6jxToNFBlc', title: 'That Time I Got Reincarnated as a Slime — How Magic Works Explained', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'analysis'], section: 'hidden-gem', publishedAt: '2026-04-05' },
{ id: 'RbNjQxwuwI0', title: 'The 10 Great Demon Lords In Tensura Explained — Demon Lord vs True Demon Lord', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'power-scaling'], section: 'featured', publishedAt: '2026-03-28' },
{ id: '-YT6BE4UX_0', title: 'The Eminence in Shadow — Why Cid Is The Most OP Isekai Protagonist', creatorId: 'aninews', category: 'light-novel', franchise: 'multi', tags: ['character-analysis', 'power-scaling'], section: 'trending', publishedAt: '2026-03-20' },
{ id: 'VsxbQ3h0xxc', title: "Overlord's World of Yggdrasil Explained — The DMMO-RPG & New World", creatorId: 'aninews', category: 'light-novel', franchise: 'overlord', tags: ['lore', 'ln-review'], section: 'trending', publishedAt: '2026-03-15' },

// ── Character Breakdown Videos ──
{ id: 'A9Y-qEyE3eU', title: 'Rimuru Tempest — Every OP Ultimate Skill & Ability Explained', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['character-analysis', 'power-scaling'], section: 'featured', publishedAt: '2026-03-10' },
{ id: 'eSXqrjsHAq0', title: 'Ainz Ooal Gown — True Power & What Makes Him Unbeatable', creatorId: 'aninews', category: 'light-novel', franchise: 'overlord', tags: ['character-analysis', 'power-scaling'], section: 'trending', publishedAt: '2026-03-05' },
{ id: 'tvjqMzwaaVw', title: 'Subaru Natsuki — The Aura Monster Transformation Explained', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['character-analysis', 'analysis'], section: 'trending', publishedAt: '2026-02-28' },
{ id: 'CE-6hRFuoFI', title: 'Rudeus Greyrat — True Power & Magic System Fully Explained', creatorId: 'aninews', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['character-analysis', 'power-scaling'], section: 'featured', publishedAt: '2026-02-20' },
{ id: 'DPkhqd3NaLs', title: 'How Ainz Accidentally Started A Cult — Overlord Hidden Character Moments', creatorId: 'aninews', category: 'light-novel', franchise: 'overlord', tags: ['character-analysis', 'lore'], section: 'trending', publishedAt: '2026-02-15' },
{ id: 'mDePH-0F2fc', title: 'How Strong Is Jaldabaoth Compared To Ainz — Overlord Power Analysis', creatorId: 'aninews', category: 'light-novel', franchise: 'overlord', tags: ['power-scaling', 'character-analysis'], section: 'featured', publishedAt: '2026-02-10' },
{ id: 'i_QBy0FPtmY', title: 'Rimuru Tempest — True Power Explained Part 1: Great Sage & Predator', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['character-analysis', 'power-scaling'], section: 'hidden-gem', publishedAt: '2026-02-05' },
{ id: '_00bz8Bnj5o', title: 'Rimuru Tempest — Powers, Skills & Abilities Explained Part 2', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['character-analysis', 'ln-review'], section: 'featured', publishedAt: '2026-01-28' },
{ id: 'UZllwRa7r5Q', title: 'Re:Zero Season 4 Episode 1 — The Mission To Finally Save Rem', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'ln-review'], section: 'hidden-gem', publishedAt: '2026-01-20' },
{ id: 'Yxsj3rSVa5I', title: 'Re:Zero — Who Killed Subaru? Season 4 Episode 8 Deep Dive', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['character-analysis', 'analysis'], section: 'featured', publishedAt: '2026-01-15' },

// ── Power Scaling & Rankings ──
{ id: 'MxgBRUm3RmY', title: 'How Diablo Became More Powerful Than A Demon Lord — Tensura Explained', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['power-scaling', 'character-analysis'], section: 'trending', publishedAt: '2026-01-10' },
{ id: 'A9EHURQHu-w', title: 'Hinata vs Veldora & The Enemy Infiltrating Tempest — Tensura Extra Cut', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['power-scaling', 'lore'], section: 'trending', publishedAt: '2026-01-05' },
{ id: 'al4Ix3V2wtI', title: "The Insane Evolution & Economics of Rimuru's Dungeon — Tensura LN", creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'analysis'], section: 'featured', publishedAt: '2025-12-28' },
{ id: 'D4v2h5VPZ88', title: 'The Terrifying Influence Of Rimuru & His Nation — Tensura Season 4', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['power-scaling', 'lore'], section: 'trending', publishedAt: '2025-12-20' },
{ id: 'L2sFXPc_-Aw', title: 'The Key Deaths That Shaped Subaru — Re:Zero Season 3 Deep Dive', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['character-analysis', 'analysis'], section: 'trending', publishedAt: '2025-12-15' },
{ id: 'N_btfSHOdb8', title: "Subaru's Most Insane Loop Was Darker Than You Think — Re:Zero LN", creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'character-analysis'], section: 'hidden-gem', publishedAt: '2025-12-10' },
{ id: 'GrH5x7dZjq8', title: 'The Level 100 Opponent That Made Ainz Panic — Overlord Movie Cut Content', creatorId: 'aninews', category: 'light-novel', franchise: 'overlord', tags: ['power-scaling', 'lore'], section: 'hidden-gem', publishedAt: '2025-12-05' },
{ id: 'LTS1MblNzsU', title: 'The Best Anime Episode of All Time — A Re:Zero Essay', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['essay', 'analysis'], section: 'featured', publishedAt: '2025-11-28' },
{ id: 'opqSugr297k', title: 'Overlord Season 1 Cut Content — What Did The Anime Change?', creatorId: 'aninews', category: 'light-novel', franchise: 'overlord', tags: ['ln-review', 'analysis'], section: 'trending', publishedAt: '2025-11-20' },
{ id: 'IiMlMuu0kYU', title: 'The Crazy Demands That Pushed Rimuru Over The Edge — Tensura LN', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'character-analysis'], section: 'trending', publishedAt: '2025-11-15' },

// ── Lore & Worldbuilding ──
{ id: 'PWNfExw77ho', title: "Shaula's Deadly Secrets & Subaru's Mission — Re:Zero LN Lore", creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'ln-review'], section: 'featured', publishedAt: '2025-11-10' },
{ id: '9aTUr_3SgzM', title: 'Re:Zero — Butterfly Dream: The Lust IF Story Explained', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'analysis'], section: 'featured', publishedAt: '2025-11-05' },
{ id: 'rJv6-GMWOPc', title: 'Mushoku Tensei — A Deep Look Into the World History Lore', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['lore', 'ln-review'], section: 'trending', publishedAt: '2025-10-28' },
{ id: 'zokh4jDW_20', title: "Mushoku Tensei — The Inevitable Conflict You Should Know About", creatorId: 'aninews', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['character-analysis', 'lore'], section: 'featured', publishedAt: '2025-10-20' },
{ id: '3UuR5iYJ6GU', title: 'The Most Evil Enemy Rimuru Has Faced Yet — Tensura LN Story', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'ln-review'], section: 'featured', publishedAt: '2025-10-15' },
{ id: 'DPTvWczQXhc', title: 'Re:Zero — The Brutal Twist That Changes Everything For Subaru', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'character-analysis'], section: 'trending', publishedAt: '2025-10-10' },
{ id: '_OYNVHkTrxc', title: 'The Huge Secret Connecting Shaula & Flugel To Subaru — Re:Zero LN', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'theory'], section: 'hidden-gem', publishedAt: '2025-10-05' },
{ id: '5d26gIfMN68', title: 'Re:Zero — Oboreru: The Wrath IF Story Fully Explained', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'analysis'], section: 'featured', publishedAt: '2025-09-28' },
{ id: 'mGVgH2kjnAw', title: 'Re:Zero — Ayamatsu: The Pride IF Story Explained', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'analysis'], section: 'hidden-gem', publishedAt: '2025-09-20' },
{ id: 'CwAuu8GAMQw', title: "Rimuru's Next War Begins — Tensura LN Season 4 Episode 1 Story", creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'ln-review'], section: 'trending', publishedAt: '2025-09-15' },

// ── Discovery & Recommendation Videos ──
{ id: '_OLyeDp73x0', title: 'Re:Zero Season 3 Full Recap — Everything You Need To Know For S4', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'ln-review'], section: 'featured', publishedAt: '2025-09-10' },
{ id: 'Ynu3ORNECik', title: "Re:Zero — The Humiliating Defeat Subaru Knew Would Break Julius", creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['character-analysis', 'lore'], section: 'trending', publishedAt: '2025-09-05' },
{ id: '8y8mFFboN0k', title: "Re:Zero — Subaru's First Deaths Of The New Season In The Novel", creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['ln-review', 'lore'], section: 'featured', publishedAt: '2025-08-28' },
{ id: '9Kdig8Gym14', title: 'The Fools Who Dared To Disrespect Rimuru — Tensura S4 LN Story', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'ln-review'], section: 'featured', publishedAt: '2025-08-20' },
{ id: 'h1BC2VBI-Lk', title: 'The Fools Trying To Destroy Rimuru & Milim — Tensura LN Cut Content', creatorId: 'aninews', category: 'light-novel', franchise: 'tensura', tags: ['lore', 'ln-review'], section: 'hidden-gem', publishedAt: '2025-08-15' },
{ id: 'UoFp_t3CjX8', title: 'Re:Zero — The Disturbing Death That Broke Subaru All Over Again', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['character-analysis', 'lore'], section: 'trending', publishedAt: '2025-08-10' },
{ id: '1i0BvgUldWY', title: 'Re:Zero — How Subaru Turned Into An Aura Monster Explained', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['character-analysis', 'analysis'], section: 'hidden-gem', publishedAt: '2025-08-05' },
{ id: 'FwRg2oxNcb0', title: 'Re:Zero Complete Recap — Everything You Need To Know', creatorId: 'aninews', category: 'light-novel', franchise: 're-zero', tags: ['ln-review', 'lore'], section: 'featured', publishedAt: '2025-07-28' },
{ id: 'aJtg4yX_uWE', title: 'Re:Zero — What Happened To Subaru? Season 4 Episode 7 Deep Dive', creatorId: 'echidnut', category: 'light-novel', franchise: 're-zero', tags: ['lore', 'analysis'], section: 'latest', publishedAt: '2026-05-25' },
{ id: 'gWBdRBQQa7M', title: 'Sentenced To Be A Hero Finale — The Dark Truth Behind Being A Hero', creatorId: 'aninews', category: 'light-novel', franchise: 'multi', tags: ['lore', 'ln-review'], section: 'hidden-gem', publishedAt: '2026-04-30' },

  // ════════════════════════════════════════════════════════════
  // SPRINT 5.5 — ROMANCE, SLICE OF LIFE & COMEDY ADDITIONS
  // Genres: romance, slice-of-life, comedy — across anime, manga, light-novel
  // ════════════════════════════════════════════════════════════

  // ── ANIME — ROMANCE ──────────────────────────────────────────
  { id: 'o31VNNrasbE', title: 'She Doesn\'t Love You.', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['essay', 'review'], section: 'trending', publishedAt: '2021-08-10' },
{ id: '5lJaKoMf6As', title: 'The Perfect Anime', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['essay', 'analysis'], section: 'featured', publishedAt: '2020-07-28' },
{ id: 'lYWpeAUiFCo', title: 'The Unrivalled Genius of Kaguya-Sama: Love Is War', creatorId: 'mothersbasement', category: 'anime', franchise: 'multi', tags: ['analysis', 'essay'], section: 'featured', publishedAt: '2019-07-21' },
{ id: 'SsI9KE7GBzQ', title: 'Why We Love My Dress-Up Darling', creatorId: 'mothersbasement', category: 'anime', franchise: 'multi', tags: ['analysis', 'review'], section: 'hidden-gem', publishedAt: '2022-04-15' },
{ id: 'M1YVw_ispK4', title: 'GR Anime Review: My Teen Romantic Comedy SNAFU', creatorId: 'glassreflection', category: 'anime', franchise: 'multi', tags: ['review'], section: 'hidden-gem', publishedAt: '2013-10-05' },
{ id: '2D1dCIqB_UE', title: 'So I\'m Watching My Dress Up Darling...', creatorId: 'glassreflection', category: 'anime', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2022-03-28' },
{ id: 'btq0VKk8raY', title: 'Making The ULTIMATE Romance Anime Tier List (ft. Emirichu & Daidus)', creatorId: 'theanimeman', category: 'anime', franchise: 'multi', tags: ['ranking', 'review'], section: 'trending', publishedAt: '2019-06-22' },
{ id: 'batGbkibi8s', title: 'The Hilarious Beauty of Kaguya-sama: Love is War', creatorId: 'ahbrandon', category: 'anime', franchise: 'multi', tags: ['review', 'analysis'], section: 'featured', publishedAt: '2022-07-14' },
{ id: 'CjFjbAwJwwc', title: 'Goodbye Horimiya! Did Best Romance Anime Deliver? Horimiya Finale', creatorId: 'foxenAnime', category: 'anime', franchise: 'multi', tags: ['review', 'season-roundup'], section: 'trending', publishedAt: '2021-03-27' },
{ id: 'QjCd-90c8no', title: 'The Garden of Words - Romance - Anime Review #38', creatorId: 'bobsamurai', category: 'anime', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2015-08-10' },

  // ── ANIME — SLICE OF LIFE ────────────────────────────────────
{ id: 'i2JRMfqvQj0', title: 'What\'s in an OP? \u2013 How Nichijou Gets You Ready to Laugh', creatorId: 'mothersbasement', category: 'anime', franchise: 'multi', tags: ['analysis', 'essay'], section: 'hidden-gem', publishedAt: '2017-08-12' },
{ id: 'QeMqqqOEf0A', title: 'Why you Need Nichijou in your Life | GR Anime Review', creatorId: 'glassreflection', category: 'anime', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2021-07-15' },
{ id: '7qZmSeZsEnI', title: 'Anime to Watch When Life Has Got You Down | Glass Reflection', creatorId: 'glassreflection', category: 'anime', franchise: 'multi', tags: ['ranking', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2020-04-18' },
{ id: 'pAM6mBHNRcQ', title: 'The Anime That\'s Chill, Fluffy, and Upbeat\u2026 Until It\'s Not.', creatorId: 'glassreflection', category: 'anime', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'latest', publishedAt: '2025-11-10' },
{ id: 'ecjr4jLwTQE', title: 'Top 5 Funniest Slice-of-life Anime Series Ever', creatorId: 'theanimeman', category: 'anime', franchise: 'multi', tags: ['ranking', 'hidden-gem-pick'], section: 'featured', publishedAt: '2016-04-02' },
{ id: 'qu5hcev_R4A', title: 'Top 10 Mature Slice of Life Anime', creatorId: 'bobsamurai', category: 'anime', franchise: 'multi', tags: ['ranking', 'hidden-gem-pick'], section: 'featured', publishedAt: '2016-10-22' },
{ id: '1FSWoZJoV1c', title: 'Genshiken Anime & Manga - Slice of Life, Comedy Anime Review', creatorId: 'bobsamurai', category: 'anime', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2014-02-14' },

  // ── ANIME — COMEDY ──────────────────────────────────────────
{ id: '-KQBCsDSNr8', title: 'What\'s in an OP? - Konosuba\'s Lovable Idiots', creatorId: 'mothersbasement', category: 'anime', franchise: 'multi', tags: ['analysis', 'essay'], section: 'hidden-gem', publishedAt: '2018-03-05' },
{ id: 'dQiwNdadEsY', title: 'Funniest Anime You Have NOT Seen | Hidden & Best Comedy Anime', creatorId: 'foxenAnime', category: 'anime', franchise: 'multi', tags: ['ranking', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2021-09-08' },
{ id: 'E-7rKdlkDR4', title: 'What if Konosuba Was Chill', creatorId: 'mothersbasement', category: 'anime', franchise: 'multi', tags: ['analysis', 'essay'], section: 'hidden-gem', publishedAt: '2020-11-14' },

  // ── MANGA — ROMANCE / SLICE OF LIFE / COMEDY ─────────────────
{ id: '8eXSXksUS7A', title: 'Top 5 Romance Anime of All Time! - Viewer Choice | BobSamurai Reviews', creatorId: 'bobsamurai', category: 'manga', franchise: 'multi', tags: ['ranking', 'review'], section: 'trending', publishedAt: '2013-02-13' },
{ id: 'nAGQ-nvk104', title: 'My Little Monster - Romance Comedy - Anime Review #89', creatorId: 'bobsamurai', category: 'manga', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2016-07-18' },
{ id: 'SQfHRrIh9kA', title: 'The World God Only Knows - Romance Comedy Review', creatorId: 'bobsamurai', category: 'manga', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2014-06-25' },
{ id: 'AwNevpfQDOg', title: 'Anime Review: Mysterious Girlfriend X - Romance, Comedy | BobSamurai Reviews', creatorId: 'bobsamurai', category: 'manga', franchise: 'multi', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2015-10-10' },

  // ── LIGHT NOVEL — ROMANCE / SLICE OF LIFE / COMEDY ───────────
{ id: 'Mr_khwOmTuQ', title: 'Mushoku Tensei = Anime of The Year.', creatorId: 'echidnut', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['ln-review', 'analysis'], section: 'featured', publishedAt: '2021-06-25' },
{ id: 'VxIypPO5AdA', title: 'Frieren vs Mushoku Tensei', creatorId: 'echidnut', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['analysis', 'essay'], section: 'trending', publishedAt: '2024-03-18' },
{ id: 'CICdWFyiNU8', title: 'The New Isekai That Changed The Game (My Life as a Villainess)', creatorId: 'manimeMatt', category: 'light-novel', franchise: 'multi', tags: ['ln-review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2021-11-05' },
{ id: '-6RFln08ox0', title: 'Classroom of The Elite and Escapism', creatorId: 'manimeMatt', category: 'light-novel', franchise: 'cote', tags: ['ln-review', 'analysis'], section: 'hidden-gem', publishedAt: '2022-08-30' },
{ id: 'nu6yyd6Etyc', title: 'Why You Should Watch EroManga-Sensei (Satire) - LN Comedy Guide', creatorId: 'manimeMatt', category: 'light-novel', franchise: 'multi', tags: ['ln-review', 'essay'], section: 'hidden-gem', publishedAt: '2021-04-18' },
]

export const TRENDING_VIDEOS  = VIDEOS.filter(v => v.section === 'trending')
export const LATEST_VIDEOS    = VIDEOS.filter(v => v.section === 'latest')
export const HIDDEN_GEM_VIDEOS = VIDEOS.filter(v => v.section === 'hidden-gem')
export const FEATURED_VIDEOS  = VIDEOS.filter(v => v.section === 'featured')

// Franchise-aware helpers
export const getVideosByFranchise = (franchiseId) => VIDEOS.filter(v => v.franchise === franchiseId)
export const getVideosByTag       = (tagId)       => VIDEOS.filter(v => v.tags?.includes(tagId))
