import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet, TextInput } from 'react-native';
import {
  CTA,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAActions,
  Button,
  Text,
} from '@r-ui/react-native';

const meta: Meta<typeof CTA> = {
  title: 'Components/Marketing/CTA',
  component: CTA,
  argTypes: {
    variant: {
      control: 'select',
      options: ['banner', 'card', 'inline'],
      description: 'Layout variant',
    },
    background: {
      control: 'select',
      options: ['gradient', 'solid', 'image'],
      description: 'Background type',
    },
    align: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Content alignment',
    },
  },
  args: {
    variant: 'banner',
    background: 'gradient',
    align: 'center',
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof CTA>;

export const Default: Story = {
  render: (args) => (
    <CTA {...args}>
      <CTAContent>
        <CTATitle>Ready to get started?</CTATitle>
        <CTADescription>
          Join 10,000+ developers building better apps with r/ui.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Start Free Trial</Button>
        <Button variant="ghost" size="lg">View Documentation</Button>
      </CTAActions>
    </CTA>
  ),
};

export const BannerVariant: Story = {
  render: () => (
    <CTA variant="banner" background="gradient" align="center">
      <CTAContent>
        <CTATitle>Start building today</CTATitle>
        <CTADescription>
          Get access to 70+ production-ready components and start shipping faster.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Get Started</Button>
        <Button variant="ghost" size="lg" style={styles.ghostButtonLight}>
          Learn More
        </Button>
      </CTAActions>
    </CTA>
  ),
};

export const CardVariant: Story = {
  render: () => (
    <CTA variant="card" background="solid" align="center">
      <CTAContent>
        <CTATitle>Need help choosing a plan?</CTATitle>
        <CTADescription>
          Our team is here to help you find the perfect solution for your needs.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="primary" size="md">Talk to Sales</Button>
        <Button variant="secondary" size="md">Compare Plans</Button>
      </CTAActions>
    </CTA>
  ),
};

export const InlineVariant: Story = {
  render: () => (
    <CTA variant="inline" background="solid" align="left">
      <CTAContent>
        <CTATitle>Upgrade to Pro</CTATitle>
        <CTADescription>
          Unlock advanced features and priority support.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="primary" size="sm">Upgrade Now</Button>
      </CTAActions>
    </CTA>
  ),
};

export const WithSingleButton: Story = {
  render: () => (
    <CTA variant="banner" background="gradient" align="center">
      <CTAContent>
        <CTATitle>Ready to transform your workflow?</CTATitle>
        <CTADescription>
          Start your 14-day free trial. No credit card required.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Start Free Trial</Button>
      </CTAActions>
    </CTA>
  ),
};

export const WithTwoButtons: Story = {
  render: () => (
    <CTA variant="banner" background="gradient" align="center">
      <CTAContent>
        <CTATitle>Build your next big thing</CTATitle>
        <CTADescription>
          Everything you need to create stunning mobile applications.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Start Building</Button>
        <Button variant="ghost" size="lg" style={styles.ghostButtonLight}>
          Watch Demo
        </Button>
      </CTAActions>
    </CTA>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <CTA variant="banner" background="gradient" align="left">
      <CTAContent>
        <CTATitle>Enterprise Solutions</CTATitle>
        <CTADescription>
          Custom integrations, dedicated support, and advanced security features
          for teams that need more.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Contact Sales</Button>
        <Button variant="ghost" size="lg" style={styles.ghostButtonLight}>
          View Enterprise Features
        </Button>
      </CTAActions>
    </CTA>
  ),
};

export const CenteredLayout: Story = {
  render: () => (
    <CTA variant="banner" background="gradient" align="center">
      <CTAContent>
        <CTATitle>Join our community</CTATitle>
        <CTADescription>
          Connect with thousands of developers, share ideas, and get help building
          your next project.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Join Discord</Button>
        <Button variant="ghost" size="lg" style={styles.ghostButtonLight}>
          Follow on Twitter
        </Button>
      </CTAActions>
    </CTA>
  ),
};

export const SolidBackground: Story = {
  render: () => (
    <CTA variant="banner" background="solid" backgroundColor="#f8fafc" align="center">
      <CTAContent>
        <CTATitle>Questions? We're here to help.</CTATitle>
        <CTADescription>
          Our support team is available 24/7 to assist you with any issues.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="primary" size="lg">Contact Support</Button>
        <Button variant="secondary" size="lg">View FAQ</Button>
      </CTAActions>
    </CTA>
  ),
};

export const CustomGradientColors: Story = {
  render: () => (
    <CTA
      variant="banner"
      background="gradient"
      gradientColors={['#7c3aed', '#ec4899', '#f97316']}
      align="center"
    >
      <CTAContent>
        <CTATitle style={styles.whiteText}>Summer Sale</CTATitle>
        <CTADescription style={styles.lightText}>
          Get 40% off all annual plans. Limited time offer.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Claim Offer</Button>
      </CTAActions>
    </CTA>
  ),
};

export const NewsletterSignup: Story = {
  render: () => (
    <CTA variant="card" background="solid" align="center">
      <CTAContent>
        <CTATitle>Stay in the loop</CTATitle>
        <CTADescription>
          Get the latest updates, tutorials, and tips delivered to your inbox weekly.
        </CTADescription>
      </CTAContent>
      <View style={styles.newsletterForm}>
        <TextInput
          placeholder="Enter your email"
          style={styles.emailInput}
          placeholderTextColor="#9ca3af"
        />
        <Button variant="primary" size="md">Subscribe</Button>
      </View>
      <Text style={styles.privacyNote}>
        No spam, unsubscribe anytime. Read our privacy policy.
      </Text>
    </CTA>
  ),
};

export const EndOfArticle: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={styles.articleContext}>
        <View style={styles.articleContent}>
          <Text style={styles.articleTitle}>Building Accessible Components</Text>
          <Text style={styles.articleBody}>
            This is the end of the article content. The CTA below encourages
            readers to take the next step after consuming the content.
          </Text>
          <View style={styles.articleSeparator} />
        </View>
        <View style={styles.ctaWrapper}>
          <Story />
        </View>
      </View>
    ),
  ],
  render: () => (
    <CTA variant="card" background="solid" align="center">
      <CTAContent>
        <CTATitle>Enjoyed this article?</CTATitle>
        <CTADescription>
          Subscribe to get more tutorials and best practices delivered to your inbox.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="primary" size="md">Subscribe to Newsletter</Button>
        <Button variant="secondary" size="md">Share Article</Button>
      </CTAActions>
    </CTA>
  ),
};

