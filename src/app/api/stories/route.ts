import { getStoriesFromSheet } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stories = await getStoriesFromSheet();
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
} 