import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

function getLevel(pct: number) {
  if (pct >= 80) return 'Advanced'
  if (pct >= 60) return 'Intermediate'
  return 'Beginner'
}

export default function AssessmentResult() {
  const navigate = useNavigate()
  const { completeOnboarding } = useAuth()
  const teachSkills: string[] = JSON.parse(sessionStorage.getItem('ob_teach') ?? '["Python"]')
  const learnSkills: string[] = JSON.parse(sessionStorage.getItem('ob_learn') ?? '[]')
  const score = parseInt(sessionStorage.getItem('ob_score') ?? '87', 10)
  const skill = teachSkills[0] ?? 'Python'
  const level = getLevel(score)

  const handleFinish = () => {
    completeOnboarding(teachSkills, learnSkills)
    sessionStorage.removeItem('ob_teach')
    sessionStorage.removeItem('ob_learn')
    sessionStorage.removeItem('ob_score')
    navigate('/app/dashboard')
  }

  return (
    <div className="w-full max-w-md text-center">
      {/* Celebration */}
      <div className="inline-flex w-20 h-20 rounded-2xl bg-emerald-100 items-center justify-center mb-6">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M6 18L13 25L30 10" stroke="#047857" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 className="font-display text-[2rem] text-navy mb-2">Assessment Complete!</h1>
      <p className="text-[14.5px] text-sb-muted mb-8">Here's what we found about your {skill} skills.</p>

      {/* Score card */}
      <div className="bg-white rounded-2xl border border-sb-border p-6 mb-6 text-left">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-1">{skill}</p>
            <p className="text-[1.1rem] font-semibold text-navy">{level}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[2.5rem] font-bold text-navy leading-none">{score}%</p>
            <p className="text-[11px] text-sb-muted">Score</p>
          </div>
        </div>

        <div className="h-2 bg-parchment rounded-full mb-6">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-2">Your strengths</p>
            <ul className="space-y-1">
              {['Functions', 'Control flow', 'Data types', 'Problem solving'].slice(0, score > 70 ? 4 : 2).map(s => (
                <li key={s} className="flex items-center gap-2 text-[13px] text-navy">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-2">Improve next</p>
            <ul className="space-y-1">
              {['APIs', 'Advanced Python', 'Generators', 'Async'].slice(0, 3).map(s => (
                <li key={s} className="flex items-center gap-2 text-[13px] text-navy">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Title reveal */}
      <div className="bg-navy rounded-2xl px-6 py-5 mb-8 text-left">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">Your SkillBridge Identity</p>
        <p className="font-display text-xl text-white">The Seeker</p>
        <p className="text-[12.5px] text-white/50 mt-1">Your identity evolves as you teach, learn and solve problems.</p>
      </div>

      <button
        onClick={handleFinish}
        className="w-full py-4 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[15px] flex items-center justify-center gap-2"
      >
        View My Skill Passport
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
