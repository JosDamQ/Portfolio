'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, MapPin, Calendar, Award } from 'lucide-react';
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
                  <Calendar className="w-6 h-6 text-white" />
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
                        Years Experience
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="md" hover>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        50+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Projects Completed
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
                        Professional Experience
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        With over <strong className="text-primary-600 dark:text-primary-400">
                          {totalExperience} years of professional development experience
                        </strong>, I have successfully delivered scalable web applications 
                        and led technical initiatives that drive business growth.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                          Full Stack Development
                        </span>
                        <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full text-sm font-medium">
                          Team Leadership
                        </span>
                        <span className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-sm font-medium">
                          Performance Optimization
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
    <section id="about" className="py-20 px-6 bg-white dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 gradient-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professional Photo */}
            <motion.div variants={imageVariants} className="relative">
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Background decoration */}
                <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-20 animate-pulse-glow"></div>
                
                {/* Main image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                  <Image
                    src={personalInfo.avatar}
                    alt={`${personalInfo.name} - Professional Photo`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 320px, 384px"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 gradient-accent rounded-full flex items-center justify-center shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-green rounded-full flex items-center justify-center shadow-lg"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Calendar className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Professional Summary */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {personalInfo.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {personalInfo.summary}
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card variant="glass" padding="md" hover>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {totalExperience}+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Years Experience
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="md" hover>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        50+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Projects Completed
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-lg">{personalInfo.location}</span>
              </div>

              {/* Experience Highlight */}
              <Card variant="elevated" padding="lg">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Professional Experience
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        With over <strong className="text-primary-600 dark:text-primary-400">
                          {totalExperience} years of professional development experience
                        </strong>, I have successfully delivered scalable web applications 
                        and led technical initiatives that drive business growth.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                          Full Stack Development
                        </span>
                        <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full text-sm font-medium">
                          Team Leadership
                        </span>
                        <span className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-sm font-medium">
                          Performance Optimization
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resume Download */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Download className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                  onClick={() => {
                    // Create a temporary link to download the resume
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
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}