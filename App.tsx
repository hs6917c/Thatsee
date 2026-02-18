import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterSection from './components/FilterSection';
import SectionRow from './components/SectionRow';
import Footer from './components/Footer';
import ContentCard from './components/ContentCard';
import { getRecommendations } from './services/geminiService';
import { FilterState, ContentItem } from './types';
import { TRENDING_ITEMS, TIER_LIST_ITEMS, FUNDING_ITEMS } from './constants';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({ category: null, genre: null, platform: null, mood: null });
  const [recommendations, setRecommendations] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Modal State
  const [expandedSection, setExpandedSection] = useState<{title: string, items: ContentItem[]} | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    // Smooth scroll to results
    setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    const results = await getRecommendations(filters);
    setRecommendations(results);
    setLoading(false);
  };

  const handleExpand = (title: string, items: ContentItem[]) => {
    setExpandedSection({ title, items: [...items, ...items] }); // Doubling items to simulate "More"
    document.body.style.overflow = 'hidden';
  };

  const closeExpand = () => {
    setExpandedSection(null);
    document.body.style.overflow = 'auto';
  };

  // Filter static items based on the selected category
  const filterByCat = (items: ContentItem[]) => {
    if (!filters.category) return items;
    return items.filter(item => item.category === filters.category);
  };

  const filteredTrending = filterByCat(TRENDING_ITEMS);
  const filteredTierList = filterByCat(TIER_LIST_ITEMS);
  const filteredFunding = filterByCat(FUNDING_ITEMS);

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-white">
      <Header />
      
      <main>
        <Hero />
        
        <FilterSection 
          filters={filters} 
          setFilters={setFilters} 
          onSearch={handleSearch} 
          isLoading={loading}
        />

        {/* AI Recommendations Section */}
        <div id="results-section" className="scroll-mt-24 max-w-7xl mx-auto px-4 mt-12 mb-20">
            {hasSearched && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                 <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="text-secondary" />
                    <h2 className="text-2xl font-bold">
                        {loading ? 'AI가 사용자의 취향을 분석하고 있습니다...' : 'AI가 추천하는 오늘의 인생작'}
                    </h2>
                 </div>
                 
                 {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
                        ))}
                    </div>
                 ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {recommendations.length > 0 ? (
                            recommendations.map(item => (
                                <div key={item.id} className="w-full">
                                    <ContentCard item={item} showReason={true} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500 bg-surface/50 rounded-xl border border-gray-800">
                                추천 결과를 불러오지 못했습니다. 다시 시도해주세요.
                            </div>
                        )}
                    </div>
                 )}
              </motion.div>
            )}
        </div>

        {/* Static Content Sections */}
        <div className="space-y-4 max-w-full overflow-hidden">
           {filteredTrending.length > 0 && (
             <SectionRow 
               title="🔥 지금 실시간으로 뜨는 콘텐츠 TOP 10" 
               subtitle="판매량 및 검색어 기준 급상승 중인 작품들"
               items={filteredTrending} 
               onExpand={() => handleExpand('실시간 인기 콘텐츠', filteredTrending)}
             />
           )}

           {filteredTierList.length > 0 && (
             <SectionRow 
               title="👑 이번 주 장르별 티어리스트 S등급" 
               subtitle="커뮤니티 평판을 종합한 검증된 명작"
               items={filteredTierList} 
               onExpand={() => handleExpand('장르별 티어리스트', filteredTierList)}
             />
           )}

           {filteredFunding.length > 0 && (
             <SectionRow 
               title="🎁 내가 좋아할 만한 굿즈 펀딩" 
               subtitle="놓치면 후회하는 한정판 굿즈"
               items={filteredFunding}
               isFunding={true}
               onExpand={() => handleExpand('굿즈 펀딩', filteredFunding)}
             />
           )}
           
           {/* Fallback if filtering hides everything */}
           {filteredTrending.length === 0 && filteredTierList.length === 0 && filteredFunding.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                선택하신 카테고리에 해당하는 실시간 데이터가 없습니다. <br/>
                상단의 "추천받기" 버튼을 눌러 AI에게 추천을 받아보세요!
              </div>
           )}
        </div>
      </main>

      <Footer />

      {/* "See All" Modal */}
      <AnimatePresence>
        {expandedSection && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto w-full">
              <h2 className="text-2xl font-bold text-white">{expandedSection.title}</h2>
              <button 
                onClick={closeExpand}
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="text-white" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-7xl mx-auto w-full pb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {expandedSection.items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="w-full">
                      <ContentCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
