import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import {
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroBadge,
  Button,
  Text,
} from '@r-ui/react-native';

const meta: Meta<typeof Hero> = {
  title: 'Components/Marketing/Hero',
  component: Hero,
  argTypes: {
    variant: {
      control: 'select',
      options: ['centered', 'split', 'image-background'],
      description: 'Layout variant',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment',
    },
  },
  args: {
    variant: 'centered',
    align: 'center',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: (args) => (
    <Hero {...args}>
      <HeroContent>
        <HeroBadge>New Release</HeroBadge>
        <HeroTitle>Build faster with r/ui</HeroTitle>
        <HeroSubtitle>
          A comprehensive component library for React Native that helps you build beautiful,
          accessible applications in record time.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Get Started</Button>
          <Button variant="secondary" size="lg">View Docs</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const Centered: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroBadge variant="success">v2.0 Now Available</HeroBadge>
        <HeroTitle>Ship beautiful apps in days, not months</HeroTitle>
        <HeroSubtitle>
          Stop reinventing the wheel. r/ui gives you 50+ production-ready components,
          design tokens, and patterns that work together seamlessly.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Start Building</Button>
          <Button variant="ghost" size="lg">See Examples</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <Hero variant="centered" align="left">
      <HeroContent>
        <HeroBadge variant="info">For Teams</HeroBadge>
        <HeroTitle>Enterprise-grade components for modern teams</HeroTitle>
        <HeroSubtitle>
          Built for scale, designed for developers. Get dedicated support, custom theming,
          and priority access to new features.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Contact Sales</Button>
          <Button variant="secondary" size="lg">View Pricing</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const WithGradientTitle: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroBadge>Now in Beta</HeroBadge>
        <HeroTitle gradient gradientColors={['#3b82f6', '#8b5cf6', '#ec4899']}>
          The future of React Native development
        </HeroTitle>
        <HeroSubtitle>
          Experience the next generation of component design with AI-powered
          customization and real-time collaboration features.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Join the Beta</Button>
          <Button variant="ghost" size="lg">Learn More</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const WithGradientBackground: Story = {
  render: () => (
    <Hero
      variant="centered"
      align="center"
      gradientColors={['#1e3a5f', '#3b82f6', '#8b5cf6']}
    >
      <HeroContent>
        <HeroBadge variant="default">Special Offer</HeroBadge>
        <HeroTitle style={styles.whiteText}>
          Get 50% off your first year
        </HeroTitle>
        <HeroSubtitle style={styles.lightText}>
          Limited time offer for new customers. Start building with r/ui Pro
          and unlock all premium components and features.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="secondary" size="lg">Claim Offer</Button>
          <Button variant="ghost" size="lg" style={styles.ghostButton}>
            View Plans
          </Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const MinimalHero: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroTitle>Simple. Powerful. Beautiful.</HeroTitle>
        <HeroSubtitle>
          Everything you need, nothing you don't.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Get Started Free</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const ProductLaunch: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroBadge variant="warning">Coming Soon</HeroBadge>
        <HeroTitle gradient>Introducing r/ui Studio</HeroTitle>
        <HeroSubtitle>
          A visual builder for r/ui components. Design, customize, and export
          production-ready code with our drag-and-drop interface.
        </HeroSubtitle>
        <HeroActions direction="column">
          <Button variant="primary" size="lg">Join the Waitlist</Button>
          <Text style={styles.waitlistNote}>
            Be the first to know when we launch. No spam, ever.
          </Text>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const AppLanding: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroBadge variant="success">4.9 Rating</HeroBadge>
        <HeroTitle>Your finances, simplified</HeroTitle>
        <HeroSubtitle>
          Track spending, set budgets, and reach your financial goals with
          our award-winning app. Used by over 2 million people worldwide.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Download App</Button>
          <Button variant="secondary" size="lg">Watch Demo</Button>
        </HeroActions>
        <View style={styles.trustBadges}>
          <Text style={styles.trustText}>Trusted by teams at</Text>
          <View style={styles.logos}>
            <Text style={styles.logoText}>Google</Text>
            <Text style={styles.logoText}>Microsoft</Text>
            <Text style={styles.logoText}>Apple</Text>
            <Text style={styles.logoText}>Meta</Text>
          </View>
        </View>
      </HeroContent>
    </Hero>
  ),
};

export const DeveloperFocused: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroTitle>
          npm install @r-ui/react-native
        </HeroTitle>
        <HeroSubtitle>
          Get up and running in under 5 minutes. Our CLI handles setup,
          theming, and component generation so you can focus on building.
        </HeroSubtitle>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {'npx r-ui init'}
          </Text>
        </View>
        <HeroActions>
          <Button variant="primary" size="lg">Read the Docs</Button>
          <Button variant="ghost" size="lg">View on GitHub</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const AllBadgeVariants: Story = {
  render: () => (
    <View style={styles.badgeShowcase}>
      <Hero variant="centered" align="center" style={styles.miniHero}>
        <HeroContent>
          <HeroBadge variant="default">Default Badge</HeroBadge>
          <HeroTitle>Default Badge Style</HeroTitle>
        </HeroContent>
      </Hero>
      <Hero variant="centered" align="center" style={styles.miniHero}>
        <HeroContent>
          <HeroBadge variant="success">Success Badge</HeroBadge>
          <HeroTitle>Success Badge Style</HeroTitle>
        </HeroContent>
      </Hero>
      <Hero variant="centered" align="center" style={styles.miniHero}>
        <HeroContent>
          <HeroBadge variant="warning">Warning Badge</HeroBadge>
          <HeroTitle>Warning Badge Style</HeroTitle>
        </HeroContent>
      </Hero>
      <Hero variant="centered" align="center" style={styles.miniHero}>
        <HeroContent>
          <HeroBadge variant="info">Info Badge</HeroBadge>
          <HeroTitle>Info Badge Style</HeroTitle>
        </HeroContent>
      </Hero>
    </View>
  ),
};

export const RightAligned: Story = {
  render: () => (
    <Hero variant="centered" align="right">
      <HeroContent>
        <HeroBadge>Premium</HeroBadge>
        <HeroTitle>Exclusive features for power users</HeroTitle>
        <HeroSubtitle>
          Advanced analytics, custom integrations, and priority support
          for teams that demand the best.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Upgrade Now</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const ColumnActions: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroTitle>Choose your plan</HeroTitle>
        <HeroSubtitle>
          Start free and upgrade as you grow. No credit card required.
        </HeroSubtitle>
        <HeroActions direction="column">
          <Button variant="primary" size="lg">Start Free Trial</Button>
          <Button variant="secondary" size="lg">Compare Plans</Button>
          <Button variant="ghost" size="lg">Contact Sales</Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  ),
};

export const SaaSLanding: Story = {
  render: () => (
    <Hero variant="centered" align="center">
      <HeroContent>
        <HeroBadge variant="info">New: AI-Powered</HeroBadge>
        <HeroTitle>
          Automate your workflow with intelligent agents
        </HeroTitle>
        <HeroSubtitle>
          Our AI understands your business processes and automates repetitive tasks,
          saving your team 10+ hours per week on average.
        </HeroSubtitle>
        <HeroActions>
          <Button variant="primary" size="lg">Start Free Trial</Button>
          <Button variant="secondary" size="lg">Book a Demo</Button>
        </HeroActions>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>500+</Text>
            <Text style={styles.statLabel}>Companies</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>10M+</Text>
            <Text style={styles.statLabel}>Tasks Automated</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>99.9%</Text>
            <Text style={styles.statLabel}>Uptime</Text>
          </View>
        </View>
      </HeroContent>
    </Hero>
  ),
};

const styles = StyleSheet.create({
  whiteText: {
    color: '#ffffff',
  },
  lightText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  ghostButton: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  waitlistNote: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  trustBadges: {
    marginTop: 32,
    alignItems: 'center',
  },
  trustText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  logos: {
    flexDirection: 'row',
    gap: 32,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9ca3af',
  },
  codeBlock: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    color: '#10b981',
    fontSize: 16,
  },
  badgeShowcase: {
    gap: 24,
  },
  miniHero: {
    paddingVertical: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 48,
    marginTop: 32,
    justifyContent: 'center',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
});
