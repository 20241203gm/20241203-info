import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아카이브 - 20241203.info',
  description: '시민활동 아카이브',
};

export default function ArchivePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">아카이브</h1>
      <p className="text-xl">아카이브 페이지 테스트</p>
    </div>
  );
}
