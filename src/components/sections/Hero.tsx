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
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Innovador', 'Creativo', 'Estratégico', 'Solucionador de Problemas'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
      <div className="relative z-10 container mx-auto px-6 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Intro Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-primary-300 text-lg font-medium tracking-wide">
                DESARROLLADOR FULL STACK
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            {/* Dynamic Role */}
            <motion.div
              className="text-2xl md:text-4xl font-semibold text-primary-200 h-16 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.span
                key={currentWord}
                className="text-accent-purple"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {words[currentWord]}
              </motion.span>
            </motion.div>

            {/* Mission Statement */}
            <motion.p
              className="text-xl text-white/90 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Especializado en crear soluciones web que combinan 
              <span className="text-accent-purple font-semibold"> funcionalidad</span>,
              <span className="text-primary-300 font-semibold"> diseño</span> y
              <span className="text-accent-green font-semibold"> experiencia de usuario</span>.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="flex gap-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-purple">3+</div>
                <div className="text-sm text-white/70">Años</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-300">25+</div>
                <div className="text-sm text-white/70">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-green">∞</div>
                <div className="text-sm text-white/70">Ideas</div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              role="group"
              aria-label="Redes sociales"
            >
              <motion.a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass-button hover:scale-110 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass-button hover:scale-110 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              
              <motion.a
                href={`mailto:${contactInfo.email}`}
                className="p-3 rounded-lg glass-button hover:scale-110 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Code Window Mockup */}
            <div className="relative w-full max-w-md">
              {/* Window Frame */}
              <div className="bg-gray-900/90 rounded-lg shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 text-sm ml-4">portfolio.tsx</div>
                </div>
                
                {/* Code Content */}
                <div className="p-4 font-mono text-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    <div className="text-purple-400">const</div>
                    <div className="text-blue-400 ml-2">developer</div>
                    <div className="text-white ml-2">= {`{`}</div>
                    <div className="ml-4">
                      <div className="text-green-400">name: <span className="text-yellow-300">"{personalInfo.name}"</span>,</div>
                      <div className="text-green-400">skills: <span className="text-yellow-300">["React", "Node.js", "TypeScript"]</span>,</div>
                      <div className="text-green-400">passion: <span className="text-yellow-300">"Crear experiencias increíbles"</span>,</div>
                      <div className="text-green-400">status: <span className="text-yellow-300">"Disponible"</span></div>
                    </div>
                    <div className="text-white">{`}`}</div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="text-white font-bold text-xl">⚡</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-accent-green to-primary-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <span className="text-white font-bold">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <motion.button
            onClick={() => onScrollToSection('about')}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll para ver más"
          >
            <span className="text-sm">Descubre más</span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
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