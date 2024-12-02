'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

interface MediaItem {
  id?: string;
  src: string;
  alt?: string;
  type?: 'video' | 'image';
}

interface FullscreenGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: MediaItem[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
  showThumbnails?: boolean;
}

export default function FullscreenGallery({
  isOpen,
  onClose,
  images,
  selectedIndex,
  onIndexChange,
  showThumbnails = true
}: FullscreenGalleryProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNext = useCallback(() => {
    onIndexChange((selectedIndex + 1) % images.length);
  }, [images.length, selectedIndex, onIndexChange]);

  const handlePrevious = useCallback(() => {
    onIndexChange((selectedIndex - 1 + images.length) % images.length);
  }, [images.length, selectedIndex, onIndexChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Escape':
        onClose();
        break;
    }
  }, [isOpen, handlePrevious, handleNext, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    trackMouse: true
  });

  const getMediaType = (src: string): 'video' | 'image' => {
    return src.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image';
  };

  const renderThumbnails = () => {
    if (!showThumbnails) return null;

    const maxThumbnails = 5;
    const halfMax = Math.floor(maxThumbnails / 2);
    
    let start = Math.max(0, selectedIndex - halfMax);
    const end = Math.min(start + maxThumbnails, images.length);
    
    if (end - start < maxThumbnails) {
      start = Math.max(0, end - maxThumbnails);
    }
    
    const thumbnails = images.slice(start, end);
    
    return (
      <div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 bg-black/30 p-1"
        onClick={(e) => e.stopPropagation()}
      >
        {thumbnails.map((item, idx) => {
          const actualIndex = start + idx;
          const type = item.type || getMediaType(item.src);
          
          return (
            <button
              key={item.id || actualIndex}
              className={`
                relative w-20 h-14 cursor-pointer overflow-hidden
                ${selectedIndex === actualIndex ? 'ring-1 ring-white' : 'opacity-70 hover:opacity-100'}
                transition-all duration-200
              `}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedIndex !== actualIndex) {
                  onIndexChange(actualIndex);
                }
              }}
            >
              {type === 'video' ? (
                <>
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      e.currentTarget.currentTime = 0.1;
                    }}
                  />
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
            </button>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  const currentItem = images[selectedIndex];
  const currentType = currentItem.type || getMediaType(currentItem.src);

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onClick={onClose}
      {...swipeHandlers}
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
          onClose();
        }}
      >
        ×
      </button>

      {/* Main content */}
      <div 
        className="relative w-[95vw] h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {currentType === 'video' ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src={currentItem.src}
              className="max-w-full max-h-full"
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <Image
            src={currentItem.src}
            alt={currentItem.alt || ""}
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
  );
}
