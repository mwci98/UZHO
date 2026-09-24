import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { getGalleryItems } from '../../lib/supabase';
import { GalleryItem, GalleryCategory } from '../../types';
import { GalleryLightbox } from '../GalleryLightbox';
import { ArrowRight, Eye } from 'lucide-react';

export const GalleryPreviewSection: React.FC = () => {
  const { navigate } = useNavigation();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryItems().then((data) => {
      setItems(data);
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

  const filteredItems = items
    .filter((item) => activeCategory === 'All' || item.category === activeCategory)
    .slice(0, 6);

  return (
    <section className="py-20 bg-white border-b border-[#E2E8E5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Visual Records
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Society Photographs
            </h2>
            <p className="mt-2 text-sm text-[#57655E] max-w-xl">
              Authentic archival records of community assemblies, oral history recording drives, and
              highland development initiatives.
            </p>
          </div>
          <button
            onClick={() => navigate('/gallery')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B52] hover:text-[#104C3A] group self-start md:self-auto"
          >
            <span>Explore Complete Gallery</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Filter Bar (Functional buttons, zero-pill styling) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6F8F7] rounded-xl border border-[#E2E8E5] mb-8 max-w-fit">
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

        {/* Varied Proportion Masonry Grid */}
        {loading ? (
          <div className="text-center text-sm text-[#57655E] py-12">Loading gallery...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((photo, index) => {
              // Create dynamic visual variety: let first photo span 2 cols on lg if landscape
              const isLarge = index === 0;

              return (
                <div
                  key={photo.id}
                  onClick={() => setSelectedItem(photo)}
                  className={`group relative rounded-2xl overflow-hidden bg-slate-100 border border-[#E2E8E5] cursor-pointer shadow-xs hover:shadow-md transition-all ${
                    isLarge ? 'sm:col-span-2 sm:h-[380px]' : 'h-[280px]'
                  }`}
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />

                  {/* Gentle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17251F]/90 via-[#17251F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                    <span className="text-[11px] font-semibold text-[#A2B8AF] uppercase tracking-wider">
                      {photo.category}
                    </span>
                    <h4 className="text-base font-bold text-white tracking-tight font-['DM_Sans',sans-serif] mt-0.5">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-white/80 line-clamp-2 mt-1">{photo.caption}</p>
                    <div className="pt-2 flex items-center gap-1 text-xs text-[#EAF4EF] font-medium">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to view full photograph</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <GalleryLightbox
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onSelect={(item) => setSelectedItem(item)}
        />
      )}
    </section>
  );
};
