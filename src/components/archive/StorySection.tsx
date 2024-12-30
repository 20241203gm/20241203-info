'use client';

import React, { useEffect, useRef } from 'react';
import { Story, Media } from '@/types/story';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MediaContent = ({ media }: { media: Media[] }) => {
  const getYoutubeEmbedUrl = (url: string) => {
    // 라이브 스트림 타임스탬프 처리
    if (url.includes('live/')) {
      const videoId = url.split('live/')[1].split('?')[0];
      const timestamp = url.includes('?t=') ? url.split('?t=')[1] : '';
      return `https://www.youtube.com/embed/${videoId}${timestamp ? `?start=${timestamp}` : ''}`;
    }

    // 일반적인 유튜브 URL 처리
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    return url;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {media.map((item, index) => {
        if (item.type === 'image') {
          return (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={item.url}
                alt={item.caption}
                style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
              />
              {item.caption && (
                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#FFFFFF' }}>
                  {item.caption}
                </p>
              )}
            </div>
          );
        } else if (item.type === 'video') {
          const embedUrl = getYoutubeEmbedUrl(item.url);
          console.log('Original URL:', item.url);
          console.log('Embed URL:', embedUrl);
          return (
            <div key={index} style={{ 
              position: 'relative',
              width: '100%',
              maxWidth: '1024px',
              margin: '0 auto'
            }}>
              <div style={{ 
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%'
              }}>
                <iframe
                  src={embedUrl}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '0.5rem'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {item.caption && (
                <p style={{ 
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#FFFFFF',
                  textAlign: 'center'
                }}>
                  {item.caption}
                </p>
              )}
            </div>
          );
        } else {
          return (
            <div key={index}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#60A5FA',
                  textDecoration: 'underline'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#93C5FD';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#60A5FA';
                }}
              >
                {item.caption || '관련 링크'}
              </a>
            </div>
          );
        }
      })}
    </div>
  );
};

const StorySection: React.FC<Story> = ({
  background,
  content,
  media,
  summary,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Content:', content);
  }, [content]);

  return (
    <div 
      ref={sectionRef}
      style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'relative',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
      <img 
        src={background}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover'
        }}
      />
      
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }} />
      
      <div 
        ref={contentRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 'clamp(1rem, 5vh, 3rem)',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
        className="story-content-scroll"
      >
        <div style={{ 
          maxWidth: 'min(900px, 75%)',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          borderRadius: '1rem',
          margin: '0 auto',
          minHeight: 'min-content',
          height: 'auto',
          overflowY: 'visible'
        }}>
          <div>
            <pre style={{ 
              fontSize: 'clamp(0.875rem, 3vw, 1rem)',
              color: '#FFFFFF',
              lineHeight: '1.6',
              fontWeight: '200',
              whiteSpace: 'pre-wrap',
              wordBreak: 'keep-all',
              textAlign: 'left',
              margin: 0,
              fontFamily: "'Noto Sans KR', sans-serif",
              width: '100%'
            }}>
              {content}
            </pre>

            {media && media.length > 0 && (
              <div style={{ 
                width: '100%', 
                marginTop: '2rem',
                maxWidth: '100%'
              }}>
                <MediaContent media={media} />
              </div>
            )}

            {summary && (
              <div style={{ 
                fontSize: 'clamp(1.5rem, 5vw, 1.7rem)', 
                fontWeight: 'normal', 
                marginTop: '2rem',
                color: '#FFFFFF',
                wordBreak: 'keep-all',
                textAlign: 'center',
                fontFamily: "'East Sea Dokdo', cursive",
                padding: '0 clamp(1rem, 3vw, 2rem)'
              }}>
                "{summary}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
