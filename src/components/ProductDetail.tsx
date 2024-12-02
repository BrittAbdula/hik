'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import FullscreenGallery from './FullscreenGallery';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    code: string;
    designer: string;
    description: string;
    features: string[];
    colors: {
      category: string;
      subcategory: string;
      colors: {
        name: string;
        value: string;
      }[];
    }[];
    images: {
      src: string;
      alt: string;
    }[];
    specs?: {
      [key: string]: string;
    };
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const maxThumbnails = 4; // Show 4 thumbnails + view all button

  const getMediaType = (src: string): 'video' | 'image' => {
    return src.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg">
        <div className="max-w-[1800px] w-full mx-auto">
          <div className="px-4 h-12 flex items-center justify-between">
            <Link href='/'>
              <h1 className="text-xl font-semibold text-white/90">
                HIK & VEIJ
              </h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:col-span-5 space-y-1">
            <div 
              className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 cursor-zoom-in"
              onClick={() => setIsFullscreen(true)}
            >
              {getMediaType(product.images[selectedImage].src) === 'video' ? (
                <video
                  src={product.images[selectedImage].src}
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                />
              ) : (
                <Image
                  src={product.images[selectedImage].src}
                  alt={product.images[selectedImage].alt}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <div className="grid grid-cols-5 gap-1">
              {product.images.slice(0, maxThumbnails).map((image, index) => {
                const type = getMediaType(image.src);
                return (
                  <button
                    key={index}
                    className={`
                      relative aspect-[4/3] overflow-hidden bg-neutral-900
                      ${selectedImage === index ? 'ring-1 ring-white' : 'opacity-70 hover:opacity-100'}
                      transition-all duration-200
                    `}
                    onClick={() => setSelectedImage(index)}
                  >
                    {type === 'video' ? (
                      <>
                        <video
                          src={image.src}
                          className="w-full h-full object-cover"
                          preload="metadata"
                          onLoadedMetadata={(e) => {
                            e.currentTarget.currentTime = 0.1;
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    )}
                  </button>
                );
              })}
              {product.images.length > maxThumbnails && (
                <Link
                  href={`/products/${product.id}/gallery`}
                  className={`
                    relative aspect-[4/3] overflow-hidden bg-neutral-900
                    opacity-70 hover:opacity-100 transition-all duration-200
                    flex flex-col items-center justify-center text-center
                    group
                  `}
                >
                  <div className="w-8 h-8 mb-1 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </div>
                  <span className="text-xs text-white/70 group-hover:text-white/90">
                    查看全部
                    <br />
                    案例 {product.images.length} 张
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <h1 className="text-xl font-medium text-white/80">{product.code}</h1>
              </div>
              <p className="text-base text-white/60">{product.name}</p>
              <p className="text-sm text-white/50">设计师: {product.designer}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-white/60 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-base font-medium text-white/70 mb-3">产品特点</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-white/60">{feature}</li>
                ))}
              </ul>
            </div>

            {/* Technical Downloads */}
            <div>
              <h2 className="text-base font-medium text-white/70 mb-3">技术说明</h2>
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="#" 
                  className="flex flex-col items-center gap-2 p-3 rounded border border-white/10 hover:border-white/20 transition-colors"
                >
                  <img src="/pdf.png" alt="PDF" className="w-12 h-16" />
                  <span className="text-sm text-white/60">PDF</span>
                </a>
                <a 
                  href="#" 
                  className="flex flex-col items-center gap-2 p-3 rounded border border-white/10 hover:border-white/20 transition-colors"
                >
                  <img src="/3d.png" alt="3D" className="w-12 h-16" />
                  <span className="text-sm text-white/60">3D</span>
                </a>
                <a 
                  href="#" 
                  className="flex flex-col items-center gap-2 p-3 rounded border border-white/10 hover:border-white/20 transition-colors"
                >
                  <img src="/cad.png" alt="CAD" className="w-12 h-16" />
                  <span className="text-sm text-white/60">CAD</span>
                </a>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h2 className="text-base font-medium text-white/70 mb-3">可选颜色</h2>
              <div className="space-y-4">
                {product.colors.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-sm text-white/50">
                      {category.category} | {category.subcategory}
                    </h3>
                    <div className="grid grid-cols-6 gap-2">
                      {category.colors.map((color, colorIdx) => (
                        <div key={colorIdx} className="text-center group">
                          <div
                            className="w-8 h-8 border border-white/10 shadow-sm transition-transform hover:scale-105 group-hover:border-white/30"
                            style={{ backgroundColor: color.value }}
                          />
                          <span className="text-xs text-white/40 mt-1 hidden group-hover:block absolute bg-black/80 px-2 py-1 rounded -translate-x-1/2 left-1/2 whitespace-nowrap">
                            {color.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            {product.specs && (
              <div>
                <h2 className="text-base font-medium text-white/70 mb-3">规格参数</h2>
                <dl className="grid gap-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <dt className="text-sm text-white/40">{key}</dt>
                      <dd className="text-sm text-white/60">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

        </div>
            {/* Details */}
            <div className="mt-6">
              <h2 className="text-base font-medium text-white/70 mb-3">其他细节</h2>
              <div className="space-y-4">
                <p className="text-sm text-white/70">{product.description}</p>
               <img src="/H4-2151/image.png" alt="SALVER沙发细节图1" />
              </div>
            </div>

        {/* Fullscreen Gallery */}
        <FullscreenGallery
          isOpen={isFullscreen}
          onClose={() => setIsFullscreen(false)}
          images={product.images}
          selectedIndex={selectedImage}
          onIndexChange={setSelectedImage}
        />
      </div>
    </div>
  );
}
