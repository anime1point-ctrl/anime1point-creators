import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CREATOR_MAP } from '../data/creators'
import { VIDEOS } from '../data/videos'
import { CATEGORY_MAP } from '../data/categories'
import { useVideoModal } from '../context/VideoModalContext'
import { Analytics } from '../utils/analytics'
import { isRealYouTubeId } from '../utils/youtube'
import { fetchCreatorVideos } from '../utils/youtubeApi'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const PAGE_SIZE = 6

const STATUS_BADGE = {
  'anime1point': { label: 'ANIME1POINT CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r from-purple/30 to-accent/30 text-accent border border-accent/40' },
  'featured':    { label: 'FEATURED CREATOR',    className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gold/20 text-gold border border-gold/30' },
  'rising':      { label: 'RISING CREATOR',      className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-400 border border-green-500/30' },
}

const CLAIM_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe3xo8raxfTVJwZIZo1nxsYHB37TlonQplxajAd8tI8o2e4tQ/viewform'

// ─── Static VideoCard (for videos.js static data) ────────────────────────────
function StaticVideoCard({ video, creatorName, creatorGradient }) {
  const { openModal } = useVideoModal()
  const [imgError, setImgError] = useState(false)
  const hasRealThumb = isRealYouTubeId(video.id) && !imgError

  function handleClick() {
    Analytics.videoOpened(video.id, video.title, creatorName)
    openModal(video.id, video.title, creatorName)
  }

  return (
    <div className="card card-hover group cursor-pointer" onClick={handleClick}>
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
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center"
               style={{ background: creatorGradient || 'linear-gradient(135deg,#1a0a2e,#0d0d1a)' }}>
            <span className="text-white text-4xl opacity-70">&#9654;</span>
            {creatorName && <span className="text-white text-xs font-orbitron font-black opacity-80 truncate max-w-full">{creatorName}</span>}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">&#9654;</span>
        </div>
        <span className={`absolute top-2 left-2 badge-${video.category === 'light-novel' ? 'novels' : video.category}`}>
          {CATEGORY_MAP[video.category]?.label || video.category}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">{video.title}</h3>
      <p className="text-xs text-text-secondary mt-1">{video.publishedAt}</p>
    </div>
  )
}

// ─── Live YouTube VideoCard (for real-time API data) ─────────────────────────
function LiveVideoCard({ video, creator, onPlay }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="card card-hover group cursor-pointer" onClick={() => onPlay(video)}>
      <div className="relative mb-3 rounded-lg overflow-hidden aspect-video bg-black">
        {!imgError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
               style={{ background: creator.avatarGradient }}>
            <span className="text-white text-4xl opacity-70">&#9654;</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">&#9654;</span>
        </div>
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {video.duration}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-accent transition-colors">{video.title}</h3>
      <div className="flex items-center gap-3 mt-1.5 text-xs text-text-secondary">
        {video.viewCount && <span>👁 {video.viewCount} views</span>}
        {video.likeCount && <span>👍 {video.likeCount}</span>}
        {video.publishedFmt && <span>{video.publishedFmt}</span>}
      </div>
    </div>
  )
}

// ─── Featured Video Hero ──────────────────────────────────────────────────────
function FeaturedVideoHero({ creator, videoId }) {
  const { openModal } = useVideoModal()
  const video = VIDEOS.find(v => v.id === videoId)
  const [imgError, setImgError] = useState(false)
  const showThumb = isRealYouTubeId(videoId) && !imgError
  if (!videoId) return null

  return (
    <div className="mb-8">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Featured Video</p>
      <div
        className="relative rounded-xl overflow-hidden aspect-video bg-black cursor-pointer group"
        onClick={() => {
          Analytics.videoOpened(videoId, video?.title || '', creator.name)
          openModal(videoId, video?.title || creator.name, creator.name)
        }}
      >
        {showThumb ? (
          <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
               alt={video?.title || 'Featured video'}
               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
               onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: creator.avatarGradient }}>
            <span className="text-white text-6xl opacity-60">&#9654;</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-2xl ml-1">&#9654;</span>
          </div>
        </div>
        {video && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-semibold text-sm line-clamp-2">{video.title}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Live YouTube Feed Section ────────────────────────────────────────────────
function LiveYouTubeFeed({ creator, firestoreId }) {
  const { openModal } = useVideoModal()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!firestoreId) { setLoading(false); return }

    setLoading(true)
    fetchCreatorVideos(firestoreId, 12)
      .then(vids => { setVideos(vids); setLoading(false) })
      .catch(err => {
        console.error('LiveYouTubeFeed error:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [firestoreId])

  function handlePlay(video) {
    Analytics.videoOpened(video.id, video.title, creator.name)
    openModal(video.id, video.title, creator.name)
  }

  if (loading) return (
    <div className="flex items-center gap-3 py-12 text-text-secondary">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      Loading latest videos from YouTube...
    </div>
  )

  if (error) return (
    <div className="py-8 text-center">
      <p className="text-text-secondary text-sm">Could not load live feed: {error}</p>
    </div>
  )

  if (videos.length === 0) return (
    <div className="py-12 text-center text-text-secondary text-sm">No videos found.</div>
  )

  const shown = videos.slice(0, page * PAGE_SIZE)
  const hasMore = shown.length < videos.length

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {shown.map(v => (
          <LiveVideoCard key={v.id} video={v} creator={creator} onPlay={handlePlay} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center">
          <button onClick={() => setPage(p => p + 1)} className="btn-outline px-8">
            Load More ({videos.length - shown.length} remaining)
          </button>
        </div>
      )}
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreatorProfile() {
  const { id } = useParams()
  const creator = CREATOR_MAP[id]
  const [page, setPage] = useState(1)
  const [firestoreId, setFirestoreId] = useState(null)
  const [hasLiveFeed, setHasLiveFeed] = useState(false)

  useEffect(() => {
    if (creator) Analytics.creatorProfileViewed(id, creator.name)
  }, [id, creator])

  // Check if this creator has a live Firestore profile (registered & approved)
  useEffect(() => {
    if (!id) return
    // Look up by handle or creatorId in Firestore
    // The creator's Firestore document ID is their Firebase UID
    // We query by channelId (youtubeChannelId from creators.js)
    async function checkLiveFeed() {
      try {
        // We store a mapping creatorSlug -> uid in a public Firestore collection
        const mappingDoc = await getDoc(doc(db, 'creatorSlugs', id))
        if (mappingDoc.exists()) {
          const uid = mappingDoc.data().uid
          // Check if approved
          const creatorDoc = await getDoc(doc(db, 'creators', uid))
          if (creatorDoc.exists() && creatorDoc.data().status === 'approved' && creatorDoc.data().hasApiKey) {
            setFirestoreId(uid)
            setHasLiveFeed(true)
          }
        }
      } catch (err) {
        // No live feed — fall back to static data
        console.log('No live feed for', id)
      }
    }
    checkLiveFeed()
  }, [id])

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

  const badge = STATUS_BADGE[creator.creatorStatus]
  const allVideos = VIDEOS.filter(v => v.creatorId === id)
  const shown = allVideos.slice(0, page * PAGE_SIZE)
  const hasMore = shown.length < allVideos.length
  const featuredVideoId = creator.featuredVideoIds?.[0] || null
  const isExternalCreator = creator.creatorStatus === 'featured' || creator.creatorStatus === 'rising'

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-bg-card border-b border-border-dim">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Link to="/creators" className="text-text-secondary text-sm hover:text-text-primary transition-colors mb-6 inline-block">
            &larr; All Creators
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black font-orbitron text-white shrink-0"
                 style={{ background: creator.avatarGradient }}>
              {creator.avatar}
            </div>
            <div className="flex-1">
              {badge && <div className="mb-2"><span className={badge.className}>{badge.label}</span></div>}
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="font-orbitron font-black text-2xl text-text-primary">{creator.name}</h1>
                <span className={`badge-${creator.category}`}>{CATEGORY_MAP[creator.category]?.label || creator.category}</span>
                {hasLiveFeed && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse inline-block" />
                    LIVE FEED
                  </span>
                )}
              </div>
              <p className="text-text-secondary text-sm mb-3">{creator.handle}</p>
              <p className="text-text-secondary leading-relaxed max-w-2xl mb-4 text-sm">{creator.bio}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {creator.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-bg-card2 border border-border-dim rounded-full text-text-secondary">{t}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={creator.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-yt"
                   onClick={() => Analytics.youtubeClicked(id, creator.name)}>
                  &#9654; Watch on YouTube
                </a>
                <Link to={`/category/${creator.category}`} className="btn-outline">
                  More {CATEGORY_MAP[creator.category]?.label} &rarr;
                </Link>
                {isExternalCreator && (
                  <a href={`${CLAIM_FORM_URL}?usp=pp_url&entry.creatorId=${encodeURIComponent(creator.name)}&entry.channelUrl=${encodeURIComponent(creator.youtubeUrl)}`}
                     target="_blank" rel="noopener noreferrer"
                     className="text-xs px-3 py-2 border border-border-dim rounded-lg text-text-secondary hover:text-text-primary hover:border-purple/40 transition-all"
                     onClick={() => Analytics.claimProfileClicked(id, creator.name)}>
                    &#9998; Claim Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {featuredVideoId && !hasLiveFeed && <FeaturedVideoHero creator={creator} videoId={featuredVideoId} />}

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-orbitron text-lg font-black text-text-primary">
            {hasLiveFeed ? (
              <>Latest Videos <span className="text-red-400 text-xs ml-2">● LIVE</span></>
            ) : (
              <>Videos <span className="text-text-secondary text-sm font-rajdhani font-normal ml-2">({allVideos.length})</span></>
            )}
          </h2>
        </div>

        {/* Live YouTube Feed (approved creators with API key) */}
        {hasLiveFeed && firestoreId ? (
          <LiveYouTubeFeed creator={creator} firestoreId={firestoreId} />
        ) : allVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {shown.map(v => (
                <StaticVideoCard key={v.id + v.creatorId} video={v} creatorName={creator.name} creatorGradient={creator.avatarGradient} />
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
