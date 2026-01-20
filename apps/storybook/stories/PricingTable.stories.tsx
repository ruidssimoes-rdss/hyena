import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  PricingTable,
  PricingToggle,
  PricingCard,
  PricingFeatures,
  PricingFeature,
  PricingAction,
  Text,
  Heading,
} from '@r-ui/react-native';

const meta: Meta<typeof PricingTable> = {
  title: 'Components/Marketing/PricingTable',
  component: PricingTable,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof PricingTable>;

export const Default: Story = {
  render: () => (
    <PricingTable>
      <PricingToggle />
      <View style={styles.cardsContainer}>
        <PricingCard
          name="Free"
          description="Perfect for getting started"
          price={{ monthly: 0, yearly: 0 }}
        >
          <PricingFeatures>
            <PricingFeature>Up to 3 projects</PricingFeature>
            <PricingFeature>Basic components</PricingFeature>
            <PricingFeature>Community support</PricingFeature>
            <PricingFeature included={false}>Custom themes</PricingFeature>
            <PricingFeature included={false}>Priority support</PricingFeature>
          </PricingFeatures>
          <PricingAction>Get Started</PricingAction>
        </PricingCard>

        <PricingCard
          name="Pro"
          description="For professional developers"
          price={{ monthly: 29, yearly: 290 }}
          popular
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>All components</PricingFeature>
            <PricingFeature>Email support</PricingFeature>
            <PricingFeature>Custom themes</PricingFeature>
            <PricingFeature included={false}>Priority support</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Start Free Trial</PricingAction>
        </PricingCard>

        <PricingCard
          name="Enterprise"
          description="For large teams and organizations"
          price={{ monthly: 99, yearly: 990 }}
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>All components</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
            <PricingFeature>Custom themes</PricingFeature>
            <PricingFeature>Dedicated account manager</PricingFeature>
          </PricingFeatures>
          <PricingAction>Contact Sales</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

export const WithControlledBilling: Story = {
  render: function ControlledBillingStory() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    return (
      <PricingTable billingPeriod={billingPeriod} onBillingChange={setBillingPeriod}>
        <View style={styles.header}>
          <Heading level={2}>Simple, transparent pricing</Heading>
          <Text style={styles.headerSubtitle}>
            Choose the plan that fits your needs. Cancel anytime.
          </Text>
        </View>
        <PricingToggle />
        <View style={styles.cardsContainer}>
          <PricingCard
            name="Starter"
            description="For individuals and small projects"
            price={{ monthly: 9, yearly: 90 }}
          >
            <PricingFeatures>
              <PricingFeature>5 projects</PricingFeature>
              <PricingFeature>10GB storage</PricingFeature>
              <PricingFeature>Basic analytics</PricingFeature>
              <PricingFeature>Email support</PricingFeature>
            </PricingFeatures>
            <PricingAction>Get Started</PricingAction>
          </PricingCard>

          <PricingCard
            name="Professional"
            description="For growing teams"
            price={{ monthly: 49, yearly: 490 }}
            popular
          >
            <PricingFeatures>
              <PricingFeature>Unlimited projects</PricingFeature>
              <PricingFeature>100GB storage</PricingFeature>
              <PricingFeature>Advanced analytics</PricingFeature>
              <PricingFeature>Priority support</PricingFeature>
              <PricingFeature>Team collaboration</PricingFeature>
            </PricingFeatures>
            <PricingAction primary>Start Free Trial</PricingAction>
          </PricingCard>

          <PricingCard
            name="Business"
            description="For large organizations"
            price={{ monthly: 149, yearly: 1490 }}
          >
            <PricingFeatures>
              <PricingFeature>Unlimited everything</PricingFeature>
              <PricingFeature>1TB storage</PricingFeature>
              <PricingFeature>Custom integrations</PricingFeature>
              <PricingFeature>24/7 phone support</PricingFeature>
              <PricingFeature>SLA guarantee</PricingFeature>
              <PricingFeature>Dedicated success manager</PricingFeature>
            </PricingFeatures>
            <PricingAction>Contact Sales</PricingAction>
          </PricingCard>
        </View>
        <Text style={styles.currentPeriod}>
          Currently viewing: {billingPeriod === 'yearly' ? 'Annual' : 'Monthly'} pricing
        </Text>
      </PricingTable>
    );
  },
};

export const TwoTiers: Story = {
  render: () => (
    <PricingTable>
      <PricingToggle />
      <View style={styles.cardsContainerTwoCol}>
        <PricingCard
          name="Basic"
          description="Everything you need to get started"
          price={{ monthly: 19, yearly: 190 }}
        >
          <PricingFeatures>
            <PricingFeature>10 projects</PricingFeature>
            <PricingFeature>5GB storage</PricingFeature>
            <PricingFeature>Basic support</PricingFeature>
            <PricingFeature>API access</PricingFeature>
          </PricingFeatures>
          <PricingAction>Get Started</PricingAction>
        </PricingCard>

        <PricingCard
          name="Premium"
          description="For power users and teams"
          price={{ monthly: 79, yearly: 790 }}
          popular
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>Unlimited storage</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
            <PricingFeature>Advanced API</PricingFeature>
            <PricingFeature>Custom integrations</PricingFeature>
            <PricingFeature>Team management</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Upgrade Now</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <PricingTable>
      <PricingToggle />
      <View style={styles.cardsContainer}>
        <PricingCard
          name="Hobby"
          description="For side projects"
          price={{ monthly: 0, yearly: 0 }}
          badge="Free Forever"
        >
          <PricingFeatures>
            <PricingFeature>1 project</PricingFeature>
            <PricingFeature>100MB storage</PricingFeature>
            <PricingFeature>Community support</PricingFeature>
          </PricingFeatures>
          <PricingAction>Start Free</PricingAction>
        </PricingCard>

        <PricingCard
          name="Developer"
          description="For serious builders"
          price={{ monthly: 25, yearly: 250 }}
          popular
        >
          <PricingFeatures>
            <PricingFeature>10 projects</PricingFeature>
            <PricingFeature>10GB storage</PricingFeature>
            <PricingFeature>Email support</PricingFeature>
            <PricingFeature>GitHub integration</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Start Trial</PricingAction>
        </PricingCard>

        <PricingCard
          name="Team"
          description="For collaborative teams"
          price={{ monthly: 75, yearly: 750 }}
          badge="Best Value"
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>100GB storage</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
            <PricingFeature>Advanced permissions</PricingFeature>
            <PricingFeature>Audit logs</PricingFeature>
          </PricingFeatures>
          <PricingAction>Get Started</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

export const SaaSPricing: Story = {
  render: () => (
    <PricingTable>
      <View style={styles.saasHeader}>
        <Heading level={2}>Plans for every stage</Heading>
        <Text style={styles.saasSubtitle}>
          From startup to enterprise, we have you covered.
        </Text>
      </View>
      <PricingToggle />
      <View style={styles.cardsContainer}>
        <PricingCard
          name="Startup"
          description="Launch your MVP"
          price={{ monthly: 49, yearly: 490 }}
        >
          <PricingFeatures>
            <PricingFeature>Up to 1,000 MAU</PricingFeature>
            <PricingFeature>5 team members</PricingFeature>
            <PricingFeature>Basic analytics</PricingFeature>
            <PricingFeature>Email support</PricingFeature>
            <PricingFeature included={false}>Custom domain</PricingFeature>
            <PricingFeature included={false}>SSO</PricingFeature>
          </PricingFeatures>
          <PricingAction>Start Building</PricingAction>
        </PricingCard>

        <PricingCard
          name="Growth"
          description="Scale your product"
          price={{ monthly: 149, yearly: 1490 }}
          popular
        >
          <PricingFeatures>
            <PricingFeature>Up to 10,000 MAU</PricingFeature>
            <PricingFeature>20 team members</PricingFeature>
            <PricingFeature>Advanced analytics</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
            <PricingFeature>Custom domain</PricingFeature>
            <PricingFeature included={false}>SSO</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Start Free Trial</PricingAction>
        </PricingCard>

        <PricingCard
          name="Scale"
          description="Enterprise-ready"
          price={{ monthly: 499, yearly: 4990 }}
        >
          <PricingFeatures>
            <PricingFeature>Unlimited MAU</PricingFeature>
            <PricingFeature>Unlimited team members</PricingFeature>
            <PricingFeature>Custom analytics</PricingFeature>
            <PricingFeature>24/7 support</PricingFeature>
            <PricingFeature>Custom domain</PricingFeature>
            <PricingFeature>SSO & SAML</PricingFeature>
          </PricingFeatures>
          <PricingAction>Talk to Sales</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

export const DisabledPlan: Story = {
  render: () => (
    <PricingTable>
      <PricingToggle />
      <View style={styles.cardsContainer}>
        <PricingCard
          name="Basic"
          description="For personal use"
          price={{ monthly: 9, yearly: 90 }}
        >
          <PricingFeatures>
            <PricingFeature>5 projects</PricingFeature>
            <PricingFeature>1GB storage</PricingFeature>
            <PricingFeature>Email support</PricingFeature>
          </PricingFeatures>
          <PricingAction>Get Started</PricingAction>
        </PricingCard>

        <PricingCard
          name="Pro"
          description="Your current plan"
          price={{ monthly: 29, yearly: 290 }}
          popular
          badge="Current Plan"
        >
          <PricingFeatures>
            <PricingFeature>25 projects</PricingFeature>
            <PricingFeature>10GB storage</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
          </PricingFeatures>
          <PricingAction disabled>Current Plan</PricingAction>
        </PricingCard>

        <PricingCard
          name="Enterprise"
          description="Contact for pricing"
          price={{ monthly: 0, yearly: 0 }}
          disabled
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>Unlimited storage</PricingFeature>
            <PricingFeature>24/7 support</PricingFeature>
            <PricingFeature>Custom SLA</PricingFeature>
          </PricingFeatures>
          <PricingAction disabled>Coming Soon</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

export const YearlyOnly: Story = {
  render: () => (
    <PricingTable billingPeriod="yearly">
      <View style={styles.header}>
        <Heading level={2}>Annual Plans</Heading>
        <Text style={styles.headerSubtitle}>
          Save 20% with annual billing
        </Text>
      </View>
      <View style={styles.cardsContainerTwoCol}>
        <PricingCard
          name="Individual"
          description="Perfect for freelancers"
          price={{ monthly: 15, yearly: 144 }}
        >
          <PricingFeatures>
            <PricingFeature>All features included</PricingFeature>
            <PricingFeature>Personal license</PricingFeature>
            <PricingFeature>1 year of updates</PricingFeature>
            <PricingFeature>Community support</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Buy Now - $144/year</PricingAction>
        </PricingCard>

        <PricingCard
          name="Team"
          description="Up to 10 developers"
          price={{ monthly: 99, yearly: 948 }}
          popular
        >
          <PricingFeatures>
            <PricingFeature>All features included</PricingFeature>
            <PricingFeature>Team license (10 seats)</PricingFeature>
            <PricingFeature>1 year of updates</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
            <PricingFeature>Source code access</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Buy Now - $948/year</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

export const FeatureComparison: Story = {
  render: () => (
    <PricingTable>
      <PricingToggle />
      <View style={styles.cardsContainer}>
        <PricingCard
          name="Free"
          price={{ monthly: 0, yearly: 0 }}
        >
          <PricingFeatures>
            <PricingFeature>3 projects</PricingFeature>
            <PricingFeature>500MB storage</PricingFeature>
            <PricingFeature>Community support</PricingFeature>
            <PricingFeature included={false}>API access</PricingFeature>
            <PricingFeature included={false}>Custom domains</PricingFeature>
            <PricingFeature included={false}>Analytics</PricingFeature>
            <PricingFeature included={false}>Team members</PricingFeature>
            <PricingFeature included={false}>SSO</PricingFeature>
          </PricingFeatures>
          <PricingAction>Sign Up Free</PricingAction>
        </PricingCard>

        <PricingCard
          name="Pro"
          price={{ monthly: 29, yearly: 290 }}
          popular
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>50GB storage</PricingFeature>
            <PricingFeature>Email support</PricingFeature>
            <PricingFeature>API access</PricingFeature>
            <PricingFeature>Custom domains</PricingFeature>
            <PricingFeature>Analytics</PricingFeature>
            <PricingFeature included={false}>Team members</PricingFeature>
            <PricingFeature included={false}>SSO</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Get Pro</PricingAction>
        </PricingCard>

        <PricingCard
          name="Team"
          price={{ monthly: 79, yearly: 790 }}
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>500GB storage</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
            <PricingFeature>API access</PricingFeature>
            <PricingFeature>Custom domains</PricingFeature>
            <PricingFeature>Advanced analytics</PricingFeature>
            <PricingFeature>Up to 10 members</PricingFeature>
            <PricingFeature included={false}>SSO</PricingFeature>
          </PricingFeatures>
          <PricingAction>Get Team</PricingAction>
        </PricingCard>

        <PricingCard
          name="Enterprise"
          price={{ monthly: 199, yearly: 1990 }}
        >
          <PricingFeatures>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>Unlimited storage</PricingFeature>
            <PricingFeature>24/7 phone support</PricingFeature>
            <PricingFeature>Advanced API</PricingFeature>
            <PricingFeature>Custom domains</PricingFeature>
            <PricingFeature>Custom analytics</PricingFeature>
            <PricingFeature>Unlimited members</PricingFeature>
            <PricingFeature>SSO & SAML</PricingFeature>
          </PricingFeatures>
          <PricingAction>Contact Us</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

export const SinglePlan: Story = {
  render: () => (
    <PricingTable>
      <View style={styles.singlePlanHeader}>
        <Heading level={2}>One plan, everything included</Heading>
        <Text style={styles.singlePlanSubtitle}>
          No tiers, no confusion. Just one simple price.
        </Text>
      </View>
      <PricingToggle />
      <View style={styles.singlePlanContainer}>
        <PricingCard
          name="r/ui Pro"
          description="Full access to everything"
          price={{ monthly: 49, yearly: 490 }}
          popular
        >
          <PricingFeatures>
            <PricingFeature>All 50+ components</PricingFeature>
            <PricingFeature>Unlimited projects</PricingFeature>
            <PricingFeature>Figma design files</PricingFeature>
            <PricingFeature>Full source code</PricingFeature>
            <PricingFeature>Lifetime updates</PricingFeature>
            <PricingFeature>Priority support</PricingFeature>
            <PricingFeature>Commercial license</PricingFeature>
          </PricingFeatures>
          <PricingAction primary>Get Started</PricingAction>
        </PricingCard>
      </View>
    </PricingTable>
  ),
};

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
    marginTop: 24,
  },
  cardsContainerTwoCol: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
    marginTop: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  currentPeriod: {
    marginTop: 24,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  saasHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  saasSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 8,
  },
  singlePlanHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  singlePlanSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 8,
  },
  singlePlanContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
});
