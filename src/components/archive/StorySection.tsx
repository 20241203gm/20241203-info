'use client';

import { useRef } from 'react';
import { Story, Media } from '@/types/story';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MediaContent = ({ media }: { media: Media }) => {
  // YouTube URL에서 비디오 ID를 추출하는 함수
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  switch (media.type) {
    case 'image':
      return (
        <figure className="my-8">
          <img 
            src={media.url} 
            alt={media.caption || ''} 
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
          />
          {media.caption && (
            <figcaption className="mt-2 text-sm text-white/80 italic">
              {media.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'video':
      const videoId = getYouTubeVideoId(media.url);
      if (videoId) {
        return (
          <figure className="my-8">
            <div style={{ 
              position: 'relative',
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto',
              paddingBottom: 'min(56.25%, calc(100vh - 200px))',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '0.5rem'
            }}>
              {media.caption && (
                <div className="text-sm text-white/80 italic">
                  출처: {media.caption}
                </div>
              )}
              <a 
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  padding: '0.25rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                }}
              >
                원문 보기
              </a>
            </div>
          </figure>
        );
      }
      return (
        <figure className="my-8">
          <video 
            src={media.url} 
            controls 
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
          />
          {media.caption && (
            <figcaption className="mt-2 text-sm text-white/80 italic">
              {media.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'text':
      return (
        <div className="my-8">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <div className="text-sm text-white/80 italic">
              출처: {media.caption}
            </div>
            <a 
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
              }}
            >
              원문 보기
            </a>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function StorySection({ background, content, media, summary }: Story) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef}
      style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'relative',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        <img 
          ref={imageRef}
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
      </div>
      
      <div 
        ref={overlayRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }} 
      />
      
      <div 
        ref={contentRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          zIndex: 2
        }}
      >
        <div style={{ maxWidth: '1200px', padding: '3rem', textAlign: 'center', width: '100%' }}>
          <div style={{ 
            maxHeight: 'calc(100vh - 8rem)', 
            overflowY: 'auto',
            padding: '2rem',
            /* 스크롤바 스타일링 */
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
            msOverflowStyle: 'none'
          }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ 
                fontSize: '1.1rem', 
                whiteSpace: 'pre-wrap', 
                lineHeight: '1.8',
                marginBottom: '2.5rem'
              }}>
                {content}
              </div>
              {summary && (
                <div style={{ 
                  position: 'relative',
                  display: 'inline-block',
                  marginTop: '2rem',
                  padding: '1rem 3rem'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    backdropFilter: 'blur(2px)',
                    borderRadius: '4px'
                  }} />
                  <div style={{ 
                    position: 'relative',
                    fontSize: '1.8rem', 
                    fontFamily: '"East Sea Dokdo", serif',
                    letterSpacing: '0.05em',
                    color: '#000000'
                  }}>
                    "{summary}"
                  </div>
                </div>
              )}
            </div>
            
            {media && media.length > 0 && (
              <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                {media.map((item, index) => (
                  <MediaContent key={index} media={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
