import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export type SwitchSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<SwitchSize, { width: number; height: number; thumb: number; offset: number }> = {
  sm: { width: 36, height: 20, thumb: 16, offset: 2 },
  md: { width: 44, height: 24, thumb: 20, offset: 2 },
  lg: { width: 52, height: 28, thumb: 24, offset: 2 },
};

export interface SwitchProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable the switch */
  disabled?: boolean;
  /** Switch size */
  size?: SwitchSize;
  /** Switch label */
  label?: string;
  /** Label description */
  description?: string;
  /** Additional container styles */
  style?: ViewStyle;
}

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  label,
  description,
  style,
}: SwitchProps) {
  const sizeConfig = sizeStyles[size];
  const translateDistance = sizeConfig.width - sizeConfig.thumb - sizeConfig.offset * 2;

  const translateX = useRef(
    new Animated.Value(checked ? translateDistance : 0)
  ).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: checked ? translateDistance : 0,
      useNativeDriver: true,
      tension: 300,
      friction: 15,
    }).start();
  }, [checked, translateX, translateDistance]);

  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const dynamicStyles = useMemo(() => ({
    track: {
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.height / 2,
      padding: sizeConfig.offset,
    },
    thumb: {
      width: sizeConfig.thumb,
      height: sizeConfig.thumb,
      borderRadius: sizeConfig.thumb / 2,
    },
  }), [sizeConfig]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, style]}
      accessibilityRole="switch"
      accessibilityState={{ checked }}
    >
      <View
        style={[
          styles.track,
          dynamicStyles.track,
          checked && styles.trackChecked,
          disabled && styles.trackDisabled,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            dynamicStyles.thumb,
            disabled && styles.thumbDisabled,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
      {(label || description) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text style={[styles.label, disabled && styles.labelDisabled]}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={[styles.description, disabled && styles.descriptionDisabled]}>
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  track: {
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
    justifyContent: 'center',
  },
  trackChecked: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  trackDisabled: {
    backgroundColor: colors.bg.surface,
    borderColor: colors.border.muted,
  },
  thumb: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbDisabled: {
    backgroundColor: colors.text.muted,
  },
  labelContainer: {
    marginLeft: spacing[3],
    flex: 1,
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
  labelDisabled: {
    color: colors.text.muted,
  },
  description: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  descriptionDisabled: {
    color: colors.text.muted,
  },
});
