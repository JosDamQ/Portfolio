'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'rounded-xl',
      'transition-all duration-300 ease-in-out'
    ];

    const variantClasses = {
      default: [
        'bg-white border border-secondary-200',
        'dark:bg-secondary-800 dark:border-secondary-700'
      ],
      glass: [
        'glass-card'
      ],
      elevated: [
        'bg-white shadow-lg border border-secondary-100',
        'dark:bg-secondary-800 dark:border-secondary-700 dark:shadow-2xl'
      ],
      outline: [
        'border-2 border-secondary-200 bg-transparent',
        'dark:border-secondary-700'
      ]
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverClasses = hover ? [
      'hover-lift cursor-pointer',
      'hover:shadow-xl hover:shadow-primary-500/10',
      'hover:border-primary-300',
      'dark:hover:border-primary-600'
    ] : [];

    const classes = [
      ...baseClasses,
      ...variantClasses[variant],
      paddingClasses[padding],
      ...hoverClasses,
      className
    ].join(' ');

    const motionProps = hover ? {
      whileHover: { y: -2 },
      whileTap: { scale: 0.98 }
    } : {};

    return (
      <motion.div
        ref={ref}
        className={classes}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ 
  children, 
  className = '', 
  as: Component = 'h3' 
}: CardTitleProps) {
  return (
    <Component className={`text-xl font-semibold text-secondary-900 dark:text-secondary-100 ${className}`}>
      {children}
    </Component>
  );
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-secondary-600 dark:text-secondary-400 ${className}`}>
      {children}
    </p>
  );
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700 ${className}`}>
      {children}
    </div>
  );
}

export { Card };