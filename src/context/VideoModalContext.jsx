import { createContext, useContext, useState, useCallback } from 'react'
const VideoModalContext = createContext(null)
export function VideoModalProvider({ children }) {
    const [modal, setModal] = useState(null)
    const openModal = useCallback((videoId, title) => {
          setModal({ videoId, title })
          document.body.style.overflow = 'hidden'
    }, [])
    const closeModal = useCallback(() => {
          setModal(null)
          document.body.style.overflow = ''
    }, [])
    return (
          <VideoModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
            {modal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 animate-fade-in"
                                   onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
                                <div className="relative w-full max-w-3xl mx-4 bg-bg-card rounded-xl overflow-hidden shadow-2xl">
                                            <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim">
                                                          <p className="text-sm font-semibold text-text-primary truncate pr-4">{modal.title}</p>p>
                                                          <button onClick={closeModal} className="shrink-0 text-text-secondary hover:text-text-primary text-xl" aria-label="Close">&times;</button>button>
                                            </div>div>
                                            <div className="aspect-video bg-black">
                                                          <iframe key={modal.videoId}
                                                                            src={`https://www.youtube.com/embed/${modal.videoId}?autoplay=1&rel=0&modestbranding=1`}
                                                                            className="w-full h-full" frameBorder="0"
                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                            allowFullScreen title={modal.title} />
                                            </div>div>
                                </div>div>
                    </div>div>
                )}
          </VideoModalContext.Provider>VideoModalContext.Provider>
        )
}
export function useVideoModal() {
    const ctx = useContext(VideoModalContext)
        if (!ctx) throw new Error('useVideoModal must be used within VideoModalProvider')
            return ctx
}
</div>
