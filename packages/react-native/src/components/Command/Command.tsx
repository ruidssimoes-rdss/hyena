import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { GlassSurface } from '../GlassSurface';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';
import {
  CommandContext,
  CommandContextValue,
  CommandItemData,
  defaultFilter,
} from './CommandContext';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

export interface CommandProps {
  /** Command content */
  children: React.ReactNode;
  /** Custom filter function */
  filter?: (value: string, search: string, keywords?: string[]) => boolean;
  /** Callback when an item is selected */
  onSelect?: (value: string) => void;
  /** Additional styles */
  style?: ViewStyle;
  /** Control whether Command is displayed as a standalone component */
  standalone?: boolean;
}

export function Command({
  children,
  filter = defaultFilter,
  onSelect,
  style,
  standalone = true,
}: CommandProps) {
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState<CommandItemData[]>([]);

  const registerItem = useCallback((item: CommandItemData) => {
    setItems((prev) => {
      if (prev.some((i) => i.value === item.value)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  const unregisterItem = useCallback((value: string) => {
    setItems((prev) => prev.filter((i) => i.value !== value));
  }, []);

  const contextValue = useMemo<CommandContextValue>(
    () => ({
      search,
      setSearch,
      selectedValue,
      setSelectedValue,
      items,
      registerItem,
      unregisterItem,
      filter,
      onSelect,
    }),
    [search, selectedValue, items, filter, onSelect, registerItem, unregisterItem]
  );

  // Glass mode rendering
  if (isGlass && standalone) {
    return (
      <CommandContext.Provider value={contextValue}>
        <GlassSurface
          intensity={16}
          borderRadius={radius.lg}
          shadow="md"
          bordered
          style={style as ViewStyle}
        >
          {children}
        </GlassSurface>
      </CommandContext.Provider>
    );
  }

  // Default rendering
  return (
    <CommandContext.Provider value={contextValue}>
      <View style={[standalone && styles.container, style]}>{children}</View>
    </CommandContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    overflow: 'hidden',
  },
});
