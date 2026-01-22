'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AnimatedText, FadeInText } from '@/components/ui/AnimatedText';
import { PersonalInfo, ContactInfo } from '@/lib/types';

interface HeroProps {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  onScrollToSection: (section: string) => void;
}

export function Hero({ personalInfo, contactInfo, onScrollToSection }: HeroProps) {
  const scrollToProjects = () => {
    onScrollToSection('projects');
  };

  const scrollToContact = () => {
    onScrollToSection('contact');
  };

  const handleResumeDownload = () => {
    window.open(personalInfo.resumeUrl, '_blank');
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-purple-dark">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating particles */}
        <ParticleField />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-responsive text-center text-white pt-16 lg:pt-20 min-h-screen flex flex-col justify-center">
        <div className="py-8">
        {/* Avatar */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a gradient background if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.style.background = 'var(--gradient-primary)';
                }}
              />
            </motion.div>
            
            {/* Floating ring animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* Name with typewriter animation */}
        <motion.div
          className="mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight">
            <AnimatedText
              text={personalInfo.name}
              className="gradient-text"
              speed={20}
              delay={100}
              showCursor={false}
            />
          </h1>
        </motion.div>

        {/* Title with typewriter animation */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-primary-200 leading-relaxed">
            <AnimatedText
              text={personalInfo.title}
              speed={5}
              delay={100}
              showCursor={true}
              cursorChar="_"
            />
          </h2>
        </motion.div>

        {/* Summary with fade-in animation */}
        <motion.div
          className="mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-base sm:text-lg md:text-xl text-secondary-200 leading-relaxed">
            <FadeInText
              text={personalInfo.summary}
              delay={900}
              staggerDelay={0.005}
            />
          </p>
        </motion.div>

        {/* Location */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <p className="text-secondary-300 text-sm sm:text-base">
            📍 {personalInfo.location}
          </p>
        </motion.div>

        {/* Call-to-action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToProjects}
            className="group w-full sm:w-auto"
            leftIcon={
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Github className="w-5 h-5" />
              </motion.div>
            }
          >
            Ver Proyectos
          </Button>
          
          <Button
            variant="glass"
            size="lg"
            onClick={handleResumeDownload}
            className="group w-full sm:w-auto"
            leftIcon={
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <Download className="w-5 h-5" />
              </motion.div>
            }
          >
            Descargar CV
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToContact}
            className="group border-white/30 text-white hover:bg-white hover:text-primary-900 w-full sm:w-auto"
            leftIcon={
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="w-5 h-5" />
              </motion.div>
            }
          >
            Contactar
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] min-w-[48px] rounded-full glass-button hover:scale-110 transition-all duration-300 flex items-center justify-center"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
          
          <motion.a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] min-w-[48px] rounded-full glass-button hover:scale-110 transition-all duration-300 flex items-center justify-center"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
          
          <motion.a
            href={`mailto:${contactInfo.email}`}
            className="min-h-[48px] min-w-[48px] rounded-full glass-button hover:scale-110 transition-all duration-300 flex items-center justify-center"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.button
            className="flex flex-col items-center min-h-[44px] group focus-ring rounded-lg"
            onClick={() => onScrollToSection('about')}
            whileHover={{ y: -2 }}
            aria-label="Scroll to about section"
          >
            <span className="text-xs sm:text-sm text-secondary-400 mb-2 sm:mb-3 group-hover:text-white transition-colors">
              Scroll para explorar
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 group-hover:text-white transition-colors" />
            </motion.div>
          </motion.button>
        </motion.div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </section>
  );
}

// Client-side only particle field to avoid hydration issues
function ParticleField() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side using a timeout to avoid setState in effect
    const timer = setTimeout(() => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) {
    return null; // Don't render anything during SSR
  }

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}