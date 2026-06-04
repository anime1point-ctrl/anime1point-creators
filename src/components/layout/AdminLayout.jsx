import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const ADMIN_NAV = [
  { to: '/admin/dashboard',     label: 'Dashboard'        },
  { to: '/admin/creators',      label: 'Creators'         },
  { to: '/admin/videos',        label: 'Videos'           },
  { to: '/admin/categories',    label: 'Categories'       },
  { to: '/admin/home-sections', label: 'Homepage Sections'},
  ]

export default function AdminLayout() {
    const { logout } = useAdmin()
    const navigate = useNavigate()

  function handleLogout() { logout(); navigate('/admin') }

  const lc = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive ? 'bg-purple/20 text-purple border border-purple/30'
                         : 'text-text-secondary hover:bg-bg-card2 hover:text-text-primary'}`

  return (
        <div className="min-h-screen flex flex-col bg-bg-dark text-text-primary">
              <header className="sticky top-0 z-50 bg-bg-card border-b border-border-dim">
                      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                            <span className="text-accent">&#9654;</span>span>
                                            <span className="font-orbitron font-black text-sm">Anime1Point <span className="text-accent">Admin</span>span></span>span>
                                </div>div>
                                <div className="flex items-center gap-3">
                                            <a href="/" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xs hover:text-text-primary transition-colors">View Site</a>a>
                                            <button onClick={handleLogout} className="text-xs px-3 py-1.5 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-colors">Logout</button>button>
                                </div>div>
                      </div>div>
              </header>header>
              <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-6 gap-6">
                      <aside className="w-48 shrink-0 hidden md:block">
                                <nav className="flex flex-col gap-1">
                                  {ADMIN_NAV.map(({ to, label }) => (
                        <NavLink key={to} to={to} className={lc}>{label}</NavLink>NavLink>
                      ))}
                                </nav>nav>
                      </aside>aside>
                      <main className="flex-1 min-w-0"><Outlet /></main>main>
              </div>div>
        </div>div>
      )
}
</div>
