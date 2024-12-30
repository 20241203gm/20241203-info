import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Story, Media } from '@/types/story';

const getStoriesFromSheet = async () => {
  console.log('Starting getStoriesFromSheet...');
  try {
    console.log('Checking environment variables...');
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const sheetId = process.env.SHEET_ID;

    if (!credentials || !sheetId) {
      throw new Error('Required environment variables are missing');
    }

    console.log('Parsing credentials...');
    const parsedCredentials = JSON.parse(credentials);
    console.log('Credentials parsed successfully');

    console.log('Initializing Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials: parsedCredentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    console.log('Creating sheets client...');
    const sheets = google.sheets({ version: 'v4', auth });

    console.log('Fetching data from sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A2:G',
    });

    const rows = response.data.values;
    if (!rows) {
      throw new Error('No data found in sheet');
    }

    console.log('Raw data from sheets:', rows);
    console.log('Processing rows...');

    const stories: Story[] = rows.map((row) => {
      const [background, content, mediaType, mediaUrl, mediaCaption, summary] = row;
      const media: Media[] = [];

      if (mediaUrl && mediaCaption) {
        media.push({
          type: mediaType as 'video' | 'image' | 'text',
          url: mediaUrl,
          caption: mediaCaption,
        });
      }

      const story: Story = {
        background,
        content,
        media,
        summary,
      };

      console.log('Processed story:', story);
      return story;
    });

    return stories;
  } catch (error) {
    console.error('Error in getStoriesFromSheet:', error);
    throw error;
  }
};

export async function GET() {
  console.log('API: Starting GET request...');
  try {
    console.log('API: Fetching stories...');
    const stories = await getStoriesFromSheet();
    console.log('API: Stories fetched successfully:', stories);
    return NextResponse.json(stories);
  } catch (error: any) {
    console.error('API: Failed to fetch stories:', error);
    console.error('API: Error message:', error.message);
    console.error('API: Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to fetch stories', details: error.message },
      { status: 500 }
    );
  }
} 