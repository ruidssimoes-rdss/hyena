import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

// ============================================================================
// Types
// ============================================================================

export type StatsCardVariant = 'default' | 'compact';

export interface StatsCardProps {
  /** Layout variant */
  variant?: StatsCardVariant;
  /** Children components */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface StatsCardIconProps {
  /** Icon to display (custom ReactNode) */
  children: React.ReactNode;
  /** Background color */
  color?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface StatsCardTitleProps {
  /** Title/label text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface StatsCardValueProps {
  /** The main value to display */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface StatsCardTrendProps {
  /** Trend value (positive = up, negative = down) */
  value: number;
  /** Suffix for the trend (default: '%') */
  suffix?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface StatsCardDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

// ============================================================================
// Root Component
// ============================================================================

export function StatsCard({ variant = 'default', children, style }: StatsCardProps) {
  return (
    <View style={[styles.container, variant === 'compact' && styles.containerCompact, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Icon Component
// ============================================================================

export function StatsCardIcon({ children, color, style }: StatsCardIconProps) {
  return (
    <View
      style={[
        styles.iconContainer,
        color ? { backgroundColor: `${color}20` } : {},
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Title Component
// ============================================================================

export function StatsCardTitle({ children, style }: StatsCardTitleProps) {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  );
}

// ============================================================================
// Value Component
// ============================================================================

export function StatsCardValue({ children, style }: StatsCardValueProps) {
  return (
    <Text style={[styles.value, style]}>{children}</Text>
  );
}

// ============================================================================
// Trend Component
// ============================================================================

export function StatsCardTrend({ value, suffix = '%', style }: StatsCardTrendProps) {
  const isPositive = value >= 0;
  const displayValue = Math.abs(value);

  return (
    <View style={[styles.trendContainer, style]}>
      <View style={styles.trendIconContainer}>
        {isPositive ? <TrendUpIcon /> : <TrendDownIcon />}
      </View>
      <Text
        style={[
          styles.trendText,
          isPositive ? styles.trendTextPositive : styles.trendTextNegative,
        ]}
      >
        {displayValue}{suffix}
      </Text>
    </View>
  );
}

// ============================================================================
// Description Component
// ============================================================================

export function StatsCardDescription({ children, style }: StatsCardDescriptionProps) {
  return (
    <Text style={[styles.description, style]}>{children}</Text>
  );
}

// ============================================================================
// Icons
// ============================================================================

function TrendUpIcon() {
  return (
    <View style={iconStyles.trendUp}>
      <View style={iconStyles.trendUpArrow} />
      <View style={iconStyles.trendUpLine} />
    </View>
  );
}

function TrendDownIcon() {
  return (
    <View style={iconStyles.trendDown}>
      <View style={iconStyles.trendDownArrow} />
      <View style={iconStyles.trendDownLine} />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[5],
  },
  containerCompact: {
    padding: spacing[3],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  },
  value: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIconContainer: {
    marginRight: spacing[1],
  },
  trendText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
  trendTextPositive: {
    color: colors.accent.green.DEFAULT,
  },
  trendTextNegative: {
    color: colors.accent.red.DEFAULT,
  },
  description: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
    marginTop: spacing[1],
  },
});

const iconStyles = StyleSheet.create({
  trendUp: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendUpArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.accent.green.DEFAULT,
    marginBottom: -1,
  },
  trendUpLine: {
    width: 2,
    height: 5,
    backgroundColor: colors.accent.green.DEFAULT,
  },
  trendDown: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendDownLine: {
    width: 2,
    height: 5,
    backgroundColor: colors.accent.red.DEFAULT,
  },
  trendDownArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.accent.red.DEFAULT,
    marginTop: -1,
  },
});
