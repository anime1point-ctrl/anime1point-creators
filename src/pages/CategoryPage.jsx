import { useState, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { VIDEOS } from '../data/videos'
import { CATEGORY_MAP } from '../data/categories'
import { CREATOR_MAP } from '../data/creators'
import { FRANCHISE_MAP } from '../data/franchises'
import { useVideoModal } from '../context/VideoModalContext'

const PAGE_SIZE = 6

function isRealYouTubeId(id) {
  return /^[A-Za-z0-9_\-]{11}$/.test(id) && !id.includes('_vid_')
}

function VideoCard({ video }) {
  const { openModal } = useVideoModal()
  const creator = CREATOR_MAP[video.creatorId]
  const [imgError, setImgError] = useState(false)
  const hasRealThumb = isRealYouTubeId(video.id) && !imgError

  return (
    <div
      className="card card-hover group flex flex-col cursor-pointer"
      onClick={() => openModal(video.id, video.title, creator ? creator.name : '')}
    >
      <div className="relative mb-3 rounded-lg overflow-hidden aspect-video bg-black">
        {hasRealThumb ? (
          <img
            src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center"
            style={{ background: creator ? creator.avatarGradient : 'linear-gradient(135deg,#1a0a2e,#0d0d1a)' }}
          >
            <span className="text-white text-4xl opacity-70">&#9654;</span>
            {creator && (
              <span className="text-white text-xs font-orbitron font-black opacity-80 truncate max-w-full">{creator.name}</span>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">&#9654;</span>
        </div>
        {video.franchise && video.franchise !== 'multi' && FRANCHISE_MAP[video.franchise] && (
          <span className="absolute bottom-1.5 right-1.5 text-xs bg-black/70 text-white px-1.5 py-0.5 rounded font-semibold">
            {FRANCHISE_MAP[video.franchise].shortLabel}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors mb-2">{video.title}</h3>
      {creator && (
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border-dim">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black font-orbitron text-white shrink-0"
            style={{ background: creator.avatarGradient }}
          >
            {creator.avatar[0]}
          </div>
          <Link
            to={`/creator/${creator.id}`}
            className="text-xs text-text-secondary hover:text-accent transition-colors truncate"
            onClick={e => e.stopPropagation()}
          >
            {creator.name}
          </Link>
          <span className="text-xs text-text-secondary ml-auto shrink-0">{video.publishedAt}</span>
        </div>
      )}
    </div>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(1)
  const [activeFranchise, setActiveFranchise] = useState(null)

  const category = CATEGORY_MAP[slug]
  if (!category) return <Navigate to="/" replace />

  const categoryVideos = VIDEOS.filter(v => v.category === slug)

  // Derive franchises that actually have videos in this category (sorted by count)
  const franchisesInCategory = useMemo(() => {
    const counts = {}
    categoryVideos.forEach(v => {
      if (v.franchise && v.franchise !== 'multi') {
        counts[v.franchise] = (counts[v.franchise] || 0) + 1
      }
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ id, count, ...(FRANCHISE_MAP[id] || { shortLabel: id }) }))
  }, [categoryVideos])

  const filteredVideos = useMemo(() => {
    if (!activeFranchise) return categoryVideos
    return categoryVideos.filter(v => v.franchise === activeFranchise)
  }, [categoryVideos, activeFranchise])

  const shown = filteredVideos.slice(0, page * PAGE_SIZE)
  const hasMore = shown.length < filteredVideos.length

  function handleFranchiseClick(id) {
    setActiveFranchise(prev => prev === id ? null : id)
    setPage(1)
  }

  return (
    <div className="min-h-screen">
      <div className="page-hero">
        <span className="section-tag">{category.description}</span>
        <h1 className="font-orbitron">
          {category.icon} <span className="highlight">{category.label}</span>
        </h1>
        <p className="text-text-secondary mt-2">
          Browse all {category.label} videos from our creator community.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category nav tabs */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-text-secondary text-sm">
            {activeFranchise
              ? `${filteredVideos.length} videos · ${FRANCHISE_MAP[activeFranchise]?.label || activeFranchise}`
              : `${categoryVideos.length} videos`}
          </p>
          <div className="flex gap-2 flex-wrap">
            {Object.values(CATEGORY_MAP).map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                  cat.id === slug
                    ? 'bg-purple/20 text-purple border-purple/40'
                    : 'border-border-dim text-text-secondary hover:border-purple/30'
                }`}
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Franchise filter pills — only shown when 2+ franchises exist */}
        {franchisesInCategory.length >= 2 && (
          <div className="mb-7">
            <p className="text-text-secondary text-xs mb-2 font-semibold uppercase tracking-wider">Filter by Franchise</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveFranchise(null); setPage(1) }}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                  !activeFranchise
                    ? 'bg-accent/20 text-accent border-accent/40'
                    : 'border-border-dim text-text-secondary hover:border-accent/30'
                }`}
              >
                All
              </button>
              {franchisesInCategory.map(f => (
                <button
                  key={f.id}
                  onClick={() => handleFranchiseClick(f.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-all ${
                    activeFranchise === f.id
                      ? 'bg-accent/20 text-accent border-accent/40'
                      : 'border-border-dim text-text-secondary hover:border-accent/30'
                  }`}
                >
                  {f.emoji && <span className="mr-1">{f.emoji}</span>}{f.shortLabel}
                  <span className="ml-1 opacity-60">({f.count})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {shown.map(v => <VideoCard key={v.id + v.creatorId} video={v} />)}
            </div>
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="btn-outline px-8"
                >
                  Load More ({filteredVideos.length - shown.length} remaining)
                </button>
              </div>
            )}
            {!hasMore && filteredVideos.length > PAGE_SIZE && (
              <p className="text-center text-text-secondary text-sm py-4">All {filteredVideos.length} videos loaded</p>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">{category.icon}</p>
            <p className="text-text-secondary">No videos in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
