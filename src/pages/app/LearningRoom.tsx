import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'

type Tool = 'chat' | 'code' | 'whiteboard' | 'video'

const INITIAL_MESSAGES = [
  { from: 'teacher', name: 'Rahul', text: 'Welcome! Let\'s start with binary search. Do you understand the concept?', time: '10:02' },
  { from: 'learner', name: 'Sujal', text: 'I understand it searches by halving the range. Can we go through an example?', time: '10:03' },
  { from: 'teacher', name: 'Rahul', text: 'Absolutely! Let\'s write it step by step in the code editor.', time: '10:03' },
]

const STARTER_CODE = `def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1  # search right half
        else:
            right = mid - 1  # search left half

    return -1  # not found

# Test it
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # → 3
print(binary_search(arr, 4))   # → -1`

export default function LearningRoom() {
  const [activeTool, setActiveTool] = useState<Tool>('code')
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [code, setCode] = useState(STARTER_CODE)
  const [elapsed, setElapsed] = useState(1935) // 32:15
  const [isDrawing, setIsDrawing] = useState(false)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const messagesEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const minutes = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(m => [...m, { from: 'learner', name: 'Sujal', text: input, time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}` }])
    setInput('')
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (lastPos.current) {
      ctx.beginPath()
      ctx.strokeStyle = '#0B1930'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
    lastPos.current = { x, y }
  }

  const tools: { id: Tool; label: string; icon: string }[] = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'code', label: 'Code', icon: '⌨️' },
    { id: 'whiteboard', label: 'Board', icon: '✏️' },
    { id: 'video', label: 'Video', icon: '🎥' },
  ]

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col bg-[#0d1117]">
      {/* Session header */}
      <div className="bg-[#161b22] border-b border-white/10 px-5 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/app/dashboard" className="text-white/40 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <div>
            <p className="text-[13.5px] font-semibold text-white">Python — Binary Search</p>
            <p className="text-[11px] text-white/40">Rahul ↔ Sujal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[12px] text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
          <div className="font-mono text-[14px] font-bold text-white">
            {String(minutes).padStart(2,'0')}:{String(secs).padStart(2,'0')}
          </div>
          <div className="flex items-center gap-1.5 bg-white/8 rounded-lg px-2.5 py-1">
            <span className="text-[11px] text-amber-400 font-mono font-bold">10</span>
            <span className="text-[10px] text-white/40">cr used</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-sb-purple text-white text-[10px] font-bold flex items-center justify-center">R</div>
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">S</div>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex min-h-0">
        {/* Tool tabs — vertical on desktop */}
        <div className="hidden md:flex flex-col items-center py-4 px-2 bg-[#161b22] border-r border-white/10 gap-2">
          {tools.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg text-[10px] transition-all ${
                activeTool === t.id ? 'bg-white/15 text-white' : 'text-white/35 hover:text-white/60'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span className="font-medium">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Active tool area */}
        <div className="flex-1 flex min-h-0">
          {activeTool === 'code' && (
            <div className="flex-1 flex flex-col">
              <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-white/40 font-mono">binary_search.py</span>
                </div>
                <span className="text-[10px] text-white/25">Python 3.11</span>
              </div>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                className="flex-1 bg-transparent px-5 py-4 font-mono text-[13px] text-[#e6edf3] resize-none outline-none leading-relaxed"
                spellCheck={false}
              />
              <div className="border-t border-white/10 px-4 py-2.5 flex items-center justify-between">
                <span className="text-[11px] text-white/25 font-mono">binary_search.py</span>
                <button className="px-4 py-1.5 bg-emerald-600 text-white text-[12px] font-semibold rounded-lg hover:bg-emerald-700">▶ Run</button>
              </div>
            </div>
          )}

          {activeTool === 'chat' && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3.5">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'learner' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      msg.from === 'learner'
                        ? 'bg-sb-purple text-white rounded-br-sm'
                        : 'bg-white/10 text-white rounded-bl-sm'
                    }`}>
                      <p className="text-[12.5px] leading-relaxed">{msg.text}</p>
                      <p className="text-[10px] opacity-50 mt-1 text-right">{msg.name} · {msg.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEnd} />
              </div>
              <div className="border-t border-white/10 px-4 py-3 flex items-center gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/8 rounded-xl px-4 py-2.5 text-[13.5px] text-white placeholder:text-white/30 outline-none"
                />
                <button onClick={sendMessage} className="w-9 h-9 rounded-xl bg-sb-purple flex items-center justify-center hover:bg-sb-purple/80 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          )}

          {activeTool === 'whiteboard' && (
            <div className="flex-1 flex flex-col bg-white">
              <div className="px-4 py-2 border-b border-sb-border flex items-center gap-3 text-[12px] text-sb-muted">
                <span>Click and drag to draw</span>
              </div>
              <canvas
                ref={canvasRef}
                className="flex-1 cursor-crosshair"
                width={800}
                height={600}
                style={{ width: '100%', height: '100%' }}
                onMouseDown={e => { setIsDrawing(true); const r = e.currentTarget.getBoundingClientRect(); lastPos.current = { x: e.clientX - r.left, y: e.clientY - r.top } }}
                onMouseUp={() => { setIsDrawing(false); lastPos.current = null }}
                onMouseLeave={() => { setIsDrawing(false); lastPos.current = null }}
                onMouseMove={draw}
              />
            </div>
          )}

          {activeTool === 'video' && (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0d1117] gap-6">
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg px-4">
                {[
                  { name: 'Rahul', label: 'Teacher', color: 'bg-sb-purple' },
                  { name: 'Sujal', label: 'You', color: 'bg-navy-800' },
                ].map(p => (
                  <div key={p.name} className={`${p.color} rounded-2xl aspect-video flex flex-col items-center justify-center gap-2 relative`}>
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-[1.8rem] font-bold text-white">{p.name[0]}</div>
                    <p className="text-white/80 text-[12px] font-medium">{p.name}</p>
                    <span className="absolute bottom-2 left-2 text-[10px] text-white/50">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side chat panel (always visible in code/board/video mode on desktop) */}
        {activeTool !== 'chat' && (
          <div className="hidden lg:flex flex-col w-72 border-l border-white/10">
            <div className="px-4 py-2.5 border-b border-white/10">
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wide">Chat</p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.slice(-4).map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'learner' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] px-3 py-2 rounded-xl text-[12px] ${
                    msg.from === 'learner' ? 'bg-sb-purple text-white' : 'bg-white/10 text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 px-3 py-3 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Message..."
                className="flex-1 bg-white/8 rounded-lg px-3 py-2 text-[12.5px] text-white placeholder:text-white/30 outline-none"
              />
              <button onClick={sendMessage} className="w-8 h-8 rounded-lg bg-sb-purple flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 2l4 4-4 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar — tool tabs on mobile, controls on desktop */}
      <div className="bg-[#161b22] border-t border-white/10 px-5 py-3 flex items-center justify-between shrink-0">
        {/* Mobile tool tabs */}
        <div className="flex gap-2 md:hidden">
          {tools.map(t => (
            <button key={t.id} onClick={() => setActiveTool(t.id)} className={`px-3 py-1.5 rounded-lg text-[11px] ${activeTool === t.id ? 'bg-white/15 text-white' : 'text-white/40'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 ml-auto">
          <button onClick={() => setMicOn(m => !m)} className={`w-10 h-10 rounded-xl flex items-center justify-center text-[16px] transition-colors ${micOn ? 'bg-white/10 text-white' : 'bg-red-500/30 text-red-400'}`}>
            {micOn ? '🎤' : '🔇'}
          </button>
          <button onClick={() => setCamOn(c => !c)} className={`w-10 h-10 rounded-xl flex items-center justify-center text-[16px] transition-colors ${camOn ? 'bg-white/10 text-white' : 'bg-red-500/30 text-red-400'}`}>
            {camOn ? '📹' : '🚫'}
          </button>
          <Link
            to="/app/dashboard"
            className="px-4 py-2.5 bg-red-500 text-white text-[13px] font-semibold rounded-xl hover:bg-red-600 transition-colors"
          >
            End Session
          </Link>
        </div>
      </div>
    </div>
  )
}
