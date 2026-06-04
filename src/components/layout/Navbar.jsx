import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'How It Works' },
  { to: '/creators', label: 'Browse Creators' },
  { to: '/category/anime', label: 'Anime' },
  { to: '/category/manga', label: 'Manga' },
  { to: '/category/novels', label: 'Novels' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-text-primary font-semibold border-b-2 border-accent pb-0.5'
      : 'text-text-secondary hover:text-text-primary transition-colors duration-150'

  return (
    <header className="sticky top-0 z-50 bg-bg-card/95 backdrop-blur border-b border-border-dim">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-accent text-xl">&#9654;</span>
          <span className="font-orbitron font-black text-sm sm:text-base text-text-primary">
            Anime1Point{' '}
            <span className="text-purple">Creators Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
          <a
            href="https://www.youtube.com/@anime1point"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yt text-xs px-3 py-1.5"
          >
            &#9654; YouTube
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-card border-t border-border-dim px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <a
            href="https://www.youtube.com/@anime1point"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yt text-sm self-start"
          >
            &#9654; YouTube
          </a>
        </div>
      )}
    </header>
  )
}
