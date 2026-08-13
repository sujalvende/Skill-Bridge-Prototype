const stats = [
  { value: '12,400+', label: 'Skills Learned' },
  { value: '4,800+', label: 'Active Teachers' },
  { value: '98,500', label: 'Problems Solved' },
  { value: '245K', label: 'Credits Earned' },
]

export default function StatsStrip() {
  return (
    <section className="border-y border-sb-border bg-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-sb-border">
        {stats.map(s => (
          <div key={s.label} className="text-center md:px-10">
            <p className="font-mono text-[1.6rem] font-bold text-navy">{s.value}</p>
            <p className="text-[13px] text-sb-muted mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
