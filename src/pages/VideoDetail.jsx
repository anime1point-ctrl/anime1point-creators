// VideoDetail — Sprint 1 stub
import { useParams, Link } from 'react-router-dom'
import { VIDEOS } from '../data/videos'
import { CREATOR_MAP } from '../data/creators'

export default function VideoDetail() {
  const { id } = useParams()
  const video = VIDEOS.find(v => v.id === id)
  const creator = video ? CREATOR_MAP[video.creatorId] : null

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">404</p>
          <p className="text-text-secondary mb-6">Video not found.</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-6 inline-block">
          &larr; Back to Home
        </Link>
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>
        <h1 className="font-orbitron text-xl md:text-2xl font-black text-text-primary mb-3">{video.title}</h1>
        {creator && (
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black font-orbitron text-white"
                 style={{ background: creator.avatarGradient }}>
              {creator.avatar}
            </div>
            <div>
              <p className="text-text-primary font-semibold text-sm">{creator.name}</p>
              <p className="text-text-secondary text-xs">{creator.handle}</p>
            </div>
            <a href={creator.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-yt ml-auto text-xs">
              &#9654; Subscribe
            </a>
          </div>
        )}
        <div className="mt-8 pt-8 border-t border-border-dim text-center">
          <p className="text-text-secondary text-sm">More video details and related videos coming in Sprint 2.</p>
        </div>
      </div>
    </div>
  )
}
