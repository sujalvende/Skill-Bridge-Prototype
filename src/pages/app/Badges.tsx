import { useAuth } from '../../contexts/AuthContext'

const ALL_BADGES = [
  { id: 1, name: 'First Step', category: 'Learning', desc: 'Complete your first learning session.', emoji: '👣', unlocked: true },
  { id: 2, name: 'Problem Solver', category: 'Solving', desc: 'Solve your first problem.', emoji: '⚡', unlocked: true },
  { id: 3, name: 'First Teaching', category: 'Teaching', desc: 'Teach your first student.', emoji: '📖', unlocked: true },
  { id: 4, name: 'Teaching 10', category: 'Teaching', desc: 'Help 10 students learn.', emoji: '🎓', unlocked: true, progress: 10, total: 10 },
  { id: 5, name: 'Consistent Learner', category: 'Consistency', desc: 'Maintain a 7-day streak.', emoji: '🔥', unlocked: true },
  { id: 6, name: 'Top Mentor', category: 'Teaching', desc: 'Receive 4.8+ teaching rating.', emoji: '⭐', unlocked: true },
  { id: 7, name: 'Teaching 100', category: 'Teaching', desc: 'Help 100 students learn.', emoji: '🏆', unlocked: false, progress: 27, total: 100 },
  { id: 8, name: 'Century Solver', category: 'Solving', desc: 'Solve 100 problems.', emoji: '💯', unlocked: false, progress: 43, total: 100 },
  { id: 9, name: 'Master of Python', category: 'Learning', desc: 'Reach 95% in any skill.', emoji: '🐍', unlocked: false, progress: 87, total: 95 },
  { id: 10, name: '30-Day Streak', category: 'Consistency', desc: 'Stay active for 30 days.', emoji: '📅', unlocked: false, progress: 7, total: 30 },
  { id: 11, name: 'Community Pillar', category: 'Community', desc: 'Help 50 people in community.', emoji: '🤝', unlocked: false, progress: 12, total: 50 },
  { id: 12, name: 'Skill Collector', category: 'Learning', desc: 'Verify 5 different skills.', emoji: '🗂️', unlocked: false, progress: 2, total: 5 },
]

const CATEGORIES = ['All', 'Learning', 'Teaching', 'Solving', 'Consistency', 'Community']

import { useState } from 'react'

export default function Badges() {
  const { user } = useAuth()
  const [cat, setCat] = useState('All')

  const filtered = ALL_BADGES.filter(b => cat === 'All' || b.category === cat)
  const unlocked = filtered.filter(b => b.unlocked).length

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[1.9rem] text-navy mb-2">Your Badges</h1>
        <p className="text-[14.5px] text-sb-muted">
          {user?.stats.badges ?? 0} badges earned · {ALL_BADGES.filter(b => !b.unlocked).length} remaining
        </p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
              cat === c ? 'bg-navy text-cream' : 'bg-white text-sb-muted border border-sb-border hover:border-navy/40 hover:text-navy'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(badge => (
          <div
            key={badge.id}
            className={`rounded-2xl border p-5 flex flex-col gap-3 transition-all ${
              badge.unlocked
                ? 'bg-white border-sb-border shadow-sm hover:shadow-md'
                : 'bg-parchment border-sb-border opacity-70'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className={`text-3xl ${badge.unlocked ? '' : 'grayscale'}`}>{badge.emoji}</span>
              {badge.unlocked ? (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Earned</span>
              ) : (
                <span className="text-[10px] font-bold text-sb-muted bg-parchment border border-sb-border px-2 py-0.5 rounded-full">Locked</span>
              )}
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-navy">{badge.name}</p>
              <p className="text-[11.5px] text-sb-muted mt-1 leading-snug">{badge.desc}</p>
            </div>
            {!badge.unlocked && badge.progress !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10.5px] text-sb-muted">Progress</span>
                  <span className="font-mono text-[11px] font-bold text-navy">{badge.progress}/{badge.total}</span>
                </div>
                <div className="h-1.5 bg-sb-border rounded-full">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${Math.min((badge.progress / badge.total!) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
