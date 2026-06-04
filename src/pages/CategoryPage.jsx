import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { VIDEOS } from '../data/videos'
import { CATEGORY_MAP } from '../data/categories'
import { CREATOR_MAP } from '../data/creators'
import { useVideoModal } from '../context/VideoModalContext'

const PAGE_SIZE = 6

function VideoCard({ video }) {
  const { openModal } = useVideoModal()
  const creator = CREATOR_MAP[video.creatorId]
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="card card-hover group flex flex-col cursor-pointer"
      onClick={() => openModal(video.id, video.title, creator ? creator.name : '')}
    >
      <div className="relative mb-3 rounded-lg overflow-hidden aspect-video bg-black">
        {imgError ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: creator ? creator.avatarGradient : 'linear-gradient(135deg,#1a0a2e,#0d0d1a)' }}
          >
            <span className="text-white text-4xl opacity-60">&#9654;</span>
          </div>
        ) : (
          <img
            src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">&#9654;</span>
        </div>
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

  const category = CATEGORY_MAP[slug]
  if (!category) return <Navigate to="/" replace />

  const allVideos = VIDEOS.filter(v => v.category === slug)
  const shown = allVideos.slice(0, page * PAGE_SIZE)
  const hasMore = shown.length < allVideos.length

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
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-secondary text-sm">{allVideos.length} videos</p>
          <div className="flex gap-2">
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

        {allVideos.length > 0 ? (
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
                  Load More ({allVideos.length - shown.length} remaining)
                </button>
              </div>
            )}
            {!hasMore && allVideos.length > PAGE_SIZE && (
              <p className="text-center text-text-secondary text-sm py-4">All {allVideos.length} videos loaded</p>
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
