export interface Media {
  type: 'image' | 'video' | 'text';
  url: string;
  caption?: string;
}

export interface Story {
  background: string;
  content: string;
  media?: Media[];
  summary?: string;
} 