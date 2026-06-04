import { createContext, useContext, useState, useCallback } from 'react'
import { CREATOR_MAP } from '../data/creators'
const VideoModalContext = createContext(null)

// hasRealThumbnail — true for valid 11-char YouTube IDs (not placeholder IDs)
function hasRealYouTubeId(videoId) {
  if (!videoId) return false
  if (videoId.includes('_vid_')) return false
  return /^[A-Za-z0-9_\-]{11}$/.test(videoId)
}

export function VideoModalProvider({ children }) {
  const [modal, setModal] = useState(null)
  const openModal = useCallback((videoId, title, creatorName) => {
    setModal({ videoId, title, creatorName })
    document.body.style.overflow = 'hidden'
  }, [])
  const closeModal = useCallback(() => {
    setModal(null)
    document.body.style.overflow = ''
  }, [])

  // All real YouTube IDs are embeddable — use hasRealYouTubeId to gate embeds
  const isEmbeddable = modal ? hasRealYouTubeId(modal.videoId) : false
  const creator = modal ? CREATOR_MAP[Object.keys(CREATOR_MAP).find(k => CREATOR_MAP[k].name === modal.creatorName)] : null

  return (
    <VideoModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
      {modal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="relative w-full max-w-3xl mx-4 bg-bg-card rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim">
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
              <button
                onClick={closeModal}
                className="shrink-0 text-text-secondary hover:text-text-primary text-xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="aspect-video bg-black">
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
            {/* Attribution footer — always visible */}
            {modal.creatorName && (
              <div className="flex items-center justify-between px-4 py-2 bg-bg-card2 border-t border-border-dim">
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
                  >
                    &#9654; Subscribe
                  </a>
                )}
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
