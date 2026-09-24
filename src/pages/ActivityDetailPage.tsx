import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { getActivityBySlug, getActivities } from '../lib/supabase';
import { Activity } from '../types';
import { Calendar, MapPin, Tag, ArrowLeft, Share2, Check, ArrowRight } from 'lucide-react';

export const ActivityDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useNavigation();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [related, setRelated] = useState<Activity[]>([]);

  useEffect(() => {
    setLoading(true);
    getActivityBySlug(slug).then((data) => {
      setActivity(data);
      setLoading(false);
      if (data) {
        getActivities(true).then((all) => {
          setRelated(all.filter((a) => a.id !== data.id).slice(0, 2));
        });
      }
    });
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-[#57655E]">
        Loading activity documentation...
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-[#17251F]">Activity Not Found</h2>
        <p className="text-sm text-[#57655E] mt-2">
          The requested record could not be located in our society database. It may have been
          re-indexed or updated.
        </p>
        <button
          onClick={() => navigate('/activities')}
          className="mt-6 px-5 py-2.5 bg-[#176B52] text-white text-xs font-semibold rounded-xl"
        >
          Return to Activities Directory
        </button>
      </div>
    );
  }

  const formattedDate = new Date(activity.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/activities')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57655E] hover:text-[#176B52]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Activities</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57655E] hover:text-[#17251F] bg-white px-3 py-1.5 rounded-lg border border-[#E2E8E5]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#176B52]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Report'}</span>
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#57655E] mb-3">
          <span className="font-semibold text-[#176B52]">{activity.category}</span>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#176B52]" />
            <span>{formattedDate}</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#176B52]" />
            <span>{activity.location}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17251F] font-['DM_Sans',sans-serif] leading-tight">
          {activity.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed border-l-3 border-[#176B52] pl-4 italic">
          {activity.description}
        </p>

        {/* Hero Image */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#E2E8E5] shadow-xs">
          <img
            src={activity.featured_image}
            alt={activity.title}
            className="w-full h-[360px] sm:h-[480px] object-cover"
          />
          <div className="p-3 bg-[#F6F8F7] border-t border-[#E2E8E5] text-xs text-[#57655E] flex justify-between">
            <span>Official Field Documentation · Uzho Cultural Society</span>
            <span>{activity.location}</span>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="mt-10 prose prose-slate max-w-none text-[#17251F] leading-relaxed space-y-4 text-sm sm:text-base">
          {activity.content.split('\n\n').map((para, pIdx) => {
            if (para.startsWith('Key Focus Areas:') || para.startsWith('Objectives:')) {
              const lines = para.split('\n');
              return (
                <div key={pIdx} className="my-4 bg-[#F6F8F7] p-5 rounded-2xl border border-[#E2E8E5]">
                  <h4 className="font-bold text-sm text-[#17251F] mb-2">{lines[0]}</h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#57655E]">
                    {lines.slice(1).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#176B52] font-bold">•</span>
                        <span>{item.replace(/^[•\-\*]\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return <p key={pIdx}>{para}</p>;
          })}
        </div>

        {/* Additional Gallery images if present */}
        {activity.gallery_images && activity.gallery_images.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#E2E8E5]">
            <h3 className="text-lg font-bold text-[#17251F] mb-4 font-['DM_Sans',sans-serif]">
              Archival Field Photographs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activity.gallery_images.map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-[#E2E8E5]">
                  <img
                    src={img}
                    alt={`${activity.title} field documentation ${idx + 1}`}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Activities */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#E2E8E5]">
            <h3 className="text-lg font-bold text-[#17251F] mb-6 font-['DM_Sans',sans-serif]">
              Other Recent Initiatives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/activities/${rel.slug}`)}
                  className="p-4 rounded-xl border border-[#E2E8E5] hover:border-[#176B52]/50 transition-all cursor-pointer group bg-[#F6F8F7]"
                >
                  <span className="text-[11px] font-semibold text-[#176B52] uppercase">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-[#17251F] group-hover:text-[#176B52] transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#176B52]">
                    <span>Read record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
