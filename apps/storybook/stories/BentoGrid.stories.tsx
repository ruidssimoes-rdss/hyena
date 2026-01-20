import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import {
  BentoGrid,
  BentoGridItem,
  Text,
  Heading,
} from '@r-ui/react-native';

const meta: Meta<typeof BentoGrid> = {
  title: 'Components/Marketing/BentoGrid',
  component: BentoGrid,
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns in the grid',
    },
    gap: {
      control: 'select',
      options: [2, 4, 6, 8],
      description: 'Gap between items (spacing units)',
    },
  },
  args: {
    columns: 3,
    gap: 4,
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof BentoGrid>;

export const Default: Story = {
  render: (args) => (
    <BentoGrid {...args}>
      <BentoGridItem>
        <Heading level={4}>Lightning Fast</Heading>
        <Text style={styles.itemDescription}>
          Optimized for performance with lazy loading and code splitting built-in.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Heading level={4}>Type Safe</Heading>
        <Text style={styles.itemDescription}>
          Full TypeScript support with comprehensive type definitions.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Heading level={4}>Accessible</Heading>
        <Text style={styles.itemDescription}>
          WCAG 2.1 compliant components with proper ARIA attributes.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Heading level={4}>Customizable</Heading>
        <Text style={styles.itemDescription}>
          Fully themeable with design tokens and CSS variables.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Heading level={4}>Cross Platform</Heading>
        <Text style={styles.itemDescription}>
          Works seamlessly on iOS, Android, and Web with React Native.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Heading level={4}>Well Documented</Heading>
        <Text style={styles.itemDescription}>
          Comprehensive documentation with live examples and API references.
        </Text>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const MixedSpans: Story = {
  render: () => (
    <BentoGrid columns={4} gap={4}>
      <BentoGridItem colSpan={2} rowSpan={2}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>2.5M+</Text>
          <Text style={styles.statLabel}>Downloads</Text>
          <Text style={styles.statDescription}>
            Trusted by developers worldwide to build production applications.
          </Text>
        </View>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <Heading level={4}>Built for Scale</Heading>
        <Text style={styles.itemDescription}>
          Handle millions of users with confidence using our battle-tested components.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.statNumber}>99.9%</Text>
        <Text style={styles.statLabel}>Uptime</Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.statNumber}>50ms</Text>
        <Text style={styles.statLabel}>Avg Response</Text>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <Heading level={4}>Enterprise Ready</Heading>
        <Text style={styles.itemDescription}>
          SOC 2 compliant with dedicated support and SLAs available.
        </Text>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <Heading level={4}>Active Community</Heading>
        <Text style={styles.itemDescription}>
          Join 10,000+ developers sharing ideas and solutions on Discord.
        </Text>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <BentoGrid columns={{ sm: 1, md: 2, lg: 4 }} gap={4}>
      <BentoGridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
        <View style={styles.featureHighlight}>
          <Text style={styles.featureIcon}>🚀</Text>
          <Heading level={3}>Ship Faster</Heading>
          <Text style={styles.itemDescription}>
            Pre-built components mean less time coding and more time delivering value to your users.
          </Text>
        </View>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.featureIcon}>🎨</Text>
        <Heading level={4}>Beautiful UI</Heading>
        <Text style={styles.itemDescription}>
          Professionally designed components that look great out of the box.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.featureIcon}>⚡</Text>
        <Heading level={4}>Performant</Heading>
        <Text style={styles.itemDescription}>
          Optimized for 60fps animations and minimal bundle size.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.featureIcon}>🔧</Text>
        <Heading level={4}>Flexible</Heading>
        <Text style={styles.itemDescription}>
          Easily extend and customize to match your brand.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.featureIcon}>📱</Text>
        <Heading level={4}>Mobile First</Heading>
        <Text style={styles.itemDescription}>
          Designed for touch interactions and responsive layouts.
        </Text>
      </BentoGridItem>
      <BentoGridItem colSpan={{ sm: 1, md: 2, lg: 2 }}>
        <View style={styles.ctaCard}>
          <Heading level={4}>Ready to get started?</Heading>
          <Text style={styles.itemDescription}>
            Install r/ui today and start building beautiful applications in minutes.
          </Text>
          <View style={styles.codeSnippet}>
            <Text style={styles.codeText}>npm install @r-ui/react-native</Text>
          </View>
        </View>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <BentoGrid columns={2} gap={6}>
      <BentoGridItem>
        <Heading level={4}>Developer Experience</Heading>
        <Text style={styles.itemDescription}>
          Intuitive APIs with excellent IDE support and helpful error messages.
        </Text>
      </BentoGridItem>
      <BentoGridItem>
        <Heading level={4}>Design System</Heading>
        <Text style={styles.itemDescription}>
          Consistent design language with tokens for colors, spacing, and typography.
        </Text>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <View style={styles.testimonialCard}>
          <Text style={styles.quote}>
            "r/ui transformed how our team builds interfaces. We shipped our redesign 3x faster than expected."
          </Text>
          <Text style={styles.author}>— Sarah Chen, Engineering Lead at TechCorp</Text>
        </View>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <BentoGrid columns={4} gap={4}>
      <BentoGridItem>
        <Text style={styles.metricLabel}>Total Users</Text>
        <Text style={styles.metricValue}>12,847</Text>
        <Text style={styles.metricChange}>+12% this month</Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.metricLabel}>Revenue</Text>
        <Text style={styles.metricValue}>$48.2K</Text>
        <Text style={styles.metricChange}>+8% this month</Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.metricLabel}>Active Sessions</Text>
        <Text style={styles.metricValue}>1,429</Text>
        <Text style={styles.metricChange}>+23% this hour</Text>
      </BentoGridItem>
      <BentoGridItem>
        <Text style={styles.metricLabel}>Conversion</Text>
        <Text style={styles.metricValue}>4.28%</Text>
        <Text style={styles.metricChange}>+0.5% this week</Text>
      </BentoGridItem>
      <BentoGridItem colSpan={2} rowSpan={2}>
        <Heading level={4}>Revenue Overview</Heading>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Chart Area</Text>
        </View>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <Heading level={4}>Top Products</Heading>
        <View style={styles.listItem}>
          <Text>1. Premium Plan</Text>
          <Text style={styles.listValue}>$24,500</Text>
        </View>
        <View style={styles.listItem}>
          <Text>2. Team Plan</Text>
          <Text style={styles.listValue}>$18,200</Text>
        </View>
        <View style={styles.listItem}>
          <Text>3. Starter Plan</Text>
          <Text style={styles.listValue}>$5,500</Text>
        </View>
      </BentoGridItem>
      <BentoGridItem colSpan={2}>
        <Heading level={4}>Recent Activity</Heading>
        <Text style={styles.activityItem}>New signup from alex@example.com</Text>
        <Text style={styles.activityItem}>Upgrade to Pro by user_2847</Text>
        <Text style={styles.activityItem}>Feature request submitted</Text>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <BentoGrid columns={3} gap={4}>
      <BentoGridItem colSpan={3}>
        <View style={styles.singleItemContent}>
          <Heading level={3}>Welcome to r/ui</Heading>
          <Text style={styles.itemDescription}>
            A comprehensive component library for React Native that helps you build beautiful,
            accessible applications faster than ever before.
          </Text>
        </View>
      </BentoGridItem>
    </BentoGrid>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <BentoGrid columns={4} gap={3}>
      {Array.from({ length: 12 }, (_, i) => (
        <BentoGridItem key={i}>
          <Text style={styles.itemNumber}>#{i + 1}</Text>
          <Text style={styles.featureTitle}>Feature {i + 1}</Text>
          <Text style={styles.itemDescription}>
            Short description of feature {i + 1} and its benefits.
          </Text>
        </BentoGridItem>
      ))}
    </BentoGrid>
  ),
};

const styles = StyleSheet.create({
  itemDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    lineHeight: 20,
  },
  statCard: {
    height: '100%',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
    lineHeight: 20,
  },
  featureHighlight: {
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  ctaCard: {
    paddingVertical: 8,
  },
  codeSnippet: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    color: '#10b981',
    fontSize: 14,
  },
  testimonialCard: {
    paddingVertical: 16,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#374151',
    lineHeight: 28,
  },
  author: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 4,
  },
  chartPlaceholder: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    height: 150,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  listValue: {
    fontWeight: '600',
    color: '#111827',
  },
  activityItem: {
    fontSize: 14,
    color: '#6b7280',
    paddingVertical: 6,
  },
  singleItemContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  itemNumber: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});
