import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { getActivities } from '../../lib/supabase';
import { Activity } from '../../types';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const FeaturedActivitiesSection: React.FC = () => {
  const { navigate } = useNavigation();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities(true).then((data) => {
      setActivities(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-white border-b border-[#E2E8E5] text-center text-sm text-[#57655E]">
        Loading activities...
      </div>
    );
  }

  if (activities.length === 0) {
    return null;
  }

  // Find featured or first
  const featuredItem = activities.find((a) => a.featured) || activities[0];
  const sideItems = activities.filter((a) => a.id !== featuredItem.id).slice(0, 3);

  return (
    <section className="py-20 bg-white border-b border-[#E2E8E5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Fieldwork & Initiatives
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Our Work in the Community
            </h2>
          </div>
          <button
            onClick={() => navigate('/activities')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B52] hover:text-[#104C3A] group self-start md:self-auto"
          >
            <span>View All Completed Activities</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Asymmetric Photography Grid: 1 Large Featured + 3 Stacked Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Large Featured Activity (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col bg-[#F6F8F7] rounded-2xl border border-[#E2E8E5] overflow-hidden group hover:border-[#176B52]/40 transition-all">
            <div className="relative h-[280px] sm:h-[360px] overflow-hidden bg-slate-100">
              <img
                src={featuredItem.featured_image}
                alt={featuredItem.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#17251F]/90 text-white text-xs font-medium px-3 py-1 rounded-md backdrop-blur-xs">
                Featured Initiative
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#57655E] mb-3">
                  <span className="text-[#176B52] font-semibold">{featuredItem.category}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#176B52]" />
                    <span>{new Date(featuredItem.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#176B52]" />
                    <span>{featuredItem.location}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif] group-hover:text-[#176B52] transition-colors">
                  {featuredItem.title}
                </h3>

                <p className="mt-3 text-sm text-[#57655E] leading-relaxed line-clamp-3">
                  {featuredItem.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E2E8E5]">
                <button
                  onClick={() => navigate(`/activities/${featuredItem.slug}`)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#176B52] hover:text-[#104C3A]"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Stacked Activities (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {sideItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/activities/${item.slug}`)}
                className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-[#E2E8E5] hover:border-[#176B52]/40 bg-white hover:bg-[#F6F8F7] transition-all cursor-pointer group"
              >
                <div className="sm:w-36 h-28 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={item.featured_image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#57655E] mb-1">
                      <span className="font-semibold text-[#176B52]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(item.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#17251F] leading-snug group-hover:text-[#176B52] transition-colors line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-xs text-[#57655E] line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#176B52]">
                    <span>Read report</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
