import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { TOUCH_TARGET, getHitSlop, interactiveSize } from '../../utils/platform';

// Types
export type RadioGroupOrientation = 'horizontal' | 'vertical';
export type RadioGroupSize = 'sm' | 'md' | 'lg';

const sizeStyles: Record<RadioGroupSize, { outer: number; inner: number }> = {
  sm: { outer: 16, inner: 8 },
  md: { outer: 20, inner: 10 },
  lg: { outer: 24, inner: 12 },
};

export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  /** Radio button size */
  size?: RadioGroupSize;
  orientation?: RadioGroupOrientation;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  /** Override group size for this item */
  size?: RadioGroupSize;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface RadioGroupLabelProps {
  children?: ReactNode;
  style?: TextStyle;
}

// Context
interface RadioGroupContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
  size: RadioGroupSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

// Context for RadioGroupItem
interface RadioGroupItemContextValue {
  value: string;
  isSelected: boolean;
  disabled: boolean;
  size: RadioGroupSize;
}

const RadioGroupItemContext = createContext<RadioGroupItemContextValue | undefined>(undefined);

// RadioGroupLabel
export function RadioGroupLabel({ children, style }: RadioGroupLabelProps) {
  const context = useContext(RadioGroupItemContext);

  if (!context) {
    throw new Error('RadioGroupLabel must be used within RadioGroupItem');
  }

  const { disabled } = context;

  return (
    <Text style={[styles.label, disabled && styles.labelDisabled, style]}>
      {children}
    </Text>
  );
}

// RadioGroupItem
export function RadioGroupItem({
  value,
  disabled: itemDisabled = false,
  size: itemSize,
  children,
  style,
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('RadioGroupItem must be used within RadioGroup');
  }

  const { value: selectedValue, onValueChange, disabled: groupDisabled, size: groupSize } = context;
  const disabled = groupDisabled || itemDisabled;
  const isSelected = selectedValue === value;
  const size = itemSize || groupSize;
  const sizeConfig = sizeStyles[size];

  const scaleAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isSelected ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }),
      Animated.timing(opacityAnim, {
        toValue: isSelected ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSelected, scaleAnim, opacityAnim]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onValueChange(value);
    }
  }, [disabled, onValueChange, value]);

  // Calculate hitSlop for platform-aware touch targets (44pt iOS / 48dp Android)
  const radioHitSlop = useMemo(
    () => getHitSlop(sizeConfig.outer),
    [sizeConfig.outer]
  );

  const dynamicStyles = useMemo(() => ({
    radio: {
      width: sizeConfig.outer,
      height: sizeConfig.outer,
      borderRadius: sizeConfig.outer / 2,
    },
    radioInner: {
      width: sizeConfig.inner,
      height: sizeConfig.inner,
      borderRadius: sizeConfig.inner / 2,
    },
  }), [sizeConfig]);

  return (
    <RadioGroupItemContext.Provider value={{ value, isSelected, disabled, size }}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.item,
          { minHeight: TOUCH_TARGET },
          pressed && !disabled && styles.itemPressed,
          style,
        ]}
        hitSlop={radioHitSlop}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected, disabled }}
      >
        <View style={[styles.radio, dynamicStyles.radio, disabled && styles.radioDisabled]}>
          <Animated.View
            style={[
              styles.radioInner,
              dynamicStyles.radioInner,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          />
        </View>
        {children && (
          <View style={styles.content}>
            {typeof children === 'string' ? (
              <RadioGroupLabel>{children}</RadioGroupLabel>
            ) : (
              children
            )}
          </View>
        )}
      </Pressable>
    </RadioGroupItemContext.Provider>
  );
}

// Main RadioGroup Component
export function RadioGroup({
  value,
  onValueChange,
  defaultValue,
  disabled = false,
  size = 'md',
  orientation = 'vertical',
  children,
  style,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange, disabled, size }}
    >
      <View
        style={[
          styles.group,
          orientation === 'horizontal' && styles.groupHorizontal,
          style,
        ]}
        accessibilityRole="radiogroup"
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: spacing[3],
  },
  groupHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  itemPressed: {
    opacity: 0.7,
  },
  radio: {
    borderWidth: 2,
    borderColor: colors.border.strong,
    backgroundColor: colors.bg.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDisabled: {
    borderColor: colors.border.default,
    backgroundColor: colors.bg.raised,
  },
  radioInner: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  content: {
    flex: 1,
  },
  label: {
    color: colors.text.primary,
    fontSize: 15,
  },
  labelDisabled: {
    color: colors.text.muted,
  },
});
