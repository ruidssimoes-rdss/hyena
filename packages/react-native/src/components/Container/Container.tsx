import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { spacing } from '../../tokens/spacing';
import { ResponsiveValue, useResponsiveValue } from '../../utils/responsive';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps extends Omit<ViewProps, 'style'> {
  /** Container content */
  children: React.ReactNode;
  /** Maximum width size - can be responsive */
  size?: ResponsiveValue<ContainerSize>;
  /** Horizontal padding - can be responsive */
  padding?: ResponsiveValue<ContainerPadding>;
  /** Center the container horizontally */
  centered?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

const maxWidths: Record<ContainerSize, number | '100%'> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%',
};

const paddingValues: Record<ContainerPadding, number> = {
  none: 0,
  sm: spacing[3],
  md: spacing[4],
  lg: spacing[6],
};

/**
 * Container - A responsive layout wrapper that constrains content width.
 *
 * Supports responsive size and padding that change based on screen breakpoints.
 *
 * @example
 * ```tsx
 * // Static values
 * <Container size="lg" padding="md">
 *   Content here
 * </Container>
 *
 * // Responsive values - full width on mobile, constrained on larger screens
 * <Container
 *   size={{ sm: 'full', md: 'lg', xl: 'xl' }}
 *   padding={{ sm: 'sm', md: 'md', lg: 'lg' }}
 * >
 *   Content adapts to screen size
 * </Container>
 * ```
 */
export function Container({
  children,
  size = 'lg',
  padding = 'md',
  centered = true,
  style,
  ...props
}: ContainerProps) {
  const resolvedSize = useResponsiveValue(size, 'lg');
  const resolvedPadding = useResponsiveValue(padding, 'md');

  const maxWidth = maxWidths[resolvedSize];
  const paddingHorizontal = paddingValues[resolvedPadding];

  return (
    <View
      style={[
        styles.base,
        { paddingHorizontal },
        centered && styles.centered,
        { maxWidth },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
  centered: {
    alignSelf: 'center',
  },
});
