'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ContactInfo, ContactFormData, ContactFormErrors } from '@/lib/types';

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
}

export interface ContactSectionProps {
  contactInfo: ContactInfo;
  onFormSubmit?: (data: ContactFormData) => Promise<void>;
}

// Form validation utilities
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'El email es requerido';
  if (!emailRegex.test(email)) return 'Por favor ingresa un email válido';
  return null;
};

const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) return `${fieldName} es requerido`;
  return null;
};

const validateMessage = (message: string): string | null => {
  if (!message.trim()) return 'El mensaje es requerido';
  if (message.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
  return null;
};

export function Contact({ contactInfo, onFormSubmit }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Auto-hide success/error messages after 5 seconds
  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Real-time validation
  const validateField = (name: keyof ContactFormData, value: string) => {
    let error: string | null = null;

    switch (name) {
      case 'name':
        error = validateRequired(value, 'Name');
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'subject':
        error = validateRequired(value, 'Subject');
        break;
      case 'message':
        error = validateMessage(value);
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error === null;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (name: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear submit status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }

    // Validate field if it has been touched (has an error or has content)
    if (errors[name] || value.trim()) {
      validateField(name, value);
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};
    let isValid = true;

    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      const fieldName = key as keyof ContactFormData;
      let error: string | null = null;

      switch (fieldName) {
        case 'name':
          error = validateRequired(value, 'El nombre');
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'subject':
          error = validateRequired(value, 'El asunto');
          break;
        case 'message':
          error = validateMessage(value);
          break;
      }

      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onFormSubmit) {
        await onFormSubmit(formData);
      } else {
        // Use EmailJS for free email sending
        console.log('Enviando email con EmailJS...');
        console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
        console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
        console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
        console.log('Form data:', formData);

        const result = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'default_service',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'default_template',
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'jq21880dam@gmail.com', // Tu email
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'default_key'
        );

        console.log('EmailJS result:', result);
      }

      setSubmitStatus('success');
      setSubmitMessage('¡Gracias por tu mensaje! Te responderé pronto.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setSubmitMessage('Lo siento, hubo un error enviando tu mensaje. Por favor intenta de nuevo o contáctame directamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Ver Perfil',
      href: contactInfo.github,
      color: 'text-gray-700 dark:text-gray-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Conectar',
      href: contactInfo.linkedin,
      color: 'text-blue-700 dark:text-blue-400'
    },
    ...(contactInfo.twitter ? [{
      icon: Twitter,
      label: 'Twitter',
      value: 'Seguir',
      href: contactInfo.twitter,
      color: 'text-sky-600 dark:text-sky-400'
    }] : [])
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Trabajemos Juntos
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            ¿Listo para dar vida a tus ideas? Siempre estoy abierto a discutir nuevas oportunidades y proyectos emocionantes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card variant="glass" padding="lg" className="h-full">
              <h3 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
                Envíame un mensaje
              </h3>

              {/* Submit Status Messages */}
              {submitStatus !== 'idle' && (
                <motion.div
                  className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                      : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitMessage}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus-ring ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 dark:border-red-600'
                        : 'border-secondary-300 focus:border-primary-500 dark:border-secondary-600 dark:focus:border-primary-400'
                    } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400`}
                    placeholder="Tu nombre completo"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 dark:text-red-400"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus-ring ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 dark:border-red-600'
                        : 'border-secondary-300 focus:border-primary-500 dark:border-secondary-600 dark:focus:border-primary-400'
                    } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400`}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 dark:text-red-400"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus-ring ${
                      errors.subject
                        ? 'border-red-300 focus:border-red-500 dark:border-red-600'
                        : 'border-secondary-300 focus:border-primary-500 dark:border-secondary-600 dark:focus:border-primary-400'
                    } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400`}
                    placeholder="¿De qué se trata?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 dark:text-red-400"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus-ring resize-none ${
                      errors.message
                        ? 'border-red-300 focus:border-red-500 dark:border-red-600'
                        : 'border-secondary-300 focus:border-primary-500 dark:border-secondary-600 dark:focus:border-primary-400'
                    } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400`}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <motion.p
                      className="mt-2 text-sm text-red-600 dark:text-red-400"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full"
                  rightIcon={!isSubmitting ? <Send className="w-5 h-5" /> : undefined}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Methods */}
            <Card variant="glass" padding="lg">
              <h3 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
                Ponte en contacto
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-8">
                ¿Prefieres un enfoque más directo? No dudes en contactarme a través de cualquiera de estos canales.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/50 dark:bg-secondary-800/50 hover:bg-white/80 dark:hover:bg-secondary-700/80 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`p-3 rounded-lg bg-white dark:bg-secondary-800 shadow-sm group-hover:shadow-md transition-shadow ${method.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-secondary-900 dark:text-secondary-100">
                          {method.label}
                        </h4>
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                          {method.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </Card>

            {/* Availability Status */}
            <Card variant="glass" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                  Disponible para Trabajar
                </h3>
              </div>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                Actualmente estoy abierto a nuevas oportunidades y proyectos emocionantes. Ya sea que busques un desarrollador full-time o necesites ayuda con un proyecto específico, me encantaría escucharte.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
                  Tiempo completo
                </span>
                <span className="px-3 py-1 text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
                  Contrato
                </span>
                <span className="px-3 py-1 text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
                  Consultoría
                </span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}