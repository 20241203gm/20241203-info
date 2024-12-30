'use client';

import { useEffect, useState } from 'react';
import StorySection from '@/components/archive/StorySection';
import { Story } from '@/types/story';

export default function ArchivePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStories() {
      console.log('Client: Starting to load stories');
      try {
        setLoading(true);
        console.log('Client: Fetching stories from API...');
        const response = await fetch('/api/stories');
        console.log('Client: Response received:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Client: API error response:', errorText);
          throw new Error(`Failed to fetch stories: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Client: Stories data received:', data);
        setStories(data);
      } catch (err) {
        console.error('Client: Failed to load stories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load stories');
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  if (loading) {
    console.log('Client: Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    console.log('Client: Showing error state:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">에러: {error}</div>
      </div>
    );
  }

  if (stories.length === 0) {
    console.log('Client: No stories found');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">아직 기록이 없습니다.</div>
      </div>
    );
  }

  console.log('Client: Rendering stories:', stories.length);
  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth'
    }}>
      {stories.map((story, index) => (
        <StorySection key={index} {...story} />
      ))}
    </main>
  );
} 