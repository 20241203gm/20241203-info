import { Nanum_Pen_Script, Noto_Sans_KR } from 'next/font/google';

export const nanumPen = Nanum_Pen_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const notoSansKr = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
}); 