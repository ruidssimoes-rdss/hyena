/**
 * Theme type definitions
 */

export type ThemeName = 'light' | 'dark' | 'oatmeal' | 'glass';

export interface ThemeColors {
  background: string;
  backgroundSubtle?: string;
  surface: string;
  surfaceElevated: string;
  surfaceSubtle?: string;
  border: string;
  borderSubtle: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverted?: string;
  };
  interactive?: {
    hover: string;
    active: string;
    selected: string;
  };
  primary?: string;
  primaryForeground?: string;
  accent: {
    blue: { light: string; DEFAULT: string; dark: string };
    green: { light: string; DEFAULT: string; dark: string };
    amber: { light: string; DEFAULT: string; dark: string };
    red: { light: string; DEFAULT: string; dark: string };
    purple: { light: string; DEFAULT: string; dark: string };
  };
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface ShadowNative {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeEffects {
  blur: number | { sm: number; md: number; lg: number };
  shadow: string | { sm: string; md: string; lg: string };
  shadowNative?: {
    sm: ShadowNative;
    md: ShadowNative;
    lg: ShadowNative;
  };
}

export interface ThemeRadius {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  card?: number;
  full?: number;
}

export interface ThemeSpacing {
  card?: number;
  cardLg?: number;
}

export interface Theme {
  name: ThemeName;
  colors: ThemeColors;
  effects: ThemeEffects;
  radius: ThemeRadius;
  spacing?: ThemeSpacing;
}
