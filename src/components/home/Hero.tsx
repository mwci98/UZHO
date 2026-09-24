import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight, Heart, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="relative min-h-[72vh] lg:min-h-[78vh] flex items-center bg-[#F6F8F7] border-b border-[#E2E8E5] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & Action */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quiet institutional kicker with zero-pill discipline */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#176B52]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Rüziku, Pfutsero · Phek District, Nagaland</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] leading-[1.15] font-['DM_Sans',sans-serif]">
              Preserving Our Culture.{' '}
              <span className="text-[#176B52] block sm:inline">
                Strengthening Our Community.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#57655E] leading-relaxed max-w-xl">
              Uzho Cultural Society works to preserve cultural heritage, encourage community
              participation and create meaningful initiatives for future generations.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => navigate('/our-work')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#17251F] text-white text-sm font-medium rounded-xl hover:bg-[#104C3A] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/donate')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#176B52] text-white text-sm font-medium rounded-xl hover:bg-[#104C3A] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>Donate Now</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#E2E8E5] flex items-center gap-6 text-xs text-[#57655E]">
              <div>
                <span className="font-semibold text-[#17251F]">Registered Society</span>
                <span className="block text-[11px]">Government of Nagaland</span>
              </div>
              <span className="h-4 w-px bg-[#E2E8E5]" aria-hidden="true" />
              <div>
                <span className="font-semibold text-[#17251F]">Community Owned</span>
                <span className="block text-[11px]">Pfutsero Sub-Division</span>
              </div>
            </div>
          </div>

          {/* Right Column: Photography-focused visual (No patterns, No floating graphics) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E2E8E5] bg-white">
              <img
<<<<<<< HEAD
                src="/assets/uzho-office.jpg"
                alt="Uzho Cultural Society members at the head office in Rüziku, Pfutsero"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-right"
=======
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80"
                alt="Community assembly and cultural stewards of Uzho Cultural Society in Pfutsero"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover"
>>>>>>> a2d207fa5434b6149f1cff2969020f0177f6de72
                loading="eager"
              />
              <div className="p-4 bg-white border-t border-[#E2E8E5] flex items-center justify-between text-xs text-[#57655E]">
                <span>Pfutsero Community Consultation Gathering</span>
                <span className="text-[#176B52] font-medium">Rüziku, Nagaland</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
