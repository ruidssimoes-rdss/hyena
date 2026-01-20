import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  /** Current value */
  value?: string;
  /** Change handler */
  onValueChange?: (value: string) => void;
  /** Available options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Disable the select */
  disabled?: boolean;
  /** Select label */
  label?: string;
  /** Error or helper text */
  helperText?: string;
  /** Show error state */
  error?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  label,
  helperText,
  error = false,
  style,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const triggerRef = useRef<View>(null);
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const selectedOption = options.find((opt) => opt.value === value);
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  // Animate dropdown open/close
  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.95);
      opacityAnim.setValue(0);
      setHighlightedIndex(-1);
    }
  }, [isOpen, scaleAnim, opacityAnim]);

  const measureTrigger = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      setIsOpen(true);
    });
  }, []);

  const handleOpen = useCallback(() => {
    if (!disabled) {
      measureTrigger();
    }
  }, [disabled, measureTrigger]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onValueChange?.(optionValue);
      setIsOpen(false);
    },
    [onValueChange]
  );

  const handleDropdownLayout = useCallback((event: any) => {
    const { height } = event.nativeEvent.layout;
    setDropdownHeight(height);
  }, []);

  // Calculate dropdown position
  const calculatePosition = () => {
    if (!triggerLayout) return { top: 0, left: 0, width: 0 };

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const gap = spacing[1];
    const maxDropdownHeight = Math.min(300, windowHeight * 0.4);

    let top = triggerLayout.y + triggerLayout.height + gap;
    let left = triggerLayout.x;
    const width = triggerLayout.width;

    // Check if dropdown would overflow bottom of screen
    const estimatedHeight = dropdownHeight || maxDropdownHeight;
    if (top + estimatedHeight > windowHeight - spacing[4]) {
      // Position above trigger instead
      top = triggerLayout.y - estimatedHeight - gap;
    }

    // Keep within horizontal bounds
    if (left + width > windowWidth - spacing[2]) {
      left = windowWidth - width - spacing[2];
    }
    if (left < spacing[2]) {
      left = spacing[2];
    }

    return { top, left, width };
  };

  const position = calculatePosition();

  // Keyboard navigation handler for web
  const handleKeyDown = useCallback(
    (e: any) => {
      if (Platform.OS !== 'web') return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleSelect(options[highlightedIndex].value);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        default:
          // Type-to-select: find first option starting with typed character
          const char = e.key.toLowerCase();
          if (char.length === 1) {
            const matchIndex = options.findIndex((opt) =>
              opt.label.toLowerCase().startsWith(char)
            );
            if (matchIndex >= 0) {
              setHighlightedIndex(matchIndex);
            }
          }
      }
    },
    [options, highlightedIndex, handleSelect]
  );

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
      <Pressable
        ref={triggerRef}
        accessibilityRole="button"
        accessibilityLabel={label || 'Select'}
        accessibilityState={{ expanded: isOpen, disabled }}
        accessibilityHint="Double tap to open dropdown"
        onPress={handleOpen}
        disabled={disabled}
        style={[
          styles.trigger,
          error && styles.triggerError,
          disabled && styles.triggerDisabled,
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedOption && styles.triggerPlaceholder,
            disabled && styles.triggerTextDisabled,
          ]}
          numberOfLines={1}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <ChevronIcon isOpen={isOpen} />
      </Pressable>
      {helperText && (
        <Text style={[styles.helperText, error && styles.helperTextError]}>
          {helperText}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close dropdown"
          style={styles.backdrop}
          onPress={() => setIsOpen(false)}
        />
        {triggerLayout && (
          <Animated.View
            onLayout={handleDropdownLayout}
            style={[
              styles.dropdown,
              {
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
            // @ts-ignore - Web-only prop
            onKeyDown={Platform.OS === 'web' ? handleKeyDown : undefined}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              initialScrollIndex={selectedIndex >= 0 ? selectedIndex : 0}
              getItemLayout={(data, index) => ({
                length: 44,
                offset: 44 * index,
                index,
              })}
              renderItem={({ item, index }) => (
                <Pressable
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: item.value === value }}
                  onPress={() => handleSelect(item.value)}
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                    highlightedIndex === index && styles.optionHighlighted,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && <CheckIcon />}
                </Pressable>
              )}
              style={styles.optionsList}
            />
          </Animated.View>
        )}
      </Modal>
    </View>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={[styles.chevron, { transform: [{ rotate: rotation }] }]}>
      <View style={styles.chevronLine1} />
      <View style={styles.chevronLine2} />
    </Animated.View>
  );
}

function CheckIcon() {
  return (
    <View style={styles.checkIcon}>
      <View style={styles.checkIconShort} />
      <View style={styles.checkIconLong} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  labelDisabled: {
    color: colors.text.muted,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minHeight: 44,
  },
  triggerError: {
    borderColor: colors.accent.red.DEFAULT,
  },
  triggerDisabled: {
    backgroundColor: colors.bg.elevated,
    borderColor: colors.border.muted,
  },
  triggerText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    flex: 1,
  },
  triggerPlaceholder: {
    color: colors.text.muted,
  },
  triggerTextDisabled: {
    color: colors.text.muted,
  },
  helperText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  helperTextError: {
    color: colors.accent.red.DEFAULT,
  },
  chevron: {
    width: 10,
    height: 6,
    marginLeft: spacing[2],
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronLine1: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    left: 0,
    top: 2,
    transform: [{ rotate: '45deg' }],
  },
  chevronLine2: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    right: 0,
    top: 2,
    transform: [{ rotate: '-45deg' }],
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dropdown: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    maxHeight: 300,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  optionsList: {
    padding: spacing[1],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
    minHeight: 44,
  },
  optionSelected: {
    backgroundColor: colors.bg.surface,
  },
  optionHighlighted: {
    backgroundColor: colors.bg.elevated,
  },
  optionText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.accent.blue.DEFAULT,
    fontWeight: fontWeights.medium,
  },
  checkIcon: {
    width: 12,
    height: 10,
    position: 'relative',
    marginLeft: spacing[2],
  },
  checkIconShort: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 1,
    bottom: 0,
    left: 1,
    transform: [{ rotate: '-45deg' }],
  },
  checkIconLong: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 1,
    bottom: 0,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },
});
