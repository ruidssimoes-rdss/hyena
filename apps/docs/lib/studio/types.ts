export interface StudioTheme {
  name: string;

  colors: {
    primary: string; // User picks this
    primaryScale: ColorScale; // Auto-generated
    secondary: string;
    secondaryScale: ColorScale;
    accent: string;
    accentScale: ColorScale;

    // Semantic (auto-derived or customizable)
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  radius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
    default: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  };

  spacing: {
    baseUnit: number; // Usually 4
    scale: number[]; // [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64]
  };

  typography: {
    fontFamily: string;
    monoFontFamily: string;
    scale: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
    };
  };
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // Usually the "main" color
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export type ThemeMode = 'light' | 'dark';
export type DeviceFrame = 'mobile' | 'tablet' | 'desktop';

export interface StudioState {
  theme: StudioTheme;
  mode: ThemeMode;
  device: DeviceFrame;
  activePreset: string | null;
}
