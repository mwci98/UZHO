import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { getDocuments } from '../../lib/supabase';
import { TransparencyDocument } from '../../types';
import { FileText, Download, ShieldCheck, ArrowRight } from 'lucide-react';

export const TransparencyPreview: React.FC = () => {
  const { navigate } = useNavigation();
  const [documents, setDocuments] = useState<TransparencyDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocuments().then((data) => {
      setDocuments(data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20 bg-white border-b border-[#E2E8E5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Accountability & Trust
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Transparency & Accountability
            </h2>
            <p className="mt-2 text-sm text-[#57655E] max-w-xl">
              Uzho Cultural Society maintains open records of annual activity reports, audited
              accounts, and official by-laws accessible to all community members and donors.
            </p>
          </div>
          <button
            onClick={() => navigate('/transparency')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B52] hover:text-[#104C3A] group self-start md:self-auto"
          >
            <span>Browse All Official Documents</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {loading ? (
          <div className="text-center text-sm text-[#57655E] py-8">Loading official documents...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#F6F8F7] rounded-2xl p-6 border border-[#E2E8E5] hover:border-[#176B52]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold text-[#176B52] uppercase tracking-wider">
                      {doc.category}
                    </span>
                    <span className="text-xs text-[#57655E]">{doc.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif]">
                    {doc.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#57655E] leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#E2E8E5] flex items-center justify-between text-xs">
                  <span className="text-[#57655E] font-medium">{doc.file_size}</span>
                  <a
                    href={doc.file_url}
                    onClick={(e) => {
                      if (doc.file_url === '#') {
                        e.preventDefault();
                        alert(
                          `Official Document "${doc.title}" is archived with the Uzho Secretariat. You can request a physical/digital copy via contact@uzhocultural.org or view the Transparency page.`
                        );
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-[#176B52] font-semibold hover:text-[#104C3A]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
