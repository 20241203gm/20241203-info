import { google } from 'googleapis';
import { Story, Media } from '@/types/story';

export async function getStoriesFromSheet(): Promise<Story[]> {
  try {
    console.log('Initializing Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!),
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
    
    if (!rows) return [];

    return rows.map(row => {
      const background = row[0] || 'https://images.unsplash.com/photo-1596796930385-0885a029049b';
      
      const media: Media[] = [];
      if (row[2] && row[3]) {
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
    throw error;
  }
} 