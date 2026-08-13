import { Outlet, Link } from 'react-router'

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="px-6 h-14 flex items-center justify-between border-b border-sb-border bg-white">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-navy rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-navy text-sm tracking-tight">SkillBridge</span>
        </Link>
        <Link to="/login" className="text-sm text-sb-muted hover:text-navy transition-colors">
          Already have an account? <span className="text-sb-purple font-semibold">Sign in</span>
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Outlet />
      </div>
    </div>
  )
}