export const CompactCard: Story = {
  decorators: [
    (Story) => (
      <View style={{ maxWidth: 320 }}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <CTA variant="card" background="solid" align="left">
      <CTAContent>
        <CTATitle>Free forever</CTATitle>
        <CTADescription>
          Start with our free plan. Upgrade when you're ready.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="primary" size="sm">Get Started</Button>
      </CTAActions>
    </CTA>
  ),
};

export const FullWidthBanner: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <CTA
      variant="banner"
      background="gradient"
      gradientColors={['#1e40af', '#3b82f6', '#60a5fa']}
      align="center"
    >
      <CTAContent>
        <CTATitle style={styles.whiteText}>
          Launching something new?
        </CTATitle>
        <CTADescription style={styles.lightText}>
          Get your product in front of thousands of developers on our marketplace.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <Button variant="secondary" size="lg">Submit Your Product</Button>
        <Button variant="ghost" size="lg" style={styles.ghostButtonLight}>
          View Guidelines
        </Button>
      </CTAActions>
    </CTA>
  ),
};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <View style={styles.variantsContainer}>
      <Text style={styles.sectionLabel}>Banner Variant</Text>
      <CTA variant="banner" background="gradient" align="center">
        <CTAContent>
          <CTATitle>Banner CTA</CTATitle>
          <CTADescription>Full-width with gradient background.</CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="secondary" size="md">Primary Action</Button>
        </CTAActions>
      </CTA>

      <Text style={styles.sectionLabel}>Card Variant</Text>
      <CTA variant="card" background="solid" align="center">
        <CTAContent>
          <CTATitle>Card CTA</CTATitle>
          <CTADescription>Bordered card with solid background.</CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="primary" size="md">Primary Action</Button>
        </CTAActions>
      </CTA>

      <Text style={styles.sectionLabel}>Inline Variant</Text>
      <CTA variant="inline" background="solid" align="left">
        <CTAContent>
          <CTATitle>Inline CTA</CTATitle>
          <CTADescription>Compact horizontal layout.</CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="primary" size="sm">Action</Button>
        </CTAActions>
      </CTA>
    </View>
  ),
};

