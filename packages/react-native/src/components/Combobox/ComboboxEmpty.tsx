import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useCombobox } from './ComboboxContext';

export interface ComboboxEmptyProps {
  /** Empty state message */
  children?: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function ComboboxEmpty({
  children = 'No results found.',
  style,
  textStyle,
}: ComboboxEmptyProps) {
  const { search, items, filter } = useCombobox();

  const filteredItems = items.filter((item) =>
    filter ? filter(item.label, search, item.keywords) : true
  );

  // Only show if there's a search query and no results
  if (!search || filteredItems.length > 0) return null;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.muted,
    textAlign: 'center',
  },
});
