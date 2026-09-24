import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { DonationFlow } from '../DonationFlow';
import { Heart, QrCode, ShieldCheck, ArrowRight, X } from 'lucide-react';

export const DonationBannerSection: React.FC = () => {
  const { navigate } = useNavigation();
  const [showInlineDonate, setShowInlineDonate] = useState(false);

  return (
    <section className="py-20 bg-[#EAF4EF] border-b border-[#176B52]/15">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {!showInlineDonate ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#176B52]/20 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176B52]">
                <Heart className="w-4 h-4 fill-[#176B52]" />
                <span>Voluntary Community Contributions</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] font-['DM_Sans',sans-serif]">
                Support Our Work
              </h2>

              <p className="text-base text-[#57655E] leading-relaxed">
                Your contribution helps Uzho Cultural Society continue its cultural and community
                initiatives. All donations are received directly through official UPI and verified by
                the society secretariat.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#57655E]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#176B52]" />
                  <span>Direct UPI Transfer</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#176B52]" />
                  <span>Dynamic QR Generator</span>
                </div>
                <span aria-hidden="true">·</span>
                <span>Manual Secretariat Audit</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowInlineDonate(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#176B52] hover:bg-[#104C3A] text-white font-semibold text-base rounded-xl transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
              >
                <Heart className="w-4 h-4 fill-white/25" />
                <span>Donate Now</span>
              </button>

              <button
                onClick={() => navigate('/transparency')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 bg-white hover:bg-[#F6F8F7] text-[#17251F] border border-[#E2E8E5] font-medium text-sm rounded-xl transition-all"
              >
                <span>View Financial Reports</span>
                <ArrowRight className="w-4 h-4 text-[#57655E]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto relative animate-in fade-in duration-200">
            <button
              onClick={() => setShowInlineDonate(false)}
              className="absolute -top-12 right-0 inline-flex items-center gap-1 text-xs text-[#57655E] hover:text-[#17251F] bg-white px-3 py-1.5 rounded-lg border border-[#E2E8E5]"
            >
              <X className="w-4 h-4" />
              <span>Collapse Donation Window</span>
            </button>
            <DonationFlow />
          </div>
        )}
      </div>
    </section>
  );
};
