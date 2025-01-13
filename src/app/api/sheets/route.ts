import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// 구글 API 인증 설정
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheetId = searchParams.get('sheetId');
    const range = searchParams.get('range');

    if (!sheetId || !range) {
      return NextResponse.json(
        { error: 'sheetId와 range는 필수 파라미터입니다.' },
        { status: 400 }
      );
    }

    // 구글 시트 API 클라이언트 생성
    const sheets = google.sheets({ version: 'v4', auth });

    // 시트 데이터 가져오기
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ data: [] });
    }

    // 첫 번째 행을 헤더로 사용하여 데이터 구조화
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const item: { [key: string]: string } = {};
      row.forEach((value, index) => {
        item[headers[index]] = value;
      });
      return item;
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error('구글 시트 데이터 가져오기 실패:', error);
    return NextResponse.json(
      { error: '구글 시트 데이터를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 