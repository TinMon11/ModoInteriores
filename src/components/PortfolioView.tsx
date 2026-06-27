/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, MapPin, Calendar, Layers, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface PortfolioViewProps {
  onOpenBooking: () => void;
}

export default function PortfolioView({ onOpenBooking }: PortfolioViewProps) {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  // Layout assignment: we define alternating grid layouts for each project card to build a stunning asymmetric bento style
  // We map the project index to a tailwind column span
  const getColSpanClass = (index: number) => {
    const sequence = [
      'md:col-span-8', // Index 0: Casa Llar (Residential)
      'md:col-span-4', // Index 1: Estudio Zen (Commercial)
      'md:col-span-4', // Index 2: Apartamento Marina (Residential)
      'md:col-span-8', // Index 3: Casa LG (Residential)
      'md:col-span-6', // Index 4: Instituto Cultura Inglesa (Commercial)
      'md:col-span-6', // Index 5: Proyecto JP (Residential)
      'md:col-span-8', // Index 6: Proyecto JO (Residential)
      'md:col-span-4', // Index 7: Proyecto DB (Residential)
      'md:col-span-12', // Index 8: Proyecto CM (Residential)
    ];
    return sequence[index % sequence.length];
  };

  const getAspectClass = (index: number) => {
    const sequence = [
      'aspect-[16/10]',
      'aspect-[3/4]',
      'aspect-[3/4]',
      'aspect-[16/9]',
      'aspect-[1/1]',
      'aspect-[1/1]',
      'aspect-[16/10]',
      'aspect-[3/4]',
      'aspect-[21/9] md:aspect-[21/9] aspect-[16/10]',
    ];
    return sequence[index % sequence.length];
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* 1. Header & Filters */}
      <section className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary mb-3 block animate-pulse">
            Portafolio Seleccionado
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-on-surface tracking-tight leading-tight mb-6">
            Nuestro Portfolio
          </h1>
          <p className="font-sans text-base text-on-surface-variant font-light leading-relaxed">
            Una selección de proyectos residenciales y comerciales que diseñamos de principio a fin. Mirá el detalle, los materiales y la luz de cada espacio.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 sm:gap-6 border-b border-outline-variant/30 pb-2 overflow-x-auto shrink-0 self-start lg:self-end">
          {(['all', 'residential', 'commercial'] as const).map((cat) => {
            const label = cat === 'all' ? 'Todos' : cat === 'residential' ? 'Residencial' : 'Comercial';
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-sans text-xs uppercase tracking-widest pb-1 border-b-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-primary border-primary font-semibold'
                    : 'text-on-surface-variant border-transparent hover:text-primary'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Asymmetric Bento Grid */}
      <section className="min-h-[600px]">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const colSpan = getColSpanClass(index);
              const aspect = getAspectClass(index);
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.1 }}
                  className={`${colSpan} group cursor-pointer space-y-4`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Photo Container */}
                  <div className={`relative ${aspect} overflow-hidden bg-surface-container rounded-sm shadow-sm border border-outline-variant/10`}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03] grayscale-[10%] group-hover:grayscale-0"
                    />
                    
                    {/* Dark slide overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                      <div className="text-white transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="font-sans text-[9px] uppercase tracking-wider mb-1 block text-white/80">
                          Tocá para ver detalles
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl italic">{project.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between items-start px-1">
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl text-on-surface group-hover:text-primary transition-colors">
                        {project.name}
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant mt-1 font-light">
                        {project.category === 'residential' ? 'Residencial' : 'Comercial'} &bull; {project.location}
                      </p>
                    </div>
                    <div className="text-outline group-hover:text-primary group-hover:translate-x-1 transition-all mt-1">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. Empty State (safety) */}
      {filteredProjects.length === 0 && (
        <div className="py-24 text-center text-on-surface-variant font-light">
          No se encontraron proyectos en esta categoría.
        </div>
      )}

      {/* 4. Mini Call to Action */}
      <section className="mt-32">
        <div className="py-16 md:py-24 bg-surface-container rounded-lg px-8 text-center max-w-4xl mx-auto border border-outline-variant/20 shadow-sm">
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface mb-6">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Es hora de empezar a trabajar en el espacio que te merecés. Dejanos asesorarte y acompañarte en todo el camino del diseño.
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-block bg-cta text-on-cta font-sans text-xs font-bold uppercase tracking-widest py-4 px-10 rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Empezar un proyecto
          </button>
        </div>
      </section>

      {/* 5. Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-surface p-0 shadow-2xl z-10 border border-outline-variant/20 max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 shadow-md"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto w-full">
                {/* Visual Banner */}
                <div className="aspect-[16/9] w-full relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/80 block mb-1">
                      {selectedProject.category === 'residential' ? 'Proyecto Residencial' : 'Proyecto Comercial'}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl italic">{selectedProject.name}</h2>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-outline-variant/30 pb-6 text-xs font-sans text-on-surface-variant">
                    <div className="flex items-center gap-2.5">
                      <MapPin size={16} className="text-primary" />
                      <div>
                        <p className="text-on-surface-variant uppercase tracking-wider font-semibold text-[9px]">Ubicación</p>
                        <p className="text-on-surface font-medium">{selectedProject.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar size={16} className="text-primary" />
                      <div>
                        <p className="text-on-surface-variant uppercase tracking-wider font-semibold text-[9px]">Año</p>
                        <p className="text-on-surface font-medium">{selectedProject.year || '2025'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Layers size={16} className="text-primary" />
                      <div>
                        <p className="text-on-surface-variant uppercase tracking-wider font-semibold text-[9px]">Superficie</p>
                        <p className="text-on-surface font-medium">{selectedProject.size || 'N/D'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h4 className="font-serif text-lg text-on-surface flex items-center gap-2">
                      <Sparkles size={16} className="text-primary" /> Detalles del Proyecto
                    </h4>
                    <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* CTA inside modal */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-outline-variant/10">
                    <p className="font-sans text-xs text-on-surface-variant text-center sm:text-left">
                      ¿Te inspira este estilo para tu propio espacio?
                    </p>
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        onOpenBooking();
                      }}
                      className="bg-cta text-on-cta font-sans text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-sm hover:opacity-90 transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      Empezar diseño similar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
