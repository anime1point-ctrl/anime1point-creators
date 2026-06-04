import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TRENDING_VIDEOS, LATEST_VIDEOS, HIDDEN_GEM_VIDEOS, FEATURED_VIDEOS } from '../data/videos'
import { CREATOR_MAP, APPROVED_CREATORS } from '../data/creators'
import { CATEGORY_MAP } from '../data/categories'
import { getHomeSections } from '../data/homeSections'
import { useVideoModal } from '../context/VideoModalContext'
import { Analytics } from '../utils/analytics'

// Returns true only for real 11-char YouTube video IDs (not placeholder IDs)
function hasRealThumbnail(videoId) {
  if (!videoId) return false
  if (videoId.includes('_vid_')) return false
  return /^[A-Za-z0-9_\-]{11}$/.test(videoId)
}

function VideoCard({ video, priority = false }) {
  const { openModal } = useVideoModal()
  const creator = CREATOR_MAP[video.creatorId]
  const [imgError, setImgError] = useState(false)
  const showThumb = hasRealThumbnail(video.id) && !imgError
  const categoryLabel = CATEGORY_MAP[video.category]?.label || video.category
  const badgeCategory = video.category === 'light-novel' ? 'novels' : video.category

  function handleOpen() {
    Analytics.videoOpened(video.id, video.title, creator ? creator.name : '')
    openModal(video.id, video.title, creator ? creator.name : '')
  }

  return (
    <div className="card card-hover group flex flex-col cursor-pointer" onClick={handleOpen}>
      <div className="relative mb-3 rounded-lg overflow-hidden aspect-video bg-black">
        {showThumb ? (
          <img
            src={`https://i.ytimg.com/vi/${video.id}/${priority ? 'hqdefault' : 'mqdefault'}.jpg`}
            alt={video.title}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center"
            style={{ background: creator ? creator.avatarGradient : 'linear-gradient(135deg,#1a0a2e,#0d0d1a)' }}
          >
            <span className="text-white text-4xl opacity-70">&#9654;</span>
            {creator && (
              <span className="text-white text-xs font-orbitron font-black opacity-80 truncate max-w-full">{creator.name}</span>
            )}
            <span className="text-white text-xs opacity-50">Video Coming Soon</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">&#9654;</span>
        </div>
        <span className={`absolute top-2 left-2 badge-${badgeCategory}`}>{categoryLabel}</span>
      </div>
      <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors mb-2">
        {video.title}
      </h3>
      {creator && (
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border-dim">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black font-orbitron text-white shrink-0"
            style={{ background: creator.avatarGradient }}
          >
            {creator.avatar[0]}
          </div>
          <span className="text-xs text-text-secondary truncate">{creator.name}</span>
          <span className="text-xs text-text-secondary ml-auto shrink-0">{video.publishedAt}</span>
        </div>
      )}
    </div>
  )
}

function VideoSection({ section, videos }) {
  const filtered = section.categoryFilter
    ? videos.filter(v => v.category === section.categoryFilter || (section.categoryFilter === 'novels' && v.category === 'light-novel'))
    : videos
  const items = filtered.slice(0, section.maxItems || 6)
  if (!items.length) return null
  return (
    <section className="py-12 border-b border-border-dim">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="section-tag">{section.tag}</span>
          {section.liveBadge && (
            <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent border border-accent/30 rounded-full font-semibold animate-pulse">LIVE</span>
          )}
          <h2 className="font-orbitron font-black text-xl text-text-primary ml-1">{section.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((v, i) => <VideoCard key={v.id + v.creatorId} video={v} priority={i < 3} />)}
        </div>
      </div>
    </section>
  )
}

function FeaturedCreatorsSection({ maxItems = 6 }) {
  const creators = APPROVED_CREATORS.filter(c => c.featured).slice(0, maxItems)
  return (
    <section className="py-12 bg-bg-card border-y border-border-dim">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="section-tag">Spotlight</span>
          <h2 className="font-orbitron font-black text-xl text-text-primary ml-1">Featured Creators</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators.map(c => (
            <Link key={c.id} to={`/creator/${c.id}`} className="card card-hover group text-center flex flex-col items-center gap-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-black font-orbitron text-white transition-transform group-hover:scale-110"
                style={{ background: c.avatarGradient }}
              >
                {c.avatar}
              </div>
              <div>
                <p className="font-orbitron font-black text-sm text-text-primary group-hover:text-accent transition-colors">{c.name}</p>
                <p className="text-text-secondary text-xs mt-0.5">{c.handle}</p>
                <span className={`badge-${c.category} mt-2 inline-block`}>{CATEGORY_MAP[c.category]?.label || c.category}</span>
              </div>
              <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed">{c.bio.slice(0, 80)}...</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/creators" className="btn-outline">View All Creators</Link>
        </div>
      </div>
    </section>
  )
}

function Hero() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  function handleSearch(e) {
    e.preventDefault()
    if (q.trim()) {
      Analytics.searchPerformed(q.trim(), 0, 0)
      navigate(`/search?q=${encodeURIComponent(q.trim())}`)
    }
  }
  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0d0d1a 0%,#1a0a2e 50%,#0d0d1a 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="section-tag mb-4">Anime &middot; Manga &middot; Light Novels</span>
        <h1 className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
          The Best Anime Content<br />
          <span className="highlight">All In One Place</span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-8">
          Curated videos from the top Anime, Manga, and Light Novel creators on YouTube — discovered, organised, and ready to watch.
        </p>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-8">
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search videos, series, creators..." className="form-input flex-1" />
          <button type="submit" className="btn-primary shrink-0">Search</button>
        </form>
        <div className="flex flex-wrap gap-2 justify-center">
          <Link to="/category/anime" className="btn-outline text-sm">Anime</Link>
          <Link to="/category/manga" className="btn-outline text-sm">Manga</Link>
          <Link to="/category/novels" className="btn-outline text-sm">Light Novels</Link>
          <Link to="/creators" className="btn-primary text-sm">Browse All Creators</Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const sections = getHomeSections().filter(s => s.enabled).sort((a, b) => a.order - b.order)
  const allVideos = useMemo(() => [...TRENDING_VIDEOS, ...LATEST_VIDEOS, ...HIDDEN_GEM_VIDEOS, ...FEATURED_VIDEOS], [])
  const sectionVideos = useMemo(() => ({
    trending: TRENDING_VIDEOS,
    latest: LATEST_VIDEOS,
    'hidden-gem': HIDDEN_GEM_VIDEOS,
    featured: TRENDING_VIDEOS,
    'light-novel-spotlight': allVideos.filter(v => v.category === 'light-novel' || v.category === 'novels'),
    'manga-deep-dives': allVideos.filter(v => v.category === 'manga'),
  }), [allVideos])
  return (
    <div className="min-h-screen">
      <Hero />
      {sections.map(section => {
        if (section.id === 'featured') return <FeaturedCreatorsSection key={section.id} maxItems={section.maxItems} />
        return <VideoSection key={section.id} section={section} videos={sectionVideos[section.id] || TRENDING_VIDEOS} />
      })}
    </div>
  )
                          }
