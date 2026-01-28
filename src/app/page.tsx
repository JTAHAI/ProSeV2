"use client"
import { useState } from 'react'

export default function Home() {
  const [role, setRole] = useState("Plaintiff/Petitioner")

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Maine County</label>
        <input className="input-field" placeholder="e.g. Cumberland" />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Docket Number</label>
        <input className="input-field" placeholder="FM-00-000" />
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Your Role</label>
        <div className="grid grid-cols-1 gap-2">
          {["Plaintiff/Petitioner", "Defendant/Respondent"].map((r) => (
            <button 
              key={r}
              onClick={() => setRole(r)}
              className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                role === r ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-950/40 border-white/5 text-slate-500'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full py-4 mt-4 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl shadow-xl active:scale-[0.98] transition-transform">
        Next Step
      </button>
    </div>
  )
}
