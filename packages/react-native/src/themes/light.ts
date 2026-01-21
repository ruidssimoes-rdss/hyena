/**
 * Hyena Light Theme
 * A clean light theme with solid surfaces
 */

export const lightTheme = {
  name: 'light' as const,

  colors: {
    background: '#ffffff',
    surface: '#f5f5f5',
    surfaceElevated: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)',
    borderSubtle: 'rgba(0, 0, 0, 0.05)',

    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      muted: '#999999',
    },

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

    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },

  effects: {
    blur: 0,
    shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },

  radius: {
    card: 14,
  },
} as const;

export type LightTheme = typeof lightTheme;
