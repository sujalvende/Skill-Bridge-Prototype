const steps = [
  {
    num: '01',
    title: 'Sign Up',
    body: 'Create your free account in under a minute. No credit card required.',
  },
  {
    num: '02',
    title: 'Assess Your Skills',
    body: 'Take a short, focused test for each skill you want to list. Prove what you know.',
  },
  {
    num: '03',
    title: 'Get Your Skill Passport',
    body: 'See your verified skills, progress map, earned badges, and growing reputation — all in one place.',
  },
  {
    num: '04',
    title: 'Learn or Teach',
    body: 'Find someone to learn from, or help someone who needs exactly what you know.',
  },
  {
    num: '05',
    title: 'Earn Credits',
    body: 'Every teaching session and solved problem earns you credits. Your knowledge has real value here.',
  },
  {
    num: '06',
    title: 'Use Credits',
    body: 'Spend credits to learn from skilled people — chat, whiteboard, voice, video, or screen share.',
  },
]

export default function HowItWorks() {
  return (
    <section id="learn" className="py-24 px-6 bg-parchment">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <p className="text-xs font-semibold text-sb-purple uppercase tracking-widest mb-4">How it works</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-navy">
            Six steps to a smarter you.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-sb-border rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`bg-parchment p-8 hover:bg-cream transition-colors group ${
                i === 5 ? 'lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start gap-5">
                <span className="font-mono text-[11px] font-bold text-sb-purple bg-sb-purple-light px-2 py-1 rounded-md shrink-0 mt-0.5">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy mb-2 group-hover:text-sb-purple transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] text-sb-muted leading-relaxed">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End tagline */}
        <p className="mt-12 text-center font-display italic text-[1.35rem] text-navy-800 opacity-70">
          Learn something. Share something. Grow together.
        </p>
      </div>
    </section>
  )
}
