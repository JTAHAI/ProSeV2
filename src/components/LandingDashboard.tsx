"use client";

import { useState } from "react";
import SupportWizard from "@/components/SupportWizard";
import FilingTracker from "@/components/FilingTracker";
import ContemptWizard from "@/components/ContemptWizard";

 type Tool = null | "support" | "tracker" | "contempt";

export default function LandingDashboard() {
  const [activeTool, setActiveTool] = useState<Tool>(null);

  const HomeView = (
    <div className="w-full max-w-5xl space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]">
          Maine Family Law{" "}
          <span className="text-slate-400">Simplified</span>
        </h1>
        <p className="text-sm md:text-base text-slate-300/80 max-w-2xl">
          Build court-ready packets, track filings, and organize your case — in plain language,
          step-by-step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setActiveTool("contempt")}
          className="tool-card group text-left p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/15 transition-all"
        >
          <div className="tool-bubble">⚖️</div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            Motion Builder
          </h3>
          <p className="text-slate-300/70 text-sm leading-relaxed">
            Start with a Motion for Contempt packet and generate a PDF filing set.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool("tracker")}
          className="tool-card group text-left p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/15 transition-all"
        >
          <div className="tool-bubble">📅</div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            Filing Tracker
          </h3>
          <p className="text-slate-300/70 text-sm leading-relaxed">
            Monitor deadlines, service, court dates, and keep everything in one place.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool("support")}
          className="tool-card group text-left p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/15 transition-all"
        >
          <div className="tool-bubble">🧾</div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            Support Wizard
          </h3>
          <p className="text-slate-300/70 text-sm leading-relaxed">
            Walk through support information and organize your numbers for forms.
          </p>
        </button>

        <button
          type="button"
          onClick={() => alert("Notes coming soon")}
          className="tool-card group text-left p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/15 transition-all"
        >
          <div className="tool-bubble">🗂️</div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            Case Notes
          </h3>
          <p className="text-slate-300/70 text-sm leading-relaxed">
            Keep a dated log of incidents, communications, and documents (backup later).
          </p>
        </button>
      </div>

      <div className="pt-2 flex flex-col items-start gap-4">
        <button
          type="button"
          className="text-[10px] font-black text-slate-300/60 uppercase tracking-[0.35em] hover:text-slate-200 transition"
          onClick={() => setActiveTool("contempt")}
        >
          Start Here
        </button>
        <button
          type="button"
          onClick={() => setActiveTool("contempt")}
          className="btn-start"
        >
          Begin
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="app-shell">
        <div className="app-window">
          {/* Top Nav */}
          <div className="nav-banner">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 px-3 py-2 flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="For Our Children & Families"
                  className="h-8 w-8 rounded-xl object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">
                    For Our Children
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    & Families
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:bg-white/10 transition"
                    onClick={() => alert("Resources coming soon")}
                  >
                    Resources
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:bg-white/10 transition"
                    onClick={() => alert("Notes coming soon")}
                  >
                    Notes
                  </button>
                </div>
                <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black text-slate-300 tracking-wider">
                  v2026.1
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-10 flex flex-col">
            {activeTool ? (
              <div className="w-full max-w-5xl">
                {activeTool === "support" && (
                  <SupportWizard onBack={() => setActiveTool(null)} />
                )}
                {activeTool === "tracker" && (
                  <FilingTracker onBack={() => setActiveTool(null)} />
                )}
                {activeTool === "contempt" && (
                  <ContemptWizard onBack={() => setActiveTool(null)} />
                )}
              </div>
            ) : (
              HomeView
            )}
          </div>

          {/* Footer */}
          <div className="py-5 bg-black/25 border-t border-white/10 flex justify-center">
            <p className="text-[10px] font-black text-slate-300/60 uppercase tracking-[0.5em] text-center px-4">
              Pro Se Maine • For Our Children & Families
            </p>
          </div>
        </div>

        {/* Decorative phone mock */}
        <div className="phone-card hidden xl:block" aria-hidden="true">
          <div className="phone-inner">
            <img src="/logo.png" alt="" className="phone-logo" />
            <div className="text-center space-y-1">
              <div className="text-[11px] font-black text-slate-200 uppercase tracking-widest">
                For Our Children
              </div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                & Families
              </div>
            </div>
            <div className="mt-4 w-full">
              <div className="rounded-full bg-rose-500/90 hover:bg-rose-500 text-white text-center py-3 text-sm font-bold shadow-lg shadow-rose-500/20">
                Motions
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
