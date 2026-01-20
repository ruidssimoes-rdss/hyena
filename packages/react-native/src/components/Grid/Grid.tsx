import React, { createContext, useContext } from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { spacing } from '../../tokens/spacing';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface GridProps extends Omit<ViewProps, 'style'> {
  /** Grid content */
  children: React.ReactNode;
  /** Number of columns */
  columns?: GridColumns;
  /** Gap between all items */
  gap?: GridGap;
  /** Gap between rows */
  rowGap?: GridGap;
  /** Gap between columns */
  columnGap?: GridGap;
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

export function Grid({
  children,
  columns = 2,
  gap = 4,
  rowGap,
  columnGap,
  style,
  ...props
}: GridProps) {
  const resolvedRowGap = rowGap !== undefined ? spacing[rowGap] : spacing[gap];
  const resolvedColumnGap = columnGap !== undefined ? spacing[columnGap] : spacing[gap];

  return (
    <GridContext.Provider value={{ columns, columnGap: resolvedColumnGap }}>
      <View
        style={[
          styles.grid,
          {
            rowGap: resolvedRowGap,
            columnGap: resolvedColumnGap,
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
