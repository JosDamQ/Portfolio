export const theme = {
  colors: {
    primary: {
      50: '#f2f6f3',
      100: '#e1ebe5',
      200: '#c7d7ce',
      300: '#a4bfae',
      400: '#7a9e89',
      500: '#5b806f',
      600: '#3f6254',
      700: '#304d42',
      800: '#253b33',
      900: '#1b2a24'
    },
    secondary: {
      50: '#faf8f5',
      100: '#f0ece6',
      200: '#ddd5cb',
      300: '#c7bcaf',
      400: '#ac9c8c',
      500: '#8f7b6b',
      600: '#725f52',
      700: '#5c4d43',
      800: '#453a33',
      900: '#2d2621'
    },
    accent: {
      purple: '#c2a36b',
      purpleDark: '#a88a55',
      pink: '#8c5b4f',
      green: '#2f5d50'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #5b806f 0%, #c2a36b 100%)',
    secondary: 'linear-gradient(135deg, #2d2621 0%, #453a33 100%)',
    accent: 'linear-gradient(135deg, #a88a55 0%, #8c5b4f 100%)'
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
    glow: '0 0 20px rgba(63, 98, 84, 0.4)',
    glowLarge: '0 0 30px rgba(63, 98, 84, 0.6)'
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
