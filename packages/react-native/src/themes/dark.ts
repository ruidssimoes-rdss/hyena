/**
 * Hyena Dark Theme
 * The default dark mode theme matching existing tokens
 */

export const darkTheme = {
  name: 'dark' as const,

  colors: {
    background: '#050505',
    surface: '#141414',
    surfaceElevated: '#1f1f1f',
    border: 'rgba(255, 255, 255, 0.1)',
    borderSubtle: 'rgba(255, 255, 255, 0.06)',

    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.6)',
      muted: 'rgba(255, 255, 255, 0.4)',
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
    shadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  },

  radius: {
    card: 14,
  },
} as const;

export type DarkTheme = typeof darkTheme;
