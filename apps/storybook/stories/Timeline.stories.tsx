import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from '@r-ui/react-native';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Data Display/Timeline',
  component: Timeline,
  argTypes: {
    layout: {
      control: 'select',
      options: ['left', 'alternating'],
      description: 'Layout mode',
    },
  },
  args: {
    layout: 'left',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 500 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: (args) => (
    <Timeline {...args}>
      <TimelineItem status="completed">
        <TimelineTitle>Order Placed</TimelineTitle>
        <TimelineDescription>Your order has been confirmed</TimelineDescription>
        <TimelineTime>Jan 15, 2024 at 10:30 AM</TimelineTime>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>Processing</TimelineTitle>
        <TimelineDescription>Your order is being prepared</TimelineDescription>
        <TimelineTime>Jan 15, 2024 at 2:00 PM</TimelineTime>
      </TimelineItem>
      <TimelineItem status="active">
        <TimelineTitle>Shipped</TimelineTitle>
        <TimelineDescription>Package is on the way</TimelineDescription>
        <TimelineTime>Jan 16, 2024 at 9:00 AM</TimelineTime>
      </TimelineItem>
      <TimelineItem status="pending">
        <TimelineTitle>Delivered</TimelineTitle>
        <TimelineDescription>Estimated delivery</TimelineDescription>
        <TimelineTime>Jan 18, 2024</TimelineTime>
      </TimelineItem>
    </Timeline>
  ),
};

export const AllCompleted: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineTitle>Account Created</TimelineTitle>
        <TimelineDescription>Welcome to the platform</TimelineDescription>
        <TimelineTime>Dec 1, 2023</TimelineTime>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>Profile Completed</TimelineTitle>
        <TimelineDescription>Added profile information</TimelineDescription>
        <TimelineTime>Dec 2, 2023</TimelineTime>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>First Project</TimelineTitle>
        <TimelineDescription>Created your first project</TimelineDescription>
        <TimelineTime>Dec 5, 2023</TimelineTime>
      </TimelineItem>
    </Timeline>
  ),
};

export const AllPending: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="pending">
        <TimelineTitle>Step 1: Setup</TimelineTitle>
        <TimelineDescription>Configure your environment</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="pending">
        <TimelineTitle>Step 2: Install</TimelineTitle>
        <TimelineDescription>Install dependencies</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="pending">
        <TimelineTitle>Step 3: Deploy</TimelineTitle>
        <TimelineDescription>Deploy to production</TimelineDescription>
      </TimelineItem>
    </Timeline>
  ),
};

export const AlternatingLayout: Story = {
  render: () => (
    <Timeline layout="alternating">
      <TimelineItem status="completed">
        <TimelineTitle>2020 - Founded</TimelineTitle>
        <TimelineDescription>Company was established with a vision to innovate</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>2021 - Growth</TimelineTitle>
        <TimelineDescription>Expanded team to 50 employees</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>2022 - Milestone</TimelineTitle>
        <TimelineDescription>Reached 1 million users</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="active">
        <TimelineTitle>2023 - Present</TimelineTitle>
        <TimelineDescription>Continuing to grow and innovate</TimelineDescription>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithCustomIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineIcon>
          <Text style={{ fontSize: 14 }}>📦</Text>
        </TimelineIcon>
        <TimelineTitle>Package Received</TimelineTitle>
        <TimelineDescription>Warehouse received your package</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineIcon>
          <Text style={{ fontSize: 14 }}>🔍</Text>
        </TimelineIcon>
        <TimelineTitle>Quality Check</TimelineTitle>
        <TimelineDescription>Package passed inspection</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="active">
        <TimelineIcon>
          <Text style={{ fontSize: 14 }}>🚚</Text>
        </TimelineIcon>
        <TimelineTitle>In Transit</TimelineTitle>
        <TimelineDescription>On the way to destination</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="pending">
        <TimelineIcon>
          <Text style={{ fontSize: 14 }}>🏠</Text>
        </TimelineIcon>
        <TimelineTitle>Delivery</TimelineTitle>
        <TimelineDescription>Expected tomorrow</TimelineDescription>
      </TimelineItem>
    </Timeline>
  ),
};

