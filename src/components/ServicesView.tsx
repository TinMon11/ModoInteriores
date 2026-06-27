/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, MessageSquare, HelpCircle } from 'lucide-react';
import { SERVICE_STEPS, SERVICE_ILLUSTRATIONS } from '../data';

interface ServicesViewProps {
  onOpenBooking: () => void;
}

export default function ServicesView({ onOpenBooking }: ServicesViewProps) {
  // Step 2 deliverables — all three shown at once
  const deliverables = [
    { id: 'distribution' as const, label: 'Plano de distribución', caption: 'Plano de Distribución', image: SERVICE_ILLUSTRATIONS.distribution },
    { id: 'materials' as const, label: 'Lista de materiales', caption: 'Lista de Materiales', image: SERVICE_ILLUSTRATIONS.materials },
    { id: 'renders' as const, label: 'Renders 3D realistas', caption: 'Renders', image: SERVICE_ILLUSTRATIONS.renders }
  ];

  const deliverableDescriptions = {
    distribution: 'Diseño y planificación inteligente de la distribución del espacio, ubicando estratégicamente el mobiliario y la decoración para maximizar la funcionalidad y garantizar una circulación fluida y cómoda en tu vida diaria.',
    materials: 'Una planilla excel o pdf de especificaciones técnicas con links directos de compra para sugerencias de texturas, paleta de colores de pintura, lámparas de iluminación, textiles y muebles adecuados para el ambiente y su uso diario.',
    renders: 'Imágenes tridimensionales fotorrealistas de alta calidad diseñadas con programas avanzados para que puedas visualizar con total precisión cómo quedará el espacio terminado antes de gastar un solo peso en obras o materiales.'
  };

  return (
    <div className="w-full pt-32 pb-24">
      {/* 1. Services Header */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-20 text-center">
        <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary mb-3 block">
          Metodología de Trabajo
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-on-surface tracking-tight max-w-3xl mx-auto leading-tight">
          Nuestros Servicios Online
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto mt-4 font-light leading-relaxed">
          Ofrecemos un servicio de interiorismo integral y 100% online, diseñado para transformar tu espacio estés donde estés. Nos encargamos de materializar tus ideas a través de un método claro, técnico y colaborativo.
        </p>
      </section>

      {/* 2. Steps Layout */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-32">
        
        {/* Step 01 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="font-serif text-5xl md:text-6xl text-primary font-light italic">
              {SERVICE_STEPS[0].number}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface leading-tight">
              {SERVICE_STEPS[0].title}
            </h2>
            <div className="h-0.5 w-16 bg-primary" />
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed font-light">
              {SERVICE_STEPS[0].description}
            </p>
            <div className="pt-2 flex items-center gap-3 text-sm text-primary font-medium">
              <Calendar size={18} />
              <span>Videollamada personalizada de 40 mins</span>
            </div>
          </div>
          
          <div className="lg:col-start-7 lg:col-span-6">
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-surface-container border border-outline-variant/10 shadow-sm">
              <img
                src={SERVICE_STEPS[0].image}
                alt="Videollamada de Diseño Fima Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Step 02 (The Technical Package — all three deliverables shown at once) */}
        <div className="space-y-10">
          <div className="max-w-3xl space-y-6">
            <div className="font-serif text-5xl md:text-6xl text-primary font-light italic">
              {SERVICE_STEPS[1].number}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface leading-tight">
              {SERVICE_STEPS[1].title}
            </h2>
            <div className="h-0.5 w-16 bg-primary" />
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed font-light">
              {SERVICE_STEPS[1].description}
            </p>
          </div>

          {/* Deliverable descriptions — three columns of text with bullet titles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {deliverables.map((item) => (
              <div key={item.id} className="space-y-2">
                <h3 className="flex items-center gap-2 font-sans text-sm font-bold text-on-surface">
                  <span className="text-primary text-[9px] leading-none">■</span>
                  {item.label}
                </h3>
                <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                  {deliverableDescriptions[item.id]}
                </p>
              </div>
            ))}
          </div>

          {/* Deliverable illustrations on soft beige backgrounds — staggered, no cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
            {deliverables.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-square flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-serif text-xl md:text-2xl text-on-surface text-center mt-1">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 03 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="font-serif text-5xl md:text-6xl text-primary font-light italic">
              {SERVICE_STEPS[2].number}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface leading-tight">
              {SERVICE_STEPS[2].title}
            </h2>
            <div className="h-0.5 w-16 bg-primary" />
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed font-light">
              {SERVICE_STEPS[2].description}
            </p>
            <div className="pt-2 flex items-center gap-3 text-sm text-primary font-medium">
              <MessageSquare size={18} />
              <span>Soporte continuo e ilimitado vía WhatsApp</span>
            </div>
          </div>
          
          <div className="lg:col-start-7 lg:col-span-6">
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-surface-container border border-outline-variant/10 shadow-sm">
              <img
                src={SERVICE_STEPS[2].image}
                alt="Acompañamiento Post-Diseño por WhatsApp"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </section>

      {/* 3. Final Book Call Callout */}
      <section className="bg-surface-container-high py-24 px-6 md:px-12 lg:px-16 w-full text-center mt-32 border-t border-outline-variant/10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-primary bg-primary/10 w-14 h-14 flex items-center justify-center rounded-full mx-auto">
            <HelpCircle size={28} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface leading-tight">
            ¿Cómo empezamos tu transformación?
          </h2>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed font-light">
            Todo comienza con una simple videollamada para analizar tus gustos y necesidades. Agendá un encuentro con nosotras para dar el primer paso hoy.
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-block bg-cta text-on-cta font-sans text-xs font-bold uppercase tracking-widest py-4 px-10 rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Agendar Videollamada Inicial
          </button>
        </div>
      </section>
    </div>
  );
}
