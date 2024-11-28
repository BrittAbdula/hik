import React, { useState, useRef, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  tags?: string[];
}

interface MainMenuProps {
  categories: Category[];
  currentCategory?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ categories = [], currentCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (categoryId: string) => {
    window.location.hash = categoryId;
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="fixed top-4 right-4 z-20">
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full bg-black transition-transform transform z-10 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '250px', backgroundColor: 'black' }}
      >
        <nav className="flex-1 overflow-y-auto py-4 bg-black">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`
                w-full px-6 py-3 text-left transition-colors
                ${currentCategory === category.id
                  ? 'text-white bg-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="text-base">{category.name}</span>
              {category.tags && category.tags.length > 0 && (
                <span className="block text-xs text-gray-500 mt-0.5">
                  {category.tags.join(' · ')}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;
