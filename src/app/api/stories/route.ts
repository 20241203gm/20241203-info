import { NextResponse } from 'next/server';
import { getStoriesFromSheet } from '@/lib/sheets';

export async function GET() {
  console.log('API route: /api/stories called');
  try {
    console.log('API route: Fetching stories from sheet...');
    const stories = await getStoriesFromSheet();
    console.log('API route: Stories fetched successfully:', stories);
    return NextResponse.json(stories);
  } catch (error) {
    console.error('API route: Failed to fetch stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
} 