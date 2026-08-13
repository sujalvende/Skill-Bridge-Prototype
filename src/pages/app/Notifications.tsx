import { useState } from 'react'
import { Link } from 'react-router'

const NOTIFICATIONS = [
  { id: 1, type: 'request', icon: '📖', title: 'Someone wants to learn Python from you.', body: 'Maya is looking for a Python teacher. She matched 88% with you.', time: '2 min ago', unread: true, action: { label: 'Help Now', to: '/app/teach' } },
  { id: 2, type: 'earn', icon: '💎', title: 'You earned 5 credits.', body: 'Hard problem solved: Longest Palindromic Substring.', time: '1h ago', unread: true, action: null },
  { id: 3, type: 'badge', icon: '🏅', title: 'You unlocked a badge.', body: 'Teaching 10 — You helped 10 students learn. Keep going!', time: '3h ago', unread: true, action: { label: 'View Badges', to: '/app/badges' } },
  { id: 4, type: 'skill', icon: '↑', title: 'Your Python skill improved.', body: 'Python score: 84% → 87%. You\'re approaching Expert level.', time: 'Yesterday', unread: false, action: { label: 'View Passport', to: '/app/passport' } },
  { id: 5, type: 'available', icon: '🔔', title: 'Someone is available to teach React.', body: 'Rahul (Pattern Hunter) is online now. 94% match.', time: 'Yesterday', unread: false, action: { label: 'Learn Now', to: '/app/learn' } },
  { id: 6, type: 'rating', icon: '⭐', title: 'Your teaching rating increased.', body: 'Carlos rated your session 5.0 stars. New average: 4.8.', time: '2 days ago', unread: false, action: null },
  { id: 7, type: 'earn', icon: '💎', title: 'You earned 7 credits.', body: 'Teaching session with Priya: JavaScript Closures.', time: '2 days ago', unread: false, action: null },
  { id: 8, type: 'request', icon: '📖', title: 'Someone wants to learn JavaScript from you.', body: '2 people matched with you for JavaScript. Start teaching.', time: '3 days ago', unread: false, action: { label: 'Teach Now', to: '/app/teach' } },
]

const typeColors: Record<string, string> = {
  request: 'bg-sb-purple-light',
  earn: 'bg-emerald-100',
  badge: 'bg-amber-100',
  skill: 'bg-navy-light',
  available: 'bg-parchment',
  rating: 'bg-amber-100',
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const unread = notifications.filter(n => n.unread).length

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, unread: false })))

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.9rem] text-navy mb-1">Notifications</h1>
          {unread > 0 && (
            <p className="text-[13.5px] text-sb-muted">{unread} unread</p>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="text-[13px] font-semibold text-sb-purple hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, unread: false } : x))}
            className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors cursor-default ${
              n.unread ? 'bg-white border-sb-border shadow-sm' : 'bg-parchment/50 border-transparent'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[1.1rem] shrink-0 ${typeColors[n.type] ?? 'bg-parchment'}`}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13.5px] font-semibold leading-snug ${n.unread ? 'text-navy' : 'text-sb-muted'}`}>{n.title}</p>
              <p className="text-[12.5px] text-sb-muted mt-1 leading-snug">{n.body}</p>
              {n.action && (
                <Link
                  to={n.action.to}
                  className="inline-block mt-2 text-[12px] font-semibold text-sb-purple hover:underline"
                >
                  {n.action.label} →
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-sb-muted whitespace-nowrap">{n.time}</span>
              {n.unread && <span className="w-2 h-2 rounded-full bg-sb-purple shrink-0" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
