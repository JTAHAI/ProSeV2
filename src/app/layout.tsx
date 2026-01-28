import './globals.css'
import ResearchSidebar from '@/components/ResearchSidebar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 opacity-10 bg-[grid_#ffffff_1px_bg-[size:40px_40px]]" />

        {/* The Phone Container */}
        <div className="phone-bezel animate-in fade-in slide-in-from-top-10 duration-700">
          <div className="phone-top-bar" />
          
          <div className="h-[750px] overflow-y-auto overflow-x-hidden rounded-[2.2rem]">
            {/* Branded Header Inside Phone */}
            <header className="bg-indigo-600/20 pt-12 pb-8 flex flex-col items-center border-b border-white/5">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full" />
                <img src="/logo.png" alt="Logo" className="relative h-16 w-16 rounded-full border-2 border-white shadow-lg" />
              </div>
              <h1 className="text-xl font-serif italic uppercase text-white px-4 text-center">
                For Our Children & Families
              </h1>
            </header>

            <main className="p-6">
              {children}
            </main>
          </div>
        </div>

        {/* AI Research stays outside the phone on the desktop screen */}
        <ResearchSidebar />
      </body>
    </html>
  )
}
