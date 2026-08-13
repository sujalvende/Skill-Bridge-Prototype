import { Link } from 'react-router'

const reasons = [
  {
    title: 'Learn From Real People',
    body: 'Get practical explanations from people who genuinely know the skill — not pre-recorded videos that can\'t answer your questions.',
  },
  {
    title: 'Learn by Doing',
    body: 'Solve real problems, write real code, draw on a real whiteboard. Active learning builds skills that actually stick.',
  },
  {
    title: 'Learn Your Way',
    body: 'Choose the format that works for you: text chat, whiteboard, voice call, video, or screen share. Each session adapts to what you need.',
  },
  {
    title: 'Learn What You Need',
    body: "Find someone who knows exactly the skill you want — not just a general tutor, but someone with verified mastery in that specific area.",
  },
  {
    title: 'Learn and Grow',
    body: 'Every session strengthens your Skill Passport and your profile. You can see yourself getting better, session by session.',
  },
]

export default function WhyLearn() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* Left — reasons */}
          <div className="space-y-6">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="flex items-start gap-6 p-6 rounded-2xl hover:bg-parchment transition-colors group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-navy-light border border-navy/10 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[11px] font-bold text-navy">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-navy mb-1.5 group-hover:text-sb-purple transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-[13.5px] text-sb-muted leading-relaxed">{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — header + CTA */}
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold text-sb-purple uppercase tracking-widest mb-4">For Learners</p>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] leading-tight text-navy mb-6">
              Why learn on SkillBridge?
            </h2>
            <p className="text-[15.5px] text-sb-muted leading-relaxed mb-8">
              Real learning happens in conversation — when someone who knows the skill can meet you exactly where you are.
            </p>
            <div className="space-y-3">
              <blockquote className="border-l-2 border-sb-purple pl-4">
                <p className="font-display italic text-navy text-lg leading-snug">
                  "Don't just watch. Learn by doing."
                </p>
              </blockquote>
              <blockquote className="border-l-2 border-sb-border pl-4">
                <p className="font-display italic text-sb-muted text-[16px] leading-snug">
                  "Every question can become a skill."
                </p>
              </blockquote>
            </div>
            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-800 transition-colors text-[14.5px]"
            >
              Start Learning Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
