import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { getPrograms } from '../../lib/supabase';
import { UpcomingProgram } from '../../types';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

export const UpcomingProgramsSection: React.FC = () => {
  const { navigate } = useNavigation();
  const [programs, setPrograms] = useState<UpcomingProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrograms(true).then((data) => {
      setPrograms(data.slice(0, 4));
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status: UpcomingProgram['status']) => {
    switch (status) {
      case 'Ongoing':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Upcoming':
        return 'text-[#176B52] bg-[#EAF4EF] border-[#176B52]/20';
      case 'Planning':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <section className="py-20 bg-[#F6F8F7] border-b border-[#E2E8E5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Future Initiatives
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Looking Ahead
            </h2>
            <p className="mt-2 text-sm text-[#57655E] max-w-xl">
              Scheduled assemblies, cultural training workshops, and ecological programs planned
              across Pfutsero and surrounding villages.
            </p>
          </div>
          <button
            onClick={() => navigate('/upcoming')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B52] hover:text-[#104C3A] group self-start md:self-auto"
          >
            <span>View Full Program Timeline</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Clean Timeline / List Layout (Not standard identical cards) */}
        {loading ? (
          <div className="text-sm text-[#57655E] py-8 text-center">Loading programs...</div>
        ) : (
          <div className="relative border-l-2 border-[#176B52]/25 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
            {programs.map((prog) => {
              const programDate = new Date(prog.date);
              const formattedDate = programDate.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div key={prog.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#176B52] border-4 border-white shadow-xs group-hover:scale-125 transition-transform" />

                  <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8E5] hover:border-[#176B52]/40 transition-all shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3 text-xs text-[#57655E]">
                        <div className="flex items-center gap-1 font-semibold text-[#17251F]">
                          <Calendar className="w-3.5 h-3.5 text-[#176B52]" />
                          <span>{formattedDate}</span>
                        </div>
                        <span aria-hidden="true">·</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#176B52]" />
                          <span>{prog.location}</span>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border self-start sm:self-auto ${getStatusColor(
                          prog.status
                        )}`}
                      >
                        {prog.status}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif] group-hover:text-[#176B52] transition-colors">
                      {prog.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#57655E] leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
