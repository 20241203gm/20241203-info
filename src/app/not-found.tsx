import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-4">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        홈으로 돌아가기
      </Link>
    </main>
  )
} 