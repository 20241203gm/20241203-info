import { createClient } from '@supabase/supabase-js';
import Twitter from 'twitter-api-v2';

interface SocialPost {
  platform: 'twitter' | 'instagram';
  content: string;
  media?: string;
  author: string;
  timestamp: string;
}

export async function collectSocialPosts(): Promise<SocialPost[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  // Twitter API 설정
  const twitter = new Twitter({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  });

  // 해시태그로 트윗 검색
  const tweets = await twitter.v2.search('#계엄령 #시민저항');
  
  // Supabase에 저장
  const { data, error } = await supabase
    .from('social_posts')
    .insert(
      tweets.data.map(tweet => ({
        platform: 'twitter',
        content: tweet.text,
        author: tweet.author_id,
        timestamp: new Date(tweet.created_at).toISOString(),
      }))
    );

  return data || [];
} 