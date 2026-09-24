import React from 'react';
import { ContactSection } from '../components/home/ContactSection';
import { MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#F6F8F7] border-b border-[#E2E8E5] py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B52]">
              Secretariat & Communications
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17251F] mt-1 font-['DM_Sans',sans-serif]">
              Contact Uzho Cultural Society
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#57655E] leading-relaxed">
              We welcome dialogue with village elders, researchers, community partners, and youth.
              Visit our central secretariat at Rüziku, Pfutsero, or submit an official inquiry below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section reusing robust validated form & details */}
      <ContactSection />
    </div>
  );
};
