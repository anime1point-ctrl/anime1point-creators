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
{ id: 'TK_OP_ch1159', title: 'One Piece Chapter 1159 BREAKDOWN — Imu Reveals Everything!', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'lore'], section: 'trending', publishedAt: '2026-06-01' },
{ id: 'TK_OP_ch1158', title: 'One Piece Chapter 1158 BREAKDOWN — The Truth About Loki!', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'theory'], section: 'trending', publishedAt: '2026-05-25' },
{ id: 'TK_OP_ch1157', title: 'One Piece Chapter 1157 BREAKDOWN — Luffy vs The World!', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'fight-breakdown'], section: 'latest', publishedAt: '2026-05-18' },
{ id: 'TK_OP_ch1156', title: 'One Piece Chapter 1156 BREAKDOWN — Brook Awakening EXPLAINED', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['chapter-review', 'power-scaling'], section: 'latest', publishedAt: '2026-05-11' },
{ id: 'TK_OP_theory1', title: 'The REAL Secret of the Ancient Weapons | One Piece Theory', creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['theory', 'lore'], section: 'featured', publishedAt: '2026-04-20' },
{ id: 'TK_OP_theory2', title: "Joy Boy's TRUE Identity — Everything We Know | One Piece", creatorId: 'tekking101', category: 'manga', franchise: 'one-piece', tags: ['lore', 'theory'], section: 'hidden-gem', publishedAt: '2026-03-10' },

