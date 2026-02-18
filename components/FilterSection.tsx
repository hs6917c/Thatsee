import React from 'react';
import { FilterState, GENRES, PLATFORMS, MOODS } from '../types';
import { Sparkles, Search } from 'lucide-react';

interface FilterSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearch: () => void;
  isLoading: boolean;
}

const CATEGORIES = [
  { id: null, label: '전체' },
  { id: 'Movie', label: '영화' },
  { id: 'Drama', label: '드라마' },
  { id: 'Webtoon', label: '웹툰' },
  { id: 'Anime', label: '애니메이션' },
  { id: 'Novel', label: '소설' },
];

const ChipGroup = ({ title, options, selected, onSelect }: { title: string, options: string[], selected: string | null, onSelect: (val: string) => void }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-gray-400 mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt === selected ? '' : opt)}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${
            selected === opt
              ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] transform scale-105'
              : 'bg-surface text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters, onSearch, isLoading }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-20 relative z-30">
      <div className="bg-surface/90 backdrop-blur-md border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl">
        
        {/* Category Tabs */}
        <div className="flex flex-col items-center mb-8">
           <div className="flex flex-wrap justify-center gap-2 p-1 bg-black/40 rounded-full border border-gray-700 backdrop-blur-sm">
             {CATEGORIES.map((cat) => (
               <button
                 key={cat.label}
                 onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
                 className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                   filters.category === cat.id
                     ? 'bg-primary text-white shadow-lg shadow-red-900/30'
                     : 'text-gray-400 hover:text-white hover:bg-white/5'
                 }`}
               >
                 {cat.label}
               </button>
             ))}
           </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-primary" size={20} />
          <h2 className="text-xl font-bold text-white">상세 필터</h2>
        </div>

        <ChipGroup 
          title="장르" 
          options={GENRES} 
          selected={filters.genre} 
          onSelect={(val) => setFilters(prev => ({ ...prev, genre: val || null }))} 
        />
        
        <ChipGroup 
          title="플랫폼" 
          options={PLATFORMS} 
          selected={filters.platform} 
          onSelect={(val) => setFilters(prev => ({ ...prev, platform: val || null }))} 
        />
        
        <ChipGroup 
          title="현재 기분" 
          options={MOODS} 
          selected={filters.mood} 
          onSelect={(val) => setFilters(prev => ({ ...prev, mood: val || null }))} 
        />

        <div className="mt-8 flex justify-center">
          <button
            onClick={onSearch}
            disabled={isLoading}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300
              ${isLoading 
                ? 'bg-gray-600 cursor-not-allowed opacity-70' 
                : 'bg-primary hover:bg-red-700 hover:scale-105 hover:shadow-red-900/50 text-white'
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                AI 분석중...
              </>
            ) : (
              <>
                <Search size={20} />
                추천받기
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
