export type MediaType = 'image' | 'video' | 'text';

export interface Media {
  type: MediaType;
  url: string;
  caption?: string;
}

export interface Story {
  background: string;
  content: string;
  media?: Media[];
  summary: string;
} 