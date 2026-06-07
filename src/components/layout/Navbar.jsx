import { useState, useRef, useEffect } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"

// ── Categories dropdown data ───────────────────────────────────────────────
const CATEGORIES = [
  { to: "/category/anime",      label: "Anime",        emoji: "⚔️",  desc: "Reviews, reactions & breakdowns" },
  { to: "/category/manga",      label: "Manga",        emoji: "📖",  desc: "Chapter reviews & analysis" },
  { to: "/category/novels",     label: "Light Novels", emoji: "📚",  desc: "Web novels & adaptations" },
]

// ── Primary nav links (centre zone) ───────────────────────────────────────
const NAV_LINKS = [
  { to: "/",         label: "Home",            end: true },
  { to: "/creators", label: "Browse Creators"            },
  { to: "/about",    label: "How It Works"               },
]

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [catOpen,     setCatOpen]     = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const catRef  = useRef(null)
  const navigate = useNavigate()

  // Close category dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-text-primary font-semibold border-b-2 border-accent pb-0.5 whitespace-nowrap text-sm"
      : "text-text-secondary hover:text-text-primary transition-colors duration-150 whitespace-nowrap text-sm"

  function handleSearch(e) {
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
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* ── ZONE 1: Logo (left) ─────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-accent text-lg">&#9654;</span>
          <span className="font-orbitron font-black text-sm text-text-primary leading-none">
            Anime1Point<br />
            <span className="text-purple text-[10px] font-semibold tracking-widest uppercase">Creators Hub</span>
          </span>
        </Link>

        {/* ── ZONE 2: Primary nav (centre, desktop only) ──────────────── */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">

          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to} to={to} end={end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? "text-text-primary font-semibold bg-white/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Categories dropdown */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setCatOpen(o => !o)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-150 whitespace-nowrap ${
                catOpen
                  ? "text-text-primary bg-white/5"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/5"
              }`}
            >
              Categories
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {catOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-bg-card border border-border-dim rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in">
                {CATEGORIES.map(({ to, label, emoji, desc }) => (
                  <NavLink
                    key={to} to={to}
                    onClick={() => setCatOpen(false)}
                    className={({ isActive }) =>
                      `flex items-start gap-3 px-4 py-3 text-sm transition-colors ${
                        isActive ? "bg-accent/10 text-accent" : "hover:bg-white/5 text-text-secondary hover:text-text-primary"
                      }`
                    }
                  >
                    <span className="text-base mt-0.5">{emoji}</span>
                    <div>
                      <p className="font-semibold text-text-primary text-xs">{label}</p>
                      <p className="text-text-secondary text-[11px] mt-0.5">{desc}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* ── ZONE 3: Actions (right) ──────────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Search — expands inline on desktop */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="form-input text-sm py-1.5 w-44"
                autoFocus
              />
              <button type="submit" className="btn-primary text-xs px-3 py-1.5 shrink-0">Go</button>
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setSearchQuery("") }}
                className="text-text-secondary hover:text-text-primary text-lg leading-none px-1"
              >
                &times;
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
              aria-label="Search"
            >
              &#128269;
            </button>
          )}

          {/* Join as Creator — primary CTA */}
          <a
            href="creators.html"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-accent text-white hover:bg-accent/85 transition-colors whitespace-nowrap shadow-sm shadow-accent/20"
          >
            &#127909; Join as Creator
          </a>

          {/* Join as Viewer — secondary, subtle */}
          <a
            href="viewers.html"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-border-dim text-text-secondary hover:text-text-primary hover:border-purple/40 hover:bg-purple/5 transition-all whitespace-nowrap"
          >
            &#128065; Sign In
          </a>

          {/* YouTube — icon only on desktop */}
          <a
            href="https://www.youtube.com/@anime1point"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-yt-red hover:bg-yt-red/10 transition-all text-base"
            aria-label="YouTube"
            title="Anime1Point on YouTube"
          >
            &#9654;
          </a>

          {/* Mobile: search link + hamburger */}
          <Link
            to="/search"
            className="md:hidden text-text-secondary hover:text-text-primary p-2"
            aria-label="Search"
          >
            &#128269;
          </Link>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden bg-bg-card border-t border-border-dim px-4 py-4 flex flex-col gap-1 animate-fade-in">

          {/* Primary links */}
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to} to={to} end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm ${
                  isActive ? "bg-white/5 text-text-primary font-semibold" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Category links */}
          <div className="px-3 py-2 text-[11px] uppercase tracking-widest text-text-secondary/50 font-semibold mt-2">
            Categories
          </div>
          {CATEGORIES.map(({ to, label, emoji }) => (
            <NavLink
              key={to} to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
                  isActive ? "bg-white/5 text-text-primary font-semibold" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`
              }
            >
              <span>{emoji}</span> {label}
            </NavLink>
          ))}

          {/* Divider + CTAs */}
          <div className="border-t border-border-dim my-2" />
          <a
            href="creators.html"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent/85 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            &#127909; Join as Creator
          </a>
          <a
            href="viewers.html"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border-dim text-text-secondary text-sm font-semibold hover:text-text-primary hover:bg-white/5 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            &#128065; Sign In as Viewer
          </a>
          <a
            href="https://www.youtube.com/@anime1point"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-yt-red text-sm"
            onClick={() => setMenuOpen(false)}
          >
            &#9654; YouTube Channel
          </a>
        </div>
      )}
    </header>
  )
}
