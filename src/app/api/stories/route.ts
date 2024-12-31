import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Story, Media } from '@/types/story';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const cleanUrl = (url: string) => {
  if (!url) return '';
  return url.trim().startsWith('@') ? url.trim().substring(1) : url.trim();
};

const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return '';
  
  // 이미 임베드 URL인 경우 그대로 반환
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  try {
    let videoId = '';
    let timestamp = '';

    // 라이브 스트림
    if (url.includes('youtube.com/live/')) {
      videoId = url.split('live/')[1].split('?')[0];
      const tMatch = url.match(/[?&]t=(\d+)s?/);
      if (tMatch) {
        timestamp = tMatch[1];
      }
    }
    // 일반 URL
    else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('?')[0];
      const tMatch = url.match(/[?&]t=(\d+)s?/);
      if (tMatch) {
        timestamp = tMatch[1];
      }
    }
    // 단축 URL
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
      const tMatch = url.match(/[?&]t=(\d+)s?/);
      if (tMatch) {
        timestamp = tMatch[1];
      }
    }

    if (!videoId) return url;
    
    const embedUrl = `https://www.youtube.com/embed/${videoId}${timestamp ? `?start=${timestamp}` : ''}`;
    console.log('Generated embed URL:', embedUrl);
    return embedUrl;

  } catch (e) {
    console.error('Error processing YouTube URL:', e);
    return url;
  }
};

const getStoriesFromSheet = async () => {
  console.log('Starting getStoriesFromSheet...');
  try {
    console.log('Checking environment variables...');
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const sheetId = process.env.SHEET_ID;

    if (!credentials) {
      throw new Error('GOOGLE_SHEETS_CREDENTIALS is not defined');
    }
    if (!sheetId) {
      throw new Error('SHEET_ID is not defined');
    }

    console.log('Parsing credentials...');
    let parsedCredentials;
    try {
      parsedCredentials = JSON.parse(credentials);
      console.log('Service account email:', parsedCredentials.client_email);
    } catch (e: any) {
      throw new Error('Failed to parse GOOGLE_SHEETS_CREDENTIALS: ' + e.message);
    }
    console.log('Credentials parsed successfully');

    console.log('Initializing Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials: parsedCredentials,
      scopes: SCOPES,
    });

    console.log('Creating sheets client...');
    const sheets = google.sheets({ version: 'v4', auth });

    console.log('Fetching data from sheet...');
    console.log('Sheet ID:', sheetId);
    try {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
      });

      if (!spreadsheet.data.sheets || spreadsheet.data.sheets.length === 0) {
        throw new Error('No sheets found in the spreadsheet');
      }

      const firstSheet = spreadsheet.data.sheets[0];
      const sheetTitle = firstSheet.properties?.title;

      if (!sheetTitle) {
        throw new Error('Could not get sheet title');
      }

      console.log('First sheet title:', sheetTitle);

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: 'Stories!A2:H',
      });
      
      console.log('API Response:', JSON.stringify(response.data, null, 2));

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        console.log('No data found in sheet');
        return [];
      }

      console.log('Raw data from sheets:', JSON.stringify(rows, null, 2));
      console.log('Processing rows...');

      const stories: Story[] = rows.map((row, index) => {
        console.log(`Processing row ${index}:`, row);
        
        if (!Array.isArray(row)) {
          console.warn(`Row ${index} is not an array:`, row);
          return null;
        }

        const [
          _unused = '',        // A열: 무시
          imageUrl = '',       // B열: 이미지 URL (background로 사용)
          title = '',          // C열: 제목
          content = '',        // D열: 메인 컨텐츠 내용
          mediaType = '',      // E열: 미디어 타입
          mediaUrl = '',       // F열: 미디어 URL
          mediaCaption = '',   // G열: 미디어 설명
          summary = ''         // H열: 컨텐츠 요약
        ] = row;
        
        const background = cleanUrl(imageUrl);
        const cleanMediaUrl = mediaType === 'video' ? getYoutubeEmbedUrl(cleanUrl(mediaUrl)) : cleanUrl(mediaUrl);

        console.log(`Row ${index} fields:`, {
          background,
          title,
          content,
          mediaType,
          mediaUrl: cleanMediaUrl,
          mediaCaption,
          summary
        });

        const media: Media[] = [];

        if (cleanMediaUrl) {
          console.log(`Row ${index} has media:`, { mediaType, mediaUrl: cleanMediaUrl, mediaCaption });
          media.push({
            type: (mediaType || 'image') as 'video' | 'image' | 'text',
            url: cleanMediaUrl,
            caption: mediaCaption || ''
          });
        }

        const story: Story = {
          background,          // B열의 이미지 URL을 배경으로 사용
          title: title || '',  // C열의 제목, 없으면 빈 문자열
          content,            // D열의 메인 컨텐츠 내용
          media,              // 미디어 정보
          summary: summary || '' // H열의 컨텐츠 요약
        };

        console.log(`Processed story ${index}:`, JSON.stringify(story, null, 2));
        return story;
      }).filter((story): story is Story => {
        if (!story) {
          return false;
        }
        const isValid = 
          typeof story.background === 'string' &&
          typeof story.title === 'string' &&
          typeof story.content === 'string' &&
          Array.isArray(story.media) &&
          typeof story.summary === 'string';
        
        if (!isValid) {
          console.warn('Invalid story object:', story);
        }
        return isValid;
      });

      console.log('Final stories array:', JSON.stringify(stories, null, 2));
      return stories;
    } catch (error) {
      console.error('Error in getStoriesFromSheet:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in getStoriesFromSheet:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

export async function GET() {
  console.log('API: Starting GET request...');
  try {
    console.log('API: Fetching stories...');
    const stories = await getStoriesFromSheet();
    console.log('API: Stories fetched successfully:', JSON.stringify(stories, null, 2));
    return NextResponse.json(stories);
  } catch (error: any) {
    console.error('API: Failed to fetch stories:', error);
    console.error('API: Error message:', error.message);
    console.error('API: Error stack:', error.stack);
    
    interface ErrorDetails {
      message: string;
      stack?: string;
      name: string;
      status?: number;
      statusText?: string;
      data?: any;
    }

    let errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      name: error.name
    };

    if (error.response) {
      errorDetails = {
        ...errorDetails,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
    }

    return NextResponse.json(
      { 
        error: 'Failed to fetch stories',
        details: errorDetails
      },
      { status: 500 }
    );
  }
} 