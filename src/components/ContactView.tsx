/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Instagram, MapPin, Check, AlertCircle, Send } from 'lucide-react';
import { COMPANY_CONTACT, IMAGE_CONTACT } from '../data';
import { ContactMessage } from '../types';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    { value: 'residential', label: 'Residencial (Hogar)' },
    { value: 'commercial', label: 'Comercial (Oficina / Local)' },
    { value: 'asesoria', label: 'Asesoría Online (100% Remota)' },
    { value: 'other', label: 'Otra Consulta' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError('Por favor, completá todos los campos requeridos.');
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      message: formData.message,
      createdAt: new Date().toISOString()
    };

    // Save message to localStorage
    const existingMessages = JSON.parse(localStorage.getItem('fima_messages') || '[]');
    existingMessages.push(newMessage);
    localStorage.setItem('fima_messages', JSON.stringify(existingMessages));

    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      projectType: 'residential',
      message: ''
    });
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* 1. Header */}
      <section className="mb-16">
        <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-primary mb-3 block">
          Hablemos
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-on-surface tracking-tight leading-tight mb-4">
          Contanos tu proyecto
        </h1>
        <p className="font-sans text-base text-on-surface-variant font-light max-w-xl">
          Escribinos para despejar tus dudas, contarnos las ideas de tu espacio o pedir una cotización inicial personalizada.
        </p>
      </section>

      {/* 2. Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Form - 6 cols */}
        <div className="lg:col-span-6 bg-surface-container border border-outline-variant/10 p-8 sm:p-10 rounded-sm shadow-sm">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {error && (
                  <div className="flex items-center gap-2 rounded-sm bg-error-container p-3 text-xs text-on-error-container">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Nombre completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre..."
                    className="border-b border-outline py-2.5 font-body text-sm bg-transparent focus:outline-none focus:border-primary focus-visible:ring-0 transition-colors text-on-surface placeholder:text-outline"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Correo electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="hola@ejemplo.com"
                    className="border-b border-outline py-2.5 font-body text-sm bg-transparent focus:outline-none focus:border-primary focus-visible:ring-0 transition-colors text-on-surface placeholder:text-outline"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Tipo de consulta *</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="border-b border-outline py-2.5 font-body text-sm bg-transparent cursor-pointer focus:outline-none focus:border-primary focus-visible:ring-0 transition-colors text-on-surface"
                  >
                    {projectTypes.map(pt => (
                      <option key={pt.value} value={pt.value} className="text-on-surface bg-surface">
                        {pt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Tu Mensaje *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Contanos qué ambiente querés transformar y tus objetivos..."
                    rows={4}
                    className="border-b border-outline py-2.5 font-body text-sm bg-transparent resize-none focus:outline-none focus:border-primary focus-visible:ring-0 transition-colors text-on-surface placeholder:text-outline"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary font-sans text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-sm shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Enviar Mensaje
                  <Send size={14} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={28} />
                </div>
                <h3 className="font-serif text-2xl text-on-surface">Mensaje recibido</h3>
                <p className="font-sans text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed font-light">
                  Gracias por escribirnos. Nos ponemos en contacto con vos por correo en un lapso de 24 a 48 horas hábiles.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-sans text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 border-b border-primary pt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info & Side Image - 6 cols */}
        <div className="lg:col-span-6 space-y-10">
          
          {/* Quick contact methods card */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-on-surface font-light">Encontranos también acá</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans">
              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                className="flex items-start gap-3 p-4 border border-outline-variant/30 rounded-sm hover:border-primary transition-all group bg-surface-container-lowest"
              >
                <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-on-surface">Correo Electrónico</p>
                  <p className="text-on-surface-variant text-xs mt-0.5 max-w-[180px] break-all">{COMPANY_CONTACT.email}</p>
                </div>
              </a>

              <a
                href="https://instagram.com/fimastudio.interiores"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border border-outline-variant/30 rounded-sm hover:border-primary transition-all group bg-surface-container-lowest"
              >
                <Instagram size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-on-surface">Instagram</p>
                  <p className="text-on-surface-variant text-xs mt-0.5">{COMPANY_CONTACT.instagram}</p>
                </div>
              </a>

              <a
                href={COMPANY_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border border-outline-variant/30 rounded-sm hover:border-primary transition-all group bg-surface-container-lowest sm:col-span-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-primary mt-0.5 shrink-0"
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.043zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <div>
                  <p className="font-semibold text-on-surface flex items-center gap-1.5">
                    WhatsApp Directo <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </p>
                  <p className="text-on-surface-variant text-xs mt-0.5">Escribinos y te respondemos al instante.</p>
                </div>
              </a>
            </div>
          </div>

          {/* Styled Side Image */}
          <div className="aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] rounded-sm overflow-hidden bg-surface-container border border-outline-variant/10 shadow-sm relative group">
            <img
              src={IMAGE_CONTACT}
              alt="Fima Studio Contacto Decoración"
              className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all duration-300" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-outline-variant/20 text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
              <MapPin size={10} className="text-primary" /> {COMPANY_CONTACT.address}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
