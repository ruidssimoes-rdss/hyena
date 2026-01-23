/**
 * Hyena Shadow Tokens
 * Elevation system for React Native
 *
 * Note: React Native shadows work differently on iOS vs Android
 * These are optimized for iOS. For Android, use elevation property.
 */

import { Platform, ViewStyle } from 'react-native';

// Shadow definitions for iOS
export const iosShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  } as ViewStyle,
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  } as ViewStyle,
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  } as ViewStyle,
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  } as ViewStyle,
} as const;

// Elevation values for Android
export const androidElevations = {
  sm: 2,
  md: 4,
  lg: 8,
  xl: 16,
} as const;

// Helper to create cross-platform shadow
const createShadow = (size: keyof typeof iosShadows): ViewStyle => {
  if (Platform.OS === 'android') {
    return { elevation: androidElevations[size] };
  }
  return iosShadows[size];
};

// Cross-platform shadow helper
export const shadows: Record<'sm' | 'md' | 'lg' | 'xl', ViewStyle> = {
  sm: createShadow('sm'),
  md: createShadow('md'),
  lg: createShadow('lg'),
  xl: createShadow('xl'),
};

export type Shadows = typeof shadows;
export type ShadowSize = keyof typeof shadows;
