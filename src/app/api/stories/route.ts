import { getStoriesFromSheet } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching stories from sheets...');
    const stories = await getStoriesFromSheet();
    console.log('Stories fetched:', stories);
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Detailed error in /api/stories:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch stories' },
      { status: 500 }
    );
  }
} 