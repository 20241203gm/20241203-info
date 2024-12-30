'use client';

import React, { useEffect, useRef } from 'react';
import { Story, Media } from '@/types/story';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  background: string;
  content: string;
  media?: {
    type: 'video' | 'image' | 'text';
    url: string;
    caption: string;
  }[];
  summary: string;
}

export default function StorySection({ background, content, media, summary }: StorySectionProps) {
  console.log('StorySection props:', { background, content, media, summary });

  return (
    <section
      style={{
        width: '100%',
        height: '100vh',
        scrollSnapAlign: 'start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 이미지 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 콘텐츠 컨테이너 */}
      <div
        style={{
          width: 'min(900px, 75%)',
          height: '100%',
          margin: '2rem auto',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2rem',
          color: 'white',
          position: 'relative',
          overflowY: 'auto',
        }}
      >
        {/* 본문 내용 */}
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: 200,
            fontSize: '1rem',
            lineHeight: 1.6,
            margin: 0,
            width: '100%',
          }}
        >
          {content}
        </pre>

        {/* 미디어 섹션 */}
        {media && media.length > 0 && media.map((item, index) => (
          <div key={index} style={{ width: '100%' }}>
            {item.type === 'image' && (
              <img 
                src={item.url} 
                alt={item.caption}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                }}
              />
            )}
            {item.type === 'video' && (
              <iframe
                src={item.url}
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  border: 'none',
                  borderRadius: '0.5rem',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {item.caption && (
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '0.5rem',
              }}>
                {item.caption}
              </div>
            )}
          </div>
        ))}

        {/* 요약 */}
        {summary && (
          <div
            style={{
              width: '100%',
              padding: '1rem clamp(0.75rem, 2vw, 1.5rem)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              fontFamily: "'East Sea Dokdo', cursive",
              fontSize: '1.125rem',
              lineHeight: 1.4,
            }}
          >
            {summary}
          </div>
        )}
      </div>
    </section>
  );
}
