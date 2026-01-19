import React, { Children, isValidElement, cloneElement } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

// ============================================================================
// Types
// ============================================================================

export type TimelineLayout = 'left' | 'alternating';
export type TimelineItemStatus = 'completed' | 'active' | 'pending';

export interface TimelineProps {
  /** Layout mode */
  layout?: TimelineLayout;
  /** Children (TimelineItem components) */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface TimelineItemProps {
  /** Status of this item */
  status?: TimelineItemStatus;
  /** Whether this is the last item */
  isLast?: boolean;
  /** Index for alternating layout */
  index?: number;
  /** Layout inherited from parent */
  layout?: TimelineLayout;
  /** Children components */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TimelineIconProps {
  /** Custom icon (ReactNode) or use default dot */
  children?: React.ReactNode;
  /** Status for default styling */
  status?: TimelineItemStatus;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TimelineConnectorProps {
  /** Whether this is the last item (hides connector) */
  isLast?: boolean;
  /** Status for styling */
  status?: TimelineItemStatus;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TimelineContentProps {
  /** Children components */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TimelineTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface TimelineDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface TimelineTimeProps {
  /** Time/date text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

// ============================================================================
// Root Component
// ============================================================================

export function Timeline({ layout = 'left', children, style }: TimelineProps) {
  const childArray = Children.toArray(children);

  return (
    <View style={[styles.container, style]}>
      {childArray.map((child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<TimelineItemProps>, {
            isLast: index === childArray.length - 1,
            index,
            layout,
          });
        }
        return child;
      })}
    </View>
  );
}

// ============================================================================
// Item Component
// ============================================================================

export function TimelineItem({
  status = 'pending',
  isLast = false,
  index = 0,
  layout = 'left',
  children,
  style,
}: TimelineItemProps) {
  const isAlternating = layout === 'alternating';
  const isRight = isAlternating && index % 2 === 1;

  // Extract icon, connector, and content from children
  let iconElement: React.ReactNode = null;
  let connectorElement: React.ReactNode = null;
  const contentElements: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === TimelineIcon) {
        iconElement = cloneElement(child as React.ReactElement<TimelineIconProps>, { status });
      } else if (child.type === TimelineConnector) {
        connectorElement = cloneElement(child as React.ReactElement<TimelineConnectorProps>, { isLast, status });
      } else {
        contentElements.push(child);
      }
    } else {
      contentElements.push(child);
    }
  });

  // Default icon if none provided
  if (!iconElement) {
    iconElement = <TimelineIcon status={status} />;
  }

  // Default connector if none provided
  if (!connectorElement) {
    connectorElement = <TimelineConnector isLast={isLast} status={status} />;
  }

  if (isAlternating) {
    return (
      <View style={[styles.itemAlternating, style]}>
        <View style={[styles.contentAlternating, isRight && styles.contentAlternatingRight]}>
          {!isRight && contentElements}
        </View>
        <View style={styles.iconColumn}>
          {iconElement}
          {connectorElement}
        </View>
        <View style={[styles.contentAlternating, !isRight && styles.contentAlternatingLeft]}>
          {isRight && contentElements}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.item, style]}>
      <View style={styles.iconColumn}>
        {iconElement}
        {connectorElement}
      </View>
      <View style={styles.content}>
        {contentElements}
      </View>
    </View>
  );
}

// ============================================================================
// Icon Component
// ============================================================================

export function TimelineIcon({ children, status = 'pending', style }: TimelineIconProps) {
  if (children) {
    return (
      <View style={[styles.iconContainer, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.iconContainer, style]}>
      <View
        style={[
          styles.dot,
          status === 'completed' && styles.dotCompleted,
          status === 'active' && styles.dotActive,
          status === 'pending' && styles.dotPending,
        ]}
      >
        {status === 'completed' && <CheckIcon />}
        {status === 'active' && <View style={styles.dotActiveInner} />}
      </View>
    </View>
  );
}

// ============================================================================
// Connector Component
// ============================================================================

export function TimelineConnector({ isLast, status = 'pending', style }: TimelineConnectorProps) {
  if (isLast) {
    return null;
  }

  return (
    <View
      style={[
        styles.connector,
        status === 'completed' && styles.connectorCompleted,
        status === 'active' && styles.connectorActive,
        style,
      ]}
    />
  );
}

// ============================================================================
// Content Component
// ============================================================================

export function TimelineContent({ children, style }: TimelineContentProps) {
  return (
    <View style={[styles.contentWrapper, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Title Component
// ============================================================================

export function TimelineTitle({ children, style }: TimelineTitleProps) {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  );
}

// ============================================================================
// Description Component
// ============================================================================

export function TimelineDescription({ children, style }: TimelineDescriptionProps) {
  return (
    <Text style={[styles.description, style]}>{children}</Text>
  );
}

// ============================================================================
// Time Component
// ============================================================================

export function TimelineTime({ children, style }: TimelineTimeProps) {
  return (
    <Text style={[styles.time, style]}>{children}</Text>
  );
}

// ============================================================================
// Icons
// ============================================================================

function CheckIcon() {
  return (
    <View style={iconStyles.check}>
      <View style={iconStyles.checkShort} />
      <View style={iconStyles.checkLong} />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
  },
  itemAlternating: {
    flexDirection: 'row',
  },
  iconColumn: {
    alignItems: 'center',
    width: 32,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCompleted: {
    backgroundColor: colors.accent.green.DEFAULT,
    borderColor: colors.accent.green.DEFAULT,
  },
  dotActive: {
    backgroundColor: colors.bg.surface,
    borderColor: colors.accent.blue.DEFAULT,
  },
  dotActiveInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  dotPending: {
    backgroundColor: colors.bg.surface,
    borderColor: colors.border.strong,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 32,
    backgroundColor: colors.border.default,
    marginVertical: spacing[1],
  },
  connectorCompleted: {
    backgroundColor: colors.accent.green.DEFAULT,
  },
  connectorActive: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  content: {
    flex: 1,
    paddingLeft: spacing[3],
    paddingBottom: spacing[6],
  },
  contentAlternating: {
    flex: 1,
    paddingBottom: spacing[6],
  },
  contentAlternatingRight: {
    paddingLeft: spacing[3],
    alignItems: 'flex-start',
  },
  contentAlternatingLeft: {
    paddingRight: spacing[3],
    alignItems: 'flex-end',
  },
  contentWrapper: {
    // Additional wrapper for TimelineContent if needed
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  description: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  },
  time: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
});

const iconStyles = StyleSheet.create({
  check: {
    width: 8,
    height: 6,
    position: 'relative',
  },
  checkShort: {
    position: 'absolute',
    width: 1.5,
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    left: 1,
    transform: [{ rotate: '-45deg' }],
  },
  checkLong: {
    position: 'absolute',
    width: 1.5,
    height: 6,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    right: 1,
    transform: [{ rotate: '45deg' }],
  },
});
