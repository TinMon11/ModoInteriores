/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, Check, Sparkles, AlertCircle } from 'lucide-react';
import { submitToWeb3Forms } from '../web3forms';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    date: '',
    time: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  // Honeypot: hidden field real users never fill. Bots do.
  const [botField, setBotField] = useState('');

  const timeSlots = [
    '09:00', '10:30', '14:00', '15:30', '17:00'
  ];

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

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.projectType) {
        setError('Por favor completá todos los campos requeridos.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.date || !formData.time) {
        setError('Por favor seleccioná una fecha y horario para la videollamada.');
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Honeypot tripped — silently drop the bot submission.
    if (botField) return;

    setIsSending(true);
    setError('');

    const projectTypeLabel =
      projectTypes.find(pt => pt.value === formData.projectType)?.label ?? formData.projectType;

    try {
      await submitToWeb3Forms({
        subject: `Nueva cita de ${formData.name} — Fima Studio`,
        from_name: 'Fima Studio Web',
        name: formData.name,
        email: formData.email,
        'Tipo de proyecto': projectTypeLabel,
        'Fecha solicitada': formData.date,
        'Horario': `${formData.time} hs`,
        message: formData.message || '(sin comentarios)',
      });

      setStep(3); // Show success step
    } catch {
      setError('No pudimos agendar tu cita. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setIsSending(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      projectType: 'residential',
      date: '',
      time: '',
      message: ''
    });
    setError('');
    onClose();
  };

  // Generate next 7 days for quick picking (excluding Sunday)
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      // 0 is Sunday
      if (nextDate.getDay() !== 0) {
        days.push(nextDate);
      }
      if (days.length >= 6) break;
    }
    return days;
  };

  const availableDays = getNextDays();

  const formatDateLabel = (date: Date) => {
    const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const dayName = daysOfWeek[date.getDay() - 1] || 'Sáb';
    return {
      dayName,
      dayNum: date.getDate(),
      monthStr: months[date.getMonth()],
      isoString: date.toISOString().split('T')[0]
    };
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

            {/* Step Indicators */}
            {step < 3 && (
              <div className="mb-6 flex items-center gap-2">
                <span className={`h-1.5 w-8 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-primary' : 'bg-outline-variant/30'}`} />
                <span className={`h-1.5 w-8 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary' : 'bg-outline-variant/30'}`} />
                <span className="h-1.5 w-8 rounded-full bg-outline-variant/30" />
              </div>
            )}

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
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Agendemos un encuentro</h3>
                <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Contanos un poco sobre vos y el tipo de proyecto para preparar la llamada inicial.
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
                    <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant">Correo electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="hola@ejemplo.com"
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
                    onClick={nextStep}
                    className="bg-cta text-on-cta font-label-caps text-xs uppercase tracking-widest py-3.5 px-8 rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Siguiente
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time Select */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Seleccioná Fecha y Hora</h3>
                <p className="font-body-md text-on-surface-variant text-sm mb-6 leading-relaxed">
                  Las reuniones se realizan mediante videollamada de Google Meet (duración: 40 minutos).
                </p>

                <div className="space-y-6">
                  {/* Date Grid picker */}
                  <div className="flex flex-col gap-3">
                    <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                      <CalendarIcon size={12} /> Seleccioná un día
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {availableDays.map((date, idx) => {
                        const info = formatDateLabel(date);
                        const isSelected = formData.date === info.isoString;
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setFormData(prev => ({ ...prev, date: info.isoString }))}
                            className={`flex flex-col items-center justify-center p-2.5 rounded-sm border transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                              isSelected
                                ? 'bg-primary border-primary text-on-primary shadow-sm'
                                : 'border-outline-variant/50 hover:border-primary/50 text-on-surface bg-surface-container-lowest'
                            }`}
                          >
                            <span className={`text-[10px] font-medium uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>
                              {info.dayName}
                            </span>
                            <span className="text-lg font-semibold my-0.5">
                              {info.dayNum}
                            </span>
                            <span className={`text-[9px] uppercase tracking-widest ${isSelected ? 'text-white/85' : 'text-outline'}`}>
                              {info.monthStr}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time list picker */}
                  <div className="flex flex-col gap-3">
                    <label className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                      <Clock size={12} /> Horarios Disponibles (Hora local)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((time, idx) => {
                        const isSelected = formData.time === time;
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setFormData(prev => ({ ...prev, time }))}
                            className={`px-4 py-2 text-xs font-semibold rounded-sm border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                              isSelected
                                ? 'bg-primary border-primary text-on-primary'
                                : 'border-outline-variant/50 hover:border-primary/50 text-on-surface bg-surface-container-lowest'
                            }`}
                          >
                            {time} hs
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between gap-4">
                  <button
                    onClick={() => setStep(1)}
                    disabled={isSending}
                    className="border border-outline-variant text-on-surface-variant font-label-caps text-xs uppercase tracking-widest py-3.5 px-6 rounded-sm hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={isSending}
                    className="bg-cta text-on-cta font-label-caps text-xs uppercase tracking-widest py-3.5 px-8 rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Agendando...' : 'Confirmar y agendar'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success message */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check size={32} />
                </div>
                <h3 className="font-headline-md text-2xl text-on-surface mb-2">Cita agendada</h3>
                <p className="font-body-md text-on-surface-variant text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                  Gracias, {formData.name}. Reservamos tu videollamada para el{' '}
                  <span className="font-semibold text-primary">
                    {formData.date.split('-').reverse().join('/')}
                  </span>{' '}
                  a las <span className="font-semibold text-primary">{formData.time} hs</span>.
                </p>

                <div className="text-left rounded-sm bg-surface-container p-5 max-w-md mx-auto mb-8 border border-outline-variant/30 text-xs text-on-surface-variant leading-relaxed space-y-3">
                  <p className="font-semibold text-on-surface flex items-center gap-1.5 text-sm">
                    <Sparkles size={14} className="text-primary" /> ¿Qué sigue ahora?
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>Te enviaremos un correo electrónico con el enlace de <b>Google Meet</b> y la confirmación.</li>
                    <li>
                      Para aprovechar al máximo el encuentro, tené a mano fotos del espacio en cuestión y algunas referencias que te inspiren.
                    </li>
                    <li>Majo &amp; Fiore van a estar listas para conocerte y charlar sobre tu casa ideal.</li>
                  </ul>
                </div>

                <button
                  onClick={resetModal}
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-widest py-3.5 px-10 rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Entendido, cerrar
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