export const BackgroundTypes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <View style={styles.variantsContainer}>
      <Text style={styles.sectionLabel}>Gradient Background</Text>
      <CTA variant="banner" background="gradient" align="center">
        <CTAContent>
          <CTATitle>Gradient Background</CTATitle>
          <CTADescription>Default gradient from blue to purple.</CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="secondary" size="md">Action</Button>
        </CTAActions>
      </CTA>

      <Text style={styles.sectionLabel}>Solid Background</Text>
      <CTA variant="banner" background="solid" backgroundColor="#f3f4f6" align="center">
        <CTAContent>
          <CTATitle>Solid Background</CTATitle>
          <CTADescription>Custom solid color background.</CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="primary" size="md">Action</Button>
        </CTAActions>
      </CTA>

      <Text style={styles.sectionLabel}>Custom Gradient</Text>
      <CTA
        variant="banner"
        background="gradient"
        gradientColors={['#059669', '#10b981', '#34d399']}
        align="center"
      >
        <CTAContent>
          <CTATitle style={styles.whiteText}>Custom Gradient</CTATitle>
          <CTADescription style={styles.lightText}>
            Green gradient with custom colors.
          </CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="secondary" size="md">Action</Button>
        </CTAActions>
      </CTA>
    </View>
  ),
};

export const RealWorldExamples: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <View style={styles.variantsContainer}>
      <Text style={styles.sectionLabel}>SaaS Upgrade Prompt</Text>
      <CTA variant="card" background="solid" align="left">
        <CTAContent>
          <CTATitle>You're running out of storage</CTATitle>
          <CTADescription>
            Upgrade to Pro for unlimited storage and advanced collaboration features.
          </CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="primary" size="sm">Upgrade to Pro</Button>
          <Button variant="ghost" size="sm">Dismiss</Button>
        </CTAActions>
      </CTA>

      <Text style={styles.sectionLabel}>Trial Ending</Text>
      <CTA
        variant="banner"
        background="gradient"
        gradientColors={['#dc2626', '#f87171']}
        align="center"
      >
        <CTAContent>
          <CTATitle style={styles.whiteText}>Your trial ends in 3 days</CTATitle>
          <CTADescription style={styles.lightText}>
            Subscribe now to keep access to all features.
          </CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="secondary" size="lg">Choose a Plan</Button>
        </CTAActions>
      </CTA>

      <Text style={styles.sectionLabel}>Feature Announcement</Text>
      <CTA variant="inline" background="solid" align="left">
        <CTAContent>
          <CTATitle>New: Dark mode is here!</CTATitle>
          <CTADescription>Try it out in your settings.</CTADescription>
        </CTAContent>
        <CTAActions>
          <Button variant="primary" size="sm">Enable</Button>
        </CTAActions>
      </CTA>
    </View>
  ),
};

const styles = StyleSheet.create({
  whiteText: {
    color: '#ffffff',
  },
  lightText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  ghostButtonLight: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  newsletterForm: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    width: '100%',
    maxWidth: 400,
  },
  emailInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  privacyNote: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 12,
  },
  articleContext: {
    backgroundColor: '#ffffff',
    minHeight: 400,
  },
  articleContent: {
    padding: 24,
    maxWidth: 680,
    alignSelf: 'center',
    width: '100%',
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  articleBody: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  articleSeparator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginTop: 32,
  },
  ctaWrapper: {
    padding: 24,
    maxWidth: 680,
    alignSelf: 'center',
    width: '100%',
  },
  variantsContainer: {
    gap: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: -8,
  },
});
