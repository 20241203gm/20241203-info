'use client';

import { useEffect, useState } from 'react';
import StorySection from '@/components/archive/StorySection';
import { Story } from '@/types/story';

export default function HomePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStories() {
      console.log('Client: Starting to load stories');
      try {
        setLoading(true);
        const response = await fetch('/api/stories');
        console.log('Client: Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch stories: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Client: Stories loaded:', data);
        
        // 데이터 유효성 검사
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected an array');
        }
        
        // 각 스토리 객체의 필수 필드 확인
        const validStories = data.filter((story: any) => {
          const isValid = story && 
            typeof story.background === 'string' && 
            typeof story.content === 'string';
          
          if (!isValid) {
            console.error('Invalid story object:', story);
          }
          return isValid;
        });
        
        console.log('Client: Valid stories:', validStories.length);
        setStories(validStories);
      } catch (err) {
        console.error('Client: Error loading stories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load stories');
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">에러: {error}</div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">아직 기록이 없습니다.</div>
      </div>
    );
  }

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth',
      position: 'relative'
    }}>
      {stories.map((story, index) => {
        console.log('Rendering story:', index, story);
        return (
          <StorySection 
            key={index} 
            background={story.background}
            content={story.content}
            media={story.media}
            summary={story.summary}
          />
        );
      })}
    </main>
  );
} 