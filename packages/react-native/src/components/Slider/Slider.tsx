import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export type SliderSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<SliderSize, { track: number; thumb: number }> = {
  sm: { track: 4, thumb: 16 },
  md: { track: 6, thumb: 20 },
  lg: { track: 8, thumb: 24 },
};

// Types
export interface SliderProps {
  value?: number;
  onValueChange?: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Slider size */
  size?: SliderSize;
  showTooltip?: boolean;
  style?: ViewStyle;
}

export function Slider({
  value,
  onValueChange,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = 'md',
  showTooltip = true,
  style,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const sizeConfig = sizeStyles[size];
  const thumbRadius = sizeConfig.thumb / 2;

  const thumbPosition = useRef(new Animated.Value(0)).current;
  const tooltipOpacity = useRef(new Animated.Value(0)).current;
  const tooltipScale = useRef(new Animated.Value(0.8)).current;

  // Calculate position from value
  const valueToPosition = useCallback(
    (val: number): number => {
      const percentage = (val - min) / (max - min);
      return percentage * trackWidth;
    },
    [min, max, trackWidth]
  );

  // Calculate value from position
  const positionToValue = useCallback(
    (position: number): number => {
      const percentage = Math.max(0, Math.min(1, position / trackWidth));
      let val = min + percentage * (max - min);

      // Apply step
      if (step > 0) {
        val = Math.round(val / step) * step;
      }

      // Clamp to min/max
      return Math.max(min, Math.min(max, val));
    },
    [min, max, step, trackWidth]
  );

  // Update thumb position when value changes
  useEffect(() => {
    if (trackWidth > 0) {
      const position = valueToPosition(currentValue);
      thumbPosition.setValue(position);
    }
  }, [currentValue, trackWidth, valueToPosition, thumbPosition]);

  const showTooltipAnimation = useCallback(() => {
    if (showTooltip) {
      Animated.parallel([
        Animated.timing(tooltipOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(tooltipScale, {
          toValue: 1,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showTooltip, tooltipOpacity, tooltipScale]);

  const hideTooltipAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(tooltipOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(tooltipScale, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [tooltipOpacity, tooltipScale]);

  const updateValue = useCallback(
    (position: number) => {
      const newValue = positionToValue(position);

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, positionToValue, onValueChange]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (event: GestureResponderEvent) => {
        setIsDragging(true);
        showTooltipAnimation();

        // Calculate position from touch
        const touchX = event.nativeEvent.locationX;
        updateValue(touchX);
        thumbPosition.setValue(Math.max(0, Math.min(trackWidth, touchX)));
      },
      onPanResponderMove: (
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const newPosition = Math.max(
          0,
          Math.min(trackWidth, valueToPosition(currentValue) + gestureState.dx)
        );
        thumbPosition.setValue(newPosition);
        updateValue(newPosition);
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
        hideTooltipAnimation();
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
        hideTooltipAnimation();
      },
    })
  ).current;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setTrackWidth(width);
  }, []);

  const fillWidth = thumbPosition.interpolate({
    inputRange: [0, trackWidth || 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const dynamicStyles = useMemo(() => ({
    track: {
      height: sizeConfig.track,
      borderRadius: sizeConfig.track / 2,
    },
    fill: {
      borderRadius: sizeConfig.track / 2,
    },
    thumb: {
      width: sizeConfig.thumb,
      height: sizeConfig.thumb,
      borderRadius: thumbRadius,
      top: -(sizeConfig.thumb - sizeConfig.track) / 2,
    },
  }), [sizeConfig, thumbRadius]);

  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.track, dynamicStyles.track, disabled && styles.trackDisabled]}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        {/* Fill (active track) */}
        <Animated.View
          style={[
            styles.fill,
            dynamicStyles.fill,
            disabled && styles.fillDisabled,
            { width: fillWidth },
          ]}
        />

        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            dynamicStyles.thumb,
            disabled && styles.thumbDisabled,
            isDragging && styles.thumbActive,
            {
              transform: [
                { translateX: Animated.subtract(thumbPosition, new Animated.Value(thumbRadius)) },
              ],
            },
          ]}
        >
          {/* Tooltip */}
          {showTooltip && (
            <Animated.View
              style={[
                styles.tooltip,
                {
                  bottom: sizeConfig.thumb + 8,
                  left: -(40 - sizeConfig.thumb) / 2,
                  opacity: tooltipOpacity,
                  transform: [{ scale: tooltipScale }],
                },
              ]}
            >
              <Text style={styles.tooltipText}>
                {Math.round(currentValue)}
              </Text>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[5],
  },
  track: {
    backgroundColor: colors.bg.elevated,
    justifyContent: 'center',
  },
  trackDisabled: {
    backgroundColor: colors.bg.surface,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  fillDisabled: {
    backgroundColor: colors.border.default,
  },
  thumb: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.accent.blue.DEFAULT,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbDisabled: {
    backgroundColor: colors.bg.surface,
    borderColor: colors.border.default,
  },
  thumbActive: {
    borderColor: colors.accent.blue.dark,
  },
  tooltip: {
    position: 'absolute',
    width: 40,
    height: 28,
    backgroundColor: colors.bg.elevated,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  tooltipText: {
    color: colors.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});
