import { createContext, useContext } from 'react';
import { Animated } from 'react-native';
import { ChartDataPoint, ChartConfig } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface ChartContextValue {
  /** Chart data */
  data: ChartDataPoint[];
  /** Custom colors */
  colors?: string[];
  /** Show tooltip on hover/press */
  showTooltip: boolean;
  /** Show legend */
  showLegend: boolean;
  /** Chart dimensions */
  width: number;
  height: number;
  /** Currently hovered/pressed data point index */
  activeIndex: number | null;
  /** Set active index */
  setActiveIndex: (index: number | null) => void;
  /** Animation progress (0-1) for initial render animation */
  animationProgress?: Animated.Value;
  /** Whether initial animation has completed */
  isAnimated?: boolean;
}

// ============================================================================
// Context
// ============================================================================

export const ChartContext = createContext<ChartContextValue | null>(null);

// ============================================================================
// Hook
// ============================================================================

export function useChart(): ChartContextValue {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error(
      'Chart components must be used within a Chart. ' +
        'Wrap your component in <Chart> to fix this error.'
    );
  }
  return context;
}
