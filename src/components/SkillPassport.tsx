const skills = [
  { name: 'Python', level: 'Advanced', pct: 87, color: '#5B21B6' },
  { name: 'JavaScript', level: 'Intermediate', pct: 68, color: '#0B1930' },
  { name: 'Photoshop', level: 'Intermediate', pct: 61, color: '#D97706' },
]

const tree = [
  { label: 'Fundamentals', status: 'mastered' },
  { label: 'Control Flow', status: 'mastered' },
  { label: 'Functions', status: 'mastered' },
  { label: 'OOP', status: 'mastered' },
  { label: 'File Handling', status: 'improving' },
  { label: 'APIs', status: 'improving' },
  { label: 'Advanced Python', status: 'locked' },
]

const stats = [
  { value: '243', label: 'Problems Solved' },
  { value: '27', label: 'Students Taught' },
  { value: '312', label: 'Sessions' },
  { value: '4.8', label: 'Rating' },
]

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    mastered: 'bg-emerald-500',
    improving: 'bg-amber-400',
    locked: 'bg-sb-border',
  }
  return <span className={`w-2 h-2 rounded-full shrink-0 ${map[status]}`} />
}

export default function SkillPassport() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left — description */}
        <div>
          <p className="text-xs font-semibold text-sb-purple uppercase tracking-widest mb-4">Skill Passport</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-navy mb-6">
            Your knowledge,<br />verified and visible.
          </h2>
          <p className="text-[15.5px] text-sb-muted leading-relaxed mb-8 max-w-md">
            The Skill Passport is your living proof of what you know. Verified skills, progress maps, badges, and your reputation — all in one place that grows as you do.
          </p>

          <ul className="space-y-4">
            {[
              'Verified skills with percentage scores',
              'Detailed skill tree showing your progression path',
              'A unique title earned through how you learn and teach',
              'Badges, credits, and session history',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sb-purple-light flex items-center justify-center mt-0.5 shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[14.5px] text-navy">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — passport card */}
        <div>
          <div className="bg-white rounded-2xl shadow-[0_8px_48px_rgba(11,25,48,0.10)] border border-sb-border overflow-hidden">

            {/* Passport header */}
            <div className="bg-navy px-6 py-5 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">Skill Passport</p>
                <h3 className="font-display text-2xl text-white leading-tight">Sujal Vende</h3>
                <p className="text-amber-400 text-[13px] font-semibold mt-1">The Logic Weaver</p>
                <p className="text-white/50 text-[12px] mt-1.5 italic">Turns complex problems into simple patterns.</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-xl">🧩</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 border-b border-sb-border">
              {stats.map(s => (
                <div key={s.label} className="px-4 py-4 text-center border-r border-sb-border last:border-0">
                  <p className="font-mono text-[16px] font-bold text-navy">{s.value}</p>
                  <p className="text-[10.5px] text-sb-muted leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="px-6 py-5 border-b border-sb-border">
              <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-4">Verified Skills</p>
              <div className="space-y-3.5">
                {skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[13.5px] font-semibold text-navy">{skill.name}</span>
                        <span className="text-[11px] text-sb-muted bg-parchment px-2 py-0.5 rounded-full">{skill.level}</span>
                      </div>
                      <span className="font-mono text-[12px] font-bold text-navy">{skill.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-parchment rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${skill.pct}%`, backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill tree */}
            <div className="px-6 py-5">
              <p className="text-[11px] font-semibold text-sb-muted uppercase tracking-widest mb-3">Python Skill Tree</p>
              <div className="grid grid-cols-2 gap-1.5">
                {tree.map(node => (
                  <div key={node.label} className="flex items-center gap-2">
                    <StatusDot status={node.status} />
                    <span
                      className={`text-[12px] ${
                        node.status === 'locked' ? 'text-sb-border' : 'text-navy'
                      }`}
                    >
                      {node.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges strip */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {['First Step', 'Problem Solver', 'Top Mentor', 'Teaching 10', 'Consistent Learner'].map(badge => (
              <span
                key={badge}
                className="text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
            <span className="text-[11px] text-sb-muted">+11 more</span>
          </div>
        </div>
      </div>
    </section>
  )
}
