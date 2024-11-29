'use client';

import { useState, useEffect } from 'react';
import PhotoGallery from '@/components/PhotoGallery';
import TagList from '@/components/TagList';
import MainMenu from '@/components/MainMenu';
import Link from 'next/link';
import { photos } from '../data/photos';

const tags = [
  { id: 'all', label: 'ALL' },
  { id: 'favs', label: '精选 ⭐' },
  { id: 'cars', label: '场景图' },
  { id: 'farm', label: '摆场' },
  { id: 'cereal', label: '沙发' },
  { id: 'cicadas', label: '书桌' },
  { id: 'door-county', label: 'DOOR COUNTY' },
  { id: 'flower-bee', label: 'FLOWER BEE' },
  { id: 'galena', label: 'GALENA' },
  { id: 'goat', label: 'GOAT' },
];

export default function Home() {
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentCategory, setCurrentCategory] = useState<string>('');

  const menuCategories = [
    {
      id: 'favs',
      name: '精选',
      tags: ['FAVS']
    },
    {
      id: 'wholeHome',
      name: '整家案例',
      tags: ['现代极简','轻奢','中古','侘寂']
    },
    {
      id: 'products',
      name: '精品家居',
      tags: [
        '沙发',
        '椅凳',
        '茶几',
        '柜类',
        '书桌',
        '餐台',
        '餐椅',
        '床',
        '床边柜'
      ]
    },
    {
      id: 'places',
      name: '新品发布',
      tags: ['时间', '自然', '自由', '有趣']
    },
    {
      id: 'objects',
      name: '优选材料',
      tags: ['Wood','Metal','Leather','Colorful','Natural']
    },
    {
      id: 'Exhibition',
      name: '展厅&展会',
      tags: ['佛山','广州','深圳','上海']
    }
  ];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentCategory(hash);
        setSelectedTag(hash);
      } else {
        setCurrentCategory('');
        setSelectedTag('all');
      }
    };

    // Handle initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredPhotos = selectedTag === 'all'
    ? photos
    : photos.filter(photo => photo.tags.includes(selectedTag));

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg">
        <div className="max-w-[1800px] w-full mx-auto">
          <div className="px-4 h-12 flex items-center justify-between">
            <div>
              <Link href='/'>
              <h1 className="text-xl font-semibold text-white/90">
                HK & VEIJ
              </h1>
              </Link>
            </div>
            <MainMenu categories={menuCategories} currentCategory={currentCategory} />
          </div>
          <TagList tags={tags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
        </div>
      </header>

      {/* Main content */}
      <div className="pt-[84px]">
        <PhotoGallery photos={filteredPhotos} />
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-[1800px] w-full mx-auto px-4 pb-4">
        </div>
      </footer>
    </main>
  );
}
