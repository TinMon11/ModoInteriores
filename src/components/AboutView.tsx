/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Compass, Heart, Users } from 'lucide-react';
import { FOUNDERS, IMAGE_ABOUT } from '../data';

export default function AboutView() {
  const values = [
    {
      icon: Heart,
      title: 'Empatía Humana',
      description: 'Creemos que diseñar un hogar es adentrarse en la vida de las personas. Escuchamos de verdad tus necesidades cotidianas para ofrecer respuestas que resuenen contigo.'
    },
    {
      icon: Compass,
      title: 'Diseño Funcional',
      description: 'El diseño no es solo decoración, es resolución de problemas. Integramos funcionalidad y orden estético para que cada ambiente se disfrute plenamente en el día a día.'
    },
    {
      icon: Sparkles,
      title: 'Rigurosidad Técnica',
      description: 'Planificamos planos milimétricos, sugerencias viables y renders realistas para asegurarnos de que la ejecución posterior por tus proveedores sea exacta y sin sorpresas.'
    }
  ];

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* 1. Intro Segment */}
      <section className="mb-20">
        <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary mb-3 block">
          Sobre Nosotras
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-on-surface tracking-tight leading-tight">
          {FOUNDERS.title}
        </h1>
      </section>

      {/* 2. Biographies & Photo Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Texts - 6 cols */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl italic text-primary font-normal">
              {FOUNDERS.headline}
            </h2>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed font-light">
              {FOUNDERS.bio}
            </p>
            <p className="font-sans text-base text-on-surface-variant leading-relaxed font-light">
              {FOUNDERS.extendedBio}
            </p>
          </div>

          {/* Large Quote Block */}
          <div className="bg-surface-container border-l-4 border-primary p-6 rounded-r-sm italic font-serif text-lg text-on-surface leading-relaxed relative">
            &ldquo;{FOUNDERS.quote}&rdquo;
          </div>
        </div>

        {/* Dynamic Image - 6 cols */}
        <div className="lg:col-span-6">
          <div className="aspect-[4/5] rounded-sm overflow-hidden bg-surface-container border border-outline-variant/10 shadow-lg relative group">
            <img
              src={IMAGE_ABOUT}
              alt="Majo & Fiore de Fima Studio"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all duration-300" />
            <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-4 border border-outline-variant/20 rounded-sm">
              <p className="font-serif text-lg text-on-surface text-center">
                Majo &amp; Fiore
              </p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant text-center mt-1">
                Fundadoras &amp; Diseñadoras de Fima Studio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="mt-32">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary mb-3 block">
            Nuestros Pilares
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface">
            Filosofía de Trabajo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest border border-outline-variant/10 p-8 rounded-sm hover:border-primary/30 transition-colors group"
              >
                <div className="text-primary bg-primary/10 w-12 h-12 flex items-center justify-center rounded-sm mb-6 group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-xl text-on-surface mb-3">
                  {v.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-light">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
