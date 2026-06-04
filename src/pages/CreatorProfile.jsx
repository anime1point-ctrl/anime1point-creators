// CreatorProfile — Sprint 1 stub
import { useParams, Link } from 'react-router-dom'
import { CREATOR_MAP } from '../data/creators'
import { VIDEOS } from '../data/videos'

export default function CreatorProfile() {
  const { id } = useParams()
  const creator = CREATOR_MAP[id]

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">404</p>
          <p className="text-text-secondary mb-6">Creator not found.</p>
          <Link to="/directory" className="btn-primary">Browse Creators</Link>
        </div>
      </div>
    )
  }

  const creatorVideos = VIDEOS.filter(v => v.creatorId === id).slice(0, 6)

  return (
    <div className="min-h-screen">
      <div className="bg-bg-card border-b border-border-dim">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black font-orbitron text-white shrink-0"
               style={{ background: creator.avatarGradient }}>
            {creator.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="font-orbitron font-black text-2xl text-text-primary">{creator.name}</h1>
              {creator.official && <span className="text-xs px-2 py-0.5 bg-gold/20 text-gold border border-gold/30 rounded-full font-semibold">OFFICIAL</span>}
              <span className={`badge-${creator.category}`}>{creator.category}</span>
            </div>
            <p className="text-text-secondary text-sm mb-3">{creator.handle}</p>
            <p className="text-text-secondary leading-relaxed max-w-2xl mb-4">{creator.bio}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {creator.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-bg-card2 border border-border-dim rounded-full text-text-secondary">{t}</span>)}
            </div>
            <a href={creator.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-yt">
              &#9654; Watch on YouTube
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="font-orbitron text-lg font-black text-text-primary mb-6">Latest Videos</h2>
        {creatorVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creatorVideos.map(v => (
              <Link key={v.id} to={`/video/${v.id}`} className="card card-hover group">
                <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}
                     className="w-full rounded-lg mb-3 aspect-video object-cover" />
                <p className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">{v.title}</p>
                <p className="text-xs text-text-secondary mt-1">{v.publishedAt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-center py-8">No videos yet.</p>
        )}
      </div>
    </div>
  )
}
