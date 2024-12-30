import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <img
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={37}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">
            2024년 12월 3일, 대한민국
          </h1>
          <p>
            <a href="/archive" className="text-blue-500 hover:underline">
              기록 보기
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
