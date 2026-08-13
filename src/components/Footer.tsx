const links = {
  Platform: ['Learn', 'Teach', 'Solve Problems', 'Find People', 'Credits'],
  Product: ['Skill Passport', 'Badges', 'Learning Rooms', 'Community', 'Dashboard'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Cookies'],
}

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-white text-[15px] tracking-tight">SkillBridge</span>
            </div>
            <p className="text-[13.5px] text-white/45 leading-relaxed max-w-[200px]">
              Learn More. Teach More. Grow More.
            </p>
            <p className="mt-4 text-[12px] text-white/30 leading-relaxed max-w-[200px]">
              Everyone knows something. Everyone has something to learn.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(links).map(([section, items]) => (
              <div key={section}>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-4">{section}</p>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-[13.5px] text-white/55 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12.5px] text-white/30">
            © 2026 SkillBridge. Built for learners and teachers everywhere.
          </p>
          <div className="flex items-center gap-5">
            {['Twitter', 'GitHub', 'Discord'].map(platform => (
              <a key={platform} href="#" className="text-[12.5px] text-white/30 hover:text-white/70 transition-colors">
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
