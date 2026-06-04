import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CREATOR_MAP } from '../data/creators'
import { VIDEOS } from '../data/videos'
import { CATEGORY_MAP } from '../data/categories'
import { useVideoModal } from '../context/VideoModalContext'
import { Analytics } from '../utils/analytics'

const PAGE_SIZE = 6

const STATUS_BADGE = {
  'anime1point': { label: 'ANIME1POINT CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r from-purple/30 to-accent/30 text-accent border border-accent/40' },
  'featured':    { label: 'FEATURED CREATOR',    className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gold/20 text-gold border border-gold/30' },
  'rising':      { label: 'RISING CREATOR',      className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-400 border border-green-500/30' },
}

// Google Form URL for creator claim — replace with your actual form URL
const CLAIM_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe3xo8raxfTVJwZIZo1nxsYHB37TlonQplxajAd8tI8o2e4tQ/viewform'

function isRealYouTubeId(id) {
  return /^[A-Za-z0-9_\-]{11}$/.test(id) && !id.includes('_vid_')
}

function VideoCard({ video, creatorName, creatorGradient }) {
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
