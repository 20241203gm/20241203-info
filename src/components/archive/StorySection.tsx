'use client';

import React, { useEffect, useRef } from 'react';
import { Story, Media } from '@/types/story';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  background: string;
  content: string;
  media?: Media[];
  summary: string;
}

export default function StorySection({ background, content, media, summary }: StorySectionProps) {
  return (
    <section style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      scrollSnapAlign: 'start',
      overflow: 'hidden',
    }}>
      {/* 배경 이미지 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
        <img
          src={background}
          alt="배경"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }} />
      </div>

      {/* 콘텐츠 컨테이너 */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: 'min(900px, 75%)',
        height: '100%',
        margin: '0 auto',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        color: 'white',
      }}>
        {/* 내용 섹션 */}
        <div style={{
          flex: '1 1 40%',
          overflowY: 'auto',
          className: 'story-content-scroll'
        }}>
          <pre style={{
            fontSize: '1rem',
            fontWeight: '200',
            fontFamily: "'Noto Sans KR', sans-serif",
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            lineHeight: '1.6',
          }}>
            {content}
          </pre>
        </div>

        {/* 미디어 섹션 */}
        {media && media.length > 0 && (
          <div style={{
            flex: '1 1 30%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            className: 'story-content-scroll'
          }}>
            {media.map((item, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {item.type === 'video' ? (
                  <iframe
                    src={item.url}
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.caption}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                ) : null}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <p style={{
                    fontSize: '0.9rem',
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontWeight: '200',
                    flex: 1,
                  }}>
                    {item.caption}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'white',
                      color: 'black',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontWeight: '400',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    원본보기
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 요약 섹션 */}
        <div style={{
          flex: '0 0 auto',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem clamp(0.75rem, 2vw, 1.5rem)',
          borderRadius: '0.5rem',
        }}>
          <div style={{
            fontSize: '1.7rem',
            fontFamily: "'East Sea Dokdo', cursive",
            textAlign: 'center',
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            lineHeight: '1.3',
          }}>
            "{summary}"
          </div>
        </div>
      </div>
    </section>
  );
}
