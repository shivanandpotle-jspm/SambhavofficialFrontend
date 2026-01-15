import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUp,
  Sparkles,
  ScrollText,
  Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import sambhavLogo from './../../assets/sambhav_logo.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Team', href: '/team' },
  ];

  const getInvolved = [
    { label: 'Donate', href: '/donate' },
    { label: 'Become a Member', href: '/membership' },
    { label: 'Volunteer', href: '/membership' },
    { label: 'Partner With Us', href: '/about' },
  ];

  const motos = [
    'Financial Learning',
    'Entrepreneurship',
    'Social Service',
    'Mental Health',
    'Innovation',
  ];

  return (
    <footer className="relative bg-[#1a120b] text-[#f3e5ab] font-serif border-t-4 border-[#d4af37]">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

      {/* Magical Gradient Top (Replacing Wave) */}
      <div className="absolute top-0 left-0 right-0 h-16 -translate-y-full bg-gradient-to-t from-[#1a120b] to-transparent"></div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img
                src={sambhavLogo}
                alt="Sambhav Logo"
                className="h-14 w-auto object-contain sepia-[0.3] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              />
            </Link>

            <p className="text-[#f3e5ab]/70 leading-relaxed italic">
              Empowering the realm through financial literacy,
              entrepreneurship, and the ancient art of holistic development.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {motos.map((moto) => (
                <span
                  key={moto}
                  className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-none bg-[#741b1b] text-[#f3e5ab] border border-[#d4af37]/30 shadow-[2px_2px_0px_#3c1010]"
                >
                  {moto}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-[#d4af37] flex items-center gap-2" style={{ fontFamily: "'Hogwarts', serif" }}>
              <ScrollText className="h-4 w-4" />
              Quick Archives
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#f3e5ab]/80 hover:text-[#d4af37] hover:translate-x-1 transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-[#d4af37] flex items-center gap-2" style={{ fontFamily: "'Hogwarts', serif" }}>
              <Wand2 className="h-4 w-4" />
              Get Involved
            </h4>
            <ul className="space-y-3">
              {getInvolved.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[#f3e5ab]/80 hover:text-[#d4af37] hover:translate-x-1 transition-all flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Ministry Information */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-6 text-[#d4af37] flex items-center gap-2" style={{ fontFamily: "'Hogwarts', serif" }}>
              <Sparkles className="h-4 w-4" />
              Reach the Council
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-[#d4af37]" />
                <span className="text-[#f3e5ab]/80 italic text-sm">
                  JSPM's RSCOE, Common Room,<br />
                  Tathawade, Pune 411033
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#d4af37]" />
                <a
                  href="tel:+919876543210"
                  className="text-[#f3e5ab]/80 hover:text-[#d4af37] transition-colors"
                >
                  +91 8766634613
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#d4af37]" />
                <a
                  href="mailto:sambhav.team.official@gmail.com"
                  className="text-[#f3e5ab]/80 hover:text-[#d4af37] transition-colors text-sm"
                >
                  support@sambhavimpact.org
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://www.instagram.com/sambhav.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-[#fdf5e6]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#741b1b] hover:text-[#f3e5ab] transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://x.com/Sambhav_Youth"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-[#fdf5e6]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#741b1b] hover:text-[#f3e5ab] transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/sambhav-club"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none bg-[#fdf5e6]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#741b1b] hover:text-[#f3e5ab] transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#d4af37]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#f3e5ab]/50 italic">
            <span>
              © {new Date().getFullYear()} Order of Sambhav. All rights reserved by the Ministry.
            </span>
            <div className="flex gap-4">
              <Link
                to="/terms-and-conditions"
                className="hover:text-[#d4af37] transition-colors underline decoration-[#d4af37]/20"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy-policy"
                className="hover:text-[#d4af37] transition-colors underline decoration-[#d4af37]/20"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="bg-[#741b1b] text-[#f3e5ab] hover:bg-[#d4af37] hover:text-[#1a120b] rounded-none border border-[#d4af37]/30"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
