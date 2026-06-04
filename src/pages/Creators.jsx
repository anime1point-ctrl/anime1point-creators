import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { APPROVED_CREATORS } from '../data/creators'
import { VIDEOS } from '../data/videos'
import { CATEGORIES, CATEGORY_MAP } from '../data/categories'

const ALL_FILTER = { id: 'all', label: 'All Creators', icon: '\u2605' }
const FILTERS = [ALL_FILTER, ...CATEGORIES]

function CreatorCard({ creator }) {
    const videoCount = VIDEOS.filter(v => v.creatorId === creator.id).length
    return (
          <Link
                  to={`/creator/${creator.id}`}
                  className="card card-hover group flex flex-col gap-4 focus:outline-none focus:ring-2 focus:ring-purple/60"
                >
            {/* Avatar + meta */}
                <div className="flex items-start gap-4">
                        <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center text-base font-black font-orbitron text-white shrink-0 transition-transform duration-200 group-hover:scale-110"
                                    style={{ background: creator.avatarGradient }}
                                  >
                          {creator.avatar}
                        </div>div>
                        <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                              <h3 className="font-orbitron font-black text-sm text-text-primary truncate group-hover:text-accent transition-colors">
                                                {creator.name}
                                              </h3>h3>
                                    {creator.official && (
                                <span className="text-xs px-1.5 py-0.5 bg-gold/20 text-gold border border-gold/30 rounded font-semibold shrink-0">
                                                OFFICIAL
                                </span>span>
                                              )}
                                  </div>div>
                                  <p className="text-text-secondary text-xs mt-0.5">{creator.handle}</p>p>
                                  <span className={`badge-${creator.category} mt-1 inline-block`}>
                                    {CATEGORY_MAP[creator.category]?.label || creator.category}
                                  </span>span>
                        </div>div>
                </div>div>
          
            {/* Bio */}
                <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                  {creator.bio}
                </p>p>
          
            {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {creator.tags.slice(0, 3).map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 bg-bg-card2 border border-border-dim rounded-full text-text-secondary">
                              {t}
                            </span>span>
                          ))}
                  {creator.tags.length > 3 && (
                            <span className="text-xs px-2 py-0.5 rounded-full text-text-secondary">+{creator.tags.length - 3}</span>span>
                        )}
                </div>div>
          
            {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border-dim">
                        <span className="text-xs text-text-secondary">{videoCount} video{videoCount !== 1 ? 's' : ''}</span>span>
                        <span className="text-xs text-accent font-semibold group-hover:underline">View Profile &rarr;</span>span>
                </div>div>
          </Link>Link>
        )
}

export default function Creators() {
    const [search, setSearch] = useState('')
        const [activeFilter, setActiveFilter] = useState('all')
          
            const filtered = useMemo(() => {
                  let list = APPROVED_CREATORS
                        if (activeFilter !== 'all') list = list.filter(c => c.category === activeFilter)
                              if (search.trim()) {
                                      const q = search.toLowerCase()
                                              list = list.filter(c =>
                                                        c.name.toLowerCase().includes(q) ||
                                                        c.handle.toLowerCase().includes(q) ||
                                                        c.bio.toLowerCase().includes(q) ||
                                                        c.tags.some(t => t.toLowerCase().includes(q))
                                                      )
                              }
                  return list
            }, [search, activeFilter])
              
                return (
                      <div className="min-h-screen">
                        {/* Hero */}
                            <div className="page-hero">
                                    <span className="section-tag">Creator Directory</span>span>
                                    <h1 className="font-orbitron">
                                              Browse <span className="highlight">Creators</span>span>
                                    </h1>h1>
                                    <p className="text-text-secondary mt-2">
                                              Discover YouTube creators covering Anime, Manga and Light Novels.
                                    </p>p>
                            
                              {/* Search */}
                                    <div className="max-w-lg mx-auto mt-6 relative">
                                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm">&#128269;</span>span>
                                              <input
                                                            type="search"
                                                            value={search}
                                                            onChange={e => setSearch(e.target.value)}
                                                            placeholder="Search creators by name, tag, or content type…"
                                                            className="form-input pl-10"
                                                          />
                                    </div>div>
                            </div>div>
                      
                            <div className="max-w-7xl mx-auto px-4 py-10">
                              {/* Filters */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                      {FILTERS.map(f => (
                                    <button
                                                    key={f.id}
                                                    onClick={() => setActiveFilter(f.id)}
                                                    className={`text-sm px-4 py-2 rounded-full border font-semibold transition-all ${
                                                                      activeFilter === f.id
                                                                        ? 'bg-purple/20 text-purple border-purple/40'
                                                                        : 'border-border-dim text-text-secondary hover:border-purple/30 hover:text-text-primary'
                                                    }`}
                                                  >
                                      {f.icon} {f.label}
                                    </button>button>
                                  ))}
                                              <span className="ml-auto text-xs text-text-secondary self-center">
                                                {filtered.length} creator{filtered.length !== 1 ? 's' : ''}
                                              </span>span>
                                    </div>div>
                            
                              {/* Grid */}
                              {filtered.length > 0 ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {filtered.map(c => <CreatorCard key={c.id} creator={c} />)}
                                  </div>div>
                                ) : (
                                  <div className="text-center py-20">
                                              <p className="text-5xl mb-4">&#128269;</p>p>
                                              <p className="text-text-secondary text-lg">No creators found for <strong className="text-text-primary">"{search}"</strong>strong></p>p>
                                              <button onClick={() => { setSearch(''); setActiveFilter('all') }} className="btn-outline mt-4">
                                                            Clear filters
                                              </button>button>
                                  </div>div>
                                    )}
                            </div>div>
                      </div>div>
                    )
}</Link>
