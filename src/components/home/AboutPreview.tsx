import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPreview: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="py-20 bg-white border-b border-[#E2E8E5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetric Side 1: Large real photograph */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E2E8E5]">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
                alt="Uzho Cultural Society youth and community representatives in Nagaland"
                className="w-full h-[380px] sm:h-[460px] object-cover"
                loading="lazy"
              />
              <div className="p-4 bg-[#F6F8F7] border-t border-[#E2E8E5] text-xs text-[#57655E] flex justify-between items-center">
                <span>Youth & community representatives</span>
                <span className="font-medium text-[#176B52]">Phek District, Nagaland</span>
              </div>
            </div>
          </div>

          {/* Asymmetric Side 2: Narrative & Call to Action (Not in a card) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Rooted in Tradition, Looking to the Future
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] leading-tight font-['DM_Sans',sans-serif]">
              About Uzho Cultural Society
            </h2>

            <p className="text-base text-[#57655E] leading-relaxed">
              Based at Rüziku in Pfutsero town—the highest altitude settlement in Nagaland—Uzho
              Cultural Society was established to safeguard ancestral oral wisdom, nurture local
              civic solidarity, and create progressive social platforms for our youth.
            </p>

            <p className="text-sm text-[#57655E] leading-relaxed">
              Our initiatives span oral history archiving, environmental stewardship of highland
              water springs, sustainable rural skills transfer, and transparent community
              deliberations. We believe that true preservation is active, participatory, and
              accountable to the people we serve.
            </p>

            <div className="pt-2 space-y-2.5 text-sm text-[#17251F]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                <span>Inter-generational folk oral traditions and dialectical preservation</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                <span>Highland ecological conservation and community water resources</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                <span>Educational mentorship and traditional craftsmanship incubation</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#176B52] text-white text-sm font-medium rounded-xl hover:bg-[#104C3A] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
              >
                <span>Learn More About Our Society</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
