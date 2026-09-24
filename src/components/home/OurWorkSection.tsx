import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { BookOpen, TreePine, Users, Sparkles, ArrowRight } from 'lucide-react';

export const OurWorkSection: React.FC = () => {
  const { navigate } = useNavigation();

  const areas = [
    {
      icon: BookOpen,
      title: 'Cultural Preservation',
      description:
        'Archiving oral histories, traditional songs, genealogical narratives, and customary knowledge from village elders across Pfutsero.',
      action: '/our-work',
    },
    {
      icon: TreePine,
      title: 'Community Development',
      description:
        'Rejuvenating highland spring watersheds, supporting sustainable terrace agricultural practices, and fostering collective rural infrastructure.',
      action: '/our-work',
    },
    {
      icon: Users,
      title: 'Social Activities',
      description:
        'Convening periodic community general assemblies, consensus-building civic councils, and festive inter-village solidarity gatherings.',
      action: '/our-work',
    },
    {
      icon: Sparkles,
      title: 'Youth & Community Engagement',
      description:
        'Conducting career orientation camps, leadership residencies, and vocational skill exchanges in traditional handicrafts and modern tools.',
      action: '/our-work',
    },
  ];

  return (
    <section className="py-20 bg-[#F6F8F7] border-b border-[#E2E8E5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
            Core Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
            What We Do
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57655E] leading-relaxed">
            Our multi-faceted mandate bridges historical heritage with contemporary grassroots
            action, ensuring that our community remains culturally resilient and economically self-reliant.
          </p>
        </div>

        {/* 4 Pillars Grid (Desktop: 4 columns, Tablet: 2x2, Mobile: 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E2E8E5] hover:border-[#176B52]/50 transition-all hover:shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EAF4EF] text-[#176B52] flex items-center justify-center mb-5 group-hover:bg-[#176B52] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif]">
                    {area.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#57655E] leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#E2E8E5]/70">
                  <button
                    onClick={() => navigate('/our-work')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B52] hover:text-[#104C3A] group/btn"
                  >
                    <span>Read pillar initiatives</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
