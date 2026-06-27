/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Navbar({ currentTab, onTabChange, onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If we are on "inicio" tab, we want a transparent navbar at the very top.
  // Otherwise, we want a solid off-white background.
  const isHome = currentTab === 'inicio';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'sobre-nosotras', label: 'Sobre Nosotras' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleLinkClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine navbar classes based on scroll state and current tab
  const navbarBg = isHome
    ? isScrolled
      ? 'bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 text-on-surface shadow-sm py-4'
      : 'bg-transparent text-white py-6'
    : 'bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 text-on-surface shadow-sm py-4';

  const logoColor = isHome && !isScrolled ? 'text-white' : 'text-primary';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${navbarBg}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center h-16">
          
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('inicio')}
            className={`font-serif text-2xl tracking-widest uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors ${logoColor}`}
          >
            Fima Studio
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              const linkColor = isHome && !isScrolled
                ? isActive ? 'text-white border-b-2 border-white' : 'text-white/80 hover:text-white'
                : isActive ? 'text-primary border-b-2 border-primary font-medium' : 'text-on-surface-variant hover:text-primary';

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`font-sans text-xs uppercase tracking-widest py-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 border-b-2 border-transparent ${linkColor}`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Agendar Cita Button */}
          <div className="hidden md:block">
            <button
              onClick={onOpenBooking}
              className={`font-sans text-xs uppercase tracking-widest py-2.5 px-6 rounded-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 flex items-center gap-1.5 hover:opacity-90 ${
                isHome && !isScrolled
                  ? 'bg-white text-primary hover:bg-neutral-100 shadow-sm'
                  : 'bg-cta text-on-cta'
              }`}
            >
              Agendar Cita
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 bg-surface/98 backdrop-blur-md md:hidden flex flex-col p-8 border-t border-outline-variant/30"
          >
            <div className="flex flex-col gap-6 mt-4">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`font-sans text-lg uppercase tracking-wider text-left py-2 border-b border-outline-variant/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                      isActive ? 'text-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="bg-cta text-on-cta font-sans text-sm uppercase tracking-widest py-4 px-6 rounded-sm font-semibold mt-6 text-center shadow-lg shadow-primary/5 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              >
                Agendar Cita
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