// ════════════════════════════════════════════════════════════
// YABOYРOSHI — Seasonal Episode Reactions
// ════════════════════════════════════════════════════════════
{ id: 'YBR_RZ_s4ep9', title: 'Re:Zero Season 4 Episode 9 REACTION — This Changed Everything', creatorId: 'yaboyRoshi', category: 'anime', franchise: 're-zero', tags: ['episode-review'], section: 'trending', publishedAt: '2026-05-30' },
{ id: 'YBR_RZ_s4ep8', title: "Re:Zero Season 4 Episode 8 REACTION — Subaru's Darkest Hour", creatorId: 'yaboyRoshi', category: 'anime', franchise: 're-zero', tags: ['episode-review'], section: 'latest', publishedAt: '2026-05-23' },
{ id: 'YBR_JJK_ep24', title: 'Jujutsu Kaisen Season 3 Episode 24 REACTION — Sukuna vs Gojo Finale', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'jjk', tags: ['episode-review', 'fight-breakdown'], section: 'trending', publishedAt: '2026-05-20' },
{ id: 'YBR_JJK_ep23', title: 'Jujutsu Kaisen Season 3 Episode 23 REACTION — The Culling Game Ends', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'jjk', tags: ['episode-review'], section: 'latest', publishedAt: '2026-05-13' },
{ id: 'YBR_BLEACH_ep28', title: 'Bleach TYBW Episode 28 REACTION — Yhwach's Final Form', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'bleach', tags: ['episode-review', 'fight-breakdown'], section: 'featured', publishedAt: '2026-05-05' },
{ id: 'YBR_DB_ep10', title: 'Dragon Ball Daima Episode 10 REACTION — Gohan Goes Beyond', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'dragon-ball', tags: ['episode-review'], section: 'hidden-gem', publishedAt: '2026-04-18' },

// ════════════════════════════════════════════════════════════
// FOXEN ANIME — Light Novel Deep Dives
// ════════════════════════════════════════════════════════════
{ id: 'FA_OVL_vol16', title: 'Overlord Volume 16 Review — The Final Curtain Rises', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'overlord', tags: ['ln-review', 'analysis'], section: 'trending', publishedAt: '2026-05-28' },
{ id: 'FA_OVL_full', title: 'Overlord Complete Story — Every Volume Explained (LN Spoilers)', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'overlord', tags: ['ln-review', 'lore'], section: 'featured', publishedAt: '2026-04-15' },
{ id: 'FA_MT_vol24', title: 'Mushoku Tensei Volume 24 Review — Rudeus's Final Journey', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['ln-review', 'analysis'], section: 'trending', publishedAt: '2026-05-10' },
{ id: 'FA_MT_full', title: 'Mushoku Tensei: The FULL Story Beyond the Anime (LN Spoilers)', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['ln-review', 'lore'], section: 'featured', publishedAt: '2026-03-22' },
{ id: 'FA_BW_ln_vs', title: 'Bookworm LN vs Anime — What's Different and What's Better', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'bookworm', tags: ['ln-review', 'analysis'], section: 'hidden-gem', publishedAt: '2026-02-28' },
{ id: 'FA_COTE_ln', title: 'Classroom of the Elite LN Season 4 — What the Anime Won't Cover', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'cote', tags: ['ln-review', 'lore'], section: 'hidden-gem', publishedAt: '2026-04-05' },

// ════════════════════════════════════════════════════════════
// THE CANIPA EFFECT — Production Analysis
// ════════════════════════════════════════════════════════════
{ id: 'CE_prod_spring26', title: 'Spring 2026 Anime Production Report — Who's Struggling?', creatorId: 'canipa', category: 'anime', franchise: 'multi', tags: ['industry', 'analysis'], section: 'trending', publishedAt: '2026-05-15' },
{ id: 'CE_prod_tensura', title: 'Tensura S4 Production Deep Dive — Eight Bit's Ambition', creatorId: 'canipa', category: 'anime', franchise: 'tensura', tags: ['industry', 'analysis'], section: 'featured', publishedAt: '2026-04-08' },
{ id: 'CE_prod_frieren', title: 'Why Frieren Looks So Good — Madhouse's Sakuga Secrets', creatorId: 'canipa', category: 'anime', franchise: 'frieren', tags: ['industry', 'analysis'], section: 'featured', publishedAt: '2026-03-15' },
{ id: 'CE_prod_2025', title: 'Best Animated Anime of 2025 — The Production Winners', creatorId: 'canipa', category: 'anime', franchise: 'multi', tags: ['ranking', 'industry'], section: 'hidden-gem', publishedAt: '2026-01-20' },

// ════════════════════════════════════════════════════════════
// SAWYER7MAGE — Bleach & Shonen Analysis
// ════════════════════════════════════════════════════════════
{ id: 'S7_BLEACH_tybw3', title: 'Bleach TYBW Part 3 — Full Arc Review & Power Scaling', creatorId: 'sawyerGaming', category: 'anime', franchise: 'bleach', tags: ['review', 'power-scaling'], section: 'trending', publishedAt: '2026-05-25' },
{ id: 'S7_BLEACH_yhwach', title: 'Yhwach Explained — The Most Overpowered Character in Shonen', creatorId: 'sawyerGaming', category: 'anime', franchise: 'bleach', tags: ['character-analysis', 'power-scaling'], section: 'featured', publishedAt: '2026-04-28' },
{ id: 'S7_BLEACH_bankai', title: 'Every Bankai in Bleach TYBW Ranked', creatorId: 'sawyerGaming', category: 'anime', franchise: 'bleach', tags: ['ranking', 'power-scaling'], section: 'hidden-gem', publishedAt: '2026-03-30' },
{ id: 'S7_DB_granolah', title: 'Dragon Ball Super Granolah Arc — The REAL Ending Explained', creatorId: 'sawyerGaming', category: 'anime', franchise: 'dragon-ball', tags: ['analysis', 'lore'], section: 'hidden-gem', publishedAt: '2026-04-15' },
{ id: 'S7_NARUTO_boruto', title: 'Boruto Two Blue Vortex — Everything Has Changed', creatorId: 'sawyerGaming', category: 'manga', franchise: 'naruto', tags: ['manga-review', 'analysis'], section: 'latest', publishedAt: '2026-05-18' },

// ════════════════════════════════════════════════════════════
// ANIMEUPROAR — Naruto / Boruto Coverage
// ════════════════════════════════════════════════════════════
{ id: 'AU_BTV_ch35', title: 'Boruto Two Blue Vortex Chapter 35 — Naruto Returns?!', creatorId: 'animeUproar', category: 'manga', franchise: 'naruto', tags: ['chapter-review', 'theory'], section: 'trending', publishedAt: '2026-06-01' },
{ id: 'AU_BTV_ch34', title: 'Boruto Two Blue Vortex Chapter 34 — The Time Skip Mystery', creatorId: 'animeUproar', category: 'manga', franchise: 'naruto', tags: ['chapter-review', 'lore'], section: 'latest', publishedAt: '2026-05-05' },
{ id: 'AU_NAR_power', title: 'Naruto Power Scaling 2026 — Who Is Actually the Strongest?', creatorId: 'animeUproar', category: 'anime', franchise: 'naruto', tags: ['power-scaling', 'ranking'], section: 'featured', publishedAt: '2026-04-10' },
{ id: 'AU_NAR_sasuke', title: 'Sasuke's Complete Story — The Greatest Redemption Arc in Anime', creatorId: 'animeUproar', category: 'anime', franchise: 'naruto', tags: ['character-analysis', 'analysis'], section: 'hidden-gem', publishedAt: '2026-03-01' },

// ════════════════════════════════════════════════════════════
// MANGARAMEN — Classic & Literary Manga
// ════════════════════════════════════════════════════════════
{ id: 'MR_KINGDOM_ch800', title: 'Kingdom Chapter 800 Review — Xin's Greatest Battle Begins', creatorId: 'mangaRamen', category: 'manga', franchise: 'kingdom', tags: ['chapter-review', 'analysis'], section: 'trending', publishedAt: '2026-05-22' },
{ id: 'MR_VAGABOND_review', title: 'Vagabond — The Greatest Manga Ever Made? A Full Review', creatorId: 'mangaRamen', category: 'manga', franchise: 'vagabond', tags: ['manga-review', 'analysis'], section: 'featured', publishedAt: '2026-04-18' },
{ id: 'MR_BERSERK_legacy', title: 'Berserk's Legacy After Volume 41 — Where Does It Stand?', creatorId: 'mangaRamen', category: 'manga', franchise: 'berserk', tags: ['analysis', 'essay'], section: 'hidden-gem', publishedAt: '2026-03-25' },
{ id: 'MR_KINGDOM_intro', title: 'Why You NEED to Read Kingdom — The Perfect Entry Point', creatorId: 'mangaRamen', category: 'manga', franchise: 'kingdom', tags: ['review', 'hidden-gem-pick'], section: 'hidden-gem', publishedAt: '2026-02-10' },

// ════════════════════════════════════════════════════════════
// OTAKU THERAPY — Frieren & Thoughtful Manga
// ════════════════════════════════════════════════════════════
{ id: 'OT_FR_ch130', title: 'Frieren Chapter 130 Review — Time, Grief and Magic', creatorId: 'otakuTherapy', category: 'manga', franchise: 'frieren', tags: ['chapter-review', 'analysis'], section: 'trending', publishedAt: '2026-06-01' },
{ id: 'OT_FR_full', title: 'Frieren: What Makes It the Greatest Fantasy Manga', creatorId: 'otakuTherapy', category: 'manga', franchise: 'frieren', tags: ['manga-review', 'essay'], section: 'featured', publishedAt: '2026-04-22' },
{ id: 'OT_JOJO_SBR', title: 'Steel Ball Run Is a Masterpiece — A Complete Analysis', creatorId: 'otakuTherapy', category: 'manga', franchise: 'jojo', tags: ['manga-review', 'analysis'], section: 'featured', publishedAt: '2026-03-14' },
{ id: 'OT_FR_themes', title: 'Frieren and the Art of Slowness — Themes Deep Dive', creatorId: 'otakuTherapy', category: 'manga', franchise: 'frieren', tags: ['essay', 'analysis'], section: 'hidden-gem', publishedAt: '2026-05-10' },

// ════════════════════════════════════════════════════════════
// FOXCLOVER — Anime Essays (Frieren focus)
// ════════════════════════════════════════════════════════════
{ id: 'FC_FR_elf', title: 'Why Frieren Hits Different — An Essay on Immortality and Loss', creatorId: 'foxclover', category: 'anime', franchise: 'frieren', tags: ['essay', 'analysis'], section: 'trending', publishedAt: '2026-05-18' },
{ id: 'FC_FR_anime', title: "Frieren Beyond Journey's End — The Anime That Changed Everything", creatorId: 'foxclover', category: 'anime', franchise: 'frieren', tags: ['review', 'essay'], section: 'featured', publishedAt: '2026-04-01' },
{ id: 'FC_slice', title: 'Slow Anime Is Not Boring Anime — A Defense of Atmosphere', creatorId: 'foxclover', category: 'anime', franchise: 'multi', tags: ['essay', 'analysis'], section: 'hidden-gem', publishedAt: '2026-03-08' },

// ════════════════════════════════════════════════════════════
// ISEKAI EXPLAINED — LN Source Material Coverage
// ════════════════════════════════════════════════════════════
{ id: 'IE_OVL_ainz', title: "Ainz Ooal Gown's REAL Plan — Overlord LN Ending Explained", creatorId: 'isekaiExplained', category: 'light-novel', franchise: 'overlord', tags: ['ln-review', 'lore'], section: 'trending', publishedAt: '2026-05-20' },
{ id: 'IE_MT_powers', title: "Mushoku Tensei — Rudeus's Full Power Progression (All LN Volumes)", creatorId: 'isekaiExplained', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['ln-review', 'power-scaling'], section: 'featured', publishedAt: '2026-04-28' },
{ id: 'IE_REZERO_ln', title: 'Re:Zero LN vs Anime — The Most Important Differences', creatorId: 'isekaiExplained', category: 'light-novel', franchise: 're-zero', tags: ['ln-review', 'analysis'], section: 'latest', publishedAt: '2026-05-25' },
{ id: 'IE_COTE_year2', title: 'Classroom of the Elite Year 2 LN — The Full Story Explained', creatorId: 'isekaiExplained', category: 'light-novel', franchise: 'cote', tags: ['ln-review', 'lore'], section: 'hidden-gem', publishedAt: '2026-03-18' },

// ════════════════════════════════════════════════════════════
// NUXTAKU — Commentary & Community
// ════════════════════════════════════════════════════════════
{ id: 'NT_isekai_debate', title: 'The REAL Problem With Isekai Anime in 2026', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['essay', 'industry'], section: 'trending', publishedAt: '2026-05-28' },
{ id: 'NT_community', title: 'The Anime Community Needs to Have This Conversation', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['essay', 'industry'], section: 'hidden-gem', publishedAt: '2026-04-14' },

// ════════════════════════════════════════════════════════════
// EXISTING CREATOR BACKFILL — Sprint 5.2 additions
// ════════════════════════════════════════════════════════════

// Gigguk — Fall 2025 + Frieren
{ id: 'GG_fall2025', title: 'Fall Anime 2025 In A Nutshell', creatorId: 'gigguk', category: 'anime', franchise: 'multi', tags: ['season-roundup'], section: 'latest', publishedAt: '2025-12-05' },
{ id: 'GG_frieren_essay', title: 'Frieren and The Slow Death of the Isekai', creatorId: 'gigguk', category: 'anime', franchise: 'frieren', tags: ['essay', 'analysis'], section: 'featured', publishedAt: '2025-11-22' },

// Mother's Basement — Frieren OP/ED + JJK
{ id: 'MB_frieren_op', title: "What Frieren's OP Tells You About Death Before It Happens", creatorId: 'mothersbasement', category: 'anime', franchise: 'frieren', tags: ['analysis', 'essay'], section: 'featured', publishedAt: '2025-10-30' },
{ id: 'MB_jjk_s3op', title: 'JJK Season 3 Opening — Every Hidden Detail Explained', creatorId: 'mothersbasement', category: 'anime', franchise: 'jjk', tags: ['analysis'], section: 'trending', publishedAt: '2026-04-05' },

// Totally Not Mark — Frieren + Bleach
{ id: 'TNM_frieren_full', title: 'Frieren: A Massive Review', creatorId: 'totallynotmark', category: 'manga', franchise: 'frieren', tags: ['manga-review', 'analysis'], section: 'featured', publishedAt: '2026-03-01' },
{ id: 'TNM_jjk_shibuya', title: 'JJK Shibuya Arc — The Best and Worst of Gege Akutami', creatorId: 'totallynotmark', category: 'manga', franchise: 'jjk', tags: ['manga-review', 'analysis'], section: 'featured', publishedAt: '2025-11-18' },
{ id: 'TNM_bleach_review', title: 'Bleach: A Massive Review — From Soul Society to TYBW', creatorId: 'totallynotmark', category: 'anime', franchise: 'bleach', tags: ['review', 'analysis'], section: 'hidden-gem', publishedAt: '2026-02-14' },

// Anime Balls Deep — Overlord + Frieren LN
{ id: 'ABD_OVL_momonga', title: "The TERRIFYING Truth About Ainz's True Plan | Overlord Complete Story", creatorId: 'animeballsdeep', category: 'light-novel', franchise: 'overlord', tags: ['lore', 'ln-review'], section: 'trending', publishedAt: '2026-05-22' },
{ id: 'ABD_MT_rudy', title: "Rudeus Greyrat's Complete Story | Mushoku Tensei LN All Volumes", creatorId: 'animeballsdeep', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['lore', 'ln-review'], section: 'featured', publishedAt: '2026-04-30' },

// Glass Reflection — Bleach + JJK
{ id: 'GR_bleach_tybw', title: 'Bleach: Thousand Year Blood War — Is It Actually Good?', creatorId: 'glassreflection', category: 'anime', franchise: 'bleach', tags: ['review', 'analysis'], section: 'featured', publishedAt: '2026-03-28' },
{ id: 'GR_jjk_s3', title: 'JJK Season 3 First Impressions — The Culling Game Begins', creatorId: 'glassreflection', category: 'anime', franchise: 'jjk', tags: ['review', 'season-roundup'], section: 'latest', publishedAt: '2026-04-15' },

// The Anime Man — Overlord LN + Mushoku Tensei
{ id: 'TAM_OVL', title: "I Read All of Overlord's Light Novels — Here's What You're Missing", creatorId: 'theanimeman', category: 'light-novel', franchise: 'overlord', tags: ['ln-review', 'analysis'], section: 'featured', publishedAt: '2026-03-20' },
{ id: 'TAM_MT', title: 'Mushoku Tensei Changed How I See Isekai — An Honest Review', creatorId: 'theanimeman', category: 'light-novel', franchise: 'mushoku-tensei', tags: ['review', 'essay'], section: 'hidden-gem', publishedAt: '2026-02-10' },



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
{ id: 'TAM_latest_re0', title: 'Re:Zero Season 4 — What the Light Novel Changes About ', creatorId: 'theanimeman', category: 'light-novel', franchise: 're-zero', tags: ['ln-review', 'analysis'], section: 'latest', publishedAt: '2026-05-28' },
{ id: 'TAM_latest_jjk', title: 'Jujutsu Kaisen Is Almost Over — My Honest Final Thoughts', creatorId: 'theanimeman', category: 'anime', franchise: 'jjk', tags: ['review', 'essay'], section: 'latest', publishedAt: '2026-06-02' },

// ── FOXEN ANIME — Latest additions ──
{ id: 'FA_latest_rezero', title: 'Re:Zero Season 4 vs Light Novel — Every Key Difference', creatorId: 'foxenAnime', category: 'light-novel', franchise: 're-zero', tags: ['ln-review', 'analysis'], section: 'latest', publishedAt: '2026-06-01' },
{ id: 'FA_latest_tensura', title: 'Tensura Light Novel Ending — What Happens After the Anime', creatorId: 'foxenAnime', category: 'light-novel', franchise: 'tensura', tags: ['ln-review', 'lore'], section: 'latest', publishedAt: '2026-05-20' },

// ── THE CANIPA EFFECT — Latest additions ──
{ id: 'CE_latest_wistoria', title: 'Wistoria S2 Production Update — Who Is Animating This?', creatorId: 'canipa', category: 'anime', franchise: 'wistoria', tags: ['industry', 'analysis'], section: 'latest', publishedAt: '2026-05-30' },
{ id: 'CE_latest_bleach', title: 'Bleach TYBW Final Arc — Studio Pierrot Under Pressure', creatorId: 'canipa', category: 'anime', franchise: 'bleach', tags: ['industry', 'analysis'], section: 'latest', publishedAt: '2026-05-12' },

// ── MANGARAMEN — Latest additions ──
{ id: 'MR_latest_kingdom', title: 'Kingdom Chapter 801 — The Battle of Ryouyou Escalates', creatorId: 'mangaRamen', category: 'manga', franchise: 'kingdom', tags: ['chapter-review', 'analysis'], section: 'latest', publishedAt: '2026-06-02' },
{ id: 'MR_latest_berserk', title: 'Berserk Volume 42 Update — What We Know About the Continuation', creatorId: 'mangaRamen', category: 'manga', franchise: 'berserk', tags: ['manga-review', 'analysis'], section: 'latest', publishedAt: '2026-05-18' },

// ── OTAKU THERAPY — Latest additions ──
{ id: 'OT_latest_frieren', title: 'Frieren Chapter 131 Review — The Magic Council Arc Deepens', creatorId: 'otakuTherapy', category: 'manga', franchise: 'frieren', tags: ['chapter-review', 'analysis'], section: 'latest', publishedAt: '2026-06-03' },
{ id: 'OT_latest_vagabond', title: 'Vagabond — Is Inoue Ever Coming Back? A Status Report', creatorId: 'otakuTherapy', category: 'manga', franchise: 'vagabond', tags: ['manga-review', 'essay'], section: 'latest', publishedAt: '2026-05-22' },

// ── FOXCLOVER — Latest additions ──
{ id: 'FC_latest_ds', title: 'Frieren vs Demon Slayer — Two Ways to Tell a Story About Loss', creatorId: 'foxclover', category: 'anime', franchise: 'frieren', tags: ['essay', 'analysis'], section: 'latest', publishedAt: '2026-05-28' },
{ id: 'FC_latest_eva', title: 'Evangelion and Frieren Both Broke Me — A Personal Essay', creatorId: 'foxclover', category: 'anime', franchise: 'evangelion', tags: ['essay', 'analysis'], section: 'latest', publishedAt: '2026-05-14' },

// ── NUXTAKU — Latest additions ──
{ id: 'NT_latest_cr', title: 'Crunchyroll vs The Anime Community — Who Wins in 2026?', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['industry', 'essay'], section: 'latest', publishedAt: '2026-05-30' },
{ id: 'NT_latest_season', title: 'Spring 2026 Anime — The Absolute Best and Worst', creatorId: 'nuxTaku', category: 'anime', franchise: 'multi', tags: ['season-roundup', 'ranking'], section: 'latest', publishedAt: '2026-06-01' },

// ════════════════════════════════════════════════════════════
// DEMON SLAYER — Franchise Activation (Sprint 5.3)
// ════════════════════════════════════════════════════════════
{ id: 'DS_glassref_review', title: 'Demon Slayer: Infinity Castle Arc — Spoiler-Free First Impressions', creatorId: 'glassreflection', category: 'anime', franchise: 'demon-slayer', tags: ['review', 'season-roundup'], section: 'trending', publishedAt: '2026-05-22' },
{ id: 'DS_gigguk_essay', title: 'Why Demon Slayer Prints Money Even When It Is Mediocre', creatorId: 'gigguk', category: 'anime', franchise: 'demon-slayer', tags: ['essay', 'analysis'], section: 'featured', publishedAt: '2026-04-12' },
{ id: 'DS_MB_infcastle', title: 'Demon Slayer Infinity Castle OP — Every Frame Is a Promise', creatorId: 'mothersbasement', category: 'anime', franchise: 'demon-slayer', tags: ['analysis'], section: 'featured', publishedAt: '2026-05-08' },
{ id: 'DS_yaboyRoshi_ep1', title: 'Demon Slayer: Infinity Castle Episode 1 REACTION — TEARS AND SCREAMING', creatorId: 'yaboyRoshi', category: 'anime', franchise: 'demon-slayer', tags: ['episode-review'], section: 'latest', publishedAt: '2026-05-18' },

// ════════════════════════════════════════════════════════════
// EVANGELION — Franchise Activation (Sprint 5.3)
// ════════════════════════════════════════════════════════════
{ id: 'EVA_TNM_review', title: 'Neon Genesis Evangelion: A Massive Review — The Most Important Anime Ever Made?', creatorId: 'totallynotmark', category: 'anime', franchise: 'evangelion', tags: ['review', 'analysis'], section: 'featured', publishedAt: '2026-03-28' },
{ id: 'EVA_MB_op', title: "Cruel Angel Thesis — Why Evangelion's Opening Is Perfect", creatorId: 'mothersbasement', category: 'anime', franchise: 'evangelion', tags: ['analysis', 'essay'], section: 'featured', publishedAt: '2026-02-14' },
{ id: 'EVA_gigguk_impact', title: "Evangelion's Cultural Impact — 30 Years and Still Unmatched", creatorId: 'gigguk', category: 'anime', franchise: 'evangelion', tags: ['essay', 'industry'], section: 'hidden-gem', publishedAt: '2025-12-01' },
{ id: 'EVA_TAM_rebuild', title: 'I Watched All 4 Rebuild Films In One Day — Worth It?', creatorId: 'theanimeman', category: 'anime', franchise: 'evangelion', tags: ['review', 'essay'], section: 'hidden-gem', publishedAt: '2026-01-15' },


]

export const TRENDING_VIDEOS  = VIDEOS.filter(v => v.section === 'trending')
export const LATEST_VIDEOS    = VIDEOS.filter(v => v.section === 'latest')
export const HIDDEN_GEM_VIDEOS = VIDEOS.filter(v => v.section === 'hidden-gem')
export const FEATURED_VIDEOS  = VIDEOS.filter(v => v.section === 'featured')

// Franchise-aware helpers
export const getVideosByFranchise = (franchiseId) => VIDEOS.filter(v => v.franchise === franchiseId)
export const getVideosByTag       = (tagId)       => VIDEOS.filter(v => v.tags?.includes(tagId))
