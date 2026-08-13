import { Link } from 'react-router'

export default function CallToAction() {
  return (
    <section className="py-24 px-6 bg-navy relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight text-white mb-6">
          Your next skill starts<br />
          with <span className="italic text-amber-400">one conversation.</span>
        </h2>
        <p className="text-[16px] text-white/55 leading-relaxed mb-10 max-w-md mx-auto">
          Everyone knows something. Everyone has something to learn. Join SkillBridge and start both today.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy font-semibold rounded-xl hover:bg-cream transition-colors text-[15px]"
          >
            Start Learning Free
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-[15px]"
          >
            Teach What You Know
          </Link>
        </div>

        <p className="mt-8 text-[12.5px] text-white/35 font-medium">
          Free to join. No credit card required. Credits earned by teaching and solving.
        </p>
      </div>
    </section>
  )
}
