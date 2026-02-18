import { ContentItem } from "./types";

export const TRENDING_ITEMS: ContentItem[] = [
  {
    id: 't1', title: '나 혼자만 레벨업', category: 'Webtoon', 
    imageUrl: 'https://picsum.photos/seed/solo/400/600', tier: 'S', rating: 4.9, 
    description: '재각성한 E급 헌터 성진우의 레이드 액션', fundingAvailable: true,
    platform: ['카카오페이지']
  },
  {
    id: 't2', title: '오징어 게임', category: 'Drama', 
    imageUrl: 'https://picsum.photos/seed/squid/400/600', tier: 'S', rating: 4.8, 
    description: '456억 원의 상금이 걸린 의문의 서바이벌',
    platform: ['넷플릭스']
  },
  {
    id: 't3', title: '전지적 독자 시점', category: 'Novel', 
    imageUrl: 'https://picsum.photos/seed/omniscient/400/600', tier: 'S', rating: 4.9, 
    description: '어느 날 자신이 읽던 소설의 내용대로 바뀌어 버린 세계', fundingAvailable: true,
    platform: ['네이버웹툰', '네이버시리즈']
  },
  {
    id: 't4', title: '최애의 아이', category: 'Anime', 
    imageUrl: 'https://picsum.photos/seed/idol/400/600', tier: 'A', rating: 4.7, 
    description: '지방 도시 산부인과 전문의와 최애 아이돌의 만남', fundingAvailable: true,
    platform: ['라프텔', '넷플릭스']
  },
  {
    id: 't5', title: '파묘', category: 'Movie', 
    imageUrl: 'https://picsum.photos/seed/exhuma/400/600', tier: 'A', rating: 4.6, 
    description: '거액의 돈을 받고 수상한 묘를 이장한 풍수사와 장의사',
    platform: ['티빙', '넷플릭스']
  },
  {
    id: 't6', title: '화산귀환', category: 'Webtoon', 
    imageUrl: 'https://picsum.photos/seed/volcano/400/600', tier: 'S', rating: 4.9, 
    description: '대화산파 13대 제자, 천하삼대검수 매화검존 청명', fundingAvailable: true,
    platform: ['네이버웹툰']
  }
];

export const TIER_LIST_ITEMS: ContentItem[] = [
  {
    id: 'tl1', title: '서울의 봄', category: 'Movie', 
    imageUrl: 'https://picsum.photos/seed/seoul/400/600', tier: 'S', rating: 4.9, 
    description: '1979년 12월 12일, 수도 서울 군사반란 발생',
    platform: ['티빙', '디즈니+']
  },
  {
    id: 'tl2', title: '체인소 맨', category: 'Anime', 
    imageUrl: 'https://picsum.photos/seed/chainsaw/400/600', tier: 'A', rating: 4.7, 
    description: '악마를 사냥하는 데블 헌터들의 이야기', fundingAvailable: true,
    platform: ['넷플릭스', '라프텔']
  },
  {
    id: 'tl3', title: '재벌집 막내아들', category: 'Drama', 
    imageUrl: 'https://picsum.photos/seed/rich/400/600', tier: 'A', rating: 4.5, 
    description: '재벌 총수 일가의 오너리스크를 관리하는 비서가 회귀하다',
    platform: ['넷플릭스', '티빙', '디즈니+']
  },
  {
    id: 'tl4', title: '듄: 파트2', category: 'Movie', 
    imageUrl: 'https://picsum.photos/seed/dune/400/600', tier: 'S', rating: 4.8, 
    description: '전 우주를 구원할 예언된 자의 운명',
    platform: ['쿠팡플레이']
  }
];

export const FUNDING_ITEMS: ContentItem[] = [
  {
    id: 'f1', title: '화산귀환 향수 세트', category: 'Webtoon', 
    imageUrl: 'https://picsum.photos/seed/perfume/400/600', tier: 'S', rating: 5.0, 
    description: '매화향이 가득한 청명의 향수', fundingAvailable: true,
    platform: ['네이버웹툰']
  },
  {
    id: 'f2', title: '슬램덩크 한정판 유니폼', category: 'Anime', 
    imageUrl: 'https://picsum.photos/seed/slam/400/600', tier: 'S', rating: 4.9, 
    description: '북산고교 실제 유니폼 레플리카', fundingAvailable: true,
    platform: ['라프텔']
  },
  {
    id: 'f3', title: '전독시 회중시계', category: 'Novel', 
    imageUrl: 'https://picsum.photos/seed/watch/400/600', tier: 'A', rating: 4.8, 
    description: '김독자의 시간을 기록하는 엔티크 시계', fundingAvailable: true,
    platform: ['네이버시리즈']
  }
];
