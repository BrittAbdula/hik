'use client';

import { useParams } from 'next/navigation';
import PhotoGallery from '@/components/PhotoGallery';
import Link from 'next/link';

export default function ProductGalleryPage() {
  const params = useParams();
  const productId = params.id as string;

  // TODO: Replace with actual API call to get product images
  const images = [
    {
      id: '1',
      src: '/H4-2151/1.png',
      alt: 'SALVER沙发主图',
      aspectRatio: 4/3
    },
    {
      id: '2',
      src: '/H4-2151/2.png',
      alt: 'SALVER沙发细节图1',
      aspectRatio: 4/3
    },
    {
      id: '3',
      src: '/6e52b947bd323bf2cc781b9689bd67e4.mp4',
      alt: 'SALVER沙发细节图2',
      aspectRatio: 4/3
    },
    {
      id: '4',
      src: '/H4-2151/4.png',
      alt: 'SALVER沙发细节图2',
      aspectRatio: 4/3
    },
    {
      id: '5',
      src: '/H4-2151/5.png',
      alt: 'SALVER沙发细节图2',
      aspectRatio: 4/3
    },
    {
      id: '6',
      src: '/H4-2151/6.png',
      alt: 'SALVER沙发细节图2',
      aspectRatio: 4/3
    },
    // Add more images as needed
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
        <Link
          href={`/products/${productId}`}
          className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回产品</span>
        </Link>
      </div>

      {/* Gallery */}
      <div className="container mx-auto px-4 py-8">
        <PhotoGallery photos={images} />
      </div>
    </div>
  );
}
