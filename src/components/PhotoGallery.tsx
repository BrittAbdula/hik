'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

interface MediaItem {
  id: string;
  src: string;
  aspectRatio: number;
  alt?: string;
  featured?: boolean;
  type?: 'video' | 'image';
  thumbnail?: string;
}

interface PhotoGalleryProps {
  photos: MediaItem[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getMediaType = (src: string): 'video' | 'image' => {
    return src.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image';
  };

  useEffect(() => {
    if (selectedIndex !== -1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedIndex]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    trackMouse: true
  });

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % photos.length);
  }, [photos.length]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleMediaClick = (index: number) => {
    const item = photos[index];
    item.type = item.type || getMediaType(item.src);
    setSelectedIndex(index);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === -1) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Escape':
        setSelectedIndex(-1);
        setIsVideoPlaying(false);
        break;
    }
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderThumbnails = () => {
    const maxThumbnails = 5;
    const halfMax = Math.floor(maxThumbnails / 2);
    
    let start = Math.max(0, selectedIndex - halfMax);
    const end = Math.min(start + maxThumbnails, photos.length);
    
    if (end - start < maxThumbnails) {
      start = Math.max(0, end - maxThumbnails);
    }
    
    const thumbnails = photos.slice(start, end);
    
    return (
      <div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/30 p-2 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {thumbnails.map((item, idx) => {
          const actualIndex = start + idx;
          const type = item.type || getMediaType(item.src);
          
          return (
            <button
              key={item.id}
              className={`
                relative w-20 h-14 cursor-pointer overflow-hidden
                ${selectedIndex === actualIndex ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'}
                transition-all duration-200 rounded
              `}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedIndex !== actualIndex) {
                  setIsVideoPlaying(false);
                  setSelectedIndex(actualIndex);
                }
              }}
            >
              <div className="w-full h-full relative">
                {type === 'video' ? (
                  <>
                    <div className="absolute inset-0 bg-black">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        onLoadedMetadata={(e) => {
                          e.currentTarget.currentTime = 0.1;
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt || ""}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div {...swipeHandlers}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-1 bg-black">
        {photos.map((item, index) => {
          const type = item.type || getMediaType(item.src);
          const isPortrait = item.aspectRatio < 1;
          
          return (
            <div
              key={item.id}
              className={`
                relative bg-black overflow-hidden cursor-zoom-in
                aspect-[3/2] ${isPortrait ? 'aspect-[2/3]' : 'aspect-[3/2]'}
                transition-all duration-300 hover:opacity-90
                group
              `}
              onClick={() => handleMediaClick(index)}
            >
              {type === 'video' ? (
                <>
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                  priority={item.featured}
                />
              )}
            </div>
          );
        })}
      </div>

      {selectedIndex !== -1 && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => {
            setSelectedIndex(-1);
            setIsVideoPlaying(false);
          }}
        >
          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full z-10"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(-1);
              setIsVideoPlaying(false);
            }}
          >
            ×
          </button>

          {/* Main content */}
          <div 
            className="relative w-[95vw] h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {photos[selectedIndex].type === 'video' || getMediaType(photos[selectedIndex].src) === 'video' ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={photos[selectedIndex].src}
                  className="max-w-full max-h-full"
                  controls
                  autoPlay={isVideoPlaying}
                  playsInline
                  onClick={(e) => e.stopPropagation()}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                />
              </div>
            ) : (
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt || ""}
                fill
                className="object-contain"
                unoptimized
                priority
              />
            )}
          </div>

          {/* Thumbnails */}
          {renderThumbnails()}
        </div>
      )}
    </div>
  );
}
