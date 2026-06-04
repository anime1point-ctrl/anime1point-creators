import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CREATOR_MAP } from '../data/creators'
import { VIDEOS } from '../data/videos'
import { CATEGORY_MAP } from '../data/categories'
import { useVideoModal } from '../context/VideoModalContext'

const PAGE_SIZE = 6

function isRealYouTubeId(id) {
  return /^[A-Za-z0-9_\-]{11}$/.test(id) && !id.includes('_vid_')
}

function VideoCard({ video, creatorName, creatorGradient }) {
  const { openModal } = useVideoModal()
  const [imgError, setImgError] = useState(false)
  const hasRealThumb = isRealYouTubeId(video.id) && !imgError

  return (
    <div
      className="card card-hover group cursor-pointer"
      onClick={() => openModal(video.id, video.title, creatorName)}
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
            style={{ background: creatorGradient || 'linear-gradient(135deg,#1a0a2e,#0d0d1a)' }}
          >
            <span className="text-white text-4xl opacity-70">&#9654;</span>
            {creatorName && (
              <span className="text-white text-xs font-orbitron font-black opacity-80 truncate max-w-full">{creatorName}</span>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">&#9654;</span>
        </div>
        <span className={`absolute top-2 left-2 badge-${video.category}`}>
          {CATEGORY_MAP[video.category]?.label || video.category}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
        {video.title}
      </h3>
      <p className="text-xs text-text-secondary mt-1">{video.publishedAt}</p>
    </div>
  )
}

export default function CreatorProfile() {
  const { id } = useParams()
  const creator = CREATOR_MAP[id]
  const [page, setPage] = useState(1)

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">404</p>
          <p className="text-text-secondary mb-6">Creator not found.</p>
          <Link to="/creators" className="btn-primary">Browse Creators</Link>
        </div>
      </div>
    )
  }

  const allVideos = VIDEOS.filter(v => v.creatorId === id)
  const shown = allVideos.slice(0, page * PAGE_SIZE)
  const hasMore = shown.length < allVideos.length

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-bg-card border-b border-border-dim">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Link to="/creators" className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-6 inline-block">
            &larr; All Creators
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black font-orbitron text-white shrink-0"
              style={{ background: creator.avatarGradient }}
            >
              {creator.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="font-orbitron font-black text-2xl text-text-primary">{creator.name}</h1>
                {creator.official && (
                  <span className="text-xs px-2 py-0.5 bg-gold/20 text-gold border border-gold/30 rounded-full font-semibold">
                    OFFICIAL
                  </span>
                )}
                <span className={`badge-${creator.category}`}>
                  {CATEGORY_MAP[creator.category]?.label || creator.category}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-3">{creator.handle}</p>
              <p className="text-text-secondary leading-relaxed max-w-2xl mb-4 text-sm">{creator.bio}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {creator.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-bg-card2 border border-border-dim rounded-full text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={creator.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-yt">
                  &#9654; Watch on YouTube
                </a>
                <Link to={`/category/${creator.category}`} className="btn-outline">
                  More {CATEGORY_MAP[creator.category]?.label} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-orbitron text-lg font-black text-text-primary">
            Videos <span className="text-text-secondary text-sm font-rajdhani font-normal ml-2">({allVideos.length})</span>
          </h2>
        </div>

        {allVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {shown.map(v => (
                <VideoCard
                  key={v.id + v.creatorId}
                  video={v}
                  creatorName={creator.name}
                  creatorGradient={creator.avatarGradient}
                />
              ))}
            </div>
            {hasMore && (
              <div className="text-center">
                <button onClick={() => setPage(p => p + 1)} className="btn-outline px-8">
                  Load More ({allVideos.length - shown.length} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary">No videos uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
