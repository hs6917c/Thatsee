import React, { useRef } from 'react';
import { ContentItem } from '../types';
import ContentCard from './ContentCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SectionRowProps {
  title: string;
  items: ContentItem[];
  subtitle?: string;
  isFunding?: boolean;
  onExpand?: () => void;
}

const SectionRow: React.FC<SectionRowProps> = ({ title, items, subtitle, isFunding = false, onExpand }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 md:py-12 border-b border-gray-800 last:border-0 relative group/section">
      <div className="px-4 md:px-8 mb-4 md:mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            {title}
            {isFunding && <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">Funding</span>}
          </h2>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <button 
          onClick={onExpand}
          className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
        >
          전체보기 &gt;
        </button>
      </div>

      <div className="relative group">
        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center disabled:opacity-0"
        >
          <ChevronLeft className="text-white hover:scale-125 transition-transform" />
        </button>
        
        {/* Container with Tailwind Scrollbar Hiding */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 md:px-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronRight className="text-white hover:scale-125 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SectionRow;