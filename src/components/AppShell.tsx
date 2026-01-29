"use client";

import { useState } from "react";
import ResearchSidebar from "@/components/ResearchSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      {/* Mobile top bar */}
      <header className="shellTopbar">
        <button className="iconBtn" onClick={() => setOpen(true)} aria-label="Open research panel">
          ☰
        </button>
        <div className="shellBrand">Maine Law AI</div>
      </header>

      {/* Desktop sidebar */}
      <aside className="shellSidebar">
        <ResearchSidebar />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="drawerOverlay" onClick={() => setOpen(false)}>
          <div className="drawerPanel" onClick={(e) => e.stopPropagation()}>
            <div className="drawerHeader">
              <div className="drawerTitle">Research</div>
              <button className="iconBtn" onClick={() => setOpen(false)} aria-label="Close research panel">
                ✕
              </button>
            </div>
            <ResearchSidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="shellMain">{children}</main>
    </div>
  );
}
