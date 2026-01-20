import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  StatsCard,
  StatsCardIcon,
  StatsCardTitle,
  StatsCardValue,
  StatsCardTrend,
  StatsCardDescription,
} from '@r-ui/react-native';

// Simple icon components for stories
function UsersIcon() {
  return (
    <Text style={{ fontSize: 18 }}>👥</Text>
  );
}

function DollarIcon() {
  return (
    <Text style={{ fontSize: 18 }}>💰</Text>
  );
}

function ChartIcon() {
  return (
    <Text style={{ fontSize: 18 }}>📊</Text>
  );
}

function ShoppingIcon() {
  return (
    <Text style={{ fontSize: 18 }}>🛒</Text>
  );
}

const meta: Meta<typeof StatsCard> = {
  title: 'Components/Data Display/StatsCard',
  component: StatsCard,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Layout variant',
    },
  },
  args: {
    variant: 'default',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 280 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
  render: (args) => (
    <StatsCard {...args}>
      <StatsCardIcon color="#3b82f6">
        <UsersIcon />
      </StatsCardIcon>
      <StatsCardTitle>Total Users</StatsCardTitle>
      <StatsCardValue>12,345</StatsCardValue>
      <StatsCardTrend value={12.5} />
      <StatsCardDescription>vs last month</StatsCardDescription>
    </StatsCard>
  ),
};

export const WithPositiveTrend: Story = {
  render: () => (
    <StatsCard>
      <StatsCardIcon color="#22c55e">
        <DollarIcon />
      </StatsCardIcon>
      <StatsCardTitle>Revenue</StatsCardTitle>
      <StatsCardValue>$48,352</StatsCardValue>
      <StatsCardTrend value={23.1} />
      <StatsCardDescription>vs last month</StatsCardDescription>
    </StatsCard>
  ),
};

export const WithNegativeTrend: Story = {
  render: () => (
    <StatsCard>
      <StatsCardIcon color="#ef4444">
        <ShoppingIcon />
      </StatsCardIcon>
      <StatsCardTitle>Cart Abandonment</StatsCardTitle>
      <StatsCardValue>24.8%</StatsCardValue>
      <StatsCardTrend value={-5.2} />
      <StatsCardDescription>improvement from last week</StatsCardDescription>
    </StatsCard>
  ),
};

export const Compact: Story = {
  render: () => (
    <StatsCard variant="compact">
      <StatsCardTitle>Active Sessions</StatsCardTitle>
      <StatsCardValue>1,234</StatsCardValue>
      <StatsCardTrend value={8.3} />
    </StatsCard>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <StatsCard>
      <StatsCardTitle>Total Orders</StatsCardTitle>
      <StatsCardValue>5,678</StatsCardValue>
      <StatsCardTrend value={15.2} />
      <StatsCardDescription>this week</StatsCardDescription>
    </StatsCard>
  ),
};

export const WithoutTrend: Story = {
  render: () => (
    <StatsCard>
      <StatsCardIcon color="#8b5cf6">
        <ChartIcon />
      </StatsCardIcon>
      <StatsCardTitle>Page Views</StatsCardTitle>
      <StatsCardValue>89,421</StatsCardValue>
      <StatsCardDescription>All time</StatsCardDescription>
    </StatsCard>
  ),
};

export const MinimalVariant: Story = {
  render: () => (
    <StatsCard>
      <StatsCardTitle>Conversion Rate</StatsCardTitle>
      <StatsCardValue>3.24%</StatsCardValue>
    </StatsCard>
  ),
};

export const CustomTrendSuffix: Story = {
  render: () => (
    <StatsCard>
      <StatsCardTitle>Avg. Response Time</StatsCardTitle>
      <StatsCardValue>245ms</StatsCardValue>
      <StatsCardTrend value={-12} suffix="ms" />
      <StatsCardDescription>faster than yesterday</StatsCardDescription>
    </StatsCard>
  ),
};

export const Dashboard: Story = {
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 600 }}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      <View style={{ width: 160 }}>
        <StatsCard variant="compact">
          <StatsCardTitle>Users</StatsCardTitle>
          <StatsCardValue>12.3K</StatsCardValue>
          <StatsCardTrend value={12} />
        </StatsCard>
      </View>
      <View style={{ width: 160 }}>
        <StatsCard variant="compact">
          <StatsCardTitle>Revenue</StatsCardTitle>
          <StatsCardValue>$48K</StatsCardValue>
          <StatsCardTrend value={23} />
        </StatsCard>
      </View>
      <View style={{ width: 160 }}>
        <StatsCard variant="compact">
          <StatsCardTitle>Orders</StatsCardTitle>
          <StatsCardValue>1,234</StatsCardValue>
          <StatsCardTrend value={-3} />
        </StatsCard>
      </View>
      <View style={{ width: 160 }}>
        <StatsCard variant="compact">
          <StatsCardTitle>Bounce</StatsCardTitle>
          <StatsCardValue>32%</StatsCardValue>
          <StatsCardTrend value={-8} />
        </StatsCard>
      </View>
    </View>
  ),
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 600 }}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
        Default Variant
      </Text>
      <StatsCard>
        <StatsCardIcon color="#3b82f6">
          <UsersIcon />
        </StatsCardIcon>
        <StatsCardTitle>Total Users</StatsCardTitle>
        <StatsCardValue>12,345</StatsCardValue>
        <StatsCardTrend value={12.5} />
        <StatsCardDescription>vs last month</StatsCardDescription>
      </StatsCard>

      <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginTop: 16, marginBottom: 8 }}>
        Compact Variant
      </Text>
      <StatsCard variant="compact">
        <StatsCardTitle>Active Users</StatsCardTitle>
        <StatsCardValue>2,456</StatsCardValue>
        <StatsCardTrend value={5.2} />
      </StatsCard>
    </View>
  ),
};
