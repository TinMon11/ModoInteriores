/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, AlertCircle } from 'lucide-react';
import { COMPANY_CONTACT } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [formData, setFormData] = useState({
    name: '',
    projectType: 'residential',
    message: ''
  });
  const [error, setError] = useState('');
  // Honeypot: hidden field real users never fill. Bots do.
  const [botField, setBotField] = useState('');

  const projectTypes = [
    { value: 'residential', label: 'Residencial (Hogar)' },
    { value: 'commercial', label: 'Comercial (Oficina / Local)' },
    { value: 'asesoria', label: 'Asesoría Online (100% Remota)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = () => {
    if (!formData.name) {
      setError('Por favor completá tu nombre.');
      return;
    }

    // Honeypot tripped — silently drop the bot submission.
    if (botField) return;

    const projectTypeLabel =
      projectTypes.find(pt => pt.value === formData.projectType)?.label ?? formData.projectType;

    const text =
      `Hola, soy ${formData.name}.\n` +
      `Tipo de proyecto: ${projectTypeLabel}` +
      (formData.message ? `\n\n${formData.message}` : '');

    const whatsappUrl = `https://wa.me/${COMPANY_CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setStep(2); // Show success step
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      name: '',
      projectType: 'residential',
      message: ''
    });
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
            className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-xl overflow-hidden rounded-lg bg-surface p-6 shadow-2xl md:p-8 border border-outline-variant/20 z-10"
          >
            {/* Close Button */}
            <button
              onClick={resetModal}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-sm bg-error-container p-3 text-sm text-on-error-container">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Step 1: Client Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Hablemos de tu proyecto</h3>
                <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Contanos sobre vos y tu proyecto, y seguimos la charla por WhatsApp.
                </p>

                <div className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Nombre completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre..."
                      className="border-b border-outline py-2 font-body text-sm bg-transparent focus:outline-none focus:border-primary focus-visible:ring-0 transition-colors placeholder:text-outline"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Tipo de proyecto *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="border-b border-outline py-2 font-body text-sm bg-transparent cursor-pointer focus:outline-none focus:border-primary focus-visible:ring-0 transition-colors"
                    >
                      {projectTypes.map(pt => (
                        <option key={pt.value} value={pt.value} className="text-on-surface bg-surface">
                          {pt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Comentarios adicionales (opcional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Contanos un poco sobre las ideas que tenés en mente..."
                      rows={3}
                      className="border-b border-outline py-2 font-body text-sm bg-transparent resize-none focus:outline-none focus:border-primary focus-visible:ring-0 transition-colors placeholder:text-outline"
                    />
                  </div>
                </div>

                {/* Honeypot — hidden from real users, catches bots */}
                <input
                  type="text"
                  name="botcheck"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-whatsapp text-white font-label-caps text-xs uppercase tracking-widest py-3.5 px-8 rounded-sm hover:opacity-90 transition-opacity flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Enviar por WhatsApp
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.043zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Success message */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check size={32} />
                </div>
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Te abrimos WhatsApp</h3>
                <p className="font-body-md text-on-surface-variant text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                  Se abrió WhatsApp con tu mensaje listo para enviar. Si no se abrió solo, escribinos directo y te respondemos enseguida.
                </p>

                <button
                  onClick={resetModal}
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-widest py-3.5 px-10 rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Cerrar
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
