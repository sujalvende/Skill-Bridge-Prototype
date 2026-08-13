import { Link } from 'react-router'

const reasons = [
  {
    title: 'Teach to Understand',
    body: 'Explaining makes ideas sharper in your own mind. The act of teaching reveals exactly what you know.',
  },
  {
    title: 'Teach to Build Confidence',
    body: "Helping someone succeed proves your knowledge has real value. Each learner you help strengthens your own certainty.",
  },
  {
    title: 'Teach to Communicate',
    body: 'Practice breaking complex ideas into clear explanations — one of the most valuable skills you can develop.',
  },
  {
    title: 'Teach to Build Reputation',
    body: "Your teaching history becomes part of your Skill Passport. A strong record opens doors you didn't know existed.",
  },
  {
    title: 'Teach to Make an Impact',
    body: "One clear explanation can change someone's learning trajectory. Your knowledge can become someone else's breakthrough.",
  },
]

export default function WhyTeach() {
  return (
    <section id="teach" className="py-24 px-6 bg-navy">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">

          {/* Left — header */}
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold text-sb-purple-light uppercase tracking-widest mb-4">For Teachers</p>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] leading-tight text-white mb-6">
              Why teach on SkillBridge?
            </h2>
            <p className="text-[15.5px] text-white/55 leading-relaxed mb-8">
              Teaching isn't just giving — it's one of the fastest ways to deepen your own understanding and build lasting confidence.
            </p>
            <blockquote className="border-l-2 border-amber-500 pl-4">
              <p className="font-display italic text-white/80 text-lg leading-snug">
                "When you teach, you understand deeper."
              </p>
            </blockquote>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-navy font-semibold rounded-xl hover:bg-cream transition-colors text-[14.5px]"
            >
              Start Teaching
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right — reasons */}
          <div className="space-y-0 border border-white/10 rounded-2xl overflow-hidden">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className={`px-8 py-7 group hover:bg-white/5 transition-colors cursor-default ${
                  i < reasons.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-[10px] font-bold text-white/20 mt-1 shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-[13.5px] text-white/50 leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
