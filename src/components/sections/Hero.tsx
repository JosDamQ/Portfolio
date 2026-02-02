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
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-900 to-accent-600" aria-hidden="true">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(45deg, #3f6254, #c2a36b, #8c5b4f, #3f6254)',
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
                className="text-accent-500"
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
              <span className="text-accent-500 font-semibold"> funcionalidad</span>,
              <span className="text-primary-300 font-semibold"> diseño</span> y
              <span className="text-accent-600 font-semibold"> experiencia de usuario</span>.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="flex gap-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-500">3+</div>
                <div className="text-sm text-white/70">Años</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-300">25+</div>
                <div className="text-sm text-white/70">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">∞</div>
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

          {/* Right Side - Tetris Game */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Tetris Game Container */}
            <div className="relative w-full max-w-md flex items-center justify-center">
              {/* Tetris Board */}
              <div 
                className="relative bg-secondary-900 border-4 border-secondary-700 rounded-lg overflow-hidden"
                style={{ 
                  width: '240px', 
                  height: '320px',
                  boxShadow: '0 0 30px rgba(63, 98, 84, 0.35)'
                }}
              >
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(16)].map((_, row) => (
                    <div key={row} className="flex">
                      {[...Array(10)].map((_, col) => (
                        <div
                          key={col}
                        className="border border-secondary-700"
                        style={{ width: '24px', height: '20px' }}
                      />
                    ))}
                    </div>
                  ))}
                </div>

                {/* Falling Tetris Pieces */}
                <TetrisPieces />

                {/* Bottom Completed Lines */}
                <div className="absolute bottom-0 left-0 right-0">
                  {/* Line 1 - Complete */}
                  <div className="flex">
                    {[
                      '#c2a36b', '#5b806f', '#8c5b4f', '#a88a55', '#7a9e89',
                      '#453a33', '#ac9c8c', '#304d42', '#d8cfc4', '#725f52'
                    ].map((color, i) => (
                      <motion.div
                        key={`line1-${i}`}
                        className="border border-secondary-800"
                        style={{
                          width: '24px',
                          height: '20px',
                          backgroundColor: color,
                          boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3)'
                        }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ 
                          duration: 0.5, 
                          repeat: Infinity, 
                          repeatType: "reverse",
                          delay: i * 0.1 
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Line 2 - Partial */}
                  <div className="flex">
                    {[
                      '#c2a36b', '#5b806f', null, '#a88a55', '#7a9e89',
                      null, '#8c5b4f', '#304d42', '#d8cfc4', null
                    ].map((color, i) => (
                      <div
                        key={`line2-${i}`}
                        className="border border-secondary-800"
                        style={{
                          width: '24px',
                          height: '20px',
                          backgroundColor: color || 'transparent',
                          boxShadow: color ? 'inset 2px 2px 4px rgba(255,255,255,0.3)' : 'none'
                        }}
                      />
                    ))}
                  </div>

                  {/* Line 3 - Partial */}
                  <div className="flex">
                    {[
                      '#c2a36b', null, '#5b806f', '#a88a55', null,
                      '#8c5b4f', null, '#304d42', null, '#725f52'
                    ].map((color, i) => (
                      <div
                        key={`line3-${i}`}
                        className="border border-secondary-800"
                        style={{
                          width: '24px',
                          height: '20px',
                          backgroundColor: color || 'transparent',
                          boxShadow: color ? 'inset 2px 2px 4px rgba(255,255,255,0.3)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Score Display */}
                <div className="absolute top-2 left-2 text-white font-mono text-sm">
                  <div className="bg-black/50 px-2 py-1 rounded">
                    SCORE: 12,450
                  </div>
                </div>

                {/* Level Display */}
                <div className="absolute top-2 right-2 text-white font-mono text-sm">
                  <div className="bg-black/50 px-2 py-1 rounded">
                    LEVEL: 5
                  </div>
                </div>
              </div>

              {/* Floating Gaming Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-xl"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <span className="text-white font-bold text-2xl">🎮</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-xl"
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, -8, 8, 0]
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <span className="text-white font-bold text-xl">🚀</span>
              </motion.div>

              {/* Pixel Art Style Element */}
              <motion.div
                className="absolute -top-4 -left-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "linear"
                }}
              >
                <span className="text-white font-bold">⭐</span>
              </motion.div>

              {/* Coffee Cup (Developer Essential) */}
              <motion.div
                className="absolute -bottom-2 -right-8 w-14 h-14 bg-gradient-to-r from-accent-600 to-accent-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -8, 0],
                  x: [0, 3, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <span className="text-white text-xl">☕</span>
              </motion.div>

              {/* Floating Code Symbols */}
              <motion.div
                className="absolute top-1/4 -left-12 text-2xl"
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.8
                }}
              >
                <span className="text-primary-400">{'{ }'}</span>
              </motion.div>

              <motion.div
                className="absolute top-3/4 -right-10 text-xl"
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ 
                  duration: 2.8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <span className="text-accent-500">{'</>'}</span>
              </motion.div>

              {/* Lightning Bolt for Energy */}
              <motion.div
                className="absolute top-1/2 -right-6 w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <span className="text-white font-bold">⚡</span>
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

// Tetris Pieces Component
function TetrisPieces() {
  const tetrisPieces = [
    // I-piece (sage)
    {
      id: 'i-piece',
      color: '#7a9e89',
      blocks: [
        { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }
      ],
      startDelay: 0
    },
    // T-piece (gold)
    {
      id: 't-piece',
      color: '#c2a36b',
      blocks: [
        { x: 4, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }
      ],
      startDelay: 2
    },
    // L-piece (clay)
    {
      id: 'l-piece',
      color: '#8c5b4f',
      blocks: [
        { x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 7, y: 3 }
      ],
      startDelay: 4
    },
    // O-piece (dark gold)
    {
      id: 'o-piece',
      color: '#a88a55',
      blocks: [
        { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }
      ],
      startDelay: 6
    },
    // S-piece (deep green)
    {
      id: 's-piece',
      color: '#3f6254',
      blocks: [
        { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 6 }
      ],
      startDelay: 8
    },
    // Z-piece (espresso)
    {
      id: 'z-piece',
      color: '#453a33',
      blocks: [
        { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 4, y: 5 }
      ],
      startDelay: 10
    }
  ];

  return (
    <>
      {tetrisPieces.map((piece) => (
        <motion.div key={piece.id} className="absolute">
          {piece.blocks.map((block, blockIndex) => (
            <motion.div
              key={`${piece.id}-${blockIndex}`}
              className="absolute border border-secondary-800"
              style={{
                width: '24px',
                height: '20px',
                backgroundColor: piece.color,
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)',
                left: `${block.x * 24}px`,
              }}
              initial={{ 
                y: -100
              }}
              animate={{ 
                y: `${block.y * 20 + 60}px`
              }}
              transition={{
                duration: 3,
                delay: piece.startDelay,
                repeat: Infinity,
                repeatDelay: 12,
                ease: "easeIn"
              }}
            />
          ))}
        </motion.div>
      ))}
      
      {/* Next Piece Preview */}
      <div className="absolute -right-16 top-4 bg-secondary-800 border-2 border-secondary-600 rounded p-2">
        <div className="text-white text-xs font-mono mb-1">NEXT</div>
        <div className="relative" style={{ width: '48px', height: '40px' }}>
          {/* Preview J-piece */}
          {[
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }
          ].map((block, i) => (
            <div
              key={`preview-${i}`}
              className="absolute border border-secondary-700"
              style={{
                width: '12px',
                height: '10px',
                backgroundColor: '#5b806f',
                left: `${block.x * 12}px`,
                top: `${block.y * 10}px`,
                boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.3)'
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
