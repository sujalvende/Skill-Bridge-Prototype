import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

export default function Welcome() {
  const { user } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'there'

  return (
    <div className="w-full max-w-md text-center">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-1.5 mb-10">
        {[1,2,3,4].map(n => (
          <div key={n} className={`h-1 rounded-full transition-all ${n === 1 ? 'w-8 bg-navy' : 'w-4 bg-sb-border'}`} />
        ))}
      </div>

      <div className="inline-flex w-16 h-16 rounded-2xl bg-navy items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14L11 19L22 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 className="font-display text-[2.2rem] text-navy mb-4 leading-tight">
        Welcome to SkillBridge,<br />
        <span className="italic text-sb-purple">{firstName}.</span>
      </h1>

      <p className="text-[15.5px] text-sb-muted leading-relaxed mb-4 max-w-sm mx-auto">
        Here, you learn from people, teach what you know, and grow together.
      </p>

      <p className="text-[14px] text-sb-muted mb-10 max-w-xs mx-auto leading-relaxed">
        In the next few steps we'll set up your Skill Passport and find the right people for you.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { icon: '🎓', label: 'Learn from real people' },
          { icon: '📖', label: 'Teach what you know' },
          { icon: '💎', label: 'Earn credits' },
        ].map(item => (
          <div key={item.label} className="bg-parchment rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-[11.5px] text-navy font-medium leading-snug">{item.label}</p>
          </div>
        ))}
      </div>

      <Link
        to="/onboarding/teach-skills"
        className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[15px]"
      >
        Let's Get Started
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  )
}
