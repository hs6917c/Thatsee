import React, { useState } from 'react';
import { ContentItem } from '../types';
import { Star, Gift, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentCardProps {
  item: ContentItem;
  showReason?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, showReason = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const tierColor = {
    S: 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-300',
    A: 'bg-gradient-to-br from-gray-300 to-gray-500 border-gray-200',
    B: 'bg-gradient-to-br from-orange-400 to-orange-700 border-orange-300',
    C: 'bg-gray-700 border-gray-600'
  };

  const getPlatformUrl = () => {
    const encodedTitle = encodeURIComponent(item.title);
    
    // Helper checks if any of the keywords match any of the item's platforms
    const checkPlatform = (keywords: string[]) => {
      if (!item.platform || item.platform.length === 0) return false;
      return item.platform.some(p => 
        keywords.some(k => p.toLowerCase().includes(k.toLowerCase()))
      );
    };

    // Webtoon Logic
    if (item.category === 'Webtoon') {
      if (checkPlatform(['Kakao', '카카오'])) return `https://page.kakao.com/search?word=${encodedTitle}`;
      if (checkPlatform(['Naver', '네이버'])) return `https://comic.naver.com/search?keyword=${encodedTitle}`;
      if (checkPlatform(['Lezhin', '레진'])) return `https://www.lezhin.com/ko/search?q=${encodedTitle}`;
      // Default fallback for Webtoon
      return `https://comic.naver.com/search?keyword=${encodedTitle}`;
    }
    
    // Novel Logic
    if (item.category === 'Novel') {
      if (checkPlatform(['Kakao', '카카오'])) return `https://page.kakao.com/search?word=${encodedTitle}`;
      if (checkPlatform(['Naver', '네이버'])) return `https://series.naver.com/search/search.series?t=all&q=${encodedTitle}`;
      if (checkPlatform(['Ridi', '리디'])) return `https://ridibooks.com/search?q=${encodedTitle}`;
      // Default fallback for Novel
      return `https://ridibooks.com/search?q=${encodedTitle}`;
    }
    
    // Video & Anime Logic
    if (['Movie', 'Drama', 'Anime'].includes(item.category)) {
      if (checkPlatform(['Netflix', '넷플릭스'])) return `https://www.netflix.com/search?q=${encodedTitle}`;
      if (checkPlatform(['Watcha', '왓챠'])) return `https://watcha.com/search?query=${encodedTitle}`;
      if (checkPlatform(['Tving', '티빙'])) return `https://www.tving.com/search/main?keyword=${encodedTitle}`;
      if (checkPlatform(['Disney', '디즈니'])) return `https://www.disneyplus.com/search?q=${encodedTitle}`;
      if (checkPlatform(['Coupang', '쿠팡'])) return `https://www.coupangplay.com/search?q=${encodedTitle}`;
      if (checkPlatform(['Wavve', '웨이브'])) return `https://www.wavve.com/search/search?searchWord=${encodedTitle}`;
      if (checkPlatform(['Laftel', '라프텔'])) return `https://laftel.net/search?keyword=${encodedTitle}`;
      
      // Category specific defaults
      if (item.category === 'Anime') return `https://laftel.net/search?keyword=${encodedTitle}`;
    }

    // Ultimate Fallback
    return `https://www.google.com/search?q=${encodedTitle} ${item.category} 보러가기`;
  };

  const getPlatformBadge = (platform: string) => {
    const p = platform.toLowerCase();
    let styles = 'bg-gray-700 text-gray-200';
    let label = platform;

    if (p.includes('netflix') || p.includes('넷플릭스')) { styles = 'bg-[#E50914] text-white'; label = 'NETFLIX'; }
    else if (p.includes('watcha') || p.includes('왓챠')) { styles = 'bg-[#FF0558] text-white'; label = 'WATCHA'; }
    else if (p.includes('tving') || p.includes('티빙')) { styles = 'bg-[#FF153C] text-white'; label = 'TVING'; }
    else if (p.includes('disney') || p.includes('디즈니')) { styles = 'bg-[#113CCF] text-white'; label = 'Disney+'; }
    else if (p.includes('naver') || p.includes('네이버')) { styles = 'bg-[#00D564] text-white'; label = 'NAVER'; }
    else if (p.includes('kakao') || p.includes('카카오')) { styles = 'bg-[#FEE500] text-black'; label = 'KAKAO'; }
    else if (p.includes('ridi') || p.includes('리디')) { styles = 'bg-[#1F8CE6] text-white'; label = 'RIDI'; }
    else if (p.includes('laftel') || p.includes('라프텔')) { styles = 'bg-[#816BFF] text-white'; label = 'LAFTEL'; }
    else if (p.includes('wavve') || p.includes('웨이브')) { styles = 'bg-[#1351f9] text-white'; label = 'wavve'; }
    else if (p.includes('coupang') || p.includes('쿠팡')) { styles = 'bg-[#343a40] text-white'; label = 'Coupang'; }
    
    return (
        <span key={platform} className={`text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm tracking-tight ${styles}`}>
            {label}
        </span>
    );
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getPlatformUrl(), '_blank');
  };

  const handleFundingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://tumblbug.com/discover?query=${encodeURIComponent(item.title)}`, '_blank');
  };

  return (
    <motion.div 
      className="relative flex-shrink-0 w-40 md:w-56 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={handleWatchClick}
    >
      {/* Tier Badge */}
      <div className={`absolute top-2 left-2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg border ${tierColor[item.tier as keyof typeof tierColor] || tierColor.B}`}>
        {item.tier}
      </div>

      {/* Main Image Container */}
      <div className="relative rounded-lg overflow-hidden aspect-[2/3] shadow-lg bg-gray-800">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
        
        {/* Static Title & Rating & Platform Badges */}
        <div className="absolute bottom-0 left-0 p-3 w-full group-hover:opacity-0 transition-opacity duration-300 flex flex-col justify-end">
          {/* Platform Logos */}
          {item.platform && item.platform.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {item.platform.slice(0, 3).map(p => getPlatformBadge(p))}
            </div>
          )}
          
          <h3 className="text-white font-semibold text-sm md:text-base truncate leading-tight">{item.title}</h3>
          <div className="flex items-center text-yellow-400 text-xs mt-1">
            <Star size={12} fill="currentColor" />
            <span className="ml-1 font-medium">{item.rating}</span>
          </div>
        </div>

        {/* Hover Interaction Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/80 p-4 flex flex-col justify-between z-10"
            >
              <div>
                <h3 className="text-white font-bold text-lg leading-tight mb-2">{item.title}</h3>
                <p className="text-gray-300 text-xs line-clamp-3 mb-2">{item.description || "줄거리가 없습니다."}</p>
                {showReason && item.reason && (
                  <div className="bg-white/10 p-2 rounded text-xs text-blue-200 border border-blue-500/30">
                    <span className="font-semibold block mb-1">💡 AI 추천 이유</span>
                    "{item.reason}"
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-2">
                <button 
                  onClick={handleWatchClick}
                  className="w-full bg-primary hover:bg-red-700 text-white text-xs py-2 px-3 rounded flex items-center justify-center font-bold transition-colors shadow-lg shadow-red-900/20"
                >
                  <PlayCircle size={14} className="mr-1.5" />
                  보러가기
                </button>
                
                {item.fundingAvailable && (
                  <button 
                    onClick={handleFundingClick}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 px-3 rounded flex items-center justify-center font-bold transition-colors shadow-lg shadow-indigo-900/20"
                  >
                    <Gift size={14} className="mr-1.5" />
                    굿즈 펀딩
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContentCard;