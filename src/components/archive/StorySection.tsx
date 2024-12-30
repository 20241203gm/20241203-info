'use client';

import { Story } from '@/types/story';

export default function StorySection({ background, content, media, summary }: Story) {
  return (
    <div 
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
            padding: '2rem'
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
          </div>
        </div>
      </div>
    </div>
  );
}
