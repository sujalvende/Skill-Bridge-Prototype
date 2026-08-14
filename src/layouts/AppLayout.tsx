import { Outlet, Link, useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { path: '/app/dashboard', label: 'Home', icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5L10 3L17 9.5V17H13v-4H7v4H3V9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
    </svg>
  )},
  { path: '/app/learn', label: 'Learn', icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3L18 7L10 11L2 7L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
      <path d="M5 9.5v4l5 2.5 5-2.5v-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )},
  { path: '/app/teach', label: 'Teach', icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
      <path d="M8 17h4M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
  { path: '/app/solve', label: 'Solve', icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
      <path d="M10 7v3.5L12.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
  { path: '/app/people', label: 'People', icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
      <path d="M2 17c0-3.3 2.7-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="14" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 17c0-2.5 1.3-4 3-4s3 1.5 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
  { path: '/app/credits', label: 'Credits', icon: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0}/>
      <path d="M10 7v6M8 8.5h3a1 1 0 110 2H9a1 1 0 110 2h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )},
]

export default function AppLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-navy text-white shrink-0 h-screen sticky top-0">
        {/* Logo */}
        <div className="px-5 h-16 flex items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/15 rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">SkillBridge</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  active ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white hover:bg-white/8'
                }`}
              >
                {item.icon(active)}
                {item.label}
              </Link>
            )
          })}

          <div className="pt-3 mt-3 border-t border-white/10 space-y-0.5">
            <Link
              to="/app/passport"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                location.pathname === '/app/passport' ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white hover:bg-white/8'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="3" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Skill Passport
            </Link>
            <Link
              to="/app/badges"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                location.pathname === '/app/badges' ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white hover:bg-white/8'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3l1.8 3.6 4 .6-2.9 2.8.7 4L10 12l-3.6 1.9.7-4L4.2 7.2l4-.6L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              Badges
            </Link>
            <Link
              to="/app/notifications"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                location.pathname === '/app/notifications' ? 'bg-white/15 text-white' : 'text-white/55 hover:text-white hover:bg-white/8'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3a5 5 0 015 5v3l1.5 2H3.5L5 11V8a5 5 0 015-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Notifications
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/8 cursor-pointer group">
            <img
              src={`https://images.unsplash.com/${user?.photo}?w=32&h=32&fit=crop&auto=format`}
              alt={user?.name}
              className="w-7 h-7 rounded-full object-cover bg-white/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white leading-tight truncate">{user?.name}</p>
              <p className="text-[10px] text-amber-400 truncate">{user?.title}</p>
            </div>
            <button onClick={handleLogout} className="text-white/30 hover:text-white/80 transition-colors text-[10px]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 7h7M9 5l2 2-2 2M7 3H3a1 1 0 00-1 1v6a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {/* Credits chip */}
          <div className="mt-2 mx-3 flex items-center justify-between bg-white/8 rounded-lg px-3 py-2">
            <span className="text-[11px] text-white/50">Credits</span>
            <span className="font-mono text-[13px] font-bold text-amber-400">{user?.credits}</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop top bar */}
        <header className="hidden md:flex h-14 bg-white border-b border-sb-border px-6 items-center justify-between sticky top-0 z-40">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-sb-muted" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              className="bg-parchment rounded-lg pl-8 pr-4 py-2 text-[13px] text-navy placeholder:text-sb-muted w-56 outline-none focus:ring-2 focus:ring-sb-purple/30 border border-transparent focus:border-sb-purple/30"
              placeholder="Search skills, people..."
            />
          </div>
          <div className="flex items-center gap-3">
            <Link to="/app/notifications" className="relative p-2 text-sb-muted hover:text-navy rounded-lg hover:bg-parchment">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2.5a4.5 4.5 0 014.5 4.5v2.5L15 12H3l1.5-2.5V7A4.5 4.5 0 019 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M7 14.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
            </Link>
            <Link to="/app/passport">
              <img
                src={`https://images.unsplash.com/${user?.photo}?w=36&h=36&fit=crop&auto=format`}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-sb-border cursor-pointer hover:border-sb-purple transition-colors"
              />
            </Link>
          </div>
        </header>

        {/* Mobile top bar */}
        <header className="md:hidden flex h-14 bg-white border-b border-sb-border px-4 items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-navy rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold text-navy text-sm">SkillBridge</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/app/notifications" className="relative p-2 text-sb-muted">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2.5a4.5 4.5 0 014.5 4.5v2.5L15 12H3l1.5-2.5V7A4.5 4.5 0 019 2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M7 14.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
            </Link>
            <Link to="/app/passport">
              <img
                src={`https://images.unsplash.com/${user?.photo}?w=32&h=32&fit=crop&auto=format`}
                alt={user?.name}
                className="w-7 h-7 rounded-full object-cover border border-sb-border"
              />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-sb-border flex z-50">
          {navItems.slice(0, 5).map(item => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-medium transition-colors ${
                  active ? 'text-navy' : 'text-sb-muted'
                }`}
              >
                {item.icon(active)}
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile overlay for menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-navy/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
