import { Link } from 'react-router-dom'

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Creators Apply',
    desc: 'YouTube creators covering Anime, Manga and Light Novels apply to join the Anime1Point Creators Hub.',
    color: 'text-accent',
  },
  {
    step: '02',
    title: 'We Review',
    desc: 'The Anime1Point team reviews each creator for quality, consistency and community value.',
    color: 'text-purple',
  },
  {
    step: '03',
    title: 'You Discover',
    desc: 'Approved creators are listed here. Browse by category, search by name or explore our curated sections.',
    color: 'text-teal',
  },
  {
    step: '04',
    title: 'Watch & Support',
    desc: 'Click any video to watch it here or go directly to the YouTube channel to subscribe.',
    color: 'text-accent2',
  },
]

const CATEGORIES_INFO = [
  { label: 'Anime', icon: String.fromCodePoint(127820), desc: 'Episode breakdowns, reviews, reactions and analysis of currently airing and classic anime series.' },
  { label: 'Manga', icon: String.fromCodePoint(128214), desc: 'Chapter reviews, panel analysis and manga-to-anime comparisons for the biggest series.' },
  { label: 'Light Novels', icon: String.fromCodePoint(128218), desc: 'Deep dives into light novel and web novel lore, arcs that go beyond the anime adaptations.' },
]

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="page-hero">
        <span className="section-tag">How It Works</span>
        <h1 className="font-orbitron">
          About <span className="highlight">Creators Hub</span>
        </h1>
        <p className="text-text-secondary mt-2">
          Connecting the anime community with the YouTube creators who deserve more attention.
        </p>
      </div>

      <section className="py-14 border-b border-border-dim">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="section-tag">Our Mission</span>
          <h2 className="font-orbitron font-black text-2xl text-text-primary mt-4 mb-5">
            Discovery First
          </h2>
          <p className="text-text-secondary leading-relaxed text-base">
            Anime1Point Creators Hub exists to amplify YouTube creators producing quality content
            on Anime, Manga and Light Novels. Every creator listed here has been reviewed by the
            Anime1Point team. No spam, no low-effort channels &mdash; just genuine content.
          </p>
        </div>
      </section>

      <section className="py-14 border-b border-border-dim">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-tag">Process</span>
            <h2 className="font-orbitron font-black text-2xl text-text-primary mt-4">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} className="card text-center">
                <p className={`font-orbitron font-black text-3xl ${item.color} mb-3`}>{item.step}</p>
                <h3 className="font-orbitron font-black text-sm text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-b border-border-dim bg-bg-card">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-tag">Categories</span>
            <h2 className="font-orbitron font-black text-2xl text-text-primary mt-4">What We Cover</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CATEGORIES_INFO.map(cat => (
              <div key={cat.label} className="card text-center">
                <p className="text-4xl mb-3">{cat.icon}</p>
                <h3 className="font-orbitron font-black text-sm text-text-primary mb-2">{cat.label}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-orbitron font-black text-2xl text-text-primary mb-4">Ready to Explore?</h2>
          <p className="text-text-secondary mb-8">Browse all approved creators or jump straight into the latest videos.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/creators" className="btn-primary">Browse Creators</Link>
            <Link to="/" className="btn-outline">Explore Videos</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
