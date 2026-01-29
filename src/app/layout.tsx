import './globals.css'
import ResearchSidebar from '@/components/ResearchSidebar'

export const metadata = {
  title: 'Pro Se',
  description: 'Parent Pro Se App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <main className="app-window">
            {children}
          </main>
          <ResearchSidebar />
        </div>
      </body>
    </html>
  )
}
