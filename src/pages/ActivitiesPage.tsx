import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { getActivities } from '../lib/supabase';
import { Activity } from '../types';
import { Calendar, MapPin, ArrowRight, Search, Tag, Filter } from 'lucide-react';

export const ActivitiesPage: React.FC = () => {
  const { navigate } = useNavigation();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    getActivities(true).then((data) => {
      setActivities(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    'All',
    'Cultural Preservation',
    'Community Development',
    'Youth & Community Engagement',
  ];

  const filtered = activities.filter((act) => {
    const matchesCat = selectedCategory === 'All' || act.category === selectedCategory;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Field Documentation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Activities & Completed Work
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              Explore documented archives of our cultural recording sessions, environmental spring
              drives, and educational seminars organized across Pfutsero and Phek District.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 border-b border-[#E2E8E5] bg-white sticky top-[69px] z-30 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories filter tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6F8F7] rounded-xl border border-[#E2E8E5] w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-[#176B52] shadow-xs font-semibold border border-[#E2E8E5]'
                      : 'text-[#57655E] hover:text-[#17251F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#57655E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-[#E2E8E5] bg-[#F6F8F7] focus:bg-white text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16 text-sm text-[#57655E]">Loading activities...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-[#F6F8F7] rounded-2xl border border-[#E2E8E5] max-w-md mx-auto p-8">
              <Filter className="w-8 h-8 text-[#57655E] mx-auto mb-2" />
              <h3 className="text-base font-bold text-[#17251F]">No activities match your filter</h3>
              <p className="text-xs text-[#57655E] mt-1">Try selecting "All" or modifying your search keywords.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#176B52] text-white text-xs font-semibold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((activity) => {
                const activityDate = new Date(activity.date).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <article
                    key={activity.id}
                    className="bg-white rounded-2xl border border-[#E2E8E5] overflow-hidden hover:border-[#176B52]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-slate-100">
                        <img
                          src={activity.featured_image}
                          alt={activity.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-[#17251F]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-xs">
                          {activity.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-[#57655E] mb-2.5">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#176B52]" />
                            <span>{activityDate}</span>
                          </div>
                          <span aria-hidden="true">·</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#176B52]" />
                            <span className="truncate max-w-[140px]">{activity.location}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-[#17251F] tracking-tight font-['DM_Sans',sans-serif] group-hover:text-[#176B52] transition-colors line-clamp-2">
                          {activity.title}
                        </h3>

                        <p className="mt-2 text-xs sm:text-sm text-[#57655E] leading-relaxed line-clamp-3">
                          {activity.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-[#E2E8E5]">
                        <button
                          onClick={() => navigate(`/activities/${activity.slug}`)}
                          className="w-full py-2.5 px-3 bg-[#F6F8F7] hover:bg-[#EAF4EF] text-[#176B52] hover:text-[#104C3A] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Read Full Field Report</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
