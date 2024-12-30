import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Story, Media } from '@/types/story';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

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
        spreadsheetId: sheetId,
        range: `${sheetTitle}!A2:G`,
      });
      
      console.log('API Response:', JSON.stringify(response.data, null, 2));

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        console.log('No data found in sheet');
        return [];
      }

      console.log('Raw data from sheets:', JSON.stringify(rows, null, 2));
      console.log('Processing rows...');

      const stories: Story[] = rows.map((row) => {
        if (!Array.isArray(row) || row.length < 6) {
          console.warn('Invalid row format:', row);
          return null;
        }

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

        console.log('Processed story:', JSON.stringify(story, null, 2));
        return story;
      }).filter(Boolean) as Story[];

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