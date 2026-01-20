import React, { useEffect, useRef } from 'react';
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
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export type CheckboxSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<CheckboxSize, { box: number; icon: number; checkmarkSize: number }> = {
  sm: { box: 16, icon: 12, checkmarkSize: 10 },
  md: { box: 20, icon: 14, checkmarkSize: 12 },
  lg: { box: 24, icon: 18, checkmarkSize: 14 },
};

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Indeterminate state (for "select all" patterns) */
  indeterminate?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable the checkbox */
  disabled?: boolean;
  /** Checkbox size */
  size?: CheckboxSize;
  /** Checkbox label */
  label?: string;
  /** Label description */
  description?: string;
  /** Additional container styles */
  style?: ViewStyle;
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  label,
  description,
  style,
}: CheckboxProps) {
  const scaleAnim = useRef(new Animated.Value(checked || indeterminate ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(checked || indeterminate ? 1 : 0)).current;

  const sizeConfig = sizeStyles[size];

  useEffect(() => {
    const showIcon = checked || indeterminate;
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: showIcon ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: showIcon ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checked, indeterminate, scaleAnim, opacityAnim]);

  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      // When indeterminate, clicking should set to checked
      if (indeterminate) {
        onCheckedChange(true);
      } else {
        onCheckedChange(!checked);
      }
    }
  };

  // Determine accessibility state
  const getAccessibilityChecked = (): boolean | 'mixed' => {
    if (indeterminate) return 'mixed';
    return checked;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, style]}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: getAccessibilityChecked(), disabled }}
      accessibilityLabel={label}
    >
      <View
        style={[
          styles.checkbox,
          {
            width: sizeConfig.box,
            height: sizeConfig.box,
            borderRadius: Math.round(sizeConfig.box * 0.25),
          },
          (checked || indeterminate) && styles.checkboxChecked,
          disabled && styles.checkboxDisabled,
        ]}
      >
        <Animated.View
          style={[
            styles.checkmark,
            {
              width: sizeConfig.checkmarkSize,
              height: sizeConfig.checkmarkSize,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {indeterminate ? (
            <IndeterminateIcon size={sizeConfig.icon} />
          ) : (
            <CheckIcon size={sizeConfig.icon} />
          )}
        </Animated.View>
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

function CheckIcon({ size }: { size: number }) {
  const scale = size / 14; // Base scale from md size
  return (
    <View style={[styles.checkIcon, { width: size * 0.71, height: size * 0.57 }]}>
      <View
        style={[
          styles.checkIconShort,
          {
            width: 2 * scale,
            height: 5 * scale,
            left: 1 * scale,
          },
        ]}
      />
      <View
        style={[
          styles.checkIconLong,
          {
            width: 2 * scale,
            height: 9 * scale,
            right: 1 * scale,
          },
        ]}
      />
    </View>
  );
}

function IndeterminateIcon({ size }: { size: number }) {
  return (
    <View style={styles.indeterminateIcon}>
      <View
        style={[
          styles.indeterminateDash,
          {
            width: size * 0.6,
            height: Math.max(2, size * 0.14),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    borderWidth: 2,
    borderColor: colors.border.strong,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  checkboxDisabled: {
    backgroundColor: colors.bg.elevated,
    borderColor: colors.border.muted,
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    position: 'relative',
  },
  checkIconShort: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    transform: [{ rotate: '-45deg' }],
  },
  checkIconLong: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    transform: [{ rotate: '45deg' }],
  },
  indeterminateIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indeterminateDash: {
    backgroundColor: colors.white,
    borderRadius: 1,
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
