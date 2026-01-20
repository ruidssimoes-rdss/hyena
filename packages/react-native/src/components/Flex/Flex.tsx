import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps, FlexStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';
import { ResponsiveValue, useResponsiveValue } from '../../utils/responsive';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type FlexGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface FlexProps extends Omit<ViewProps, 'style'> {
  /** Flex content */
  children: React.ReactNode;
  /** Flex direction - can be responsive */
  direction?: ResponsiveValue<FlexDirection>;
  /** Justify content alignment - can be responsive */
  justify?: ResponsiveValue<FlexJustify>;
  /** Align items - can be responsive */
  align?: ResponsiveValue<FlexAlign>;
  /** Gap between items (uses spacing tokens) - can be responsive */
  gap?: ResponsiveValue<FlexGap>;
  /** Flex wrap behavior - can be responsive */
  wrap?: ResponsiveValue<FlexWrap>;
  /** Take up remaining space (flex: 1) */
  flex?: boolean | number;
  /** Additional styles */
  style?: ViewStyle;
}

const justifyMap: Record<FlexJustify, FlexStyle['justifyContent']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignMap: Record<FlexAlign, FlexStyle['alignItems']> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
};

/**
 * Flex - A responsive flexbox layout component.
 *
 * Supports responsive direction, gap, justify, align, and wrap that change based on screen breakpoints.
 *
 * @example
 * ```tsx
 * // Static values
 * <Flex direction="row" gap={4} justify="between">
 *   <Item />
 *   <Item />
 * </Flex>
 *
 * // Responsive - stack on mobile, row on desktop
 * <Flex
 *   direction={{ sm: 'column', md: 'row' }}
 *   gap={{ sm: 2, md: 4 }}
 *   align={{ sm: 'stretch', md: 'center' }}
 * >
 *   <Item />
 *   <Item />
 * </Flex>
 * ```
 */
export function Flex({
  children,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap = 0,
  wrap = 'nowrap',
  flex,
  style,
  ...props
}: FlexProps) {
  const resolvedDirection = useResponsiveValue(direction, 'row');
  const resolvedJustify = useResponsiveValue(justify, 'start');
  const resolvedAlign = useResponsiveValue(align, 'stretch');
  const resolvedGap = useResponsiveValue(gap, 0);
  const resolvedWrap = useResponsiveValue(wrap, 'nowrap');

  const flexValue = typeof flex === 'number' ? flex : flex ? 1 : undefined;

  return (
    <View
      style={[
        styles.base,
        {
          flexDirection: resolvedDirection,
          justifyContent: justifyMap[resolvedJustify],
          alignItems: alignMap[resolvedAlign],
          gap: spacing[resolvedGap],
          flexWrap: resolvedWrap,
          flex: flexValue,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {},
});
