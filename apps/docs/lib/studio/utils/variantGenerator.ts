import {
  TokenSystem,
  ComponentVariants,
  ButtonVariants,
  InputVariant,
  CardVariants,
  BadgeVariants,
  AlertVariants,
} from '../types';

/**
 * Lighten a hex color by a percentage
 */
function lightenColor(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

/**
 * Darken a hex color by a percentage
 */
function darkenColor(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

/**
 * Add alpha to a hex color (returns rgba string for CSS compatibility)
 */
function withAlpha(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Check if a color is dark (for determining text color)
 */
function isColorDark(hex: string): boolean {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128;
}

/**
 * Get color value for the specified mode from token system
 */
function getColor(
  tokens: TokenSystem,
  colorName: string,
  mode: 'light' | 'dark'
): string {
  // Check brand colors
  const brandColor = tokens.colors.brand.find((c) => c.name === colorName);
  if (brandColor) return brandColor.value[mode];

  // Check semantic colors
  const semanticColor = tokens.colors.semantic.find(
    (c) => c.name === colorName
  );
  if (semanticColor) return semanticColor.value[mode];

  // Check surface colors
  const surfaceKeys = Object.keys(tokens.colors.surface) as Array<
    keyof typeof tokens.colors.surface
  >;
  for (const key of surfaceKeys) {
    if (key === colorName) {
      return tokens.colors.surface[key][mode];
    }
  }

  // Check neutral scale
  if (colorName.startsWith('neutral-')) {
    const scaleKeyStr = colorName.replace('neutral-', '');
    const scaleKey = parseInt(scaleKeyStr, 10) as keyof typeof tokens.colors.neutral.scale;
    if (!isNaN(scaleKey) && scaleKey in tokens.colors.neutral.scale) {
      return tokens.colors.neutral.scale[scaleKey];
    }
  }

  // Default fallback
  return '#000000';
}

/**
 * Get shadow value by name
 */
function getShadow(tokens: TokenSystem, name: string): string {
  const shadow = tokens.shadows.scale.find((s) => s.name === name);
  return shadow?.value || 'none';
}

/**
 * Generate component variants from base tokens for a specific mode
 */
function generateVariantsForMode(
  tokens: TokenSystem,
  mode: 'light' | 'dark'
): ComponentVariants {
  const primary =
    tokens.colors.brand.find((c) => c.name === 'primary')?.value[mode] ||
    '#3b82f6';
  const secondary =
    tokens.colors.brand.find((c) => c.name === 'secondary')?.value[mode] ||
    '#71717a';

  const success =
    tokens.colors.semantic.find((c) => c.name === 'success')?.value[mode] ||
    '#22c55e';
  const warning =
    tokens.colors.semantic.find((c) => c.name === 'warning')?.value[mode] ||
    '#f59e0b';
  const error =
    tokens.colors.semantic.find((c) => c.name === 'error')?.value[mode] ||
    '#ef4444';
  const info =
    tokens.colors.semantic.find((c) => c.name === 'info')?.value[mode] ||
    '#3b82f6';

  const surface = {
    background: tokens.colors.surface.background[mode],
    foreground: tokens.colors.surface.foreground[mode],
    card: tokens.colors.surface.card[mode],
    muted: tokens.colors.surface.muted[mode],
    mutedForeground: tokens.colors.surface.mutedForeground[mode],
    border: tokens.colors.surface.border[mode],
  };

  const neutral500 = tokens.colors.neutral.scale['500'];
  const isDark = mode === 'dark';

  // Button variants
  const buttonVariants: ButtonVariants = {
    primary: {
      background: primary,
      text: isDark ? surface.background : '#ffffff',
      border: primary,
      hoverBackground: darkenColor(primary, 10),
      hoverText: isDark ? surface.background : '#ffffff',
      hoverBorder: darkenColor(primary, 10),
      activeBackground: darkenColor(primary, 20),
      disabledBackground: withAlpha(primary, 0.5),
      disabledText: withAlpha(isDark ? surface.background : '#ffffff', 0.7),
    },
    secondary: {
      background: surface.muted,
      text: surface.foreground,
      border: surface.muted,
      hoverBackground: isDark
        ? lightenColor(surface.muted, 10)
        : darkenColor(surface.muted, 5),
      hoverText: surface.foreground,
      hoverBorder: isDark
        ? lightenColor(surface.muted, 10)
        : darkenColor(surface.muted, 5),
      activeBackground: isDark
        ? lightenColor(surface.muted, 15)
        : darkenColor(surface.muted, 10),
      disabledBackground: withAlpha(surface.muted, 0.5),
      disabledText: withAlpha(surface.foreground, 0.5),
    },
    outline: {
      background: 'transparent',
      text: surface.foreground,
      border: surface.border,
      hoverBackground: surface.muted,
      hoverText: surface.foreground,
      hoverBorder: surface.foreground,
      activeBackground: isDark
        ? lightenColor(surface.muted, 5)
        : darkenColor(surface.muted, 5),
      disabledBackground: 'transparent',
      disabledText: withAlpha(surface.foreground, 0.5),
    },
    ghost: {
      background: 'transparent',
      text: surface.foreground,
      border: 'transparent',
      hoverBackground: surface.muted,
      hoverText: surface.foreground,
      hoverBorder: 'transparent',
      activeBackground: isDark
        ? lightenColor(surface.muted, 5)
        : darkenColor(surface.muted, 5),
      disabledBackground: 'transparent',
      disabledText: withAlpha(surface.foreground, 0.5),
    },
    destructive: {
      background: error,
      text: '#ffffff',
      border: error,
      hoverBackground: darkenColor(error, 10),
      hoverText: '#ffffff',
      hoverBorder: darkenColor(error, 10),
      activeBackground: darkenColor(error, 20),
      disabledBackground: withAlpha(error, 0.5),
      disabledText: withAlpha('#ffffff', 0.7),
    },
    link: {
      background: 'transparent',
      text: primary,
      border: 'transparent',
      hoverBackground: 'transparent',
      hoverText: darkenColor(primary, 15),
      hoverBorder: 'transparent',
      activeBackground: 'transparent',
      disabledBackground: 'transparent',
      disabledText: withAlpha(primary, 0.5),
    },
  };

  // Input variant
  const inputVariant: InputVariant = {
    background: surface.background,
    text: surface.foreground,
    placeholder: neutral500,
    border: surface.border,
    focusBorder: primary,
    focusRing: withAlpha(primary, 0.2),
    errorBackground: withAlpha(error, 0.1),
    errorBorder: error,
    errorText: error,
    disabledBackground: surface.muted,
    disabledText: neutral500,
  };

  // Card variants
  const cardVariants: CardVariants = {
    default: {
      background: surface.card,
      border: surface.border,
      shadow: getShadow(tokens, 'sm'),
      headerBackground: 'transparent',
      footerBackground: surface.muted,
    },
    elevated: {
      background: surface.card,
      border: 'transparent',
      shadow: getShadow(tokens, 'lg'),
      headerBackground: 'transparent',
      footerBackground: surface.muted,
    },
    outlined: {
      background: 'transparent',
      border: surface.border,
      shadow: 'none',
      headerBackground: 'transparent',
      footerBackground: 'transparent',
    },
    filled: {
      background: surface.muted,
      border: 'transparent',
      shadow: 'none',
      headerBackground: 'transparent',
      footerBackground: isDark
        ? lightenColor(surface.muted, 5)
        : darkenColor(surface.muted, 5),
    },
  };

  // Badge variants
  const badgeVariants: BadgeVariants = {
    default: {
      background: surface.muted,
      text: surface.foreground,
      border: 'transparent',
    },
    primary: {
      background: withAlpha(primary, 0.15),
      text: primary,
      border: 'transparent',
    },
    secondary: {
      background: surface.muted,
      text: surface.foreground,
      border: 'transparent',
    },
    success: {
      background: withAlpha(success, 0.15),
      text: success,
      border: 'transparent',
    },
    warning: {
      background: withAlpha(warning, 0.15),
      text: warning,
      border: 'transparent',
    },
    error: {
      background: withAlpha(error, 0.15),
      text: error,
      border: 'transparent',
    },
    info: {
      background: withAlpha(info, 0.15),
      text: info,
      border: 'transparent',
    },
    outline: {
      background: 'transparent',
      text: surface.foreground,
      border: surface.border,
    },
  };

  // Alert variants
  const alertVariants: AlertVariants = {
    default: {
      background: surface.muted,
      text: surface.foreground,
      border: surface.border,
      icon: surface.foreground,
    },
    success: {
      background: withAlpha(success, 0.1),
      text: success,
      border: withAlpha(success, 0.3),
      icon: success,
    },
    warning: {
      background: withAlpha(warning, 0.1),
      text: warning,
      border: withAlpha(warning, 0.3),
      icon: warning,
    },
    error: {
      background: withAlpha(error, 0.1),
      text: error,
      border: withAlpha(error, 0.3),
      icon: error,
    },
    info: {
      background: withAlpha(info, 0.1),
      text: info,
      border: withAlpha(info, 0.3),
      icon: info,
    },
  };

  return {
    button: buttonVariants,
    input: inputVariant,
    card: cardVariants,
    badge: badgeVariants,
    alert: alertVariants,
  };
}

/**
 * Generate component variants from base tokens
 * Returns variants for the dark mode by default (as the studio preview uses dark mode)
 */
export function generateComponentVariants(
  tokens: TokenSystem,
  mode: 'light' | 'dark' = 'dark'
): ComponentVariants {
  return generateVariantsForMode(tokens, mode);
}

/**
 * Generate variants for both light and dark modes
 */
export function generateComponentVariantsBothModes(tokens: TokenSystem): {
  light: ComponentVariants;
  dark: ComponentVariants;
} {
  return {
    light: generateVariantsForMode(tokens, 'light'),
    dark: generateVariantsForMode(tokens, 'dark'),
  };
}

/**
 * Merge custom variant overrides with generated variants
 */
export function mergeVariants(
  generated: ComponentVariants,
  overrides?: Partial<ComponentVariants>
): ComponentVariants {
  if (!overrides) return generated;

  return {
    button: { ...generated.button, ...overrides.button },
    input: { ...generated.input, ...overrides.input },
    card: { ...generated.card, ...overrides.card },
    badge: { ...generated.badge, ...overrides.badge },
    alert: { ...generated.alert, ...overrides.alert },
  };
}

// Re-export helper functions for use in other modules
export { lightenColor, darkenColor, withAlpha, isColorDark };
