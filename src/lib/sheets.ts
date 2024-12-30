import { google } from 'googleapis';
import { Story, Media } from '@/types/story';

export async function getStoriesFromSheet(): Promise<Story[]> {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Stories!A2:F', // 범위 수정 (A-F)
  });

  const rows = response.data.values;
  if (!rows) return [];

  return rows.map(row => {
    const media: Media | undefined = row[2] ? {
      type: row[2] as Media['type'],
      url: row[3],
      caption: row[4] || undefined
    } : undefined;

    return {
      background: row[0],
      content: row[1],
      media: media ? [media] : undefined,
      summary: row[5]  // 요약 필드
    };
  });
} 