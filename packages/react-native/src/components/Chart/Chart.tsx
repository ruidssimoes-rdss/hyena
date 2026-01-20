import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ViewStyle, LayoutChangeEvent, Animated } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { ChartContext } from './ChartContext';
import { ChartDataPoint } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface ChartProps {
  /** Chart data */
  data: ChartDataPoint[];
  /** Custom colors */
  colors?: string[];
  /** Show tooltip on hover/press */
  showTooltip?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Chart height */
  height?: number;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Animate on mount */
  animate?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Chart content (BarChart, LineChart, etc.) */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Skeleton Component
// ============================================================================

function ChartSkeleton({ height }: { height: number }) {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <View style={[styles.skeleton, { height }]}>
      {/* Y-axis placeholder */}
      <View style={styles.skeletonYAxis}>
        {[...Array(5)].map((_, i) => (
          <Animated.View
            key={i}
            style={[styles.skeletonLine, styles.skeletonYLabel, { opacity: pulseAnim }]}
          />
        ))}
      </View>
      {/* Chart area placeholder */}
      <View style={styles.skeletonChart}>
        {[...Array(5)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.skeletonBar,
              { height: `${20 + Math.random() * 60}%`, opacity: pulseAnim },
            ]}
          />
        ))}
      </View>
      {/* X-axis placeholder */}
      <View style={styles.skeletonXAxis}>
        {[...Array(5)].map((_, i) => (
          <Animated.View
            key={i}
            style={[styles.skeletonLine, styles.skeletonXLabel, { opacity: pulseAnim }]}
          />
        ))}
      </View>
    </View>
  );
}

// ============================================================================
// Empty State Component
// ============================================================================

function ChartEmpty({ message, height }: { message: string; height: number }) {
  return (
    <View style={[styles.empty, { height }]}>
      <View style={styles.emptyIcon}>
        <View style={styles.emptyIconBar1} />
        <View style={styles.emptyIconBar2} />
        <View style={styles.emptyIconBar3} />
      </View>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

// ============================================================================
// Component
// ============================================================================

export function Chart({
  data,
  colors,
  showTooltip = true,
  showLegend = false,
  height = 300,
  loading = false,
  emptyMessage = 'No data available',
  animate = true,
  animationDuration = 500,
  children,
  style,
}: ChartProps) {
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const animationProgress = useRef(new Animated.Value(0)).current;
  const [isAnimated, setIsAnimated] = useState(false);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  // Run animation on mount or data change
  useEffect(() => {
    if (animate && data.length > 0 && !loading) {
      animationProgress.setValue(0);
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimated(true);
      });
    } else if (!animate) {
      animationProgress.setValue(1);
      setIsAnimated(true);
    }
  }, [animate, animationDuration, data, loading, animationProgress]);

  const contextValue = useMemo(
    () => ({
      data,
      colors,
      showTooltip,
      showLegend,
      width,
      height,
      activeIndex,
      setActiveIndex,
      animationProgress,
      isAnimated,
    }),
    [data, colors, showTooltip, showLegend, width, height, activeIndex, animationProgress, isAnimated]
  );

  // Show loading skeleton
  if (loading) {
    return (
      <View style={[styles.container, { height }, style]} onLayout={handleLayout}>
        <ChartSkeleton height={height} />
      </View>
    );
  }

  // Show empty state
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height }, style]} onLayout={handleLayout}>
        <ChartEmpty message={emptyMessage} height={height} />
      </View>
    );
  }

  return (
    <ChartContext.Provider value={contextValue}>
      <View style={[styles.container, { height }, style]} onLayout={handleLayout}>
        {width > 0 && children}
      </View>
    </ChartContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  // Skeleton styles
  skeleton: {
    flexDirection: 'row',
    padding: spacing[4],
  },
  skeletonYAxis: {
    width: 40,
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
  },
  skeletonChart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  skeletonXAxis: {
    position: 'absolute',
    bottom: spacing[2],
    left: 50,
    right: spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  skeletonLine: {
    backgroundColor: colors.border.muted,
    borderRadius: 2,
  },
  skeletonYLabel: {
    width: 30,
    height: 8,
  },
  skeletonXLabel: {
    width: 40,
    height: 8,
  },
  skeletonBar: {
    width: 24,
    backgroundColor: colors.border.muted,
    borderRadius: 4,
  },
  // Empty state styles
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    marginBottom: spacing[3],
  },
  emptyIconBar1: {
    width: 12,
    height: 20,
    backgroundColor: colors.border.muted,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  emptyIconBar2: {
    width: 12,
    height: 32,
    backgroundColor: colors.border.muted,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  emptyIconBar3: {
    width: 12,
    height: 26,
    backgroundColor: colors.border.muted,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  emptyText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.muted,
  },
});
