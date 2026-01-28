"use client"
import { useState } from 'react'

export default function WizardPage() {
  const [role, setRole] = useState("Plaintiff/Petitioner")

  const otherRole = role === "Plaintiff/Petitioner" 
    ? "Defendant/Respondent" 
    : "Plaintiff/Petitioner"

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-2">
          1. Case Foundation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Court Location</label>
            <input placeholder="e.g. Portland District Court" className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Docket Number</label>
            <input placeholder="e.g. FM-2024-123" className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-2">
          2. Party Identification
        </h2>
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">I am filing as the:</label>
          <div className="flex gap-4">
            {["Plaintiff/Petitioner", "Defendant/Respondent"].map((r) => (
              <button 
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-4 px-2 rounded-xl border transition-all ${role === r ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-900/40 border-white/10 text-slate-400 hover:bg-slate-800'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Full Legal Name</label>
            <input className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{otherRole} Name</label>
            <input className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-4" />
          </div>
        </div>
      </section>

      <div className="pt-8 flex justify-center">
        <button className="bg-white text-slate-950 px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-xl">
          Continue to Documents
        </button>
      </div>
    </div>
  )
}
