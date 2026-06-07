import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'How It Works' },
  { to: '/creators', label: 'Browse Creators' },
  { to: '/category/anime', label: 'Anime' },
  { to: '/category/manga', label: 'Manga' },
  { to: '/category/novels', label: 'Light Novels' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-card border-t border-border-dim">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Top row: logo + nav links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-accent text-lg">&#9654;</span>
            <span className="font-orbitron font-black text-sm text-text-primary">
              Anime1Point <span className="text-purple">Creators Hub</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                {label}
              </Link>
            ))}
            <a href="https://www.youtube.com/@anime1point" target="_blank" rel="noopener noreferrer"
              className="text-yt-red text-sm hover:text-red-400 transition-colors">
              &#9654; YouTube
            </a>
          </nav>
        </div>

        {/* Join section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 py-6 border-y border-border-dim">
          <a
            href="creators.html"
            className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors group"
          >
            <span className="text-2xl">&#127909;</span>
            <div>
              <p className="font-orbitron font-black text-sm text-accent group-hover:text-accent/80 transition-colors">Join as Creator</p>
              <p className="text-text-secondary text-xs mt-0.5">Connect your YouTube channel and get a live feed on our platform</p>
            </div>
            <span className="ml-auto text-accent/50 group-hover:text-accent transition-colors text-lg">&#8594;</span>
          </a>
          <a
            href="viewers.html"
            className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl border border-purple/30 bg-purple/5 hover:bg-purple/10 transition-colors group"
          >
            <span className="text-2xl">&#128065;</span>
            <div>
              <p className="font-orbitron font-black text-sm text-purple group-hover:text-purple/80 transition-colors">Join as Viewer</p>
              <p className="text-text-secondary text-xs mt-0.5">Create a free account to track your watch history and favourites</p>
            </div>
            <span className="ml-auto text-purple/50 group-hover:text-purple transition-colors text-lg">&#8594;</span>
          </a>
        </div>

        {/* Bottom row: copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-text-secondary text-xs">
            &copy; {new Date().getFullYear()} Anime1Point &mdash; All Rights Reserved
          </p>
          <p className="text-text-secondary text-xs opacity-60">
            A platform by Anime1Point for the anime community
          </p>
        </div>
      </div>
    </footer>
  )
}
