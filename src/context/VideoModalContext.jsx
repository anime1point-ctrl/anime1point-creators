import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { CREATOR_MAP } from '../data/creators'
import { VIDEOS } from '../data/videos'
import { Analytics } from '../utils/analytics'

const VideoModalContext = createContext(null)

function hasRealYouTubeId(videoId) {
  if (!videoId) return false
  if (videoId.includes('_vid_')) return false
  return /^[A-Za-z0-9_\-]{11}$/.test(videoId)
}

/**
 * Score related videos:
 *   +5 same creator, +3 same category, +1 same section
 * Returns top N, excluding current video.
 */
function getRelatedVideos(current, limit = 3) {
  if (!current) return []
  return VIDEOS
    .filter(v => v.id !== current.id)
    .map(v => {
      let score = 0
      if (v.creatorId === current.creatorId) score += 5
      if (v.category === current.category) score += 3
      if (v.section === current.section) score += 1
      return { ...v, _score: score }
    })
    .filter(v => v._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit)
}

function RelatedThumb({ video, onOpen }) {
  const creator = CREATOR_MAP[video.creatorId]
  const [imgErr, setImgErr] = useState(false)
  const showThumb = hasRealYouTubeId(video.id) && !imgErr
  return (
    <button
      onClick={() => onOpen(video)}
      className="flex items-center gap-3 w-full text-left hover:bg-bg-card2 rounded-lg p-2 transition-colors group"
    >
      <div className="relative rounded overflow-hidden bg-black shrink-0" style={{ width: 80, height: 45 }}>
        {showThumb ? (
          <img
            src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: creator ? creator.avatarGradient : 'linear-gradient(135deg,#1a0a2e,#0d0d1a)' }}
          >
            <span className="text-white text-sm opacity-70">&#9654;</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-xs opacity-0 group-hover:opacity-100">&#9654;</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-primary line-clamp-2 group-hover:text-accent transition-colors leading-tight">{video.title}</p>
        {creator && <p className="text-xs text-text-secondary mt-0.5 truncate">{creator.name}</p>}
      </div>
    </button>
  )
}

export function VideoModalProvider({ children }) {
  const [modal, setModal] = useState(null)

  const openModal = useCallback((videoId, title, creatorName) => {
    Analytics.videoOpened(videoId, title, creatorName)
    setModal({ videoId, title, creatorName })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
    document.body.style.overflow = ''
  }, [])

  const isEmbeddable = modal ? hasRealYouTubeId(modal.videoId) : false
  const creator = modal
    ? Object.values(CREATOR_MAP).find(c => c.name === modal.creatorName) || null
    : null

  const currentVideo = modal ? VIDEOS.find(v => v.id === modal.videoId) || null : null
  const relatedVideos = useMemo(() => getRelatedVideos(currentVideo, 3), [currentVideo?.id])

  function handleRelatedClick(video) {
    const relCreator = CREATOR_MAP[video.creatorId]
    Analytics.relatedVideoClicked(modal?.videoId, video.id, 'scoring')
    Analytics.videoOpened(video.id, video.title, relCreator ? relCreator.name : '')
    setModal({ videoId: video.id, title: video.title, creatorName: relCreator ? relCreator.name : '' })
  }

  return (
    <VideoModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      {modal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="relative w-full max-w-3xl mx-4 bg-bg-card rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim shrink-0">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                {creator && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black font-orbitron text-white shrink-0"
                    style={{ background: creator.avatarGradient }}
                  >
                    {creator.avatar[0]}
                  </div>
                )}
                <p className="text-sm font-semibold text-text-primary truncate">{modal.title}</p>
              </div>
              <button onClick={closeModal} className="shrink-0 text-text-secondary hover:text-text-primary text-xl" aria-label="Close">
                &times;
              </button>
            </div>

            {/* Video embed */}
            <div className="aspect-video bg-black shrink-0">
              {isEmbeddable ? (
                <iframe
                  key={modal.videoId}
                  src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={modal.title}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-6 text-center"
                  style={{ background: 'linear-gradient(135deg,#0d0d1a,#1a0a2e)' }}>
                  <div className="text-5xl">&#9654;</div>
                  <div>
                    <p className="font-orbitron font-black text-lg text-text-primary mb-2">{modal.title}</p>
                    {modal.creatorName && (
                      <p className="text-text-secondary text-sm mb-4">by {modal.creatorName}</p>
                    )}
                    <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
                      Visit the creator's YouTube channel to watch this video.
                    </p>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(modal.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      Search on YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Attribution footer */}
            {modal.creatorName && (
              <div className="flex items-center justify-between px-4 py-2 bg-bg-card2 border-t border-border-dim shrink-0">
                <div className="flex items-center gap-2">
                  {creator && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black font-orbitron text-white shrink-0"
                      style={{ background: creator.avatarGradient }}
                    >
                      {creator.avatar[0]}
                    </div>
                  )}
                  <span className="text-xs text-text-secondary">
                    by <span className="text-text-primary font-semibold">{modal.creatorName}</span>
                  </span>
                </div>
                {creator && (
                  <a
                    href={creator.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-yt text-xs py-1 px-3"
                    onClick={() => Analytics.subscribeClicked(creator.id, creator.name)}
                  >
                    &#9654; Subscribe
                  </a>
                )}
              </div>
            )}

            {/* Related Videos */}
            {relatedVideos.length > 0 && (
              <div className="px-4 py-3 border-t border-border-dim shrink-0">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Up Next</p>
                <div className="flex flex-col gap-1">
                  {relatedVideos.map(v => (
                    <RelatedThumb key={v.id + v.creatorId} video={v} onOpen={handleRelatedClick} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </VideoModalContext.Provider>
  )
}

export function useVideoModal() {
  const ctx = useContext(VideoModalContext)
  if (!ctx) throw new Error('useVideoModal must be used within VideoModalProvider')
  return ctx
}
