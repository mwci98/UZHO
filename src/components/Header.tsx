import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Logo } from './Logo';
import { Menu, X, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate, isMobileMenuOpen, setIsMobileMenuOpen, setIsDonationModalOpen } =
    useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Our Work', path: '/our-work' },
    { label: 'Activities', path: '/activities' },
    { label: 'Upcoming Plans', path: '/upcoming' },
    { label: 'Gallery', path: '/gallery' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-[#E2E8E5] py-2.5 shadow-sm'
            : 'bg-[#F6F8F7]/95 backdrop-blur-sm border-[#E2E8E5]/70 py-4'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52] rounded-lg"
            aria-label="Uzho Cultural Society Home"
          >
            <Logo variant="horizontal" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.path);
                  }}
                  className={`text-sm font-medium transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52] rounded ${
                    active
                      ? 'text-[#176B52] font-semibold'
                      : 'text-[#17251F]/80 hover:text-[#176B52]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#176B52] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs & Mobile Burger Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => navigate('/donate')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#176B52] text-white text-xs sm:text-sm font-medium rounded-xl hover:bg-[#104C3A] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52] focus-visible:ring-offset-2"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20" />
              <span>Donate</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#17251F] hover:bg-[#EAF4EF] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#17251F]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E2E8E5]">
                <Logo variant="mark" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#57655E] hover:text-[#17251F] hover:bg-slate-100 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.path);
                      }}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[#EAF4EF] text-[#176B52] font-semibold'
                          : 'text-[#17251F] hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E8E5]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/donate');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#176B52] text-white text-sm font-medium rounded-xl hover:bg-[#104C3A] shadow-sm"
              >
                <Heart className="w-4 h-4" />
                <span>Donate to Uzho Society</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
