export interface ContentItem {
  id: string;
  title: string;
  category: 'Movie' | 'Webtoon' | 'Novel' | 'Anime' | 'Drama';
  imageUrl: string;
  tier: 'S' | 'A' | 'B' | 'C';
  rating: number; // 0 to 5
  reason?: string; // AI generated reason
  description?: string;
  platform?: string[];
  fundingAvailable?: boolean;
}

export interface FilterState {
  genre: string | null;
  platform: string | null;
  mood: string | null;
}

export type SectionType = 'trending' | 'tierlist' | 'funding' | 'recommendation';

export const GENRES = [
  '액션', '로맨스', '스릴러', '판타지', '코미디', 'SF', '호러', '드라마', '일상', '무협'
];

export const PLATFORMS = [
  '넷플릭스', '왓챠', '티빙', '네이버웹툰', '카카오페이지', '리디북스', '라프텔', '디즈니+'
];

export const MOODS = [
  '가볍게 보기 좋은', '눈물 콧물 쏙 빼는', '긴장감 넘치는', '생각하게 만드는', '설레는', '통쾌한', '기괴한', '꿈과 희망'
];
