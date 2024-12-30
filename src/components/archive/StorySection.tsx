'use client';

import { Story } from '@/types/story';

export default function StorySection({ background, content, media, summary }: Story) {
  return (
    <section 
      className="relative w-screen h-screen overflow-hidden snap-start snap-always"
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <img 
          src={background}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50"
      />
      
      {/* 콘텐츠 */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-white"
      >
        <div className="max-w-[1200px] p-12 text-center w-full">
          <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-8">
            <div className="mb-12">
              {/* 본문 */}
              <div className="text-lg whitespace-pre-wrap leading-relaxed mb-10">
                {content}
              </div>
              
              {/* 요약 */}
              {summary && (
                <div className="relative inline-block mt-8 px-12 py-4">
                  <div className="absolute inset-0 bg-white/35 backdrop-blur-sm rounded" />
                  <div className="relative text-3xl font-['East_Sea_Dokdo'] tracking-wide text-black">
                    "{summary}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
