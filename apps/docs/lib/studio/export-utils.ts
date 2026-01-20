import { StudioTheme } from './types';

export function generateCSSExport(theme: StudioTheme): string {
  return `:root {
  /* Primary */
  --color-primary: ${theme.colors.primary};
  --color-primary-50: ${theme.colors.primaryScale[50]};
  --color-primary-100: ${theme.colors.primaryScale[100]};
  --color-primary-200: ${theme.colors.primaryScale[200]};
  --color-primary-300: ${theme.colors.primaryScale[300]};
  --color-primary-400: ${theme.colors.primaryScale[400]};
  --color-primary-500: ${theme.colors.primaryScale[500]};
  --color-primary-600: ${theme.colors.primaryScale[600]};
  --color-primary-700: ${theme.colors.primaryScale[700]};
  --color-primary-800: ${theme.colors.primaryScale[800]};
  --color-primary-900: ${theme.colors.primaryScale[900]};
  --color-primary-950: ${theme.colors.primaryScale[950]};

  /* Secondary */
  --color-secondary: ${theme.colors.secondary};

  /* Accent */
  --color-accent: ${theme.colors.accent};

  /* Semantic */
  --color-success: ${theme.colors.success};
  --color-warning: ${theme.colors.warning};
  --color-error: ${theme.colors.error};
  --color-info: ${theme.colors.info};

  /* Border Radius */
  --radius-none: ${theme.radius.none}px;
  --radius-sm: ${theme.radius.sm}px;
  --radius-md: ${theme.radius.md}px;
  --radius-lg: ${theme.radius.lg}px;
  --radius-xl: ${theme.radius.xl}px;
  --radius-full: ${theme.radius.full}px;
  --radius-default: ${theme.radius[theme.radius.default]}px;

  /* Typography */
  --font-family: '${theme.typography.fontFamily}', sans-serif;
  --font-family-mono: '${theme.typography.monoFontFamily}', monospace;

  /* Spacing */
  --spacing-unit: ${theme.spacing.baseUnit}px;
}`;
}

export function generateThemeExport(theme: StudioTheme): string {
  return `import { createTheme } from '@r-ui/react-native';

export const customTheme = createTheme({
  name: '${theme.name}',

  colors: {
    primary: '${theme.colors.primary}',
    secondary: '${theme.colors.secondary}',
    accent: '${theme.colors.accent}',
    success: '${theme.colors.success}',
    warning: '${theme.colors.warning}',
    error: '${theme.colors.error}',
    info: '${theme.colors.info}',
  },

  radius: {
    none: ${theme.radius.none},
    sm: ${theme.radius.sm},
    md: ${theme.radius.md},
    lg: ${theme.radius.lg},
    xl: ${theme.radius.xl},
    full: ${theme.radius.full},
    default: '${theme.radius.default}',
  },

  typography: {
    fontFamily: '${theme.typography.fontFamily}',
    monoFontFamily: '${theme.typography.monoFontFamily}',
  },

  spacing: {
    baseUnit: ${theme.spacing.baseUnit},
  },
});`;
}

export function generateTailwindExport(theme: StudioTheme): string {
  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${theme.colors.primary}',
          50: '${theme.colors.primaryScale[50]}',
          100: '${theme.colors.primaryScale[100]}',
          200: '${theme.colors.primaryScale[200]}',
          300: '${theme.colors.primaryScale[300]}',
          400: '${theme.colors.primaryScale[400]}',
          500: '${theme.colors.primaryScale[500]}',
          600: '${theme.colors.primaryScale[600]}',
          700: '${theme.colors.primaryScale[700]}',
          800: '${theme.colors.primaryScale[800]}',
          900: '${theme.colors.primaryScale[900]}',
          950: '${theme.colors.primaryScale[950]}',
        },
        secondary: '${theme.colors.secondary}',
        accent: '${theme.colors.accent}',
      },
      borderRadius: {
        none: '${theme.radius.none}px',
        sm: '${theme.radius.sm}px',
        md: '${theme.radius.md}px',
        lg: '${theme.radius.lg}px',
        xl: '${theme.radius.xl}px',
        full: '${theme.radius.full}px',
      },
      fontFamily: {
        sans: ['${theme.typography.fontFamily}', 'sans-serif'],
        mono: ['${theme.typography.monoFontFamily}', 'monospace'],
      },
    },
  },
};`;
}
