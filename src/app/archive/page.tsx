'use client';

import { useEffect, useState } from 'react';
import StorySection from '@/components/archive/StorySection';

export default function ArchivePage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStories() {
      try {
        setLoading(true);
        const response = await fetch('/api/stories');
        if (!response.ok) throw new Error('Failed to fetch stories');
        const data = await response.json();
        console.log('Loaded data:', data);
        setStories(data);
      } catch (err) {
        console.error('Failed to load stories:', err);
        setError(err instanceof Error ? err.message : 'Failed to load stories');
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (stories.length === 0) return <div>No stories found</div>;

  return (
    <main className="relative">
      {stories.map((section, index) => (
        <StorySection
          key={index}
          {...section}
        />
      ))}
    </main>
  );
}
