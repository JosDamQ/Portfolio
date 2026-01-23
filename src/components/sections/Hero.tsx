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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-6"
      role="banner"
      aria-label="Hero section - Introduction and overview"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-purple-dark" aria-hidden="true">
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
          aria-hidden="true"
        />
        
        {/* Floating particles */}
        <ParticleField />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {/* Avatar - Más pequeño y minimalista */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden border-3 border-white/40 shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={personalInfo.avatar}
                alt={`${personalInfo.name} - Avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.style.background = 'var(--gradient-primary)';
                }}
              />
            </motion.div>
            
            {/* Floating ring animation - más sutil */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Name with typewriter animation */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2">
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
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-primary-200">
            <AnimatedText
              text={personalInfo.title}
              speed={5}
              delay={100}
              showCursor={true}
              cursorChar="_"
            />
          </h2>
        </motion.div>

        {/* Tagline inspiracional */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Transformando ideas en experiencias digitales excepcionales
          </p>
        </motion.div>

        {/* Social Links - Más prominentes */}
        <motion.div
          className="flex justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          role="group"
          aria-label="Redes sociales"
        >
          <motion.a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full glass-button hover:scale-110 transition-all duration-300"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Visitar mi perfil de GitHub"
          >
            <Github className="w-7 h-7" aria-hidden="true" />
          </motion.a>
          
          <motion.a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full glass-button hover:scale-110 transition-all duration-300"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Conectar en LinkedIn"
          >
            <Linkedin className="w-7 h-7" aria-hidden="true" />
          </motion.a>
          
          <motion.a
            href={`mailto:${contactInfo.email}`}
            className="p-4 rounded-full glass-button hover:scale-110 transition-all duration-300"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Enviar email a ${contactInfo.email}`}
          >
            <Mail className="w-7 h-7" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" aria-hidden="true" />
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