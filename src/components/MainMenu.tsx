'use client';

import { useState, useRef, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  tags?: string[];
}

interface MainMenuProps {
  categories: Category[];
  currentCategory?: string;
}

export default function MainMenu({ categories = [], currentCategory }: MainMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCategoryClick = (categoryId: string) => {
    window.location.hash = categoryId;
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Button */}
      <button
        className="text-white/80 hover:text-white p-2 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out menu */}
      {isOpen && (
        <div 
          className="fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-lg z-50
            transform transition-all duration-300 ease-in-out translate-x-0"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-medium text-white">菜单</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex-1 overflow-y-auto py-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`
                    w-full px-6 py-3 text-left transition-colors
                    ${currentCategory === category.id
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }
                  `}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="text-base">{category.name}</span>
                  {category.tags && category.tags.length > 0 && (
                    <span className="block text-xs text-white/40 mt-0.5">
                      {category.tags.join(' · ')}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
