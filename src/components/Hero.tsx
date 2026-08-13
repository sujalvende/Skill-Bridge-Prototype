import { useState, useEffect } from 'react'
import { Link } from 'react-router'

const codeLines = [
  { text: 'class Animal:', indent: 0 },
  { text: '  def __init__(self, name):', indent: 1 },
  { text: '    self.name = name', indent: 2 },
  { text: '  def speak(self):', indent: 1 },
  { text: '    pass', indent: 2 },
]

const chatMessages = [
  { from: 'learner', text: 'So the class is like a blueprint?' },
  { from: 'teacher', text: 'Exactly — every instance gets its own data.' },
  { from: 'learner', text: 'That makes sense now!' },
]

export default function Hero() {
  const [showReward, setShowReward] = useState(false)
  const [chatIdx, setChatIdx] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setShowReward(true), 1800)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (chatIdx >= chatMessages.length) return
    const t = setTimeout(() => setChatIdx(i => i + 1), 900 + chatIdx * 600)
    return () => clearTimeout(t)
  }, [chatIdx])

  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-navy) 1px, transparent 1px), linear-gradient(90deg, var(--color-navy) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 items-center">

          {/* Left — headline + CTAs */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-sb-purple-light text-sb-purple text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sb-purple inline-block" />
              Peer-to-peer learning platform
            </div>

            <h1
              className="font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] text-navy mb-6"
            >
              Learn More.<br />
              Teach More.<br />
              <span className="italic text-sb-purple">Grow More.</span>
            </h1>

            <p className="text-lg text-sb-muted leading-relaxed mb-10 max-w-md">
              Learn new skills from people who know them. Teach what you know. Solve real problems. Earn credits. Use those credits to learn from others.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[15px]"
              >
                Start Learning
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-navy text-navy font-semibold rounded-xl hover:bg-navy hover:text-cream transition-colors text-[15px]"
              >
                Teach What You Know
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['photo-1522202176988-66273c2fd55f', 'photo-1573497620053-ea5300f94f21', 'photo-1580894732930-0babd100d356', 'photo-1523240795612-9a054b0db644'].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${id}?w=40&h=40&fit=crop&auto=format`}
                    alt="learner"
                    className="w-8 h-8 rounded-full border-2 border-cream object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-sb-muted">
                <span className="text-navy font-semibold">12,000+</span> learners already growing
              </p>
            </div>
          </div>

          {/* Right — session preview */}
          <div className="relative hidden lg:block">
            {/* Main session card */}
            <div className="bg-white rounded-2xl shadow-[0_8px_48px_rgba(11,25,48,0.12)] border border-sb-border overflow-hidden">
              {/* Session header */}
              <div className="px-5 py-4 border-b border-sb-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Live Session</span>
                  </div>
                  <span className="text-xs text-sb-muted">·</span>
                  <span className="text-xs text-sb-muted">Python OOP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-amber-100 border border-white flex items-center justify-center text-[10px] font-bold text-amber-700">S</div>
                    <div className="w-6 h-6 rounded-full bg-sb-purple-light border border-white flex items-center justify-center text-[10px] font-bold text-sb-purple">M</div>
                  </div>
                  <span className="text-[11px] text-sb-muted font-medium">Sujal → Maya</span>
                </div>
              </div>

              {/* Code area */}
              <div className="px-5 py-4 bg-[#0d1117] font-mono text-[12px] leading-relaxed">
                {codeLines.map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-[#484f58] select-none w-4 text-right shrink-0">{i + 1}</span>
                    <span
                      className="whitespace-pre"
                      style={{
                        color: line.indent === 0
                          ? '#79c0ff'
                          : line.indent === 1
                          ? '#d2a8ff'
                          : '#e6edf3',
                      }}
                    >
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat area */}
              <div className="px-5 py-4 space-y-2.5 min-h-[112px]">
                {chatMessages.slice(0, chatIdx).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === 'teacher' ? 'justify-end' : 'justify-start'}`}
                    style={{ animation: 'fadeSlideIn 0.3s ease' }}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl text-[12.5px] max-w-[240px] leading-snug ${
                        msg.from === 'teacher'
                          ? 'bg-navy text-cream rounded-br-sm'
                          : 'bg-parchment text-navy rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Session footer */}
              <div
                className={`px-5 py-3.5 border-t border-sb-border bg-parchment flex items-center justify-between transition-all duration-700 ${
                  showReward ? 'opacity-100' : 'opacity-0 translate-y-2'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-semibold text-navy">Session complete</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  <span className="text-amber-600 font-mono text-xs font-bold">+5</span>
                  <span className="text-amber-700 text-[11px] font-semibold">Credits</span>
                </div>
              </div>
            </div>

            {/* Floating skill badge */}
            <div className="absolute -left-12 top-1/3 bg-white rounded-xl shadow-[0_4px_24px_rgba(11,25,48,0.10)] border border-sb-border px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sb-purple-light flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#5B21B6" strokeWidth="1.5"/>
                  <path d="M5 8L7 10L11 6" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-sb-muted leading-none mb-0.5">Verified Skill</p>
                <p className="text-[13px] font-semibold text-navy leading-none">Python · 87%</p>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -right-6 bottom-16 bg-white rounded-xl shadow-[0_4px_24px_rgba(11,25,48,0.10)] border border-sb-border px-4 py-3">
              <p className="text-[11px] text-sb-muted mb-1">Teaching Rating</p>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500 text-sm">★★★★★</span>
                <span className="font-mono text-[13px] font-semibold text-navy">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
