'use client';

import React, { useEffect, useRef } from 'react';
import { Story, Media } from '@/types/story';

interface StorySectionProps {
  background: string;
  title: string;
  content: string;
  media?: Media[];
  summary?: string;
  last?: string;
}

export default function StorySection({ background, title, content, media, summary, last }: StorySectionProps) {
  const mediaItem = media && media[0];
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!videoRef.current || mediaItem?.type !== 'video') return;

    console.log('Video URL:', mediaItem.url);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target as HTMLIFrameElement;
          console.log('Intersection state:', entry.isIntersecting);
          if (!entry.isIntersecting) {
            iframe.style.opacity = '0';
          } else {
            iframe.style.opacity = '1';
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [mediaItem]);

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

      {/* 제목 (상위 10%) */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        zIndex: 1,
        color: 'white',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontFamily: "'Noto Sans KR', sans-serif",
          fontWeight: '700',
          lineHeight: '1.4',
          wordBreak: 'keep-all',
        }}>
          {title}
        </h1>
      </div>

      {/* 콘텐츠/미디어 영역 (20-69%) */}
      <div style={{
        position: 'absolute',
        top: '20%',
        height: '49%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {/* 내용 표시 */}
        <pre style={{
          width: '80%',
          height: mediaItem?.type === 'text' ? '100%' : '30%',
          padding: mediaItem?.type === 'text' ? '2rem' : '1rem',
          color: 'white',
          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
          fontWeight: '200',
          fontFamily: "'Noto Sans KR', sans-serif",
          whiteSpace: 'pre-wrap',
          wordBreak: 'keep-all',
          lineHeight: '1.6',
          margin: 0,
          overflowY: 'auto',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          {content}
        </pre>

        {/* 미디어 표시 */}
        {mediaItem?.type === 'video' ? (
          <div style={{
            width: '100%',
            maxWidth: '800px',
            height: '65%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'relative',
              width: '80%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: 'calc(100% * 0.5625)',
              }}>
                <iframe
                  ref={videoRef}
                  src={mediaItem.url}
                  title="YouTube video player"
                  frameBorder="0"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    opacity: 1,
                    transition: 'opacity 0.3s ease'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ) : mediaItem?.type === 'image' ? (
          <div style={{
            width: '70%',
            maxWidth: '800px',
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}>
            <img
              src={mediaItem.url}
              alt={mediaItem.caption}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ) : null}
      </div>

      {/* 미디어 설명 및 링크 (70%) */}
      {mediaItem && (
        <div style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: 'white',
        }}>
          <span style={{
            fontSize: '0.9rem',
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: '200',
          }}>
            {mediaItem.caption}
          </span>
          <a
            href={mediaItem.type === 'video' ? mediaItem.url.replace('embed/', 'watch?v=') : mediaItem.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: 'white',
              color: 'black',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: '400',
              whiteSpace: 'nowrap',
            }}
          >
            원본보기
          </a>
        </div>
      )}

      {/* 요약 (미디어 설명 아래) */}
      {summary && (
        <div style={{
          position: 'absolute',
          top: 'calc(70% + 2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}>
            <div style={{
              fontSize: 'clamp(1.4rem, 4vw, 1.7rem)',
              fontFamily: "'East Sea Dokdo', cursive",
              whiteSpace: 'pre-wrap',
              wordBreak: 'keep-all',
              lineHeight: '1.3',
              textAlign: 'center',
            }}>
              "{summary}"
            </div>
          </div>
        </div>
      )}

      {/* 마지막 페이지 텍스트 */}
      {last && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}>
          <div style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: '700',
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            lineHeight: '1.5',
          }}>
            {last}
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScipB0kw0MEM9UuYc2dULjySMbVFXQF7UEIGGV-xfjJLKsOEA/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: 'black',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: '500',
              transition: 'opacity 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            구글 폼으로 이동
          </a>
        </div>
      )}
    </section>
  );
}