export const StatusVariations: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Completed Status</Text>
        <Timeline>
          <TimelineItem status="completed">
            <TimelineTitle>Completed Item</TimelineTitle>
            <TimelineDescription>This item is done</TimelineDescription>
          </TimelineItem>
        </Timeline>
      </View>

      <View>
        <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Active Status</Text>
        <Timeline>
          <TimelineItem status="active">
            <TimelineTitle>Active Item</TimelineTitle>
            <TimelineDescription>Currently in progress</TimelineDescription>
          </TimelineItem>
        </Timeline>
      </View>

      <View>
        <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Pending Status</Text>
        <Timeline>
          <TimelineItem status="pending">
            <TimelineTitle>Pending Item</TimelineTitle>
            <TimelineDescription>Not started yet</TimelineDescription>
          </TimelineItem>
        </Timeline>
      </View>
    </View>
  ),
};

export const ProjectMilestones: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineTitle>Project Kickoff</TimelineTitle>
        <TimelineDescription>
          Initial meeting with stakeholders to define scope and requirements.
        </TimelineDescription>
        <TimelineTime>Week 1</TimelineTime>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>Design Phase</TimelineTitle>
        <TimelineDescription>
          Created wireframes and high-fidelity mockups for approval.
        </TimelineDescription>
        <TimelineTime>Week 2-3</TimelineTime>
      </TimelineItem>
      <TimelineItem status="active">
        <TimelineTitle>Development</TimelineTitle>
        <TimelineDescription>
          Building the application with React Native and implementing features.
        </TimelineDescription>
        <TimelineTime>Week 4-8</TimelineTime>
      </TimelineItem>
      <TimelineItem status="pending">
        <TimelineTitle>Testing</TimelineTitle>
        <TimelineDescription>
          QA testing, bug fixes, and performance optimization.
        </TimelineDescription>
        <TimelineTime>Week 9-10</TimelineTime>
      </TimelineItem>
      <TimelineItem status="pending">
        <TimelineTitle>Launch</TimelineTitle>
        <TimelineDescription>
          Deploy to production and monitor for issues.
        </TimelineDescription>
        <TimelineTime>Week 11</TimelineTime>
      </TimelineItem>
    </Timeline>
  ),
};

export const VersionHistory: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineTitle>v2.0.0</TimelineTitle>
        <TimelineDescription>
          Major release with new UI components and improved performance.
        </TimelineDescription>
        <TimelineTime>January 2024</TimelineTime>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>v1.5.0</TimelineTitle>
        <TimelineDescription>
          Added dark mode support and accessibility improvements.
        </TimelineDescription>
        <TimelineTime>October 2023</TimelineTime>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>v1.0.0</TimelineTitle>
        <TimelineDescription>
          Initial stable release with core functionality.
        </TimelineDescription>
        <TimelineTime>June 2023</TimelineTime>
      </TimelineItem>
    </Timeline>
  ),
};

export const MinimalTimeline: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineTitle>Step 1</TimelineTitle>
      </TimelineItem>
      <TimelineItem status="completed">
        <TimelineTitle>Step 2</TimelineTitle>
      </TimelineItem>
      <TimelineItem status="active">
        <TimelineTitle>Step 3</TimelineTitle>
      </TimelineItem>
      <TimelineItem status="pending">
        <TimelineTitle>Step 4</TimelineTitle>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineTitle>Pull Request Merged</TimelineTitle>
        <TimelineDescription>
          feat: Add new authentication flow
        </TimelineDescription>
        <View style={{
          marginTop: 8,
          padding: 8,
          backgroundColor: '#f3f4f6',
          borderRadius: 4
        }}>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>
            +245 additions, -32 deletions
          </Text>
        </View>
        <TimelineTime>2 hours ago</TimelineTime>
      </TimelineItem>
      <TimelineItem status="active">
        <TimelineTitle>Code Review</TimelineTitle>
        <TimelineDescription>
          Awaiting review from 2 team members
        </TimelineDescription>
        <View style={{ flexDirection: 'row', gap: 4, marginTop: 8 }}>
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: '#3b82f6'
          }} />
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: '#8b5cf6'
          }} />
        </View>
      </TimelineItem>
    </Timeline>
  ),
};
