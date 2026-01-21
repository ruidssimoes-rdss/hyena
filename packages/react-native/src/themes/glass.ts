/**
 * Hyena Glass Theme
 * A light glassmorphism theme with translucent surfaces and subtle blur effects
 */

export const glassTheme = {
  name: 'glass' as const,

  colors: {
    // Backgrounds
    background: '#E8E4DF',
    backgroundSubtle: '#F2EFEB',

    // Glass surfaces
    surface: 'rgba(255, 255, 255, 0.65)',
    surfaceElevated: 'rgba(255, 255, 255, 0.8)',
    surfaceSubtle: 'rgba(255, 255, 255, 0.5)',

    // Borders
    border: 'rgba(255, 255, 255, 0.8)',
    borderSubtle: 'rgba(0, 0, 0, 0.06)',

    // Text
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      muted: '#888888',
      inverted: '#ffffff',
    },

    // Interactive states
    interactive: {
      hover: 'rgba(0, 0, 0, 0.04)',
      active: 'rgba(0, 0, 0, 0.08)',
      selected: 'rgba(0, 0, 0, 0.06)',
    },

    // Semantic
    primary: '#1a1a1a',
    primaryForeground: '#ffffff',

    // Accent colors
    accent: {
      blue: {
        light: '#60a5fa',
        DEFAULT: '#3b82f6',
        dark: '#2563eb',
      },
      green: {
        light: '#4ade80',
        DEFAULT: '#22c55e',
        dark: '#16a34a',
      },
      amber: {
        light: '#fbbf24',
        DEFAULT: '#f59e0b',
        dark: '#d97706',
      },
      red: {
        light: '#f87171',
        DEFAULT: '#ef4444',
        dark: '#dc2626',
      },
      purple: {
        light: '#c084fc',
        DEFAULT: '#a855f7',
        dark: '#9333ea',
      },
    },

    // Semantic colors
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  effects: {
    blur: {
      sm: 12,
      md: 24,
      lg: 40,
    },
    shadow: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
      md: '0 4px 24px rgba(0, 0, 0, 0.06)',
      lg: '0 8px 40px rgba(0, 0, 0, 0.08)',
    },
    // React Native shadow format
    shadowNative: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 40,
        elevation: 8,
      },
    },
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
    full: 9999,
  },

  spacing: {
    card: 28,
    cardLg: 32,
  },
} as const;

export type GlassTheme = typeof glassTheme;
