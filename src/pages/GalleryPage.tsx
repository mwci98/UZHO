import React, { useEffect, useState } from 'react';
import { getGalleryItems } from '../lib/supabase';
import { GalleryItem, GalleryCategory } from '../types';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { Eye, Calendar, Tag, Filter } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const suppliedGallery: GalleryItem[] = [1, 2, 3, 4, 5].map((n) => ({
    id: `supplied-${n}`,
    title: `Community activity ${n}`,
    caption: 'Uzho Cultural Society community and handloom weaving programme.',
    image_url: `/assets/gallery/activity-${n}.jpeg`,
    category: 'Community Activities',
    date: '2026-09-24',
  } as GalleryItem));

  useEffect(() => {
    getGalleryItems().then((data) => {
      setItems(data.length ? data : suppliedGallery);
      setLoading(false);
    });
  }, []);

  const categories: GalleryCategory[] = [
    'All',
    'Cultural Events',
    'Community Activities',
    'Programs',
    'Meetings',
  ];

  const filtered = items.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Photographic Archive
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Society Gallery
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              Authentic visual documentation of Uzho Cultural Society gatherings, oral history
              preservation field sessions, ecological drives, and community events in Pfutsero, Nagaland.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-6 border-b border-[#E2E8E5] bg-white sticky top-[69px] z-30 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6F8F7] rounded-xl border border-[#E2E8E5] max-w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-[#176B52] shadow-xs font-semibold border border-[#E2E8E5]'
                    : 'text-[#57655E] hover:text-[#17251F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Masonry / Variable Proportion Grid */}
      <section className="py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-sm text-[#57655E]">Loading photographs...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-sm text-[#57655E]">
              No photographs in this category yet.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((photo) => {
                const photoDate = photo.date
                  ? new Date(photo.date).toLocaleDateString('en-IN', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : null;

                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedItem(photo)}
                    className="break-inside-avoid rounded-2xl overflow-hidden border border-[#E2E8E5] bg-white group cursor-pointer hover:border-[#176B52]/50 hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative overflow-hidden bg-slate-100">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#17251F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="p-3 bg-white/90 rounded-full text-[#17251F] shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-2 text-[11px] text-[#57655E] mb-1.5">
                        <span className="font-semibold text-[#176B52]">{photo.category}</span>
                        {photoDate && <span>{photoDate}</span>}
                      </div>

                      <h3 className="text-sm font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif] group-hover:text-[#176B52] transition-colors">
                        {photo.title}
                      </h3>

                      <p className="mt-1 text-xs text-[#57655E] leading-relaxed line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Accessible Lightbox */}
      {selectedItem && (
        <GalleryLightbox
          item={selectedItem}
          items={filtered}
          onClose={() => setSelectedItem(null)}
          onSelect={(item) => setSelectedItem(item)}
        />
      )}
    </div>
  );
};
