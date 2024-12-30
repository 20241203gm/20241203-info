import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '20241203.info',
  description: '시민활동 인터랙티브 아카이브',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
