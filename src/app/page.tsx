export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">20241203.info</h1>
      <p className="text-xl mb-4">시민활동 인터랙티브 아카이브</p>
      
      <div className="grid gap-4 mt-8">
        <section className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">프로젝트 소개</h2>
          <p>이 프로젝트는 시민활동의 기록을 인터랙티브한 방식으로 보존하고 공유하는 것을 목적으로 합니다.</p>
        </section>

        <a 
          href="/archive" 
          className="block p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          아카이브 보기
        </a>
      </div>
    </main>
  );
}
