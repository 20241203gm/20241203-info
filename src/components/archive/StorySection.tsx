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
  const mediaItem = media && media[0];
  const contentHeight = mediaItem?.type === 'text' ? '40%' : '10%';

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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(900px, 75%)',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '2vh',
        color: 'white',
        zIndex: 1,
      }}>
        {/* 설명 섹션 */}
        <div 
          className="story-content-scroll"
          style={{
            height: contentHeight,
            padding: 'clamp(1rem, 3vw, 2rem)',
            overflowY: 'auto',
          }}
        >
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
        {mediaItem && mediaItem.type !== 'text' && (
          <div 
            style={{
              height: '40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 3vw, 2rem)',
            }}
          >
            {mediaItem.type === 'video' ? (
              <iframe
                src={mediaItem.url}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={mediaItem.url}
                alt={mediaItem.caption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            )}
          </div>
        )}

        {/* 미디어 설명 */}
        {mediaItem && (
          <div style={{
            height: '10%',
            display: 'flex',
            alignItems: 'center',
            padding: 'clamp(1rem, 3vw, 2rem)',
            gap: '1rem',
          }}>
            <p style={{
              fontSize: '0.9rem',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: '200',
              flex: 1,
            }}>
              {mediaItem.caption}
            </p>
            <a
              href={mediaItem.url}
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
        )}

        {/* 요약 섹션 */}
        <div style={{
          height: '30%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div 
            className="story-content-scroll"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '0.5rem',
              maxHeight: '100%',
              overflowY: 'auto',
            }}
          >
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
      </div>
    </section>
  );
}
