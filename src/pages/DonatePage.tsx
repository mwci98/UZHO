import React, { useState } from 'react';
import { DonationFlow } from '../components/DonationFlow';
import { getDonations } from '../lib/supabase';
import { Donation } from '../types';
import { ShieldCheck, Heart, Search, CheckCircle2, Clock, HelpCircle, MapPin } from 'lucide-react';

export const DonatePage: React.FC = () => {
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<Donation | null | 'not_found'>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = lookupQuery.trim().toLowerCase();
    if (!q) return;

    setIsSearching(true);
    try {
      const all = await getDonations();
      const match = all.find(
        (d) =>
          d.utr.toLowerCase() === q ||
          d.mobile.includes(q) ||
          d.id.toLowerCase() === q
      );
      setLookupResult(match || 'not_found');
    } catch (e) {
      console.error(e);
      setLookupResult('not_found');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Community Contributions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Support Uzho Cultural Society
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              Your voluntary contribution helps sustain oral folklore archives, youth leadership
              residencies, high-altitude watershed care, and cultural transmission in Pfutsero, Nagaland.
            </p>
          </div>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Donation Flow Form & QR */}
            <div className="lg:col-span-7">
              <DonationFlow />
            </div>

            {/* Right: How It Works & Bank Account Alternative */}
            <div className="lg:col-span-5 space-y-8">
              {/* Process explanation card */}
              <div className="bg-[#F6F8F7] rounded-2xl p-6 sm:p-8 border border-[#E2E8E5] space-y-4">
                <h3 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                  How Our Manual UPI Verification Works
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm text-[#57655E]">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#176B52] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-[#17251F] block">Select Amount & Details</strong>
                      <span>Provide your name and contact info to generate a personalized UPI payment URI.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#176B52] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-[#17251F] block">Scan & Complete in UPI App</strong>
                      <span>Pay using Google Pay, PhonePe, Paytm, BHIM, or any bank UPI client.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#176B52] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-[#17251F] block">Submit Your 12-Digit UTR</strong>
                      <span>Enter the reference number from your UPI receipt to register your submission.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#176B52] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-[#17251F] block">Manual Audit Verification</strong>
                      <span>Society treasurers verify against bank statement. Status updates to verified.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#17251F] bg-[#EAF4EF] p-3.5 rounded-xl border border-[#176B52]/20">
                  <ShieldCheck className="w-4 h-4 text-[#176B52] inline mr-1.5 -mt-0.5" />
                  <strong>Zero Gateway Commission:</strong> 100% of your contribution reaches society
                  community initiatives directly without aggregator fees.
                </div>
              </div>

              {/* Status Check Tool */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8E5] shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
                    Check Donation Verification Status
                  </h3>
                  <p className="text-xs text-[#57655E] mt-1">
                    Already made a contribution? Check whether your transaction has been reconciled.
                  </p>
                </div>

                <form onSubmit={handleLookup} className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#57655E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enter 12-digit UTR or Reference ID"
                      value={lookupQuery}
                      onChange={(e) => setLookupQuery(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8E5] bg-[#F6F8F7] focus:bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full py-2.5 px-4 bg-[#17251F] hover:bg-[#104C3A] text-white text-xs font-semibold rounded-xl transition-all"
                  >
                    {isSearching ? 'Searching...' : 'Check Status'}
                  </button>
                </form>

                {lookupResult && lookupResult !== 'not_found' && (
                  <div className="p-4 bg-[#F6F8F7] rounded-xl border border-[#E2E8E5] text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#57655E]">Donor Name:</span>
                      <span className="font-semibold text-[#17251F]">{lookupResult.donor_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57655E]">Amount:</span>
                      <span className="font-bold text-[#176B52]">
                        ₹{lookupResult.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#57655E]">Submitted UTR:</span>
                      <span className="font-mono text-[#17251F]">{lookupResult.utr}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-[#E2E8E5]">
                      <span className="text-[#57655E]">Status:</span>
                      {lookupResult.payment_status === 'verified' ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Pending Manual Verification
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {lookupResult === 'not_found' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl">
                    No donation record found matching "{lookupQuery}". Please ensure your UTR is
                    entered correctly or allow 24–48 hours for bank reconciliation.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
