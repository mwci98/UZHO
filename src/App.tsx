import React, { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { UpcomingPage } from './pages/UpcomingPage';
import { GalleryPage } from './pages/GalleryPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPath, navigate } = useNavigation();

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  // Handle /admin route (standalone layout for dashboard)
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    return <AdminDashboard />;
  }

  // Handle single activity detail: /activities/:slug
  if (currentPath.startsWith('/activities/') && currentPath !== '/activities') {
    const slug = currentPath.replace('/activities/', '');
    return (
      <div className="min-h-screen flex flex-col bg-white text-[#17251F]">
        <Header />
        <main className="flex-1">
          <ActivityDetailPage slug={slug} />
        </main>
        <Footer />
      </div>
    );
  }

  // Route selector
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/our-work':
        return <OurWorkPage />;
      case '/activities':
        return <ActivitiesPage />;
      case '/upcoming':
        return <UpcomingPage />;
      case '/gallery':
        return <GalleryPage />;
      case '/transparency':
        return <TransparencyPage />;
      case '/donate':
        return <DonatePage />;
      case '/contact':
        return <ContactPage />;
      default:
        return (
          <div className="py-24 text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#17251F] font-['DM_Sans',sans-serif]">
              Page Not Located
            </h2>
            <p className="mt-2 text-sm text-[#57655E]">
              The page requested ({currentPath}) does not exist or has been moved in the Uzho Cultural
              Society portal.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-5 py-2.5 bg-[#176B52] text-white text-xs font-semibold rounded-xl"
            >
              Return to Society Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17251F] selection:bg-[#176B52]/20 selection:text-[#176B52]">
      <Header />
      <div className="flex-1">{renderCurrentPage()}</div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
