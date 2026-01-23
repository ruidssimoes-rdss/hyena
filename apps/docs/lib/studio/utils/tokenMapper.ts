import { TokenSystem } from '../types';

/**
 * Default token system used as fallback for missing values
 */
const defaults: TokenSystem = {
  name: 'Generated Theme',
  colors: {
    brand: [
      {
        id: 'primary',
        name: 'Primary',
        value: { light: '#3b82f6', dark: '#60a5fa' },
      },
      {
        id: 'accent',
        name: 'Accent',
        value: { light: '#8b5cf6', dark: '#a78bfa' },
      },
    ],
    semantic: [
      {
        id: 'success',
        name: 'Success',
        value: { light: '#22c55e', dark: '#4ade80' },
      },
      {
        id: 'warning',
        name: 'Warning',
        value: { light: '#f59e0b', dark: '#fbbf24' },
      },
      {
        id: 'error',
        name: 'Error',
        value: { light: '#ef4444', dark: '#f87171' },
      },
      { id: 'info', name: 'Info', value: { light: '#3b82f6', dark: '#60a5fa' } },
    ],
    neutral: {
      baseColor: '#71717a',
      scale: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b',
      },
    },
    surface: {
      background: { light: '#ffffff', dark: '#0a0a0b' },
      foreground: { light: '#0a0a0b', dark: '#fafafa' },
      card: { light: '#ffffff', dark: '#18181b' },
      muted: { light: '#f4f4f5', dark: '#27272a' },
      mutedForeground: { light: '#71717a', dark: '#a1a1aa' },
      border: { light: '#e4e4e7', dark: '#27272a' },
    },
  },
  typography: {
    families: [
      { id: 'sans', name: 'Sans', value: 'Inter' },
      { id: 'mono', name: 'Mono', value: 'JetBrains Mono' },
    ],
    sizes: [
      { name: 'xs', size: 12, lineHeight: 16 },
      { name: 'sm', size: 14, lineHeight: 20 },
      { name: 'base', size: 16, lineHeight: 24 },
      { name: 'lg', size: 18, lineHeight: 28 },
      { name: 'xl', size: 20, lineHeight: 28 },
      { name: '2xl', size: 24, lineHeight: 32 },
      { name: '3xl', size: 30, lineHeight: 36 },
      { name: '4xl', size: 36, lineHeight: 40 },
      { name: '5xl', size: 48, lineHeight: 48 },
    ],
    weights: [
      { name: 'normal', value: 400 },
      { name: 'medium', value: 500 },
      { name: 'semibold', value: 600 },
      { name: 'bold', value: 700 },
    ],
  },
  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  },
  radius: {
    base: 6,
    scale: [
      { name: 'none', value: 0 },
      { name: 'sm', value: 4 },
      { name: 'md', value: 6 },
      { name: 'lg', value: 8 },
      { name: 'xl', value: 12 },
      { name: '2xl', value: 16 },
      { name: 'full', value: 9999 },
    ],
  },
  shadows: {
    scale: [
      { name: 'sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
      { name: 'md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
      { name: 'lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
      { name: 'xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
      { name: '2xl', value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
    ],
  },
  animations: {
    durations: [
      { name: 'fast', value: 150 },
      { name: 'normal', value: 200 },
      { name: 'slow', value: 300 },
    ],
    easings: [
      { name: 'default', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      { name: 'in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
      { name: 'out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
      { name: 'inOut', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    ],
  },
};

/**
 * Validate that a color string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Sanitize a color value, returning fallback if invalid
 */
function sanitizeColor(color: string | undefined, fallback: string): string {
  if (!color || !isValidHexColor(color)) {
    return fallback;
  }
  return color;
}

/**
 * Maps AI-generated tokens to the TokenSystem interface.
 * Fills in any missing values with sensible defaults.
 */
export function mapAIResponseToTokenSystem(aiResponse: unknown): TokenSystem {
  // Type guard for object
  if (!aiResponse || typeof aiResponse !== 'object') {
    return defaults;
  }

  const ai = aiResponse as Record<string, unknown>;

  // Map colors
  const aiColors = ai.colors as Record<string, unknown> | undefined;

  // Map brand colors
  let brandColors = defaults.colors.brand;
  if (Array.isArray(aiColors?.brand)) {
    brandColors = aiColors.brand.map((c: unknown, index: number) => {
      const color = c as Record<string, unknown>;
      const value = color?.value as Record<string, string> | undefined;
      const defaultBrand = defaults.colors.brand[index] || defaults.colors.brand[0];
      return {
        id: (color?.id as string) || defaultBrand.id,
        name: (color?.name as string) || defaultBrand.name,
        value: {
          light: sanitizeColor(value?.light, defaultBrand.value.light),
          dark: sanitizeColor(value?.dark, defaultBrand.value.dark),
        },
      };
    });
  }

  // Map semantic colors
  let semanticColors = defaults.colors.semantic;
  if (Array.isArray(aiColors?.semantic)) {
    semanticColors = aiColors.semantic.map((c: unknown, index: number) => {
      const color = c as Record<string, unknown>;
      const value = color?.value as Record<string, string> | undefined;
      const defaultSemantic = defaults.colors.semantic[index] || defaults.colors.semantic[0];
      return {
        id: (color?.id as string) || defaultSemantic.id,
        name: (color?.name as string) || defaultSemantic.name,
        value: {
          light: sanitizeColor(value?.light, defaultSemantic.value.light),
          dark: sanitizeColor(value?.dark, defaultSemantic.value.dark),
        },
      };
    });
  }

  // Map neutral scale
  const aiNeutral = aiColors?.neutral as Record<string, unknown> | undefined;
  const aiNeutralScale = aiNeutral?.scale as Record<string, string> | undefined;
  const neutralScale = {
    50: sanitizeColor(aiNeutralScale?.['50'], defaults.colors.neutral.scale[50]),
    100: sanitizeColor(aiNeutralScale?.['100'], defaults.colors.neutral.scale[100]),
    200: sanitizeColor(aiNeutralScale?.['200'], defaults.colors.neutral.scale[200]),
    300: sanitizeColor(aiNeutralScale?.['300'], defaults.colors.neutral.scale[300]),
    400: sanitizeColor(aiNeutralScale?.['400'], defaults.colors.neutral.scale[400]),
    500: sanitizeColor(aiNeutralScale?.['500'], defaults.colors.neutral.scale[500]),
    600: sanitizeColor(aiNeutralScale?.['600'], defaults.colors.neutral.scale[600]),
    700: sanitizeColor(aiNeutralScale?.['700'], defaults.colors.neutral.scale[700]),
    800: sanitizeColor(aiNeutralScale?.['800'], defaults.colors.neutral.scale[800]),
    900: sanitizeColor(aiNeutralScale?.['900'], defaults.colors.neutral.scale[900]),
    950: sanitizeColor(aiNeutralScale?.['950'], defaults.colors.neutral.scale[950]),
  };

  // Map surface colors
  const aiSurface = aiColors?.surface as Record<string, Record<string, string>> | undefined;
  const surfaceColors = {
    background: {
      light: sanitizeColor(aiSurface?.background?.light, defaults.colors.surface.background.light),
      dark: sanitizeColor(aiSurface?.background?.dark, defaults.colors.surface.background.dark),
    },
    foreground: {
      light: sanitizeColor(aiSurface?.foreground?.light, defaults.colors.surface.foreground.light),
      dark: sanitizeColor(aiSurface?.foreground?.dark, defaults.colors.surface.foreground.dark),
    },
    card: {
      light: sanitizeColor(aiSurface?.card?.light, defaults.colors.surface.card.light),
      dark: sanitizeColor(aiSurface?.card?.dark, defaults.colors.surface.card.dark),
    },
    muted: {
      light: sanitizeColor(aiSurface?.muted?.light, defaults.colors.surface.muted.light),
      dark: sanitizeColor(aiSurface?.muted?.dark, defaults.colors.surface.muted.dark),
    },
    mutedForeground: {
      light: sanitizeColor(
        aiSurface?.mutedForeground?.light,
        defaults.colors.surface.mutedForeground.light
      ),
      dark: sanitizeColor(
        aiSurface?.mutedForeground?.dark,
        defaults.colors.surface.mutedForeground.dark
      ),
    },
    border: {
      light: sanitizeColor(aiSurface?.border?.light, defaults.colors.surface.border.light),
      dark: sanitizeColor(aiSurface?.border?.dark, defaults.colors.surface.border.dark),
    },
  };

  // Map typography
  const aiTypography = ai.typography as Record<string, unknown> | undefined;

  let families = defaults.typography.families;
  if (Array.isArray(aiTypography?.families)) {
    families = aiTypography.families.map((f: unknown, index: number) => {
      const family = f as Record<string, unknown>;
      const defaultFamily = defaults.typography.families[index] || defaults.typography.families[0];
      return {
        id: (family?.id as string) || defaultFamily.id,
        name: (family?.name as string) || defaultFamily.name,
        value: (family?.value as string) || defaultFamily.value,
      };
    });
  }

  let sizes = defaults.typography.sizes;
  if (Array.isArray(aiTypography?.sizes)) {
    sizes = aiTypography.sizes.map((s: unknown, index: number) => {
      const size = s as Record<string, unknown>;
      const defaultSize = defaults.typography.sizes[index] || defaults.typography.sizes[2];
      return {
        name: (size?.name as string) || defaultSize.name,
        size: typeof size?.size === 'number' ? size.size : defaultSize.size,
        lineHeight:
          typeof size?.lineHeight === 'number' ? size.lineHeight : defaultSize.lineHeight,
      };
    });
  }

  let weights = defaults.typography.weights;
  if (Array.isArray(aiTypography?.weights)) {
    weights = aiTypography.weights.map((w: unknown, index: number) => {
      const weight = w as Record<string, unknown>;
      const defaultWeight = defaults.typography.weights[index] || defaults.typography.weights[0];
      return {
        name: (weight?.name as string) || defaultWeight.name,
        value: typeof weight?.value === 'number' ? weight.value : defaultWeight.value,
      };
    });
  }

  // Map spacing
  const aiSpacing = ai.spacing as Record<string, unknown> | undefined;
  const spacing = {
    baseUnit:
      typeof aiSpacing?.baseUnit === 'number' ? aiSpacing.baseUnit : defaults.spacing.baseUnit,
    scale: Array.isArray(aiSpacing?.scale) ? aiSpacing.scale : defaults.spacing.scale,
  };

  // Map radius
  const aiRadius = ai.radius as Record<string, unknown> | undefined;
  let radiusScale = defaults.radius.scale;
  if (Array.isArray(aiRadius?.scale)) {
    radiusScale = aiRadius.scale.map((r: unknown, index: number) => {
      const radius = r as Record<string, unknown>;
      const defaultRadius = defaults.radius.scale[index] || defaults.radius.scale[2];
      return {
        name: (radius?.name as string) || defaultRadius.name,
        value: typeof radius?.value === 'number' ? radius.value : defaultRadius.value,
      };
    });
  }

  const radius = {
    base: typeof aiRadius?.base === 'number' ? aiRadius.base : defaults.radius.base,
    scale: radiusScale,
  };

  // Map shadows
  const aiShadows = ai.shadows as Record<string, unknown> | undefined;
  let shadowScale = defaults.shadows.scale;
  if (Array.isArray(aiShadows?.scale)) {
    shadowScale = aiShadows.scale.map((s: unknown, index: number) => {
      const shadow = s as Record<string, unknown>;
      const defaultShadow = defaults.shadows.scale[index] || defaults.shadows.scale[0];
      return {
        name: (shadow?.name as string) || defaultShadow.name,
        value: (shadow?.value as string) || defaultShadow.value,
      };
    });
  }

  // Map animations
  const aiAnimations = ai.animations as Record<string, unknown> | undefined;

  let durations = defaults.animations.durations;
  if (Array.isArray(aiAnimations?.durations)) {
    durations = aiAnimations.durations.map((d: unknown, index: number) => {
      const duration = d as Record<string, unknown>;
      const defaultDuration =
        defaults.animations.durations[index] || defaults.animations.durations[1];
      return {
        name: (duration?.name as string) || defaultDuration.name,
        value: typeof duration?.value === 'number' ? duration.value : defaultDuration.value,
      };
    });
  }

  let easings = defaults.animations.easings;
  if (Array.isArray(aiAnimations?.easings)) {
    easings = aiAnimations.easings.map((e: unknown, index: number) => {
      const easing = e as Record<string, unknown>;
      const defaultEasing = defaults.animations.easings[index] || defaults.animations.easings[0];
      return {
        name: (easing?.name as string) || defaultEasing.name,
        value: (easing?.value as string) || defaultEasing.value,
      };
    });
  }

  return {
    name: typeof ai.name === 'string' ? ai.name : defaults.name,
    colors: {
      brand: brandColors,
      semantic: semanticColors,
      neutral: {
        baseColor: sanitizeColor(
          aiNeutral?.baseColor as string | undefined,
          defaults.colors.neutral.baseColor
        ),
        scale: neutralScale,
      },
      surface: surfaceColors,
    },
    typography: {
      families,
      sizes,
      weights,
    },
    spacing,
    radius,
    shadows: {
      scale: shadowScale,
    },
    animations: {
      durations,
      easings,
    },
  };
}
