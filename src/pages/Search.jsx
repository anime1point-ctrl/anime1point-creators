import { useState, useMemo, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { VIDEOS } from "../data/videos"
import { APPROVED_CREATORS, CREATOR_MAP } from "../data/creators"
import { CATEGORY_MAP } from "../data/categories"
import { FRANCHISES, FRANCHISE_MAP } from "../data/franchises"
import { useVideoModal } from "../context/VideoModalContext"
import { Analytics } from "../utils/analytics"

// Franchise quick-search suggestions — top franchises shown when search is empty
const SUGGESTED_FRANCHISES = [
  'tensura', 're-zero', 'one-piece', 'berserk', 'jjk',
  'overlord', 'dragon-ball', 'demon-slayer', 'chainsaw-man', 'frieren',
]

function hasRealThumbnail(videoId) {
  if (!videoId) return false
  if (videoId.includes("_vid_")) return false
  return /^[A-Za-z0-9_\-]{11}$/.test(videoId)
}

// ── Video Result Card ─────────────────────────────────────────
function VideoResult({ video }) {
  const { openModal } = useVideoModal()
  const creator = CREATOR_MAP[video.creatorId]
  const [imgError, setImgError] = useState(false)
  const showThumb = hasRealThumbnail(video.id) && !imgError
  const badgeCategory = video.category === "light-novel" ? "novels" : video.category

  function handleClick() {
    Analytics.videoOpened(video.id, video.title, creator ? creator.name : "")
    openModal(video.id, video.title, creator ? creator.name : "")
  }

  return (
    <div
      className="card card-hover group flex gap-4 cursor-pointer items-start"
      onClick={handleClick}
    >
      <div className="relative rounded-lg overflow-hidden bg-black shrink-0 w-40 aspect-video">
        {showThumb ? (
          <img
            src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: creator ? creator.avatarGradient : "linear-gradient(135deg,#1a0a2e,#0d0d1a)" }}
          >
            <span className="text-white text-2xl opacity-70">&#9654;</span>
          </div>
        )}
        <span className={`absolute top-1.5 left-1.5 badge-${badgeCategory} text-xs`}>
          {CATEGORY_MAP[video.category]?.label || video.category}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors mb-2">
          {video.title}
        </h3>
        {creator && (
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black font-orbitron text-white shrink-0"
              style={{ background: creator.avatarGradient }}
            >
              {creator.avatar[0]}
            </div>
            <Link
              to={`/creator/${creator.id}`}
              className="text-xs text-text-secondary hover:text-accent transition-colors"
              onClick={e => e.stopPropagation()}
            >
              {creator.name}
            </Link>
            <span className="text-xs text-text-secondary ml-auto">{video.publishedAt}</span>
          </div>
        )}
        {video.franchise && video.franchise !== 'multi' && FRANCHISE_MAP[video.franchise] && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded font-medium">
              {FRANCHISE_MAP[video.franchise].shortLabel}
            </span>
            {(video.tags || []).slice(0, 2).map(tag => (
              <span key={tag} className="text-xs bg-white/5 text-text-secondary border border-border-dim px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Creator Result Card ────────────────────────────────────────
function CreatorResult({ creator }) {
  const videoCount = VIDEOS.filter(v => v.creatorId === creator.id).length
  return (
    <Link
      to={`/creator/${creator.id}`}
      className="card card-hover group flex items-center gap-4"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black font-orbitron text-white shrink-0 transition-transform group-hover:scale-110"
        style={{ background: creator.avatarGradient }}
      >
        {creator.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-orbitron font-black text-sm text-text-primary group-hover:text-accent transition-colors truncate">
          {creator.name}
        </p>
        <p className="text-text-secondary text-xs mt-0.5">{creator.handle}</p>
      </div>
      <div className="text-right shrink-0">
        <span className={`badge-${creator.category}`}>{CATEGORY_MAP[creator.category]?.label}</span>
        <p className="text-text-secondary text-xs mt-1">{videoCount} videos</p>
      </div>
    </Link>
  )
}

// ── Main Search Page ───────────────────────────────────────────
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "")
  const query = searchParams.get("q") || ""

  const videoResults = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return VIDEOS.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      (v.franchise || "").toLowerCase().includes(q) ||
      (FRANCHISE_MAP[v.franchise]?.label || "").toLowerCase().includes(q) ||
      (FRANCHISE_MAP[v.franchise]?.shortLabel || "").toLowerCase().includes(q) ||
      (v.tags || []).some(t => t.toLowerCase().includes(q)) ||
      (CREATOR_MAP[v.creatorId]?.name || "").toLowerCase().includes(q)
    )
  }, [query])

  const creatorResults = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return APPROVED_CREATORS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.handle.toLowerCase().includes(q) ||
      c.bio.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [query])

  useEffect(() => {
    if (query.trim()) {
      Analytics.searchPerformed(query, videoResults.length, creatorResults.length)
    }
  }, [query, videoResults.length, creatorResults.length])

  function handleSubmit(e) {
    e.preventDefault()
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() })
    }
  }

  function handleFranchiseSuggest(franchiseId) {
    const franchise = FRANCHISE_MAP[franchiseId]
    if (!franchise) return
    const label = franchise.shortLabel
    setInputValue(label)
    setSearchParams({ q: label })
  }

  const hasResults = videoResults.length > 0 || creatorResults.length > 0
  const hasQuery = query.trim().length > 0

  // Group video results by franchise for richer display
  const resultFranchises = useMemo(() => {
    if (!hasResults) return []
    const seen = new Set()
    return videoResults
      .filter(v => v.franchise && v.franchise !== 'multi' && !seen.has(v.franchise) && seen.add(v.franchise))
      .map(v => FRANCHISE_MAP[v.franchise])
      .filter(Boolean)
      .slice(0, 5)
  }, [videoResults, hasResults])

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <div className="bg-bg-card border-b border-border-dim">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <span className="section-tag mb-3 inline-block">Search</span>
          <h1 className="font-orbitron font-black text-2xl text-text-primary mb-6">
            Find <span className="highlight">Videos & Creators</span>
          </h1>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="search"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Search by title, franchise, creator, or tag..."
              className="form-input flex-1"
              autoFocus
            />
            <button type="submit" className="btn-primary shrink-0 px-6">Search</button>
          </form>

          {/* Franchise suggestion chips — shown only when no active query */}
          {!hasQuery && (
            <div className="mt-5">
              <p className="text-text-secondary text-xs mb-2.5 font-semibold uppercase tracking-wider">Browse by Franchise</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_FRANCHISES.map(id => {
                  const f = FRANCHISE_MAP[id]
                  if (!f) return null
                  return (
                    <button
                      key={id}
                      onClick={() => handleFranchiseSuggest(id)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border-dim text-text-secondary hover:border-accent/40 hover:text-accent transition-all font-semibold"
                    >
                      {f.emoji && <span className="mr-1">{f.emoji}</span>}{f.shortLabel}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Franchise facets shown alongside results */}
          {hasQuery && resultFranchises.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-text-secondary text-xs">Franchises found:</span>
              {resultFranchises.map(f => (
                <span key={f.id} className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded font-semibold">
                  {f.emoji && <span className="mr-1">{f.emoji}</span>}{f.shortLabel}
                </span>
              ))}
            </div>
          )}

          {hasQuery && (
            <p className="text-text-secondary text-sm mt-3">
              {hasResults
                ? `${videoResults.length} video${videoResults.length !== 1 ? "s" : ""} and ${creatorResults.length} creator${creatorResults.length !== 1 ? "s" : ""} for "${query}"`
                : `No results for "${query}"`}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Empty state — no query yet */}
        {!hasQuery && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">&#128269;</p>
            <p className="text-text-secondary text-lg">Search for an anime, series, or creator</p>
            <p className="text-text-secondary text-sm mt-2">Try: Frieren, One Piece, Gigguk, Tensura</p>
          </div>
        )}

        {/* No results */}
        {hasQuery && !hasResults && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">&#128565;</p>
            <p className="text-text-secondary text-lg">No results for "{query}"</p>
            <p className="text-text-secondary text-sm mt-2">Try a different search term or browse by category</p>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <Link to="/category/anime" className="btn-outline text-sm">Anime</Link>
              <Link to="/category/manga" className="btn-outline text-sm">Manga</Link>
              <Link to="/category/light-novel" className="btn-outline text-sm">Light Novels</Link>
            </div>
          </div>
        )}

        {/* Video Results */}
        {videoResults.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-tag">Videos</span>
              <h2 className="font-orbitron font-black text-lg text-text-primary">
                {videoResults.length} Video{videoResults.length !== 1 ? "s" : ""}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {videoResults.map(v => <VideoResult key={v.id + v.creatorId} video={v} />)}
            </div>
          </section>
        )}

        {/* Creator Results */}
        {creatorResults.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="section-tag">Creators</span>
              <h2 className="font-orbitron font-black text-lg text-text-primary">
                {creatorResults.length} Creator{creatorResults.length !== 1 ? "s" : ""}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {creatorResults.map(c => <CreatorResult key={c.id} creator={c} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
