export interface Media {
  type: 'video' | 'image' | 'text';
  url: string;
  caption: string;
}

export interface Story {
  background: string;
  title: string;
  content: string;
  media?: Media[];
  summary?: string;
} 