import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'How It Works' },
  { to: '/directory', label: 'Browse Creators' },
  ]

export default function Footer() {
    return (
          <footer className="bg-bg-card border-t border-border-dim">
                <div className="max-w-7xl mx-auto px-4 py-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                                  <Link to="/" className="flex items-center gap-2">
                                              <span className="text-accent text-lg">&#9654;</span>span>
                                              <span className="font-orbitron font-black text-sm text-text-primary">
                                                            Anime1Point <span className="text-purple">Creators Hub</span>span>
                                              </span>span>
                                  </Link>Link>
                                  <nav className="flex flex-wrap gap-x-6 gap-y-2">
                                    {FOOTER_LINKS.map(({ to, label }) => (
                          <Link key={to} to={to} className="text-text-secondary text-sm hover:text-text-primary transition-colors">
                            {label}
                          </Link>Link>
                        ))}
                                              <a href="https://www.youtube.com/@anime1point" target="_blank" rel="noopener noreferrer"
                                                               className="text-yt-red text-sm hover:text-red-400 transition-colors">
                                                            &#9654; YouTube
                                              </a>a>
                                  </nav>nav>
                        </div>div>
                        <div className="border-t border-border-dim pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                                  <p className="text-text-secondary text-xs">
                                              &copy; {new Date().getFullYear()} Anime1Point &mdash; All Rights Reserved
                                  </p>p>
                                  <p className="text-text-secondary text-xs opacity-60">
                                              A platform by Anime1Point for the anime community
                                  </p>p>
                        </div>div>
                </div>div>
          </footer>footer>
        )
}
</footer>
