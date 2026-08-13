import { useState, useEffect } from 'react'
import { Link } from 'react-router'

const navLinks = [
  { label: 'Learn', href: '#learn' },
  { label: 'Teach', href: '#teach' },
  { label: 'Solve', href: '#solve' },
  { label: 'People', href: '#people' },
  { label: 'Credits', href: '#credits' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-sb-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-navy rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-navy text-[15px] tracking-tight">SkillBridge</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm text-sb-muted hover:text-navy transition-colors rounded-lg hover:bg-parchment font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm text-navy font-medium hover:text-sb-purple transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold bg-navy text-cream rounded-lg hover:bg-navy-800 transition-colors"
          >
            Start Free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? (
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            ) : (
              <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-b border-sb-border px-6 py-4 flex flex-col gap-2">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm font-medium text-navy hover:text-sb-purple transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 mt-1 border-t border-sb-border flex flex-col gap-2">
            <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-sb-muted text-center">Sign in</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold bg-navy text-cream rounded-lg text-center">
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
