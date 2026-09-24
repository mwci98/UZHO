import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Shield, BookOpen, Compass, Award, Heart, ArrowRight, MapPin } from 'lucide-react';

const societyObjectives = [
  'To regenerate our rich cultural heritage.', 'To promote social and cultural activities.', 'To preserve monuments.', 'To stage indigenous dramas and plays.', 'To modernize folk dances.', 'To promote and preserve folk songs.', 'To establish a mini-museum for preservation of ancient tools and implements.', 'To organize cultural troops.', 'To set up a library for the preservation and promotion of folk tales and stories.', 'To develop and research cultural ornaments and dresses.', 'To establish indigenous craft industries.', 'To establish a weaving unit for enlightening cultural dress and its modernization.', 'To set up a cultural institute.', 'To establish indigenous theatres, recording studio, etc.', 'To sponsor talented youth for cultural studies, including indigenous dramas, plays and social services.', 'To organize seminars and symposiums for socio-cultural upliftment.', 'To give timely training in folk dances and songs.', 'To help women, children and other weaker sections of society.', 'To popularize our rich culture to other parts of the country.', 'To organize cultural shows and drama from time to time.', 'To help rural people in public health and sanitation.', 'To establish marketing facilities.', 'To organize cultural competitions through dramas, dances, plays, song stories, poems, etc.', 'To research and publish folk tales and folklore.', 'To preserve salted water springs.', 'To co-operate with and help the Government in the upliftment of rural activities.', 'To develop self-work culture through mass participation of members.', 'To construct rural public utility roads, link roads, approach roads, footpaths, bridges and culverts for the welfare of village communities.', 'To construct public wells where necessary for villagers.', 'To construct minimum dwelling houses for destitute people in villages.', 'To establish community farms of horticulture, social forestry and tree plantation for the upliftment of the rural poor.', 'To take up land development and reclamation of waste land with special emphasis on ecological improvement.', 'To help villagers by maintaining and constructing water-harvesting ponds and irrigation channels for agriculture.', 'To carry out sanitation programmes and environmental pollution control projects in the locality.', 'To promote games and sports by providing infrastructural facilities to rural youth.', 'To construct stadiums for games as well as athletic events.', 'To help rural schools by maintaining and constructing school buildings, hostel accommodation and playgrounds.'
];

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176B52] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Institutional Profile · Pfutsero, Nagaland</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] font-['DM_Sans',sans-serif]">
              About Uzho Cultural Society
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              Uzho Cultural Society is a non-profit charitable non-governmental organization based in
              Nagaland, India. Its work connects art, culture, science, technology, and community
              education with the people of Pfutsero and the wider region.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F6F8F7] border-y border-[#E2E8E5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"><p className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">Society leadership</p><h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#17251F]">President</h2><div className="mt-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start"><div><img src="/assets/president.jpg" alt="Vezokho Chotso" className="w-full max-w-[220px] rounded-xl border border-[#E2E8E5]"/><h3 className="mt-4 text-xl font-bold text-[#17251F]">Vezokho Chotso</h3><p className="mt-1 text-sm text-[#176B52]">President, Uzho Cultural Society</p></div><div className="space-y-4 max-w-2xl"><h3 className="text-xl font-bold text-[#17251F]">About the President</h3><p className="text-base leading-relaxed text-[#57655E]">Vezokho Chotso is a prominent political figure, social worker, and sports administrator from Nagaland, India. He belongs to the Chakhesang Naga community and has served across political, sports, and community sectors.</p><p className="text-base leading-relaxed text-[#57655E]"><strong>Political career:</strong> He contested the 2013 Nagaland Legislative Assembly Election from 18-Chazouba as an Independent candidate and later served as Convener of the BJP North East ST Morcha.</p><p className="text-base leading-relaxed text-[#57655E]"><strong>Sports administration:</strong> He is an Apex Council Member of the Nagaland Cricket Association for 2026–2029 and former President of the Phek District Cricket Association.</p><p className="text-base leading-relaxed text-[#57655E]"><strong>Public service:</strong> He served on the Nagaland Khadi &amp; Village Industries Board and received the “Best Citizen of India Award” in 2013.</p></div></div></div>
      </section>      <section className="py-8 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-[#E2E8E5] bg-[#F6F8F7] p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">Official document</p>
              <h2 className="mt-1 text-lg font-bold text-[#17251F]">List of Society Members</h2>
              <p className="mt-1 text-sm text-[#57655E]">Download the approved member list supplied by Uzho Cultural Society.</p>
            </div>
            <a href="/assets/list-of-members.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl bg-[#176B52] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#104C3A]">View member list PDF</a>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-[#EAF4EF] py-14 border-t border-[#176B52]/15">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
              Join in Preserving Our Cultural Heritage
            </h3>
            <p className="text-xs sm:text-sm text-[#57655E] mt-1">
              Connect with our team to contribute oral recordings, participate in workshops, or support programs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#17251F] text-xs font-semibold rounded-xl border border-[#E2E8E5]"
            >
              Contact Office
            </button>
            <button
              onClick={() => navigate('/donate')}
              className="px-5 py-2.5 bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-semibold rounded-xl"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};


