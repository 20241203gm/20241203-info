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
        const response = await fetch('/api/stories', {
          cache: 'no-store'
        });
        console.log('Client: Response status:', response.status);
        
        const data = await response.json();
        console.log('Client: Response data:', JSON.stringify(data, null, 2));
        
        if (!response.ok) {
          throw new Error(`Failed to fetch stories: ${response.status}\nDetails: ${JSON.stringify(data, null, 2)}`);
        }

        if (!Array.isArray(data)) {
          console.error('Invalid data format:', data);
          throw new Error('Invalid data format: expected an array');
        }

        data.forEach((story, index) => {
          console.log(`Story ${index}:`, JSON.stringify(story, null, 2));
          if (!story.background || !story.content) {
            console.error(`Invalid story at index ${index}:`, story);
          }
        });

        setStories(data);
      } catch (error) {
        console.error('Client: Error loading stories:', error);
        setError(error instanceof Error ? error.message : 'Failed to load stories');
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
            title={story.title}
            content={story.content || ''}
            media={story.media}
            summary={story.summary || ''}
          />
        );
      })}
    </main>
  );
} 