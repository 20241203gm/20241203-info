import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Archive page',
}

export const dynamic = 'force-static'

export default function ArchivePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Archive</h1>
      <p>This is the archive page.</p>
    </main>
  )
}
