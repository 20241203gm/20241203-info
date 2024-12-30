import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Story } from '@/types/story';

export async function GET() {
  try {
    // 임시 데이터로 테스트
    const stories: Story[] = [
      {
        background: "https://picsum.photos/1920/1080?random=1",
        content: "첫 번째 이야기입니다.\n여러 줄로 된 내용을 표시할 수 있습니다.",
        media: [
          {
            type: "image",
            url: "https://picsum.photos/800/600?random=1",
            caption: "이미지 설명"
          }
        ],
        summary: "첫 번째 요약"
      },
      {
        background: "https://picsum.photos/1920/1080?random=2",
        content: "두 번째 이야기입니다.\n이것도 여러 줄입니다.",
        media: [
          {
            type: "text",
            url: "https://example.com",
            caption: "관련 문서"
          }
        ],
        summary: "두 번째 요약"
      }
    ];

    return NextResponse.json(stories);
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    return new NextResponse('Failed to fetch stories', { status: 500 });
  }
} 