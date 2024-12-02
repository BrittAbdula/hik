'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MainMenu from './MainMenu';
import TagList from './TagList';
import { menuCategories, tags } from '@/data/navigation';

interface HeaderProps {
  showTags?: boolean;
  selectedTag?: string;
  onSelectTag?: (tag: string) => void;
}

export default function Header({ showTags = true, selectedTag = 'all', onSelectTag }: HeaderProps) {
  const pathname = usePathname();
  const currentCategory = pathname.includes('/products') ? 'products' : '';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg">
      <div className="max-w-[1800px] w-full mx-auto">
        <div className="px-4 h-12 flex items-center justify-between">
          <div>
            <Link href='/'>
              <h1 className="text-xl font-semibold text-white/90">
                HIK & VEIJ
              </h1>
            </Link>
          </div>
          <MainMenu categories={menuCategories} currentCategory={currentCategory} />
        </div>
        {showTags && onSelectTag && (
          <TagList 
            tags={tags} 
            selectedTag={selectedTag} 
            onSelectTag={onSelectTag} 
          />
        )}
      </div>
    </header>
  );
}
