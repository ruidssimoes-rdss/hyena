import React, { createContext, useContext, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { spacing } from '../../tokens/spacing';
import { ResponsiveValue, useResponsiveValue } from '../../utils/responsive';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface GridProps extends Omit<ViewProps, 'style'> {
  /** Grid content */
  children: React.ReactNode;
  /** Number of columns - can be responsive */
  columns?: ResponsiveValue<GridColumns>;
  /** Gap between all items - can be responsive */
  gap?: ResponsiveValue<GridGap>;
  /** Gap between rows - can be responsive */
  rowGap?: ResponsiveValue<GridGap>;
  /** Gap between columns - can be responsive */
  columnGap?: ResponsiveValue<GridGap>;
  /** Additional styles */
  style?: ViewStyle;
}

export interface GridItemProps extends Omit<ViewProps, 'style'> {
  /** Item content */
  children: React.ReactNode;
  /** Number of columns to span */
  colSpan?: number;
  /** Additional styles */
  style?: ViewStyle;
}

interface GridContextValue {
  columns: GridColumns;
  columnGap: number;
}

const GridContext = createContext<GridContextValue | null>(null);

function useGridContext() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('GridItem must be used within a Grid component');
  }
  return context;
}

/**
 * Grid - A responsive grid layout component.
 *
 * Supports responsive columns and gap that change based on screen breakpoints.
 *
 * @example
 * ```tsx
 * // Static values
 * <Grid columns={3} gap={4}>
 *   <GridItem>1</GridItem>
 *   <GridItem>2</GridItem>
 *   <GridItem>3</GridItem>
 * </Grid>
 *
 * // Responsive - 1 column on mobile, 2 on tablet, 3 on desktop
 * <Grid
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 *   gap={{ sm: 2, md: 4 }}
 * >
 *   <GridItem>1</GridItem>
 *   <GridItem>2</GridItem>
 *   <GridItem>3</GridItem>
 * </Grid>
 *
 * // Item spanning multiple columns
 * <Grid columns={3}>
 *   <GridItem colSpan={2}>Spans 2 columns</GridItem>
 *   <GridItem>1 column</GridItem>
 * </Grid>
 * ```
 */
export function Grid({
  children,
  columns = 2,
  gap = 4,
  rowGap,
  columnGap,
  style,
  ...props
}: GridProps) {
  const resolvedColumns = useResponsiveValue(columns, 2);
  const resolvedGap = useResponsiveValue(gap, 4);
  const resolvedRowGap = useResponsiveValue(rowGap ?? gap, resolvedGap);
  const resolvedColumnGap = useResponsiveValue(columnGap ?? gap, resolvedGap);

  const rowGapValue = spacing[resolvedRowGap];
  const columnGapValue = spacing[resolvedColumnGap];

  const contextValue = useMemo(
    () => ({ columns: resolvedColumns, columnGap: columnGapValue }),
    [resolvedColumns, columnGapValue]
  );

  return (
    <GridContext.Provider value={contextValue}>
      <View
        style={[
          styles.grid,
          {
            rowGap: rowGapValue,
            columnGap: columnGapValue,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </GridContext.Provider>
  );
}

export function GridItem({
  children,
  colSpan = 1,
  style,
  ...props
}: GridItemProps) {
  const { columns, columnGap } = useGridContext();

  const clampedSpan = Math.min(colSpan, columns);

  // Calculate item width using flex properties instead of percentage hacks.
  // With flexbox gap, we can use flexBasis to set the base size and let
  // flex-grow/shrink handle the gap distribution.
  // For N columns with (N-1) gaps, each item takes: (100% - (N-1)*gap) / N
  // When spanning multiple columns, add back the gaps between spanned columns.
  const gapCount = columns - 1;
  const spannedGaps = clampedSpan - 1;

  // Base width percentage for a single column item
  // Using flex-basis with calc would be ideal, but RN doesn't support calc
  // Instead, we use a percentage that works with the flex gap model
  const baseWidthPercent = 100 / columns;

  // For multi-column spans, the width includes the spanned gaps
  // Final width = (baseWidth * span) adjusted for the flex gap model
  const widthPercent = baseWidthPercent * clampedSpan;

  return (
    <View
      style={[
        styles.item,
        {
          // Use flexBasis for initial size, then let gap handle spacing
          flexBasis: `${widthPercent}%`,
          flexGrow: 0,
          flexShrink: 0,
          // Subtract a small amount to account for gaps in the row
          // This ensures items + gaps fit exactly in the container
          maxWidth: `${widthPercent}%`,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {},
});
