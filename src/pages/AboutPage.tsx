import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Shield, BookOpen, Compass, Award, Heart, ArrowRight, MapPin } from 'lucide-react';

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

      <section className="py-8 bg-white">
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

      {/* Main Narrative & Foundation */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6 text-[#57655E] leading-relaxed text-base">
              <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                Our Foundation & Vision
              </h2>
              <p>
                Headquartered at Rüziku in Pfutsero, the society operates amidst one of the most
                vibrant cultural and agricultural heartlands of Phek District. Our elders have
                bequeathed profound oral traditions, collective civic discipline, ecological
                balance, and customary laws centered on mutual responsibility.
              </p>
              <p>
                As modern transitions reshape rural communities, Uzho Cultural Society serves as a
                structured bridge: preserving what is noble and instructive in our ancestral wisdom
                while actively preparing our youth for contemporary civic and economic leadership.
              </p>
              <p>
                The society’s registered postal address is Post Box No. 727, Kohima Head Post Office,
                Kohima - 797001, Nagaland, with its community work and local activities rooted in
                Pfutsero, Phek district.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#F6F8F7] border border-[#E2E8E5]">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF4EF] text-[#176B52] flex items-center justify-center mb-3">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                    Our Mission
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#57655E]">
                    To record and celebrate oral history, protect highland ecosystems, cultivate
                    inclusive community assemblies, and equip young people with skills.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F6F8F7] border border-[#E2E8E5]">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF4EF] text-[#176B52] flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                    Our Values
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#57655E]">
                    Authenticity, voluntary civic service, democratic consensus, generational
                    respect, and complete financial and operational transparency.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-bold text-[#17251F] font-['DM_Sans',sans-serif] mb-3">
                  Pfutsero Geographical Context
                </h3>
                <p className="text-sm">
                  Pfutsero sits at an elevation of 2,133 meters (6,998 ft) above sea level,
                  renowned as the coldest inhabited municipality in Nagaland. The surrounding slopes
                  feature historic terrace agriculture, pine ridges, and indigenous spring aquifers
                  that sustain high-altitude horticulture and farming traditions.
                </p>
              </div>
            </div>

            {/* Right Side: Photo and Office Bearers placeholder section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8E5] shadow-sm">
                <img
                  src="/assets/uzho-office.jpg"
                  alt="Uzho Cultural Society members at the society office"
                  className="w-full h-[320px] object-cover"
                />
                <div className="p-4 bg-[#F6F8F7] text-xs text-[#57655E]">
                  <span>Community General Deliberation Session · Rüziku</span>
                </div>
              </div>

              {/* Office Bearers & Executive Committee (Accurate placeholders as instructed) */}
              <div className="bg-[#F6F8F7] rounded-2xl p-6 border border-[#E2E8E5]">
                <h3 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif] mb-2">
                  Executive Leadership & Secretariat
                </h3>
                <p className="text-xs text-[#57655E] mb-4">
                  The society is governed by an elected executive council alongside traditional advisory
                  elders from Pfutsero sub-division.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#E2E8E5] flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-[#17251F] block">General Secretary</span>
                      <span className="text-[#57655E]">[Official Name Placeholder – Secretariat]</span>
                    </div>
                    <span className="text-[10px] text-[#176B52] bg-[#EAF4EF] px-2 py-0.5 rounded font-medium">
                      Secretariat
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E2E8E5] flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-[#17251F] block">Finance Secretary & Treasurer</span>
                      <span className="text-[#57655E]">[Official Name Placeholder – Secretariat]</span>
                    </div>
                    <span className="text-[10px] text-[#176B52] bg-[#EAF4EF] px-2 py-0.5 rounded font-medium">
                      Treasury
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E2E8E5] flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-[#17251F] block">Advisory Board of Elders</span>
                      <span className="text-[#57655E]">Representatives from Pfutsero community</span>
                    </div>
                    <span className="text-[10px] text-[#176B52] bg-[#EAF4EF] px-2 py-0.5 rounded font-medium">
                      Custodians
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8E5] text-[11px] text-[#57655E]">
                  <em>Note: Verified lists of office bearers are updated following each General Assembly and recorded in official documents.</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F6F8F7] border-y border-[#E2E8E5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">Society leadership</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">President</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">
              <div>
                <img src="/assets/president.jpg" alt="Vezokho Chotso, President of Uzho Cultural Society" width="934" height="1269" loading="lazy" className="w-full max-w-[220px] h-auto rounded-xl border border-[#E2E8E5]" />
                <h3 className="mt-4 text-xl font-bold text-[#17251F]">Vezokho Chotso</h3>
                <p className="mt-1 text-sm text-[#176B52]">President, Uzho Cultural Society</p>
              </div>
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-xl font-bold text-[#17251F]">About the President</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#57655E]">Vezokho Chotso is the President of Uzho Cultural Society.</p>
                  <p className="mt-2 text-base leading-relaxed text-[#57655E]">His biography will be shared here once confirmed.</p>
                </div>
                <div className="border-t border-[#E2E8E5] pt-6">
                  <h3 className="text-xl font-bold text-[#17251F]">Message from the President</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#57655E]">A personal message from Vezokho Chotso will be published here soon.</p>
                </div>
              </div>
            </div>
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
