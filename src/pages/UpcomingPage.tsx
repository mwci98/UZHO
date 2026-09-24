import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { getPrograms } from '../lib/supabase';
import { UpcomingProgram } from '../types';
import { Calendar, MapPin, Tag, Heart, ArrowRight } from 'lucide-react';

export const UpcomingPage: React.FC = () => {
  const { navigate } = useNavigation();
  const [programs, setPrograms] = useState<UpcomingProgram[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrograms(true).then((data) => {
      setPrograms(data);
      setLoading(false);
    });
  }, []);

  const statuses = ['All', 'Upcoming', 'Planning', 'Ongoing'];

  const filtered = programs.filter(
    (p) => filterStatus === 'All' || p.status === filterStatus
  );

  const getStatusBadge = (status: UpcomingProgram['status']) => {
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
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Strategic Calendar
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Upcoming Plans & Programs
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              Overview of scheduled community assemblies, cultural apprenticeships, and environmental
              drives planned by Uzho Cultural Society across Pfutsero and neighboring areas.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-[#E2E8E5] bg-white sticky top-[69px] z-30 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 p-1 bg-[#F6F8F7] rounded-xl border border-[#E2E8E5] max-w-fit">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filterStatus === st
                    ? 'bg-white text-[#176B52] shadow-xs font-semibold border border-[#E2E8E5]'
                    : 'text-[#57655E] hover:text-[#17251F]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline List Content */}
      <section className="py-14">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16 text-sm text-[#57655E]">Loading calendar...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-[#57655E]">
              No programs found under "{filterStatus}".
            </div>
          ) : (
            <div className="relative border-l-2 border-[#176B52]/25 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-10">
              {filtered.map((prog) => {
                const pDate = new Date(prog.date);
                const formattedDate = pDate.toLocaleDateString('en-IN', {
                  weekday: 'short',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <div key={prog.id} className="relative group">
                    {/* Timeline dot */}
                    <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-[#176B52] border-4 border-white shadow-xs group-hover:scale-125 transition-transform" />

                    <div className="bg-[#F6F8F7] rounded-2xl p-6 sm:p-8 border border-[#E2E8E5] hover:border-[#176B52]/50 transition-all shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#57655E]">
                          <div className="flex items-center gap-1.5 font-semibold text-[#17251F]">
                            <Calendar className="w-4 h-4 text-[#176B52]" />
                            <span>{formattedDate}</span>
                          </div>
                          <span aria-hidden="true">·</span>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-[#176B52]" />
                            <span>{prog.location}</span>
                          </div>
                        </div>

                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-md border self-start sm:self-auto ${getStatusBadge(
                            prog.status
                          )}`}
                        >
                          {prog.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif] group-hover:text-[#176B52] transition-colors">
                        {prog.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#57655E] leading-relaxed">
                        {prog.description}
                      </p>

                      <div className="mt-6 pt-4 border-t border-[#E2E8E5] flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-[#57655E]">
                          Organized by Uzho Cultural Society Secretariat
                        </span>
                        <button
                          onClick={() => navigate('/contact')}
                          className="inline-flex items-center gap-1 font-semibold text-[#176B52] hover:underline"
                        >
                          <span>Inquire about attendance</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Volunteer / Support Callout */}
      <section className="bg-[#EAF4EF] py-14 border-t border-[#176B52]/15">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto space-y-3">
          <Heart className="w-6 h-6 text-[#176B52] mx-auto fill-[#176B52]/20" />
          <h3 className="text-xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
            Sponsor an Upcoming Program
          </h3>
          <p className="text-xs sm:text-sm text-[#57655E] leading-relaxed">
            Community members and well-wishers can sponsor specific assemblies, student camps, or
            archival recording equipment through voluntary direct UPI contributions.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/donate')}
              className="px-6 py-2.5 bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-semibold rounded-xl"
            >
              Contribute Towards Upcoming Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
