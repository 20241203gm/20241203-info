'use client';

import React, { useEffect, useRef } from 'react';
import { Story, Media } from '@/types/story';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MediaContent = ({ media }: { media: Media[] }) => {
  const getYoutubeEmbedUrl = (url: string) => {
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <div style={{ 
          maxWidth: '1200px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '1.5rem', 
          borderRadius: '1rem'
        }}>
          <div>
            <pre style={{ 
              fontSize: '1rem',
              color: '#FFFFFF',
              lineHeight: '1.6',
              fontWeight: '400',
              whiteSpace: 'pre-wrap',
              wordBreak: 'keep-all',
              textAlign: 'left',
              margin: 0
            }}>
              {content}
            </pre>
            {summary && (
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: 'bold', 
                marginTop: '1.5rem',
                color: '#FFFFFF',
                wordBreak: 'keep-all',
                textAlign: 'left'
              }}>
                "{summary}"
              </div>
            )}
          </div>
          
          {media && media.length > 0 && (
            <div style={{ width: '100%', marginTop: '1.5rem' }}>
              <MediaContent media={media} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorySection;
