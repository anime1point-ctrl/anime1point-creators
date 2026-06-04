import { useState } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "How It Works" },
  { to: "/creators", label: "Browse Creators" },
  { to: "/category/anime", label: "Anime" },
  { to: "/category/manga", label: "Manga" },
  { to: "/category/novels", label: "Novels" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-text-primary font-semibold border-b-2 border-accent pb-0.5"
      : "text-text-secondary hover:text-text-primary transition-colors duration-150"

  function handleSearchSubmit(e) {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setSearchQuery("")
      setSearchOpen(false)
      setMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-bg-card/95 backdrop-blur border-b border-border-dim">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-accent text-xl">&#9654;</span>
          <span className="font-orbitron font-black text-sm sm:text-base text-text-primary">
            Anime1Point{" "}
            <span className="text-purple">Creators Hub</span>
          </span>
        </Link>

        {/* Expanding search bar (desktop) */}
        {searchOpen ? (
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search videos, creators..."
              className="form-input flex-1 text-sm py-1.5"
              autoFocus
            />
            <button type="submit" className="btn-primary text-xs px-3 py-1.5 shrink-0">Go</button>
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchQuery("") }}
              className="text-text-secondary hover:text-text-primary text-sm px-1"
            >
              &times;
            </button>
          </form>
        ) : (
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>{label}</NavLink>
            ))}
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-text-secondary hover:text-text-primary transition-colors text-base"
              aria-label="Search"
            >
              &#128269;
            </button>
            <a
              href="https://www.youtube.com/@anime1point"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yt text-xs px-3 py-1.5"
            >
              &#9654; YouTube
            </a>
          </nav>
        )}

        {/* Mobile: search icon + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/search" className="text-text-secondary hover:text-text-primary p-2" aria-label="Search">
            &#128269;
          </Link>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-card border-t border-border-dim px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link to="/search" className="text-text-secondary hover:text-text-primary text-sm" onClick={() => setMenuOpen(false)}>
            &#128269; Search
          </Link>
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
