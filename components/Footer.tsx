import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-4 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
           <div className="mb-4 md:mb-0">
             <h3 className="text-2xl font-bold text-gray-200">Thatsee</h3>
             <p className="text-gray-500 text-sm mt-2">오늘 뭐 볼지 고민될 때, AI가 정해주는 나만의 인생작</p>
           </div>
           <div className="flex gap-6">
             <a href="#" className="text-gray-400 hover:text-white transition-colors">이용약관</a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors">개인정보처리방침</a>
             <a href="#" className="text-gray-400 hover:text-white transition-colors">고객센터</a>
           </div>
        </div>
        <div className="text-gray-600 text-xs">
          © 2024 Thatsee Inc. All rights reserved. <br/>
          본 서비스는 AI 기반 추천 서비스로, 실제 작품의 평가는 개인마다 다를 수 있습니다.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
