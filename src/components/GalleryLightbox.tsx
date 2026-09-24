import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onSelect(items[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onSelect(items[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17251F]/90 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close image lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next controls */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-10 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-10 p-3 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Content Modal */}
      <div
        className="max-w-4xl w-full max-h-[92vh] flex flex-col bg-[#17251F] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 min-h-0 bg-black/50 flex items-center justify-center p-2">
          <img
            src={item.image_url}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        <div className="p-5 sm:p-6 bg-[#17251F] text-white border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-[#A2B8AF]">
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#176B52]" />
              <span>{item.category}</span>
              {item.date && (
                <>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#176B52]" />
                    <span>{new Date(item.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </>
              )}
            </div>
            <span className="text-white/50 text-[11px]">
              {currentIndex + 1} of {items.length}
            </span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-white font-['DM_Sans',sans-serif]">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-white/75 leading-relaxed">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
