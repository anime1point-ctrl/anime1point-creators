import { createContext, useContext, useState, useCallback } from 'react'
const VideoModalContext = createContext(null)

// Real Anime1Point video IDs that can be embedded
const REAL_VIDEO_IDS = new Set([
  'ZVmqQk1GbqE', 'OCzmKRgsRag', 'UeLgwcrGVnk', 'jEiEpR3w4Ek', 'B74XQSfhW1g',
  'bN534x05wBU', 'wvxjzpJW8aE', 'nyJ_8jVKJKc',
  'ommA4DBy5RQ', '3izJIv1NrW8', 'o_PazOqPg0I', 'mG9X9EZPCj0', '7E77-vVSgW4',
  'oIUdlnnaLdk', 'NUYvbNzmtdA', 'n1WpP7iowLc', 'RcFaNSxkCMg', 'Q8Lf3ywlwWo',
])

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

  const isEmbeddable = modal ? REAL_VIDEO_IDS.has(modal.videoId) : false

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
              <p className="text-sm font-semibold text-text-primary truncate pr-4">{modal.title}</p>
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
                      This creator has not yet linked their YouTube video. Visit their channel to watch.
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
