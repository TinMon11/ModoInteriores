/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONTACT } from '../data';

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId: string) => {
    onTabChange(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 w-full py-16 px-6 md:px-12 lg:px-16 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => handleLinkClick('inicio')}
              className="font-serif text-2xl tracking-widest uppercase text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              Fima Studio
            </button>
            <p className="font-sans text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Diseño de interiores residencial y comercial. Creamos espacios que respiran calma, funcionalidad y un carácter único adaptado a cada cliente.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
              Estudio
            </span>
            <button
              onClick={() => handleLinkClick('portfolio')}
              className="font-sans text-sm text-on-surface-variant hover:text-primary text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              Portfolio
            </button>
            <button
              onClick={() => handleLinkClick('servicios')}
              className="font-sans text-sm text-on-surface-variant hover:text-primary text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              Servicios
            </button>
            <button
              onClick={() => handleLinkClick('sobre-nosotras')}
              className="font-sans text-sm text-on-surface-variant hover:text-primary text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              Sobre Nosotras
            </button>
            <button
              onClick={() => handleLinkClick('contacto')}
              className="font-sans text-sm text-on-surface-variant hover:text-primary text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              Contacto
            </button>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
              Contacto Directo
            </span>
            <a
              href={`mailto:${COMPANY_CONTACT.email}`}
              className="font-sans text-sm text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              <Mail size={14} className="text-on-surface-variant" />
              {COMPANY_CONTACT.email}
            </a>
            <a
              href="https://instagram.com/fimastudio.interiores"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-on-surface-variant hover:text-primary flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              <span className="font-medium">Instagram:</span>
              {COMPANY_CONTACT.instagram}
              <ArrowUpRight size={12} className="text-on-surface-variant" />
            </a>
            <p className="font-sans text-xs text-on-surface-variant mt-2">
              {COMPANY_CONTACT.address}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-outline-variant/20 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-on-surface-variant text-center sm:text-left">
            &copy; {currentYear} Fima Studio. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Política de Privacidad - Fima Studio'); }}
              className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Términos y Condiciones - Fima Studio'); }}
              className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            >
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
