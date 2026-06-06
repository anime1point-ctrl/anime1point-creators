import { Link, useParams } from 'react-router-dom'
import { VIDEOS } from '../data/videos'
import { CREATOR_MAP } from '../data/creators'
import { CATEGORY_MAP } from '../data/categories'
import { FRANCHISE_MAP } from '../data/franchises'
import { isRealYouTubeId } from '../utils/youtube'

// ── Related video scoring ─────────────────────────────────────
// Priority order:
//   1. Same franchise (non-multi)
//   2. Shared tags
//   3. Same category (fallback)
function getRelatedVideos(video, allVideos, limit = 5) {
  if (!video) return []

  return allVideos
    .filter(v => v.id !== video.id)
    .map(v => {
      let score = 0
      // Same franchise is highest signal (excluding 'multi' — too broad)
      if (video.franchise && video.franchise !== 'multi' && v.franchise === video.franchise) {
        score += 10
      }
      // Shared tags
      const sharedTags = (video.tags || []).filter(t => (v.tags || []).includes(t))
      score += sharedTags.length * 3
      // Same category is weak signal but still useful
      if (v.category === video.category) {
        score += 1
      }
      return { video: v, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ video: v }) => v)
}

function RelatedVideoCard({ video, current }) {
  if (video.id === current) return null
  const creator = CREATOR_MAP[video.creatorId]
  const franchise = video.franchise && video.franchise !== 'multi' ? FRANCHISE_MAP[video.franchise] : null
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
        {franchise && (
          <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.5 rounded font-medium mt-1 inline-block">
            {franchise.shortLabel}
          </span>
        )}
      </div>
    </Link>
  )
}

const STATUS_BADGE = {
  'anime1point': { label: 'ANIME1POINT CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r from-purple/30 to-accent/30 text-accent border border-accent/40' },
  'featured': { label: 'FEATURED CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gold/20 text-gold border border-gold/30' },
  'rising': { label: 'RISING CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-400 border border-green-500/30' },
}

export default function VideoDetail() {
  const { id } = useParams()
  const video = VIDEOS.find(v => v.id === id)
  const creator = video ? CREATOR_MAP[video.creatorId] : null
  const category = video ? CATEGORY_MAP[video.category] : null
  const franchise = video?.franchise && video.franchise !== 'multi' ? FRANCHISE_MAP[video.franchise] : null

  // Franchise-first, tag-aware related videos
  const related = getRelatedVideos(video, VIDEOS)

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

  const isEmbeddable = isRealYouTubeId(id)
  const badge = creator ? STATUS_BADGE[creator.creatorStatus] : null

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
              {isEmbeddable ? (
                <iframe
                  src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-6 text-center"
                  style={{ background: 'linear-gradient(135deg,#0d0d1a,#1a0a2e)' }}>
                  <div className="text-5xl">&#9654;</div>
                  <div>
                    <p className="font-orbitron font-black text-lg text-text-primary mb-2">{video.title}</p>
                    {creator && (
                      <p className="text-text-secondary text-sm mb-4">by {creator.name}</p>
                    )}
                    <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
                      Visit the creator's YouTube channel to watch this video.
                    </p>
                    <a
                      href={creator?.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(video.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <h1 className="font-orbitron text-xl md:text-2xl font-black text-text-primary mb-3 leading-tight">
              {video.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {category && <span className={`badge-${video.category}`}>{category.label}</span>}
              {franchise && (
                <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded font-semibold">
                  {franchise.emoji && <span className="mr-1">{franchise.emoji}</span>}{franchise.shortLabel}
                </span>
              )}
              {(video.tags || []).map(tag => (
                <span key={tag} className="text-xs bg-white/5 text-text-secondary border border-border-dim px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
              <span className="text-text-secondary text-sm ml-auto">{video.publishedAt}</span>
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
                    {badge && <span className={badge.className}>{badge.label}</span>}
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
                {franchise ? `More ${franchise.shortLabel}` : `More ${category?.label} Videos`}
              </h2>
              <div className="flex flex-col gap-3">
                {related.map(v => <RelatedVideoCard key={v.id + v.creatorId} video={v} current={id} />)}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {franchise && (
                  <Link
                    to={`/category/${video.category}`}
                    className="btn-outline w-full text-center text-sm"
                    state={{ franchise: franchise.id }}
                  >
                    All {franchise.shortLabel} &rarr;
                  </Link>
                )}
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
