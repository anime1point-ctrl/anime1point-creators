import { APPROVED_CREATORS } from '../../data/creators'
import { VIDEOS, TRENDING_VIDEOS, LATEST_VIDEOS } from '../../data/videos'
import { CATEGORIES } from '../../data/categories'

const STATS = [
  { label: 'Total Creators',  value: APPROVED_CREATORS.length,  color: 'text-purple'  },
  { label: 'Total Videos',    value: VIDEOS.length,              color: 'text-accent2' },
  { label: 'Categories',      value: CATEGORIES.length,          color: 'text-teal'    },
  { label: 'Trending',        value: TRENDING_VIDEOS.length,     color: 'text-accent'  },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-orbitron text-2xl font-black text-text-primary mb-2">Dashboard</h1>
      <p className="text-text-secondary text-sm mb-8">Overview of the Anime1Point Creators Hub.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map(s => (
          <div key={s.label} className="card text-center">
            <p className={`font-orbitron text-3xl font-black ${s.color} mb-1`}>{s.value}</p>
            <p className="text-text-secondary text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-orbitron text-sm font-black text-text-primary mb-4">Recent Creators</h2>
          <div className="space-y-3">
            {APPROVED_CREATORS.slice(0, 5).map(c => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-orbitron text-white shrink-0"
                     style={{ background: c.avatarGradient }}>{c.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{c.name}</p>
                  <p className="text-xs text-text-secondary">{c.handle}</p>
                </div>
                <span className={`badge-${c.category}`}>{c.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="font-orbitron text-sm font-black text-text-primary mb-4">Latest Videos</h2>
          <div className="space-y-3">
            {LATEST_VIDEOS.slice(0, 5).map(v => (
              <div key={v.id} className="flex items-center gap-3">
                <img src={`https://i.ytimg.com/vi/${v.id}/default.jpg`} alt=""
                     className="w-12 h-9 rounded object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-text-primary line-clamp-1">{v.title}</p>
                  <p className="text-xs text-text-secondary">{v.publishedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
