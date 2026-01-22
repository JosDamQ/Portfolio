'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface AnimatedTextProps {
  text: string | string[];
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  loop?: boolean;
  loopDelay?: number;
  onComplete?: () => void;
}

export function AnimatedText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  showCursor = true,
  cursorChar = '|',
  loop = false,
  loopDelay = 2000,
  onComplete
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[currentTextIndex];

  useEffect(() => {
    if (isComplete && !loop) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex < currentText.length) {
          setDisplayText(currentText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing current text
          if (textArray.length > 1) {
            // Multiple texts - start deleting after delay
            setTimeout(() => setIsDeleting(true), loopDelay);
          } else {
            // Single text - mark as complete
            setIsComplete(true);
            onComplete?.();
          }
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setDisplayText(currentText.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting - move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    }, delay + (isDeleting ? speed / 2 : speed));

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    currentText,
    currentTextIndex,
    delay,
    isDeleting,
    isComplete,
    loop,
    loopDelay,
    onComplete,
    speed,
    textArray
  ]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}

// Alternative component for fade-in word animation
export interface FadeInTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
}

export function FadeInText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.6
}: FadeInTextProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: 'easeOut'
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Component for character-by-character animation
export interface CharacterAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scale';
}

export function CharacterAnimation({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.4,
  animation = 'fadeIn'
}: CharacterAnimationProps) {
  const characters = text.split('');

  const animationVariants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    }
  };

  const variant = animationVariants[animation];

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={variant.initial}
          animate={variant.animate}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: 'easeOut'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Component for gradient text animation
export interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
  animate?: boolean;
}

export function GradientText({
  text,
  className = '',
  gradient = 'var(--gradient-primary)',
  animate = true
}: GradientTextProps) {
  return (
    <motion.span
      className={`gradient-text ${className}`}
      style={{ background: gradient }}
      initial={animate ? { backgroundPosition: '0% 50%' } : undefined}
      animate={animate ? { backgroundPosition: '100% 50%' } : undefined}
      transition={animate ? {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear'
      } : undefined}
    >
      {text}
    </motion.span>
  );
}