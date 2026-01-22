export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    accent: {
      purple: '#8b5cf6',
      purpleDark: '#7c3aed',
      pink: '#ec4899',
      green: '#10b981'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    secondary: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
    accent: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
  },
  animations: {
    fadeIn: 'fadeIn 0.6s ease-out',
    slideUp: 'slideUp 0.8s ease-out',
    scaleIn: 'scaleIn 0.5s ease-out',
    slideInLeft: 'slideInLeft 0.6s ease-out',
    slideInRight: 'slideInRight 0.6s ease-out',
    typewriter: 'typewriter 2s steps(40, end)',
    blink: 'blink 1s infinite',
    float: 'float 3s ease-in-out infinite',
    pulseGlow: 'pulse-glow 2s ease-in-out infinite'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
    '5xl': '96px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(59, 130, 246, 0.4)',
    glowLarge: '0 0 30px rgba(59, 130, 246, 0.6)'
  }
} as const;

export type ThemeColors = typeof theme.colors;
export type ThemeGradients = typeof theme.gradients;
export type ThemeAnimations = typeof theme.animations;

// Utility function to get CSS custom property
export function getCSSVar(property: string): string {
  return `var(--${property})`;
}

// Utility function to create glassmorphism styles
export function createGlassStyles(opacity = 0.1) {
  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };
}

// Utility function to create gradient text styles
export function createGradientTextStyles(gradient: keyof ThemeGradients) {
  return {
    background: theme.gradients[gradient],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };
}