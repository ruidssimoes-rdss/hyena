import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';

export interface ComboboxListProps {
  /** List content (ComboboxItems, ComboboxGroups, ComboboxEmpty) */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function ComboboxList({ children, style }: ComboboxListProps) {
  return (
    <ScrollView
      style={[styles.container, style]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 250,
  },
  content: {
    paddingVertical: 4,
  },
});
