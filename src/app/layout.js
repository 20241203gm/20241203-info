import './globals.css'

export const metadata = {
  title: '20241203.info',
  description: '시민활동 인터랙티브 아카이브',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
} 