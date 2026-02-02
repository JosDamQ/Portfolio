'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, MapPin, Award, Mail } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { PersonalInfo } from '@/lib/types';
import { getTotalExperienceYears } from '@/lib/data/experience';
import { useEffect, useState } from 'react';

export interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export function About({ personalInfo }: AboutSectionProps) {
  const [mounted, setMounted] = useState(false);
  const totalExperience = getTotalExperienceYears();

  useEffect(() => {
    // Use a timeout to avoid setState in effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  // Prevent hydration mismatch by not rendering animations until mounted
  if (!mounted) {
    return (
      <section id="about" className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 gradient-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professional Photo */}
            <div className="relative">
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-20"></div>
                
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                  <Image
                    src={personalInfo.avatar}
                    alt={`${personalInfo.name} - Professional Photo`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 320px, 384px"
                    priority
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 gradient-accent rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-green rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {personalInfo.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {personalInfo.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card variant="glass" padding="md" hover>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {totalExperience}+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Años de Experiencia
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="md" hover>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        25+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Proyectos Completados
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-lg">{personalInfo.location}</span>
              </div>

              <Card variant="elevated" padding="lg">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Experiencia Profesional
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Con más de <strong className="text-primary-600 dark:text-primary-400">
                          {totalExperience} años de experiencia profesional en desarrollo
                        </strong>, he contribuido exitosamente en la entrega de aplicaciones web escalables 
                        y participado en iniciativas técnicas que impulsan el crecimiento del negocio.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                          Programador Full Stack
                        </span>
                        <span className="px-3 py-1 bg-accent-500/10 text-accent-500 rounded-full text-sm font-medium">
                          Team Leadership
                        </span>
                        <span className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-sm font-medium">
                          Optimización de rendimiento
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="primary"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
                className="w-full sm:w-auto"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = personalInfo.resumeUrl;
                  link.download = `${personalInfo.name.replace(' ', '_')}_Resume.pdf`;
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="about" 
      className="py-12 sm:py-16 lg:py-20 spacing-responsive-md bg-white dark:bg-gray-800"
      aria-label="About me - Professional background and experience"
    >
      <div className="container-responsive">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-6 h-6 text-primary-500" aria-hidden="true" />
              <span className="text-primary-500 font-medium uppercase tracking-wider text-sm">
                Conoce al Desarrollador
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Sobre Mí
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Desarrollador Full Stack apasionado por crear soluciones digitales 
              que marquen la diferencia en la experiencia del usuario.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Professional Photo */}
            <motion.div variants={imageVariants} className="relative order-2 lg:order-1">
              <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Background decoration */}
                <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-20 animate-pulse-glow" aria-hidden="true"></div>
                
                {/* Main image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                  <Image
                    src={personalInfo.avatar}
                    alt={`${personalInfo.name} - Professional portrait showing a confident developer`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true"></div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 gradient-accent rounded-full flex items-center justify-center shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                >
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-accent-green rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                >
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              {/* Mi Historia */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Mi Historia
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {personalInfo.summary}
                </p>
                
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Mi pasión por la tecnología comenzó temprano, y desde entonces he estado 
                  comprometido con el aprendizaje continuo y la mejora de mis habilidades. 
                  Disfruto trabajando en equipos colaborativos donde puedo contribuir tanto 
                  técnicamente como en la toma de decisiones estratégicas.
                </p>
              </div>

              {/* Key Stats - Más detalladas */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4" role="group" aria-label="Estadísticas profesionales">
                <Card variant="glass" padding="md" hover>
                  <CardContent>
                    <div className="text-center">
                      <div 
                        className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2"
                        aria-label={`${totalExperience} años de experiencia`}
                      >
                        {totalExperience}+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Años de Experiencia
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="md" hover>
                  <CardContent>
                    <div className="text-center">
                      <div 
                        className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2"
                        aria-label="25 proyectos completados"
                      >
                        25+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Proyectos Completados
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lo que me Motiva */}
              <Card variant="elevated" padding="lg">
                <CardContent>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0"
                      role="img"
                      aria-label="Icono de motivación"
                    >
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Lo que me Motiva
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                        Me apasiona <strong className="text-primary-600 dark:text-primary-400">
                          resolver problemas complejos con soluciones elegantes
                        </strong>. Cada proyecto es una oportunidad para aprender algo nuevo 
                        y crear algo que realmente impacte positivamente en la vida de las personas.
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2" role="list" aria-label="Valores profesionales">
                        <span 
                          className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium"
                          role="listitem"
                        >
                          Código Limpio
                        </span>
                        <span 
                          className="px-2 sm:px-3 py-1 bg-accent-500/10 text-accent-500 rounded-full text-xs sm:text-sm font-medium"
                          role="listitem"
                        >
                          Innovación
                        </span>
                        <span 
                          className="px-2 sm:px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-xs sm:text-sm font-medium"
                          role="listitem"
                        >
                          Colaboración
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ubicación */}
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-base sm:text-lg" aria-label={`Ubicado en ${personalInfo.location}`}>
                  {personalInfo.location}
                </span>
              </div>

              {/* Solo CV - Acción principal */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Download className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />}
                  className="w-full sm:w-auto min-h-[48px]"
                  aria-label={`Descargar CV de ${personalInfo.name} en PDF`}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = personalInfo.resumeUrl;
                    link.download = `${personalInfo.name.replace(' ', '_')}_Resume.pdf`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Descargar CV
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
