import { google } from 'googleapis';
import { Story, Media } from '@/types/story';

export async function getStoriesFromSheet(): Promise<Story[]> {
  try {
    console.log('Starting getStoriesFromSheet...');
    
    // 환경 변수 확인
    console.log('Checking environment variables...');
    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      throw new Error('GOOGLE_SHEETS_CREDENTIALS is not defined');
    }
    if (!process.env.SHEET_ID) {
      throw new Error('SHEET_ID is not defined');
    }

    console.log('Parsing credentials...');
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    console.log('Credentials parsed successfully');

    console.log('Initializing Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    console.log('Creating sheets client...');
    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('Fetching data from sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Stories!A2:F',
    });

    const rows = response.data.values;
    console.log('Raw data from sheets:', rows);
    
    if (!rows) {
      console.log('No data found in sheet');
      return [];
    }
    console.log('Processing rows...');
    return rows.map(row => {
      const title = row[0] || '';
      const background = row[1] || 'https://images.unsplash.com/photo-1596796930385-0885a029049b';
      const content = row[2] || '';
      
      const media: Media[] = [];
      if (row[3] && row[4]) {
        media.push({
          type: row[2] as Media['type'],
          url: row[3],
          caption: row[4] || undefined
        });
      }

      const story = {
        background,
        content: row[1] || '',
        media: media.length > 0 ? media : undefined,
        summary: row[5] || undefined
      };
      
      console.log('Processed story:', story);
      return story;
    });
  } catch (error) {
    console.error('Error in getStoriesFromSheet:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
} 