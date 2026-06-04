import { Link, useParams } from 'react-router-dom'
import { VIDEOS } from '../data/videos'
import { CREATOR_MAP } from '../data/creators'
import { CATEGORY_MAP } from '../data/categories'

function RelatedVideoCard({ video, current }) {
  if (video.id === current) return null
  const creator = CREATOR_MAP[video.creatorId]
  return (
    <Link to={`/video/${video.id}`} className="card card-hover group flex gap-3 items-start">
      <div className="w-24 shrink-0 rounded overflow-hidden aspect-video bg-black">
        <img
          src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">{video.title}</p>
        <p className="text-xs text-text-secondary mt-1">{creator?.name}</p>
      </div>
    </Link>
  )
}

export default function VideoDetail() {
  const { id } = useParams()
  const video = VIDEOS.find(v => v.id === id)
  const creator = video ? CREATOR_MAP[video.creatorId] : null
  const category = video ? CATEGORY_MAP[video.category] : null

  const related = VIDEOS
    .filter(v => v.category === video?.category && v.id !== id)
    .slice(0, 5)

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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-6 inline-flex items-center gap-1">
          &larr; Back to Home
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Video */}
          <div className="flex-1 min-w-0">
            <div className="aspect-video bg-black rounded-xl overflow-hidden mb-5">
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>

            {/* Title & Meta */}
            <h1 className="font-orbitron text-xl md:text-2xl font-black text-text-primary mb-3 leading-tight">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {category && <span className={`badge-${video.category}`}>{category.label}</span>}
              <span className="text-text-secondary text-sm">{video.publishedAt}</span>
            </div>

            {/* Creator Card */}
            {creator && (
              <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-black font-orbitron text-white shrink-0" style={{ background: creator.avatarGradient }}>
                  {creator.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Link to={`/creator/${creator.id}`} className="font-orbitron font-black text-sm text-text-primary hover:text-accent transition-colors">
                      {creator.name}
                    </Link>
                    {creator.official && <span className="text-xs px-1.5 py-0.5 bg-gold/20 text-gold border border-gold/30 rounded font-semibold">OFFICIAL</span>}
                  </div>
                  <p className="text-text-secondary text-xs mb-2">{creator.handle}</p>
                  <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">{creator.bio}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <a href={creator.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-yt text-xs">
                    &#9654; Subscribe
                  </a>
                  <Link to={`/creator/${creator.id}`} className="btn-outline text-xs text-center">
                    View Profile
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Related Videos */}
          {related.length > 0 && (
            <aside className="w-full lg:w-80 shrink-0">
              <h2 className="font-orbitron font-black text-sm text-text-primary mb-4">
                More {category?.label} Videos
              </h2>
              <div className="flex flex-col gap-3">
                {related.map(v => <RelatedVideoCard key={v.id + v.creatorId} video={v} current={id} />)}
              </div>
              <div className="mt-4">
                <Link to={`/category/${video.category}`} className="btn-outline w-full text-center text-sm">
                  Browse all {category?.label} &rarr;
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
