import React from 'react';
import { Hero } from '../components/home/Hero';
import { AboutPreview } from '../components/home/AboutPreview';
import { OurWorkSection } from '../components/home/OurWorkSection';
import { FeaturedActivitiesSection } from '../components/home/FeaturedActivitiesSection';
import { UpcomingProgramsSection } from '../components/home/UpcomingProgramsSection';
import { GalleryPreviewSection } from '../components/home/GalleryPreviewSection';
import { DonationBannerSection } from '../components/home/DonationBannerSection';
import { TransparencyPreview } from '../components/home/TransparencyPreview';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Preview */}
      <AboutPreview />

      {/* 3. What We Do / Pillars */}
      <OurWorkSection />

      {/* 4. Featured Activities in Community */}
      <FeaturedActivitiesSection />

      {/* 5. Looking Ahead / Upcoming Programs Timeline */}
      <UpcomingProgramsSection />

      {/* 6. Society Photography Gallery Preview */}
      <GalleryPreviewSection />

      {/* 7. Voluntary Support & Donation Banner */}
      <DonationBannerSection />

      {/* 8. Transparency & Reports */}
      <TransparencyPreview />

      {/* 9. Contact Section */}
      <ContactSection />
    </main>
  );
};
