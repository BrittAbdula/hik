'use client';

import { useState, useEffect } from 'react';
import PhotoGallery from '@/components/PhotoGallery';
import TagList from '@/components/TagList';
import MainMenu from '@/components/MainMenu';
import Link from 'next/link';

const tags = [
  { id: 'all', label: 'ALL' },
  { id: 'favs', label: '入户图 ⭐' },
  { id: 'cars', label: '场景图' },
  { id: 'farm', label: '摆场' },
  { id: 'cereal', label: '沙发' },
  { id: 'cicadas', label: '书桌' },
  { id: 'door-county', label: 'DOOR COUNTY' },
  { id: 'flower-bee', label: 'FLOWER BEE' },
  { id: 'galena', label: 'GALENA' },
  { id: 'goat', label: 'GOAT' },
];

const photos = [
  {
    id: '1',
    src: 'https://www.hik.com.cn/uploads/220805/1-220P5145251649.jpg',
    tags: ['入户图'],
    aspectRatio: 16/9,
    featured: true // 宽屏入户图会占据整行
  },
  {
    id: '2',
    src: 'https://www.hik.com.cn/uploads/allimg/201028/1-20102Q135420-L.jpg',
    tags: ['场景图', 'favs'],
    aspectRatio: 4/3,
    featured: true // 重要的场景图会更大
  },
  {
    id: '3',
    src: 'https://www.hik.com.cn/uploads/allimg/201030/1-2010301KTMW.jpg',
    tags: ['摆场'],
    aspectRatio: 3/2
  },
  {
    id: '4',
    src: 'https://www.hik.com.cn/uploads/allimg/220803/1-220P3222Q4H1.jpg',
    tags: ['沙发'],
    aspectRatio: 1/1
  },
  {
    id: '9',
    src: 'https://www.hik.com.cn/uploads/allimg/201028/1-20102Q143360-L.jpg',
    tags: ['书桌'],
    aspectRatio: 4/3,
    featured: true // 重要的书桌场景
  },
  {
    id: '5',
    src: 'https://store.pixeldances.org/2.mp4',
    tags: ['书桌'],
    aspectRatio: 4/3,
    featured: true // 重要的书桌场景
  },
  {
    id: '6',
    src: 'https://www.hik.com.cn/uploads/allimg/220803/1-1A953C02-A60.jpg',
    tags: ['入户图', 'favs'],
    aspectRatio: 3/2
  },
  {
    id: '7',
    src: 'https://www.hik.com.cn/uploads/allimg/220803/1-1A953Ba-Y31.jpg',
    tags: ['场景图'],
    aspectRatio: 1/1
  },
  {
    id: '8',
    src: 'https://www.hik.com.cn/uploads/allimg/201030/1-2010301KTMW.jpg',
    tags: ['摆场', 'favs'],
    aspectRatio: 16/9,
    featured: true // 宽屏摆场图
  }
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
      id: 'nature',
      name: '自然',
      tags: ['FLOWER BEE', 'LEAVES', 'FARM', 'ORCHARD']
    },
    {
      id: 'animals',
      name: '动物',
      tags: ['GOAT', 'CICADAS']
    },
    {
      id: 'places',
      name: '地点',
      tags: ['DOOR COUNTY', 'GALENA', 'LBK']
    },
    {
      id: 'objects',
      name: '物品',
      tags: ['CARS', 'CEREAL', 'LIGHTS', 'LETTERS']
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
          <div className="px-4 h-16 flex items-center justify-between">
            <div>
              <Link href='/'>
              <h1 className="text-xl font-semibold text-white/90">
                Hik & VeiJ
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
