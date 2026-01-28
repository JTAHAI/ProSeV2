"use client"
import { useState } from 'react'
import { Search, X, Scale } from 'lucide-react'

export default function ResearchSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      setAnswer(data.answer)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Subtle Sidebar Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-1/2 -translate-y-1/2 bg-slate-900/50 border border-white/10 p-3 rounded-full hover:bg-indigo-600 transition-all shadow-2xl group"
      >
        <Search className="w-5 h-5 text-slate-400 group-hover:text-white" />
        <span className="absolute right-full mr-4 bg-slate-900 px-3 py-1 rounded text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Research
        </span>
      </button>

      {/* Slide-out Panel */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-slate-950 border-l border-white/10 shadow-2xl transform transition-transform duration-500 z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-indigo-600/10">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-tighter">Maine Law AI</h3>
          </div>
          <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Legal Inquiry</label>
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-indigo-500 h-32 resize-none"
              placeholder="e.g., What are the requirements for an FM-002 form in Maine?"
            />
          </div>

          <button 
            onClick={handleSearch}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            {loading ? "Consulting Statutes..." : "Search Maine Law"}
          </button>

          {answer && (
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs leading-relaxed text-slate-300 animate-in fade-in zoom-in">
              {answer}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
