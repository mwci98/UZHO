import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Clock, Heart, ArrowUpRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <footer className="bg-[#17251F] text-[#F6F8F7] pt-16 pb-12 border-t border-[#176B52]/20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Col 1: Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="horizontal" inverted={true} />
            <p className="text-sm text-white/75 leading-relaxed max-w-md pt-2">
              Uzho Cultural Society works to preserve cultural heritage, encourage community
              participation, and create meaningful initiatives for future generations in Pfutsero and
              the surrounding regions of Nagaland.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/donate')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#176B52] hover:bg-[#1f8768] text-white text-xs font-semibold rounded-xl transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Heart className="w-3.5 h-3.5 fill-white/30" />
                <span>Support Our Initiatives</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A2B8AF]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  About Society
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/our-work')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  What We Do
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/activities')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  Activities & Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/upcoming')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  Upcoming Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/gallery')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left font-medium text-white"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional & Accountability */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A2B8AF]">
              Governance
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  onClick={() => navigate('/transparency')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left font-medium text-white"
                >
                  Transparency
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/transparency')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  Annual Reports & Audits
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/transparency')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  Official Documents
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/donate')}
                  className="hover:text-[#A2B8AF] transition-colors flex items-center gap-1 text-left"
                >
                  Donation Verification
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => navigate('/admin')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[#A2B8AF] hover:text-white text-xs font-medium transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#176B52]" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A2B8AF]">
              Head Office
            </h4>
            <div className="space-y-2.5 text-xs text-white/80 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                <span>
                  Uzho Cultural Society
                  <br />
                  Rüziku, Pfutsero
                  <br />
                  Phek District, Nagaland
                  <br />
                  India – 797107
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#176B52] shrink-0" />
                <a href="tel:+919436000000" className="hover:text-[#A2B8AF]">
                  +91 94360 00000
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#176B52] shrink-0" />
                <a href="mailto:contact@uzhocultural.org" className="hover:text-[#A2B8AF]">
                  contact@uzhocultural.org
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-white/60">
                <Clock className="w-3 h-3 text-[#176B52] shrink-0 mt-0.5" />
                <span>Mon – Fri: 9:30 AM – 4:30 PM</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-xs font-medium text-[#A2B8AF] hover:text-white flex items-center gap-1"
                >
                  <span>Send inquiry message</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with dedicated utility links: Transparency, Contact, Admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span>© 2026 Uzho Cultural Society. All Rights Reserved.</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <button
              onClick={() => navigate('/transparency')}
              className="text-white/80 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Transparency
            </button>
            <span className="text-white/30">·</span>
            <button
              onClick={() => navigate('/contact')}
              className="text-white/80 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Contact
            </button>
            <span className="text-white/30">·</span>
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              <Shield className="w-3 h-3 text-[#176B52]" />
              <span>Admin</span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
