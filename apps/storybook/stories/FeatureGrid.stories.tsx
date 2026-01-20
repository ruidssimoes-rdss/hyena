import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import {
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  Text,
} from '@r-ui/react-native';

// Simple icon components for the stories
const RocketIcon = () => <RNText style={styles.iconText}>🚀</RNText>;
const ShieldIcon = () => <RNText style={styles.iconText}>🛡️</RNText>;
const BoltIcon = () => <RNText style={styles.iconText}>⚡</RNText>;
const LayersIcon = () => <RNText style={styles.iconText}>📚</RNText>;
const CodeIcon = () => <RNText style={styles.iconText}>💻</RNText>;
const GlobeIcon = () => <RNText style={styles.iconText}>🌍</RNText>;
const HeartIcon = () => <RNText style={styles.iconText}>❤️</RNText>;
const LockIcon = () => <RNText style={styles.iconText}>🔒</RNText>;
const CloudIcon = () => <RNText style={styles.iconText}>☁️</RNText>;
const ChartIcon = () => <RNText style={styles.iconText}>📊</RNText>;
const PlugIcon = () => <RNText style={styles.iconText}>🔌</RNText>;
const StarIcon = () => <RNText style={styles.iconText}>⭐</RNText>;

const meta: Meta<typeof FeatureGrid> = {
  title: 'Components/Marketing/FeatureGrid',
  component: FeatureGrid,
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
      description: 'Number of columns',
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Gap between cards',
    },
  },
  args: {
    columns: 3,
    gap: 'md',
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof FeatureGrid>;

export const Default: Story = {
  render: (args) => (
    <FeatureGrid {...args}>
      <FeatureCard
        icon={<FeatureIcon><RocketIcon /></FeatureIcon>}
        title="Lightning Fast"
        description="Optimized for performance with lazy loading and tree-shaking built right in."
      />
      <FeatureCard
        icon={<FeatureIcon><ShieldIcon /></FeatureIcon>}
        title="Secure by Default"
        description="Built with security best practices and regular vulnerability audits."
      />
      <FeatureCard
        icon={<FeatureIcon><BoltIcon /></FeatureIcon>}
        title="Real-time Updates"
        description="WebSocket-powered live updates keep your data synchronized instantly."
      />
      <FeatureCard
        icon={<FeatureIcon><LayersIcon /></FeatureIcon>}
        title="Modular Design"
        description="Import only what you need with our tree-shakeable component library."
      />
      <FeatureCard
        icon={<FeatureIcon><CodeIcon /></FeatureIcon>}
        title="Developer First"
        description="TypeScript support, comprehensive docs, and excellent IDE integration."
      />
      <FeatureCard
        icon={<FeatureIcon><GlobeIcon /></FeatureIcon>}
        title="Cross Platform"
        description="Build once, deploy everywhere with React Native support for web and mobile."
      />
    </FeatureGrid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <FeatureGrid columns={2} gap="lg">
      <FeatureCard
        icon={<FeatureIcon color="#3b82f6"><RocketIcon /></FeatureIcon>}
        title="Rapid Development"
        description="Ship features faster with pre-built, customizable components that work out of the box."
      />
      <FeatureCard
        icon={<FeatureIcon color="#10b981"><ShieldIcon /></FeatureIcon>}
        title="Enterprise Security"
        description="SOC 2 compliant infrastructure with end-to-end encryption and regular penetration testing."
      />
      <FeatureCard
        icon={<FeatureIcon color="#f59e0b"><ChartIcon /></FeatureIcon>}
        title="Built-in Analytics"
        description="Track user behavior and performance metrics with our integrated analytics dashboard."
      />
      <FeatureCard
        icon={<FeatureIcon color="#8b5cf6"><CloudIcon /></FeatureIcon>}
        title="Cloud Native"
        description="Designed for modern cloud infrastructure with auto-scaling and high availability."
      />
    </FeatureGrid>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <FeatureGrid columns={4} gap="sm">
      <FeatureCard
        icon={<FeatureIcon><BoltIcon /></FeatureIcon>}
        title="Fast"
        description="Optimized for speed"
      />
      <FeatureCard
        icon={<FeatureIcon><LockIcon /></FeatureIcon>}
        title="Secure"
        description="Enterprise-grade security"
      />
      <FeatureCard
        icon={<FeatureIcon><LayersIcon /></FeatureIcon>}
        title="Scalable"
        description="Grows with your needs"
      />
      <FeatureCard
        icon={<FeatureIcon><HeartIcon /></FeatureIcon>}
        title="Reliable"
        description="99.9% uptime SLA"
      />
    </FeatureGrid>
  ),
};

export const GlassVariant: Story = {
  decorators: [
    (Story) => (
      <View style={styles.gradientBackground}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <FeatureGrid columns={3} gap="md">
      <FeatureCard
        variant="glass"
        icon={<FeatureIcon color="#fff"><RocketIcon /></FeatureIcon>}
        title="Performance"
        description="Blazing fast load times with intelligent caching and CDN delivery."
      />
      <FeatureCard
        variant="glass"
        icon={<FeatureIcon color="#fff"><GlobeIcon /></FeatureIcon>}
        title="Global Reach"
        description="Deploy to edge locations worldwide for minimal latency everywhere."
      />
      <FeatureCard
        variant="glass"
        icon={<FeatureIcon color="#fff"><PlugIcon /></FeatureIcon>}
        title="Integrations"
        description="Connect with 100+ tools and services through our API and webhooks."
      />
    </FeatureGrid>
  ),
};

export const BorderedVariant: Story = {
  render: () => (
    <FeatureGrid columns={3} gap="md">
      <FeatureCard
        variant="bordered"
        icon={<FeatureIcon color="#3b82f6"><CodeIcon /></FeatureIcon>}
        title="Open Source"
        description="MIT licensed with an active community of contributors and maintainers."
      />
      <FeatureCard
        variant="bordered"
        icon={<FeatureIcon color="#3b82f6"><ShieldIcon /></FeatureIcon>}
        title="Type Safe"
        description="Full TypeScript support with comprehensive type definitions for all components."
      />
      <FeatureCard
        variant="bordered"
        icon={<FeatureIcon color="#3b82f6"><StarIcon /></FeatureIcon>}
        title="Well Tested"
        description="Extensive test coverage with unit, integration, and end-to-end tests."
      />
    </FeatureGrid>
  ),
};

export const IconLeftPosition: Story = {
  render: () => (
    <FeatureGrid columns={2} gap="md">
      <FeatureCard
        iconPosition="left"
        icon={<FeatureIcon><RocketIcon /></FeatureIcon>}
        title="Quick Setup"
        description="Get started in minutes with our CLI tool that scaffolds your project with best practices."
      />
      <FeatureCard
        iconPosition="left"
        icon={<FeatureIcon><LayersIcon /></FeatureIcon>}
        title="Component Library"
        description="50+ production-ready components designed for consistency and accessibility."
      />
      <FeatureCard
        iconPosition="left"
        icon={<FeatureIcon><ChartIcon /></FeatureIcon>}
        title="Analytics Dashboard"
        description="Real-time insights into your application's performance and user behavior."
      />
      <FeatureCard
        iconPosition="left"
        icon={<FeatureIcon><CloudIcon /></FeatureIcon>}
        title="Cloud Deployment"
        description="One-click deployment to major cloud providers with automatic scaling."
      />
    </FeatureGrid>
  ),
};

export const ClickableCards: Story = {
  render: () => (
    <FeatureGrid columns={3} gap="md">
      <FeatureCard
        icon={<FeatureIcon><CodeIcon /></FeatureIcon>}
        title="Documentation"
        description="Comprehensive guides, API references, and code examples to help you get started."
        onPress={() => {}}
      />
      <FeatureCard
        icon={<FeatureIcon><LayersIcon /></FeatureIcon>}
        title="Components"
        description="Browse our library of 50+ production-ready UI components with live previews."
        onPress={() => {}}
      />
      <FeatureCard
        icon={<FeatureIcon><HeartIcon /></FeatureIcon>}
        title="Community"
        description="Join thousands of developers sharing tips, tricks, and best practices."
        onPress={() => {}}
      />
    </FeatureGrid>
  ),
};

export const SingleColumn: Story = {
  render: () => (
    <View style={styles.narrowContainer}>
      <FeatureGrid columns={1} gap="md">
        <FeatureCard
          iconPosition="left"
          icon={<FeatureIcon><RocketIcon /></FeatureIcon>}
          title="Performance Optimized"
          description="Every component is optimized for minimal bundle size and maximum runtime performance."
        />
        <FeatureCard
          iconPosition="left"
          icon={<FeatureIcon><ShieldIcon /></FeatureIcon>}
          title="Accessibility First"
          description="WCAG 2.1 AA compliant components with proper ARIA attributes and keyboard navigation."
        />
        <FeatureCard
          iconPosition="left"
          icon={<FeatureIcon><CodeIcon /></FeatureIcon>}
          title="Developer Experience"
          description="Intuitive APIs with TypeScript support, great error messages, and comprehensive documentation."
        />
      </FeatureGrid>
    </View>
  ),
};

export const WithCustomColors: Story = {
  render: () => (
    <FeatureGrid columns={3} gap="md">
      <FeatureCard
        icon={<FeatureIcon color="#ef4444"><HeartIcon /></FeatureIcon>}
        title="Made with Love"
        description="Crafted with attention to detail by a team passionate about great user experiences."
      />
      <FeatureCard
        icon={<FeatureIcon color="#22c55e"><ShieldIcon /></FeatureIcon>}
        title="Privacy First"
        description="Your data stays yours. No tracking, no selling, complete privacy by design."
      />
      <FeatureCard
        icon={<FeatureIcon color="#f59e0b"><StarIcon /></FeatureIcon>}
        title="Premium Quality"
        description="Built to the highest standards with rigorous testing and code review."
      />
    </FeatureGrid>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <FeatureGrid columns={3} gap="md">
      <FeatureCard
        title="No Icon"
        description="Feature cards work great even without icons for a cleaner look."
      />
      <FeatureCard
        icon={<FeatureIcon><BoltIcon /></FeatureIcon>}
        title="With Icon"
        description="Icons help users quickly identify and remember features."
      />
      <FeatureCard
        variant="bordered"
        icon={<FeatureIcon><LayersIcon /></FeatureIcon>}
        title="Bordered Style"
        description="Use different variants to create visual hierarchy."
      />
    </FeatureGrid>
  ),
};

export const ProductFeatures: Story = {
  render: () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Why choose r/ui?</Text>
        <Text style={styles.headerSubtitle}>
          Everything you need to build modern applications, all in one place.
        </Text>
      </View>
      <FeatureGrid columns={3} gap="lg">
        <FeatureCard
          icon={<FeatureIcon color="#3b82f6"><RocketIcon /></FeatureIcon>}
          title="Ship Faster"
          description="Pre-built components mean less time coding boilerplate and more time building features your users love."
        />
        <FeatureCard
          icon={<FeatureIcon color="#8b5cf6"><CodeIcon /></FeatureIcon>}
          title="Stay Consistent"
          description="Design tokens and component APIs ensure consistency across your entire application."
        />
        <FeatureCard
          icon={<FeatureIcon color="#ec4899"><HeartIcon /></FeatureIcon>}
          title="Delight Users"
          description="Beautiful animations, accessible components, and responsive designs that work everywhere."
        />
        <FeatureCard
          icon={<FeatureIcon color="#10b981"><ShieldIcon /></FeatureIcon>}
          title="Trust & Security"
          description="Battle-tested in production by thousands of companies, with security audits and updates."
        />
        <FeatureCard
          icon={<FeatureIcon color="#f59e0b"><ChartIcon /></FeatureIcon>}
          title="Scale Confidently"
          description="From startup to enterprise, our components are built to handle millions of users."
        />
        <FeatureCard
          icon={<FeatureIcon color="#06b6d4"><GlobeIcon /></FeatureIcon>}
          title="Go Global"
          description="RTL support, i18n ready, and tested across languages and cultures worldwide."
        />
      </FeatureGrid>
    </View>
  ),
};

const styles = StyleSheet.create({
  iconText: {
    fontSize: 24,
  },
  gradientBackground: {
    backgroundColor: '#1e3a5f',
    padding: 24,
    borderRadius: 16,
  },
  narrowContainer: {
    maxWidth: 500,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
});
