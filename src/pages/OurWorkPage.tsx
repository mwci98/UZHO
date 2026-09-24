import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { BookOpen, TreePine, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const OurWorkPage: React.FC = () => {
  const { navigate } = useNavigation();

  const pillars = [
    {
      id: 'cultural-preservation',
      title: 'Cultural Preservation & Oral Archiving',
      icon: BookOpen,
      intro:
        'Systematic documentation of oral history, folk songs, traditional agricultural practices, and ancestral genealogy from respected community elders across Pfutsero.',
      bullets: [
        'High-fidelity audio and video recording of village elders, customary storytellers, and folk vocalists.',
        'Transcription and bilingual translation of customary proverbs, folklore, and seasonal songs.',
        'Cataloging indigenous place names and historical settlement markers in Phek District.',
        'Physical and digital repository archiving accessible for community researchers and educators.',
      ],
      image:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'community-development',
      title: 'Community Development & Environmental Care',
      icon: TreePine,
      intro:
        'Safeguarding high-altitude spring watersheds, assisting terraced agriculture preservation, and sustaining traditional community infrastructure.',
      bullets: [
        'Perennial water spring revitalization drives and stone channel maintenance along highland slopes.',
        'Afforestation with native alder and oak saplings to protect vulnerable catchment areas from erosion.',
        'Collaboration with village farmer collectives on indigenous seed preservation and soil health.',
        'Repair and maintenance of communal footpaths, resting sheds, and village assembly shelters.',
      ],
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'social-activities',
      title: 'Social Activities & Civic Deliberations',
      icon: Users,
      intro:
        'Facilitating peaceful consensus-building assemblies, inter-village goodwill convenings, and solidarity gatherings grounded in customary mutual respect.',
      bullets: [
        'Convening the Annual General Assembly of community members, council elders, and delegates.',
        'Facilitating consultative forums on local civic governance, public hygiene, and health.',
        'Inter-village goodwill visitations fostering harmony and collective regional pride.',
        'Community voluntary work days (collective labor for common community welfare).',
      ],
      image:
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'youth-engagement',
      title: 'Youth Leadership & Community Engagement',
      icon: Sparkles,
      intro:
        'Nurturing the next generation with modern leadership tools, competitive academic guidance, and apprenticeship in indigenous craftsmanship.',
      bullets: [
        'Career mentorship camps and civil service preparation seminars for high school and college students.',
        'Workshops in traditional bamboo crafts, cane weaving, and eco-friendly carpentry.',
        'Youth volunteer mobilization for disaster preparedness, relief support, and ecological drives.',
        'Encouraging youth representation in cultural documentation and digital storytelling.',
      ],
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Strategic Focus Areas
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              What We Do
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              Uzho Cultural Society's mandate is structured around four primary pillars of action,
              ensuring that cultural integrity and tangible community empowerment advance hand in hand.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Sections */}
      <section className="py-16 sm:py-20 space-y-20 sm:space-y-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                >
                  {/* Photo Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="rounded-2xl overflow-hidden border border-[#E2E8E5] shadow-xs">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-[360px] sm:h-[420px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-5`}>
                    <div className="w-12 h-12 rounded-xl bg-[#EAF4EF] text-[#176B52] flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[1.75]" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif]">
                      {pillar.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#57655E] leading-relaxed">
                      {pillar.intro}
                    </p>

                    <div className="pt-2 space-y-3">
                      {pillar.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#17251F]">
                          <CheckCircle2 className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => navigate('/activities')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B52] hover:text-[#104C3A]"
                      >
                        <span>View completed activities in this domain</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <section className="bg-[#17251F] text-white py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-['DM_Sans',sans-serif]">
            Help Us Continue These Initiatives
          </h3>
          <p className="text-sm text-white/75 max-w-xl mx-auto">
            Every contribution directly aids field recordings, watershed drives, and youth mentorship
            in Pfutsero.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/donate')}
              className="px-6 py-3.5 bg-[#176B52] hover:bg-[#1f8768] text-white font-medium text-sm rounded-xl transition-all shadow-sm"
            >
              Support via Direct UPI
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
