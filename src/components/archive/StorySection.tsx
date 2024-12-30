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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        width: 'min(900px, 90%)',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '2vh',
        color: 'white',
        zIndex: 1,
        position: 'relative',
      }}>
        {/* 설명 섹션 */}
        <div 
          className="story-content-scroll"
          style={{
            flex: mediaItem?.type === 'text' ? '2' : '1',
            padding: 'clamp(1rem, 3vw, 2rem)',
            overflowY: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '0.5rem',
          }}
        >
          <pre style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            fontWeight: '200',
            fontFamily: "'Noto Sans KR', sans-serif",
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            lineHeight: '1.6',
            margin: 0,
          }}>
            {content}
          </pre>
        </div>

        {/* 미디어 섹션 */}
        {mediaItem && mediaItem.type !== 'text' && (
          <div 
            style={{
              flex: '2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.5rem, 2vw, 1rem)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '0.5rem',
            }}
          >
            {mediaItem.type === 'video' ? (
              <iframe
                src={mediaItem.url}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '0.25rem',
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
                  borderRadius: '0.25rem',
                }}
              />
            )}
          </div>
        )}

        {/* 미디어 설명 */}
        {mediaItem && (
          <div style={{
            flex: '0.5',
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem clamp(1rem, 3vw, 2rem)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            <p style={{
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: '200',
              flex: 1,
              margin: 0,
              minWidth: '200px',
            }}>
              {mediaItem.caption}
            </p>
            <a
              href={mediaItem.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: 'white',
                color: 'black',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                fontFamily: "'Noto Sans KR', sans-serif",
                fontWeight: '400',
                opacity: 0.9,
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
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
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '0.5rem',
          padding: 'clamp(0.5rem, 2vw, 1rem)',
        }}>
          <div 
            className="story-content-scroll"
            style={{
              maxHeight: '100%',
              overflowY: 'auto',
              padding: 'clamp(0.5rem, 2vw, 1rem)',
            }}
          >
            <div style={{
              fontSize: 'clamp(1.4rem, 4vw, 1.7rem)',
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
