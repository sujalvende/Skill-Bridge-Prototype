import { Link } from 'react-router'

const people = [
  {
    name: 'Sujal Vende',
    title: 'The Logic Weaver',
    skill: 'Python',
    level: 'Advanced',
    pct: 87,
    rating: 4.8,
    students: 27,
    solved: 243,
    compatibility: 94,
    credits: 6,
    available: true,
    photo: 'photo-1580894732930-0babd100d356',
    badge: 'Top Mentor',
  },
  {
    name: 'Maya Krishnan',
    title: 'The Pattern Hunter',
    skill: 'React',
    level: 'Advanced',
    pct: 91,
    rating: 4.7,
    students: 18,
    solved: 178,
    compatibility: 88,
    credits: 5,
    available: true,
    photo: 'photo-1573497620053-ea5300f94f21',
    badge: 'Consistent Learner',
  },
  {
    name: 'Omar Hassan',
    title: 'The Deep Thinker',
    skill: 'Statistics',
    level: 'Expert',
    pct: 95,
    rating: 4.9,
    students: 41,
    solved: 312,
    compatibility: 82,
    credits: 7,
    available: false,
    photo: 'photo-1523240795612-9a054b0db644',
    badge: 'Teaching 100',
  },
]

export default function PeopleSection() {
  return (
    <section id="people" className="py-24 px-6 bg-parchment">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold text-sb-purple uppercase tracking-widest mb-3">Find People</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-navy">
              Find your perfect match.
            </h2>
          </div>
          <a
            href="#"
            className="text-[13.5px] font-semibold text-sb-purple hover:text-navy transition-colors flex items-center gap-1.5"
          >
            Browse all people
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {people.map((p, i) => (
            <div
              key={p.name}
              className={`bg-white rounded-2xl border border-sb-border overflow-hidden hover:shadow-[0_8px_32px_rgba(11,25,48,0.08)] transition-shadow flex flex-col ${
                i === 0 ? 'ring-2 ring-sb-purple/20' : ''
              }`}
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-5 border-b border-sb-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={`https://images.unsplash.com/${p.photo}?w=56&h=56&fit=crop&auto=format`}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-parchment"
                      />
                      {p.available && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-navy leading-tight">{p.name}</p>
                      <p className="text-[11px] text-amber-600 font-semibold mt-0.5">{p.title}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>

                {/* Primary skill */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-navy">{p.skill}</span>
                    <span className="text-[11px] text-sb-muted bg-parchment px-2 py-0.5 rounded-full">{p.level}</span>
                  </div>
                  <span className="font-mono text-[12px] font-bold text-navy">{p.pct}%</span>
                </div>
                <div className="h-1.5 bg-parchment rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sb-purple rounded-full"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-sb-border border-b border-sb-border">
                <div className="px-4 py-3 text-center">
                  <p className="font-mono text-[14px] font-bold text-navy">{p.rating}</p>
                  <p className="text-[10px] text-sb-muted mt-0.5">Rating</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="font-mono text-[14px] font-bold text-navy">{p.students}</p>
                  <p className="text-[10px] text-sb-muted mt-0.5">Taught</p>
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="font-mono text-[14px] font-bold text-navy">{p.solved}</p>
                  <p className="text-[10px] text-sb-muted mt-0.5">Solved</p>
                </div>
              </div>

              {/* Compatibility + cost */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-sb-border">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 bg-parchment rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${p.compatibility}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-semibold text-emerald-700">{p.compatibility}% match</span>
                </div>
                <span className="font-mono text-[12px] font-bold text-navy">{p.credits} cr/session</span>
              </div>

              {/* CTAs */}
              <div className="px-6 py-4 flex gap-2 mt-auto">
                <Link
                  to="/signup"
                  className="flex-1 text-center py-2.5 bg-navy text-cream text-[13px] font-semibold rounded-lg hover:bg-navy-800 transition-colors"
                >
                  Connect & Learn
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2.5 border border-sb-border text-navy text-[13px] font-semibold rounded-lg hover:bg-parchment transition-colors whitespace-nowrap"
                >
                  Passport
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
