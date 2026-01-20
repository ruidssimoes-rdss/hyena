import { StudioTheme } from './types';
import { generateColorScale } from './color-utils';

const createPreset = (
  name: string,
  primary: string,
  secondary: string,
  accent: string,
  defaultRadius: StudioTheme['radius']['default'],
  options?: Partial<StudioTheme>
): StudioTheme => ({
  name,
  colors: {
    primary,
    primaryScale: generateColorScale(primary),
    secondary,
    secondaryScale: generateColorScale(secondary),
    accent,
    accentScale: generateColorScale(accent),
    background: '#09090b',
    foreground: '#fafafa',
    muted: '#27272a',
    mutedForeground: '#a1a1aa',
    border: '#27272a',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    ...options?.colors,
  },
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
    default: defaultRadius,
    ...options?.radius,
  },
  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
    ...options?.spacing,
  },
  typography: {
    fontFamily: 'Inter',
    monoFontFamily: 'JetBrains Mono',
    scale: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    ...options?.typography,
  },
});

export const presets = {
  minimal: createPreset(
    'Minimal',
    '#18181b', // Near black primary
    '#71717a', // Zinc secondary
    '#3b82f6', // Blue accent
    'md'
  ),

  glassmorphic: createPreset(
    'Glassmorphic',
    '#8b5cf6', // Violet primary
    '#6366f1', // Indigo secondary
    '#06b6d4', // Cyan accent
    'xl'
  ),

  bold: createPreset(
    'Bold',
    '#000000', // Black primary
    '#ffffff', // White secondary
    '#ff0080', // Hot pink accent
    'lg'
  ),

  soft: createPreset(
    'Soft',
    '#64748b', // Slate primary
    '#94a3b8', // Slate secondary
    '#f472b6', // Pink accent
    'xl',
    {
      radius: {
        none: 0,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
        default: 'xl',
      },
    }
  ),

  dark_pro: createPreset(
    'Dark Pro',
    '#22d3ee', // Cyan primary
    '#a78bfa', // Violet secondary
    '#fbbf24', // Amber accent
    'md'
  ),
};

export type PresetName = keyof typeof presets;
