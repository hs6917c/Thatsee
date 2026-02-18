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
    const hasPlatform = (target: string) => item.platform?.some(p => p.toLowerCase().includes(target.toLowerCase()));

    // Platform Specific Logic
    if (item.category === 'Webtoon') {
      if (hasPlatform('Kakao')) return `https://page.kakao.com/search?word=${encodedTitle}`;
      return `https://comic.naver.com/search?keyword=${encodedTitle}`;
    }
    
    if (item.category === 'Novel') {
      if (hasPlatform('Kakao')) return `https://page.kakao.com/search?word=${encodedTitle}`;
      return `https://ridibooks.com/search?q=${encodedTitle}`;
    }
    
    if (['Movie', 'Drama', 'Anime'].includes(item.category)) {
      if (hasPlatform('Netflix')) return `https://www.netflix.com/search?q=${encodedTitle}`;
      if (hasPlatform('Watcha')) return `https://watcha.com/search?query=${encodedTitle}`;
      if (hasPlatform('Tving')) return `https://www.tving.com/search/main?keyword=${encodedTitle}`;
      if (hasPlatform('Disney')) return `https://www.disneyplus.com/search?q=${encodedTitle}`;
      if (hasPlatform('Laftel') || item.category === 'Anime') return `https://laftel.net/search?keyword=${encodedTitle}`;
    }

    // Default Fallback
    return `https://www.google.com/search?q=${encodedTitle} ${item.category} 보러가기`;
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
        
        {/* Static Title & Rating */}
        <div className="absolute bottom-0 left-0 p-3 w-full group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white font-semibold text-sm md:text-base truncate">{item.title}</h3>
          <div className="flex items-center text-yellow-400 text-xs mt-1">
            <Star size={12} fill="currentColor" />
            <span className="ml-1">{item.rating}</span>
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