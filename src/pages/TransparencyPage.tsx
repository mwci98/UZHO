import React, { useEffect, useState } from 'react';
import { getDocuments } from '../lib/supabase';
import { TransparencyDocument, DocumentCategory } from '../types';
import { FileText, Download, ShieldCheck, CheckCircle2, Lock, AlertCircle } from 'lucide-react';

export const TransparencyPage: React.FC = () => {
  const [documents, setDocuments] = useState<TransparencyDocument[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments().then((data) => {
      setDocuments(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    'All',
    'Annual Reports',
    'Financial Summaries',
    'Activity Reports',
    'Official Documents',
  ];

  const filtered = documents.filter(
    (doc) => activeCategory === 'All' || doc.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Good Governance & Public Trust
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Transparency & Accountability
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              Uzho Cultural Society operates under principles of stewardship, audited accountability,
              and public disclosure. Browse verified institutional reports, audited financial
              statements, and society by-laws.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Highlights Strip */}
      <section className="border-b border-[#E2E8E5] py-8 bg-[#EAF4EF]/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#17251F]">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#176B52] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-semibold text-[#17251F]">
                  Audited Accounts
                </strong>
                <span>Honorary auditors review all voluntary donations and program outlays annually.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#176B52] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-semibold text-[#17251F]">
                  Assembly Ratified
                </strong>
                <span>Resolutions and major program expenditures require ratification by community members.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#176B52] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-semibold text-[#17251F]">
                  Non-Commercial Ethics
                </strong>
                <span>All funds strictly support non-profit cultural preservation, ecology, and youth.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Document List */}
      <section className="py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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

          {loading ? (
            <div className="text-center py-16 text-sm text-[#57655E]">Loading records...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-[#57655E]">
              No documents currently categorized under "{activeCategory}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-6 border border-[#E2E8E5] hover:border-[#176B52]/50 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#176B52] uppercase tracking-wider">
                        {doc.category}
                      </span>
                      <span className="text-xs font-semibold text-[#17251F] bg-[#F6F8F7] px-2.5 py-0.5 rounded-md border border-[#E2E8E5]">
                        {doc.year}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif]">
                      {doc.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#57655E] leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#E2E8E5] flex items-center justify-between text-xs">
                    <span className="text-[#57655E] font-medium flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#176B52]" />
                      <span>{doc.file_size}</span>
                    </span>

                    <a
                      href={doc.file_url}
                      onClick={(e) => {
                        if (doc.file_url === '#') {
                          e.preventDefault();
                          alert(
                            `Official Archival Record: "${doc.title}". Physical copy maintained at Uzho Cultural Society Secretariat, Rüziku, Pfutsero. Electronic distribution copies can also be requested by writing to office@uzhocultural.org.`
                          );
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F8F7] hover:bg-[#EAF4EF] text-[#176B52] font-semibold rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Official PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Institutional note */}
          <div className="mt-12 p-5 rounded-2xl bg-[#F6F8F7] border border-[#E2E8E5] text-xs text-[#57655E] leading-relaxed">
            <strong className="text-[#17251F] block mb-1">Public Inspection Notice:</strong>
            Original registers, minute books of general assemblies, and physical donation voucher files
            are kept at the Head Office in Rüziku, Pfutsero, Phek District, Nagaland. Members and verified
            contributors may request formal inspection during standard working hours.
          </div>
        </div>
      </section>
    </div>
  );
};
