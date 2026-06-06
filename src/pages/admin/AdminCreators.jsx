import { APPROVED_CREATORS } from '../../data/creators'

const STATUS_BADGE = {
  'anime1point': { label: 'ANIME1POINT CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gradient-to-r from-purple/30 to-accent/30 text-accent border border-accent/40' },
  'featured': { label: 'FEATURED CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-gold/20 text-gold border border-gold/30' },
  'rising': { label: 'RISING CREATOR', className: 'text-xs px-2.5 py-1 rounded-full font-semibold bg-green-500/20 text-green-400 border border-green-500/30' },
}

export default function AdminCreators() {
  return (
    <div>
      <h1 className="font-orbitron text-2xl font-black text-text-primary mb-2">Creators</h1>
      <p className="text-text-secondary text-sm mb-8">{APPROVED_CREATORS.length} approved creators on the platform.</p>

      <div className="space-y-3">
        {APPROVED_CREATORS.map(c => {
          const badge = STATUS_BADGE[c.creatorStatus]
          return (
            <div key={c.id} className="card flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black font-orbitron text-white shrink-0"
                style={{ background: c.avatarGradient }}>
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-orbitron font-black text-sm text-text-primary">{c.name}</p>
                  {badge && <span className={badge.className}>{badge.label}</span>}
                  <span className={`badge-${c.category}`}>{c.category}</span>
                </div>
                <p className="text-text-secondary text-xs mt-0.5">{c.handle}</p>
                <p className="text-text-secondary text-xs mt-1 line-clamp-1 max-w-xl">{c.bio}</p>
              </div>
              <div className="shrink-0">
                <a href={c.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg border border-yt-red/30 text-yt-red hover:bg-yt-red/10 transition-colors">
                  &#9654; YouTube
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border-dim text-center">
        <p className="text-text-secondary text-sm">Full CRUD management coming in Sprint 3.</p>
      </div>
    </div>
  )
}
