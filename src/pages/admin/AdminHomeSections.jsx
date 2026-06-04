import { useState } from 'react'
import { getHomeSections, saveHomeSections, resetHomeSections } from '../../data/homeSections'

export default function AdminHomeSections() {
  const [sections, setSections] = useState(() => getHomeSections())
  const [saved, setSaved] = useState(false)

  function toggle(id) {
    setSections(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s))
    setSaved(false)
  }

  function updateMaxItems(id, val) {
    setSections(prev => prev.map(s => s.id === id ? { ...s, maxItems: parseInt(val) || 6 } : s))
    setSaved(false)
  }

  function moveUp(index) {
    if (index === 0) return
    const next = [...sections]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    setSections(next.map((s, i) => ({ ...s, order: i + 1 })))
    setSaved(false)
  }

  function moveDown(index) {
    if (index === sections.length - 1) return
    const next = [...sections]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    setSections(next.map((s, i) => ({ ...s, order: i + 1 })))
    setSaved(false)
  }

  function handleSave() {
    saveHomeSections(sections)
    setSaved(true)
  }

  function handleReset() {
    resetHomeSections()
    setSections(getHomeSections())
    setSaved(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-orbitron text-2xl font-black text-text-primary">Homepage Sections</h1>
        <div className="flex gap-2">
          <button onClick={handleReset} className="text-xs px-3 py-1.5 rounded-lg border border-border-dim text-text-secondary hover:text-text-primary transition-colors">Reset</button>
          <button onClick={handleSave} className={`btn-primary text-xs px-4 ${saved ? 'opacity-60' : ''}`}>
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
      <p className="text-text-secondary text-sm mb-8">Configure which sections appear on the homepage and in what order.</p>

      <div className="space-y-4">
        {sections.sort((a, b) => a.order - b.order).map((section, index) => (
          <div key={section.id} className={`card flex flex-col sm:flex-row sm:items-center gap-4 ${!section.enabled ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => moveUp(index)} disabled={index === 0}
                className="w-7 h-7 rounded flex items-center justify-center border border-border-dim text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors text-xs">
                &#9650;
              </button>
              <button onClick={() => moveDown(index)} disabled={index === sections.length - 1}
                className="w-7 h-7 rounded flex items-center justify-center border border-border-dim text-text-secondary hover:text-text-primary disabled:opacity-30 transition-colors text-xs">
                &#9660;
              </button>
              <span className="text-text-secondary text-xs w-5 text-center">{index + 1}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-orbitron font-black text-sm text-text-primary">{section.title}</p>
                <span className="section-tag text-xs">{section.tag}</span>
                {section.liveBadge && <span className="text-xs px-1.5 py-0.5 bg-accent/20 text-accent border border-accent/30 rounded font-semibold">LIVE</span>}
              </div>
              <p className="text-text-secondary text-xs mt-0.5">ID: {section.id}</p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <label className="text-xs text-text-secondary whitespace-nowrap">Max items:</label>
                <input type="number" min="1" max="12" value={section.maxItems}
                  onChange={e => updateMaxItems(section.id, e.target.value)}
                  className="w-16 text-center form-input py-1 text-xs" />
              </div>
              <button onClick={() => toggle(section.id)}
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${section.enabled ? 'bg-purple' : 'bg-border-dim'}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-0.5 ${section.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
