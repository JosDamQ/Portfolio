'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  Award, 
  Code2, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building,
  Clock
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { Experience, ExperienceSectionProps } from '@/lib/types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0); // First item expanded by default
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (startDate: Date, endDate?: Date) => {
    const start = startDate.toLocaleDateString('es-ES', { 
      month: 'short', 
      year: 'numeric' 
    });
    const end = endDate 
      ? endDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
      : 'Presente';
    return `${start} - ${end}`;
  };

  const calculateDuration = (startDate: Date, endDate?: Date) => {
    const end = endDate || new Date();
    const diffTime = Math.abs(end.getTime() - startDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    
    if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      if (months === 0) {
        return `${years} ${years === 1 ? 'año' : 'años'}`;
      }
      return `${years} ${years === 1 ? 'año' : 'años'} ${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
    >
      {/* Timeline Line */}
      <div 
        className="absolute left-6 top-16 w-0.5 bg-gradient-to-b from-primary-400 to-primary-200 dark:from-primary-500 dark:to-primary-700 h-full z-0" 
        style={{ display: isLast ? 'none' : 'block' }}
        aria-hidden="true"
      />
      
      {/* Timeline Dot */}
      <motion.div
        className={`absolute left-4 top-8 w-4 h-4 rounded-full border-4 z-10 transition-all duration-300 ${
          experience.current 
            ? 'bg-primary-500 border-primary-200 shadow-lg shadow-primary-500/50' 
            : isHovered
            ? 'bg-primary-400 border-primary-100 shadow-md shadow-primary-400/30'
            : 'bg-white dark:bg-secondary-800 border-primary-300 dark:border-primary-600'
        }`}
        animate={experience.current ? { 
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.7)',
            '0 0 0 10px rgba(59, 130, 246, 0)',
            '0 0 0 0 rgba(59, 130, 246, 0)'
          ]
        } : {}}
        transition={{ duration: 2, repeat: experience.current ? Infinity : 0 }}
        role="img"
        aria-label={experience.current ? 'Current position indicator' : 'Timeline position'}
      />

      {/* Experience Card */}
      <div className="ml-16">
        <Card 
          variant={experience.current ? "elevated" : "default"}
          hover={true}
          className={`transition-all duration-300 ${
            isHovered ? 'shadow-xl border-primary-300 dark:border-primary-600' : ''
          } ${
            experience.current ? 'ring-2 ring-primary-200 dark:ring-primary-700' : ''
          }`}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {experience.company}
                  </span>
                  {experience.current && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                      role="status"
                      aria-label="Current position"
                    >
                      Actual
                    </motion.span>
                  )}
                </div>
                
                <CardTitle className="text-xl mb-2">
                  {experience.position}
                </CardTitle>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600 dark:text-secondary-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span aria-label={`Employment period: ${formatDuration(experience.startDate, experience.endDate)}`}>
                      {formatDuration(experience.startDate, experience.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span aria-label={`Duration: ${calculateDuration(experience.startDate, experience.endDate)}`}>
                      {calculateDuration(experience.startDate, experience.endDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors focus-ring"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Collapse experience details' : 'Expand experience details'}
                aria-controls={`experience-details-${experience.id}`}
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-secondary-500" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-secondary-500" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-secondary-700 dark:text-secondary-300 mb-4 leading-relaxed">
              {experience.description}
            </p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id={`experience-details-${experience.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                  aria-label="Detailed experience information"
                >
                  {/* Achievements */}
                  {experience.achievements.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-5 h-5 text-accent-500" aria-hidden="true" />
                        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                          Logros Principales
                        </h4>
                      </div>
                      <ul className="space-y-2" role="list" aria-label="Key achievements">
                        {experience.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
                            role="listitem"
                          >
                            <div 
                              className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" 
                              aria-hidden="true"
                            />
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {experience.technologies.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-5 h-5 text-primary-500" aria-hidden="true" />
                        <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
                          Tecnologías Utilizadas
                        </h4>
                      </div>
                      <div 
                        className="flex flex-wrap gap-2"
                        role="list"
                        aria-label="Technologies used in this role"
                      >
                        {experience.technologies.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            className="px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-default focus-ring"
                            role="listitem"
                            tabIndex={0}
                            aria-label={`Technology: ${tech}`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

interface ExperienceStatsProps {
  experiences: Experience[];
}

function ExperienceStats({ experiences }: ExperienceStatsProps) {
  const totalExperience = () => {
    const startDate = new Date('2023-08-16'); // First professional experience
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return Math.round(diffYears * 10) / 10;
  };

  const totalCompanies = experiences.length;
  const currentRole = experiences.find(exp => exp.current);
  const allTechnologies = [...new Set(experiences.flatMap(exp => exp.technologies))];

  const stats = [
    {
      icon: Clock,
      label: 'Años de Experiencia',
      value: `${totalExperience()}+`,
      color: 'text-primary-500'
    },
    {
      icon: Building,
      label: 'Empresas',
      value: totalCompanies.toString(),
      color: 'text-accent-600'
    },
    {
      icon: Code2,
      label: 'Tecnologías',
      value: allTechnologies.length.toString(),
      color: 'text-secondary-600'
    },
    {
      icon: Award,
      label: 'Posición Actual',
      value: currentRole ? 'Full Stack Dev' : 'Disponible',
      color: 'text-accent-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-secondary-800 rounded-xl p-6 text-center shadow-sm border border-secondary-200 dark:border-secondary-700 hover:shadow-md transition-all duration-300"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-700 mb-3 ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-secondary-600 dark:text-secondary-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Experience({ experiences }: ExperienceSectionProps) {
  // Sort experiences in chronological order (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => 
    b.startDate.getTime() - a.startDate.getTime()
  );

  return (
    <section 
      id="experience" 
      className="py-20 bg-white dark:bg-secondary-800"
      aria-label="Professional work experience and career history"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-primary-500" aria-hidden="true" />
            <span className="text-primary-500 font-medium uppercase tracking-wider text-sm">
              Trayectoria Profesional
            </span>
          </div>
          <h2 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Experiencia Laboral
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Más de 3 años de experiencia profesional en desarrollo web/app, 
            desde prácticas hasta roles de liderazgo técnico.
          </p>
        </motion.div>

        {/* Experience Statistics */}
        <ExperienceStats experiences={experiences} />

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div 
            className="space-y-8"
            role="list"
            aria-label="Professional experience timeline"
          >
            {sortedExperiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isLast={index === sortedExperiences.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card variant="glass" className="p-8 max-w-2xl mx-auto">
            <CardContent>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  ¿Interesado en colaborar?
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Siempre abierto a nuevas oportunidades y desafíos
                </p>
              </div>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors mt-6 focus-ring"
                style={{ color: 'white !important' }}
                aria-label="Go to contact section to get in touch"
              >
                Contactar
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
