import { Platform } from 'react-native';

/**
 * Platform-aware touch target utilities
 *
 * Touch target minimums per platform guidelines:
 * - iOS (Apple HIG): 44pt minimum
 * - Android (Material Design): 48dp minimum
 * - Web: 36px (can be smaller due to mouse precision)
 */

/** Minimum touch target size per platform */
export const TOUCH_TARGET = Platform.select({
  ios: 44,
  android: 48,
  default: 36, // web can be smaller due to mouse precision
}) as number;

/** Common platform-aware sizes for interactive elements */
export const interactiveSize = {
  /** Small interactive elements: iOS 36pt, Android 40dp, Web 32px */
  sm: Platform.select({ ios: 36, android: 40, default: 32 }) as number,
  /** Medium interactive elements: iOS 44pt, Android 48dp, Web 40px */
  md: Platform.select({ ios: 44, android: 48, default: 40 }) as number,
  /** Large interactive elements: iOS 52pt, Android 56dp, Web 48px */
  lg: Platform.select({ ios: 52, android: 56, default: 48 }) as number,
};

/** HitSlop type for Pressable components */
export interface HitSlop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Calculate hitSlop to ensure minimum touch target size
 *
 * @param elementSize - The visual size of the element
 * @returns HitSlop object or undefined if element already meets minimum
 *
 * @example
 * // For a 20x20 checkbox on iOS (needs 44pt minimum)
 * const hitSlop = getHitSlop(20); // { top: 12, bottom: 12, left: 12, right: 12 }
 *
 * // For a 48x48 button on iOS (already meets 44pt minimum)
 * const hitSlop = getHitSlop(48); // undefined
 */
export const getHitSlop = (elementSize: number): HitSlop | undefined => {
  const minTarget = TOUCH_TARGET;
  if (elementSize >= minTarget) return undefined;

  const padding = Math.ceil((minTarget - elementSize) / 2);
  return { top: padding, bottom: padding, left: padding, right: padding };
};

/**
 * Get hitSlop for a rectangular element with different width and height
 *
 * @param width - The visual width of the element
 * @param height - The visual height of the element
 * @returns HitSlop object or undefined if element already meets minimum
 */
export const getHitSlopRect = (
  width: number,
  height: number
): HitSlop | undefined => {
  const minTarget = TOUCH_TARGET;
  if (width >= minTarget && height >= minTarget) return undefined;

  const horizontalPadding =
    width >= minTarget ? 0 : Math.ceil((minTarget - width) / 2);
  const verticalPadding =
    height >= minTarget ? 0 : Math.ceil((minTarget - height) / 2);

  return {
    top: verticalPadding,
    bottom: verticalPadding,
    left: horizontalPadding,
    right: horizontalPadding,
  };
};

/** Platform-aware spacing values */
export const platformSpacing = {
  /** Vertical padding for buttons: iOS 12pt, Android 14dp, Web 10px */
  buttonPaddingVertical: Platform.select({
    ios: 12,
    android: 14,
    default: 10,
  }) as number,
  /** Horizontal padding for buttons: iOS 16pt, Android 16dp, Web 14px */
  buttonPaddingHorizontal: Platform.select({
    ios: 16,
    android: 16,
    default: 14,
  }) as number,
  /** Vertical padding for inputs: iOS 12pt, Android 14dp, Web 10px */
  inputPaddingVertical: Platform.select({
    ios: 12,
    android: 14,
    default: 10,
  }) as number,
};

/** Check if we're running on a native platform (iOS or Android) */
export const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

/** Check if we're running on web */
export const isWeb = Platform.OS === 'web';

/** Check if we're running on iOS */
export const isIOS = Platform.OS === 'ios';

/** Check if we're running on Android */
export const isAndroid = Platform.OS === 'android';
