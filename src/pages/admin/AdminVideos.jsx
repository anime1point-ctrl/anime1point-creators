import { useState } from 'react'
import { VIDEOS } from '../../data/videos'
import { CREATOR_MAP } from '../../data/creators'

const SECTIONS = ['all', 'trending', 'latest', 'hidden-gem', 'featured']

export default function AdminVideos() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? VIDEOS : VIDEOS.filter(v => v.section === filter)
  return (
    <div>
      <h1 className="font-orbitron text-2xl font-black text-text-primary mb-2">Videos</h1>
      <p className="text-text-secondary text-sm mb-6">{VIDEOS.length} total videos.</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {SECTIONS.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${filter === s ? 'bg-purple/20 text-purple border-purple/40' : 'border-border-dim text-text-secondary hover:border-purple/30'}`}>{s}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(v => {
          const creator = CREATOR_MAP[v.creatorId]
          return (
            <div key={v.id + v.creatorId} className="card flex items-center gap-4">
              <img src={`https://i.ytimg.com/vi/${v.id}/default.jpg`} alt="" className="w-16 h-12 rounded object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary line-clamp-1">{v.title}</p>
                <p className="text-xs text-text-secondary mt-0.5">{creator?.name} - {v.category} - {v.publishedAt}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded border font-semibold shrink-0 bg-bg-card2 text-text-secondary border-border-dim">{v.section}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
