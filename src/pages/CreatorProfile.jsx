—import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CREATOR_MAP } from '../data/creators'
import { VIDEOS } from '../data/videos'
import { CATEGORY_MAP } from '../data/categories'
import { useVideoModal } from '../context/VideoModalContext'
import { Analytics } from '../utils/analytics'
import { isRealYouTubeId } from '../utils/youtube'
import { fetchCreatorVideos } from '../utils/youtubeApi'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '../firebase'

const PAGE_SIZE = 6

// Cloud Function base URL
const CF_BASE = 'https://us-central1-anime1point-hub.cloudfunctions.net'

const STATUS_BADGE = {
  'anime1point': { label: 'ANIME1POINT CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r from-purple/30 to-accent/30 text-accent border border-accent/40' },
  'featured':    { label: 'FEATURED CREATOR',    className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gold/20 text-gold border border-gold/30' },
  'rising':      { label: 'RISING CREATOR',      className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-400 border border-green-500/30' },
}

const CLAIM_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe3xo8raxfTVJwZIZo1nxsYHB37TlonQplxajAd8tI8o2e4tQ/viewform'

// ─── StarRating component ─────────────────────────────────────────────────────
// Displays the current aggregate rating and lets a signed-in viewer submit theirs.
// Props:
//   creatorFirestoreId — the Firestore UID of the approved creator
//   initialAverage     — ratingAverage from Firestore (number | null)
//   initialCount       — ratingCount from Firestore (number | 0)
function StarRating({ creatorFirestoreId, initialAverage, initialCount }) {
  const [average, setAverage]         = useState(initialAverage || 0)
  const [count, setCount]             = useState(initialCount   || 0)
  const [hovered, setHovered]         = useState(0)      // star being hovered
  const [myRating, setMyRating]       = useState(0)      // viewer's existing rating
  const [submitting, setSubmitting]   = useState(false)
  const [feedback, setFeedback]       = useState('')     // success / error message
  const [feedbackType, setFeedbackType] = useState('')   // 'success' | 'error'
  const [viewer, setViewer]           = useState(null)   // Firebase Auth user
  const [loadingMyRating, setLoadingMyRating] = useState(true)

  // Track auth state
  useEffect(() => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, (u) => setViewer(u))
    return unsub
  }, [])

  // Load the viewer's existing rating for this creator (if any)
  useEffect(() => {
    if (!viewer || !creatorFirestoreId) {
      setLoadingMyRating(false)
      return
    }
    const docId = `${creatorFirestoreId}_${viewer.uid}`
    getDoc(doc(db, 'creatorRatings', docId))
      .then(snap => {
        if (snap.exists()) setMyRating(snap.data().rating || 0)
        setLoadingMyRating(false)
      })
      .catch(() => setLoadingMyRating(false))
  }, [viewer, creatorFirestoreId])

  // Sync if parent passes updated aggregate values
  useEffect(() => { if (initialAverage) setAverage(initialAverage) }, [initialAverage])
  useEffect(() => { if (initialCount)   setCount(initialCount)     }, [initialCount])

  const displayStars = hovered || myRating || 0

  async function handleRate(star) {
    if (!viewer) {
      setFeedback('Sign in to rate this creator.')
      setFeedbackType('error')
      return
    }
    if (submitting) return
    setSubmitting(true)
    setFeedback('')
    try {
      const token = await viewer.getIdToken()
      const res = await fetch(`${CF_BASE}/submitRating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ creatorId: creatorFirestoreId, rating: star }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit rating')
      setMyRating(star)
      setAverage(data.average)
      setCount(data.count)
      setFeedback(data.message || 'Thanks for rating!')
      setFeedbackType('success')
    } catch (err) {
      setFeedback(err.message || 'Something went wrong. Please try again.')
      setFeedbackType('error')
    } finally {
      setSubmitting(false)
    }
  }

  // Render filled / half / empty stars for the aggregate display
  function renderDisplayStars(avg, total) {
    if (!total) return <span className="text-text-secondary text-sm">No ratings yet</span>
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-0.5">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={`text-lg ${i <= Math.round(avg) ? 'text-yellow-400' : 'text-text-secondary/30'}`}>★</span>
          ))}
        </div>
        <span className="font-orbitron font-black text-text-primary text-sm">{avg.toFixed(1)}</span>
        <span className="text-text-secondary text-xs">{total} {total === 1 ? 'rating' : 'ratings'}</span>
      </div>
    )
  }

  return (
    <div className="mt-5 pt-5 border-t border-border-dim">
      {/* Aggregate display */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Creator Rating</p>
        {renderDisplayStars(average, count)}
      </div>

      {/* Interactive rating UI */}
      {!loadingMyRating && (
        <div>
          <p className="text-xs text-text-secondary mb-2">
            {myRating ? 'Your rating — click to update:' : 'Rate this creator:'}
          </p>
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                disabled={submitting}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className={`text-2xl transition-all duration-100 leading-none ${
                  submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-125'
                } ${
                  star <= (hovered || myRating) ? 'text-yellow-400' : 'text-text-secondary/30'
                }`}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
            {submitting && (
              <span className="ml-2 w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin inline-block" />
            )}
          </div>
          {!viewer && (
            <p className="text-xs text-text-secondary">
              <Link to="/viewers" className="text-accent hover:underline">Sign in as a viewer</Link> to rate this creator.
            </p>
          )}
          {feedback && (
            <p className={`text-xs mt-1 ${feedbackType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {feedbackType === 'success' ? '✓ ' : '✕ '}{feedback}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Static VideoCard ─────────────────────────────────────────────────────────
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

// ─── Live YouTube VideoCard ───────────────────────────────────────────────────
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
        {video.viewCount  && <span>👁 {video.viewCount} views</span>}
        {video.likeCount  && <span>👍 {video.likeCount}</span>}
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
  const [videos, setVideos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [page, setPage]       = useState(1)

  useEffect(() => {
    if (!firestoreId) { setLoading(false); return }
    setLoading(true)
    fetchCreatorVideos(firestoreId, 12)
      .then(vids => { setVideos(vids); setLoading(false) })
      .catch(err  => { console.error('LiveYouTubeFeed error:', err); setError(err.message); setLoading(false) })
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
  const [page, setPage]               = useState(1)
  const [firestoreId, setFirestoreId] = useState(null)
  const [hasLiveFeed, setHasLiveFeed] = useState(false)
  const [ratingAverage, setRatingAverage] = useState(null)
  const [ratingCount, setRatingCount]     = useState(0)

  useEffect(() => {
    if (creator) Analytics.creatorProfileViewed(id, creator.name)
  }, [id, creator])

  // Check for live Firestore profile and load rating aggregate
  useEffect(() => {
    if (!id) return
    async function checkLiveFeed() {
      try {
        const mappingDoc = await getDoc(doc(db, 'creatorSlugs', id))
        if (mappingDoc.exists()) {
          const uid = mappingDoc.data().uid
          const creatorDoc = await getDoc(doc(db, 'creators', uid))
          if (creatorDoc.exists() && creatorDoc.data().status === 'approved' && creatorDoc.data().hasApiKey) {
            setFirestoreId(uid)
            setHasLiveFeed(true)
          }
          // Load rating aggregate whether or not the feed is live
          const data = creatorDoc.data() || {}
          if (data.ratingAverage) setRatingAverage(data.ratingAverage)
          if (data.ratingCount)   setRatingCount(data.ratingCount)
        }
      } catch (err) {
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
  const shown     = allVideos.slice(0, page * PAGE_SIZE)
  const hasMore   = shown.length < allVideos.length
  const featuredVideoId  = creator.featuredVideoIds?.[0] || null
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

              {/* ── Star Rating ── */}
              {firestoreId && (
                <StarRating
                  creatorFirestoreId={firestoreId}
                  initialAverage={ratingAverage}
                  initialCount={ratingCount}
                />
              )}
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
