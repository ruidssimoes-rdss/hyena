/**
 * r/ui Oatmeal Theme
 * A warm, muted light theme with earthy tones
 */

export const oatmealTheme = {
  name: 'oatmeal' as const,

  colors: {
    background: '#F5F2ED',
    surface: '#EDE9E3',
    surfaceElevated: '#FFFFFF',
    border: 'rgba(0, 0, 0, 0.08)',
    borderSubtle: 'rgba(0, 0, 0, 0.04)',

    text: {
      primary: '#2D2A26',
      secondary: '#6B6560',
      muted: '#9A938C',
    },

    accent: {
      blue: {
        light: '#7BA7CC',
        DEFAULT: '#5B8DB8',
        dark: '#4A7499',
      },
      green: {
        light: '#7FB88F',
        DEFAULT: '#5A9E6B',
        dark: '#4A8358',
      },
      amber: {
        light: '#E5C078',
        DEFAULT: '#D4A84B',
        dark: '#B8913D',
      },
      red: {
        light: '#D98B8B',
        DEFAULT: '#C66B6B',
        dark: '#A85555',
      },
      purple: {
        light: '#B8A3CC',
        DEFAULT: '#9B82B8',
        dark: '#7F6899',
      },
    },

    semantic: {
      success: '#5A9E6B',
      warning: '#D4A84B',
      error: '#C66B6B',
      info: '#5B8DB8',
    },
  },

  effects: {
    blur: 0,
    shadow: '0 2px 8px rgba(45, 42, 38, 0.08)',
  },

  radius: {
    card: 16,
  },
} as const;

export type OatmealTheme = typeof oatmealTheme;
