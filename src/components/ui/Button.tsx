'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-all duration-300 ease-in-out',
      'focus-ring',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden'
    ];

    const variantClasses = {
      primary: [
        'gradient-primary text-white',
        'hover:shadow-lg hover:shadow-primary-500/25',
        'active:scale-95'
      ],
      secondary: [
        'bg-secondary-100 text-secondary-900 border border-secondary-200',
        'hover:bg-secondary-200 hover:border-secondary-300',
        'dark:bg-secondary-800 dark:text-secondary-100 dark:border-secondary-700',
        'dark:hover:bg-secondary-700 dark:hover:border-secondary-600'
      ],
      outline: [
        'border-2 border-primary-500 text-primary-600 bg-transparent',
        'hover:bg-primary-500 hover:text-white',
        'dark:text-primary-400 dark:border-primary-400',
        'dark:hover:bg-primary-400 dark:hover:text-primary-900'
      ],
      ghost: [
        'text-secondary-700 bg-transparent',
        'hover:bg-secondary-100 hover:text-secondary-900',
        'dark:text-secondary-300 dark:hover:bg-secondary-800 dark:hover:text-secondary-100'
      ],
      glass: [
        'glass-button text-secondary-900',
        'hover:bg-white/20 hover:border-white/30',
        'dark:text-secondary-100'
      ]
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5'
    };

    const classes = [
      ...baseClasses,
      ...variantClasses[variant],
      sizeClasses[size],
      className
    ].join(' ');

    const iconSize = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <motion.div
            className={`${iconSize[size]} animate-spin`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.div>
        )}

        {/* Left icon */}
        {leftIcon && !isLoading && (
          <span className={iconSize[size]}>{leftIcon}</span>
        )}

        {/* Button text */}
        <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
          {children}
        </span>

        {/* Right icon */}
        {rightIcon && !isLoading && (
          <span className={iconSize[size]}>{rightIcon}</span>
        )}

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };