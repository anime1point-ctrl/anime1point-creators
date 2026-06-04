import { CATEGORIES } from '../../data/categories'
import { VIDEOS } from '../../data/videos'

export default function AdminCategories() {
  return (
    <div>
      <h1 className="font-orbitron text-2xl font-black text-text-primary mb-2">Categories</h1>
      <p className="text-text-secondary text-sm mb-8">{CATEGORIES.length} content categories on the platform.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map(cat => {
          const count = VIDEOS.filter(v => v.category === cat.id).length
          return (
            <div key={cat.id} className="card">
              <div className="flex items-center gap-3 mb-4">
                <span dangerouslySetInnerHTML={{ __html: cat.icon }} className="text-2xl" />
                <h2 className="font-orbitron font-black text-text-primary">{cat.label}</h2>
              </div>
              <p className="text-text-secondary text-sm mb-4">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className={`${cat.badgeClass}`}>{cat.id}</span>
                <span className="text-text-secondary text-xs">{count} videos</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-border-dim text-center">
        <p className="text-text-secondary text-sm">Category management (add/edit/delete) coming in Sprint 3.</p>
      </div>
    </div>
  )
}
