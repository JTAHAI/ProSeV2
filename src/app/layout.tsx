import './globals.css'
import AppShell from '@/components/AppShell'

export const metadata = {
  title: 'Pro Se',
  description: 'Parent Pro Se App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html> 
      )
  }

