import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Gift, Trophy } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
           <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-black text-lg">T</div>
           <span className="text-2xl font-bold tracking-tighter text-white">Thatsee</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">홈</a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
             <Trophy size={16} className="text-yellow-500" /> 티어리스트
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
             <Gift size={16} className="text-indigo-400" /> 굿즈 펀딩
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Search className="text-white cursor-pointer hover:text-primary transition-colors" size={20} />
          <div className="w-8 h-8 rounded bg-gray-700 cursor-pointer overflow-hidden border border-gray-600">
             <img src="https://picsum.photos/seed/user/100/100" alt="Profile" />
          </div>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface border-t border-gray-800 p-4 md:hidden flex flex-col gap-4 shadow-xl">
           <a href="#" className="text-gray-300 hover:text-white py-2">홈</a>
           <a href="#" className="text-gray-300 hover:text-white py-2 flex items-center gap-2"><Trophy size={16}/> 티어리스트</a>
           <a href="#" className="text-gray-300 hover:text-white py-2 flex items-center gap-2"><Gift size={16}/> 굿즈 펀딩</a>
        </div>
      )}
    </header>
  );
};

export default Header;
