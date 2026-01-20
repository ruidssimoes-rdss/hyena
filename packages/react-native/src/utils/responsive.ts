import { useWindowDimensions } from 'react-native';

/**
 * Responsive breakpoint values in pixels.
 * Following Tailwind CSS conventions for consistency.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * A value that can be either a single value or responsive values at different breakpoints.
 *
 * @example
 * // Single value (applies to all screen sizes)
 * const size: ResponsiveValue<'sm' | 'md' | 'lg'> = 'md';
 *
 * @example
 * // Responsive values (mobile-first)
 * const size: ResponsiveValue<'sm' | 'md' | 'lg'> = {
 *   sm: 'sm',   // 640px+
 *   md: 'md',   // 768px+
 *   lg: 'lg',   // 1024px+
 * };
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Hook to resolve a responsive value based on current window width.
 * Uses a mobile-first approach: finds the largest breakpoint smaller than current width.
 *
 * @param value - Either a static value or an object with breakpoint keys
 * @param defaultValue - Fallback value when no breakpoint matches
 * @returns The resolved value for the current screen size
 *
 * @example
 * ```tsx
 * function MyComponent({ size = 'md' }: { size?: ResponsiveValue<'sm' | 'md' | 'lg'> }) {
 *   const resolvedSize = useResponsiveValue(size, 'md');
 *   // On a 800px screen with { sm: 'sm', lg: 'lg' }:
 *   // Returns 'sm' (largest matching breakpoint)
 * }
 * ```
 */
export function useResponsiveValue<T>(value: ResponsiveValue<T>, defaultValue: T): T {
  const { width } = useWindowDimensions();

  // If value is not an object or is null, return it directly
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  const breakpointValue = value as Partial<Record<Breakpoint, T>>;

  // Find the largest breakpoint that's smaller than current width
  // Check from largest to smallest for mobile-first cascade
  if (width >= breakpoints['2xl'] && breakpointValue['2xl'] !== undefined) {
    return breakpointValue['2xl'];
  }
  if (width >= breakpoints.xl && breakpointValue.xl !== undefined) {
    return breakpointValue.xl;
  }
  if (width >= breakpoints.lg && breakpointValue.lg !== undefined) {
    return breakpointValue.lg;
  }
  if (width >= breakpoints.md && breakpointValue.md !== undefined) {
    return breakpointValue.md;
  }
  if (width >= breakpoints.sm && breakpointValue.sm !== undefined) {
    return breakpointValue.sm;
  }

  return defaultValue;
}

/**
 * Get the current breakpoint name based on window width.
 *
 * @returns The current breakpoint name or undefined if below 'sm'
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const breakpoint = useCurrentBreakpoint();
 *   // On a 800px screen: returns 'md'
 * }
 * ```
 */
export function useCurrentBreakpoint(): Breakpoint | undefined {
  const { width } = useWindowDimensions();

  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';

  return undefined;
}
