import { NextResponse } from 'next/server';
import { getStoriesFromSheet } from '@/lib/sheets';

export async function GET() {
  console.log('API: Starting GET request...');
  try {
    console.log('API: Fetching stories...');
    const stories = await getStoriesFromSheet();
    console.log('API: Stories fetched successfully:', stories);
    return NextResponse.json(stories);
  } catch (error) {
    console.error('API: Failed to fetch stories:', error);
    if (error instanceof Error) {
      console.error('API: Error message:', error.message);
      console.error('API: Error stack:', error.stack);
    }
    return new NextResponse('Failed to fetch stories', { status: 500 });
  }
} 