/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles, MoveRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS, IMAGE_HERO } from '../data';

interface HomeViewProps {
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function HomeView({ onTabChange, onOpenBooking }: HomeViewProps) {
  // We'll feature the first 3 projects on the home page for a clean look
  const featuredProjects = PROJECTS.slice(0, 3);

  const scrollDown = () => {
    const nextSection = document.getElementById('discover-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Immersive Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGE_HERO}
            alt="Fima Studio Interiorismo"
            className="w-full h-full object-cover object-center scale-105 animate-[subtle-zoom_20s_ease-out_infinite]"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto text-white">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[13px] font-bold uppercase tracking-[0.3em] text-white/90 mb-6 block"
          >
            Estudio de Interiorismo
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl italic font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto"
          >
            Espacios soñados que se sienten tuyos, diseñados a distancia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-base sm:text-lg text-white/85 mt-6 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Proyectos residenciales y comerciales, de la primera idea al render final.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <div className="w-px h-20 bg-white/25" />
          </motion.div>
        </div>

        {/* Down Scroll Indicator */}
        <button
          onClick={scrollDown}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer group"
          aria-label="Descubrir más"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.2em]">Descubrir</span>
          <ChevronDown size={18} className="animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>
      </section>

      {/* 2. Introduction Section */}
      <section id="discover-section" className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto scroll-mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary mb-3 block">
              Fima Studio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-on-surface">
              Espacios con identidad.
            </h2>
          </div>
          <div className="md:col-start-7 md:col-span-6 space-y-6">
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed font-light">
              Del concepto a la realidad. Aquí compartimos una mirada a nuestros proyectos residenciales y comerciales más recientes. Espacios diseñados desde la empatía y la rigurosidad técnica para cumplir con las expectativas de quienes confían en nuestro estudio alrededor del mundo.
            </p>
            <div className="h-0.5 w-16 bg-primary" />
          </div>
        </div>
      </section>

      {/* 3. Featured Services (Bento Grid) */}
      <section className="bg-surface-container-low py-24 px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary mb-3 block">
              Nuestra Propuesta
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface">
              Diseño profesional, 100% online
            </h2>
            <p className="font-sans text-sm text-on-surface-variant mt-3">
              Diseñamos tu espacio de punta a punta, de la primera idea al render final.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Asesoría Online */}
            <div className="bg-surface p-10 flex flex-col justify-between items-start border border-outline-variant/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-sm group min-h-[300px]">
              <div className="space-y-4">
                <div className="text-primary bg-primary/10 w-12 h-12 flex items-center justify-center rounded-sm">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-serif text-2xl text-on-surface">Asesoría Online</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Diseño experto sin fronteras. Recibí una propuesta personalizada de distribución, materiales y mobiliario a distancia.
                </p>
              </div>
              <button
                onClick={() => onTabChange('servicios')}
                className="font-sans text-xs font-bold uppercase tracking-widest text-primary group-hover:text-primary/80 mt-6 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              >
                Ver cómo funciona <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: Interiorismo Integral */}
            <div className="bg-surface p-10 flex flex-col justify-between items-start border border-outline-variant/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-sm group min-h-[300px]">
              <div className="space-y-4">
                <div className="text-primary bg-primary/10 w-12 h-12 flex items-center justify-center rounded-sm">
                  <MoveRight size={20} />
                </div>
                <h3 className="font-serif text-2xl text-on-surface">Interiorismo Integral</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Nos encargamos del proyecto completo. Desde la idea hasta el plano final, coordinando listas de compras detalladas y renders 3D interactivos.
                </p>
              </div>
              <button
                onClick={() => onTabChange('servicios')}
                className="font-sans text-xs font-bold uppercase tracking-widest text-primary group-hover:text-primary/80 mt-6 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              >
                Ver cómo funciona <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: Post-Diseño */}
            <div className="bg-surface p-10 flex flex-col justify-between items-start border border-outline-variant/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-sm group min-h-[300px]">
              <div className="space-y-4">
                <div className="text-primary bg-primary/10 w-12 h-12 flex items-center justify-center rounded-sm">
                  <ArrowUpRight size={20} />
                </div>
                <h3 className="font-serif text-2xl text-on-surface">Post-Diseño Directo</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Soporte directo por WhatsApp para resolver todas las dudas técnicas durante el proceso de compra, entrega y colocación con tus proveedores.
                </p>
              </div>
              <button
                onClick={() => onTabChange('servicios')}
                className="font-sans text-xs font-bold uppercase tracking-widest text-primary group-hover:text-primary/80 mt-6 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              >
                Ver cómo funciona <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Curated Portfolio Preview (Asymmetric Layout) */}
      <section className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="space-y-3">
            <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary block">
              Selección Exclusiva
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface">
              Proyectos que inspiran
            </h2>
          </div>
          <button
            onClick={() => onTabChange('portfolio')}
            className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface border-b border-outline hover:text-primary hover:border-primary pb-1 mt-4 md:mt-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            Ver todo el portfolio
          </button>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Project 1: Casa Llar (Left Big, spans 7 cols) */}
          <div
            onClick={() => onTabChange('portfolio')}
            className="md:col-span-8 group cursor-pointer space-y-4"
          >
            <div className="aspect-[16/10] overflow-hidden bg-surface-container relative rounded-sm">
              <img
                src={featuredProjects[0].image}
                alt={featuredProjects[0].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex justify-between items-start px-1">
              <div>
                <h4 className="font-serif text-2xl text-on-surface">{featuredProjects[0].name}</h4>
                <p className="font-sans text-xs text-on-surface-variant mt-1">{featuredProjects[0].location}</p>
              </div>
              <ArrowRight size={16} className="text-outline group-hover:translate-x-1.5 transition-transform mt-1.5" />
            </div>
          </div>

          {/* Project 2: Estudio Zen (Right, spans 4 cols, shifts down on desktop) */}
          <div
            onClick={() => onTabChange('portfolio')}
            className="md:col-span-4 md:mt-24 group cursor-pointer space-y-4"
          >
            <div className="aspect-[3/4] overflow-hidden bg-surface-container relative rounded-sm">
              <img
                src={featuredProjects[1].image}
                alt={featuredProjects[1].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="px-1">
              <h4 className="font-serif text-2xl text-on-surface">{featuredProjects[1].name}</h4>
              <p className="font-sans text-xs text-on-surface-variant mt-1">{featuredProjects[1].location}</p>
            </div>
          </div>

          {/* Project 3: Apartamento Marina (Left bottom, spans 5 cols, negative offset on desktop) */}
          <div
            onClick={() => onTabChange('portfolio')}
            className="md:col-span-5 md:-mt-12 group cursor-pointer space-y-4"
          >
            <div className="aspect-[4/5] overflow-hidden bg-surface-container relative rounded-sm">
              <img
                src={featuredProjects[2].image}
                alt={featuredProjects[2].name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="px-1">
              <h4 className="font-serif text-2xl text-on-surface">{featuredProjects[2].name}</h4>
              <p className="font-sans text-xs text-on-surface-variant mt-1">{featuredProjects[2].location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Elegant CTA Banner */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-surface-container-high text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-on-surface leading-tight">
            ¿Tenés un espacio que necesita una nueva vida?
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Cada proyecto empieza con una conversación. Contanos tu visión y trabajemos juntas para hacerla realidad de manera simple y guiada.
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-block bg-cta text-on-cta font-sans text-xs font-bold uppercase tracking-[0.2em] py-4.5 px-10 rounded-sm shadow-md hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
          >
            Iniciá tu proyecto con nosotras
          </button>
        </div>
      </section>
    </div>
  );
}
