'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Story, Media } from '@/types/story';
import { nanumPen, notoSansKr } from '@/lib/fonts';

const MediaContent = ({ media }: { media: Media }) => {
  switch (media.type) {
    case 'image':
      return (
        <figure className="my-8">
          <img src={media.url} alt="" className="rounded-lg shadow-lg w-full" />
          {media.caption && (
            <figcaption className="mt-2 text-sm text-gray-300 italic">
              {media.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'video':
      return (
        <figure className="my-8">
          <video 
            src={media.url} 
            controls 
            className="rounded-lg shadow-lg w-full"
          />
          {media.caption && (
            <figcaption className="mt-2 text-sm text-gray-300 italic">
              {media.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'text':
      return (
        <div className="my-8">
          <a 
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {media.caption || '문서 보기'}
          </a>
        </div>
      );
    default:
      return null;
  }
};

export default function StorySection({ background, content, media, summary }: Story) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current || !contentRef.current) return;

    // 배경 페이드 효과
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    );

    // 컨텐츠 슬라이드 인 효과
    gsap.fromTo(
      contentRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto p-8 text-white">
        <div className="prose prose-invert">
          <div className="mb-8">
            <div className={`text-base mb-4 ${notoSansKr.className}`}>{content}</div>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg -m-2" />
              <div className={`text-3xl text-gray-400 font-bold ${nanumPen.className} relative z-10 px-2`}>
                "{summary}"
              </div>
            </div>
          </div>
          
          {media && media.length > 0 && (
            <div className="space-y-8">
              {media.map((item, index) => (
                <MediaContent key={index} media={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
