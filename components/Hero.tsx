import React from 'react';

const POSTERS = [
  "https://picsum.photos/seed/poster1/300/450", "https://picsum.photos/seed/poster2/300/450",
  "https://picsum.photos/seed/poster3/300/450", "https://picsum.photos/seed/poster4/300/450",
  "https://picsum.photos/seed/poster5/300/450", "https://picsum.photos/seed/poster6/300/450",
  "https://picsum.photos/seed/poster7/300/450", "https://picsum.photos/seed/poster8/300/450",
];

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Marquee */}
      <div className="absolute inset-0 z-0 flex flex-col gap-4 opacity-30 select-none pointer-events-none transform -rotate-6 scale-110">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...POSTERS, ...POSTERS].map((src, i) => (
            <img key={`row1-${i}`} src={src} className="w-40 h-60 object-cover rounded-md shadow-2xl" alt="" />
          ))}
        </div>
        <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap">
           {[...POSTERS, ...POSTERS].reverse().map((src, i) => (
            <img key={`row2-${i}`} src={src} className="w-40 h-60 object-cover rounded-md shadow-2xl" alt="" />
          ))}
        </div>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-10">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/50 text-xs md:text-sm font-bold mb-4 animate-pulse">
          Beta • AI Powered Curator
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          오늘 뭐 볼지 고민될 때,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
            AI가 정해주는 나만의 인생작
          </span>
        </h1>
        <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto mb-8">
          영화, 웹툰, 애니메이션, 소설까지. <br className="hidden md:block"/>
          수많은 리뷰와 데이터, 티어리스트를 분석해 실패 없는 선택을 도와드립니다.
        </p>
      </div>
    </div>
  );
};

export default Hero;
