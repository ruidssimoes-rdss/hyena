import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  Announcement,
  AnnouncementContent,
  AnnouncementAction,
  AnnouncementClose,
  AnnouncementCountdown,
} from '@hyena-studio/react-native';

const meta: Meta<typeof Announcement> = {
  title: 'Components/Feedback/Announcement',
  component: Announcement,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'promo'],
      description: 'Visual style variant',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the announcement can be dismissed',
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the announcement sticks to top',
    },
  },
  args: {
    variant: 'info',
    dismissible: false,
    sticky: false,
  },
};

export default meta;

type Story = StoryObj<typeof Announcement>;

export const Default: Story = {
  render: (args) => (
    <Announcement {...args}>
      <AnnouncementContent>
        New feature available! Check out our latest updates.
      </AnnouncementContent>
    </Announcement>
  ),
};

export const Info: Story = {
  render: () => (
    <Announcement variant="info">
      <AnnouncementContent>
        Scheduled maintenance on Sunday at 2 AM UTC.
      </AnnouncementContent>
    </Announcement>
  ),
};

export const Warning: Story = {
  render: () => (
    <Announcement variant="warning">
      <AnnouncementContent>
        Your subscription expires in 3 days.
      </AnnouncementContent>
      <AnnouncementAction onPress={() => console.log('Renew clicked')}>
        Renew now
      </AnnouncementAction>
    </Announcement>
  ),
};

export const Success: Story = {
  render: () => (
    <Announcement variant="success">
      <AnnouncementContent>
        Your payment was successful!
      </AnnouncementContent>
    </Announcement>
  ),
};

export const Promo: Story = {
  render: () => (
    <Announcement variant="promo">
      <AnnouncementContent>
        Black Friday Sale - 50% off all plans!
      </AnnouncementContent>
      <AnnouncementAction onPress={() => console.log('Shop clicked')}>
        Shop now
      </AnnouncementAction>
    </Announcement>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Announcement variant="info">
      <AnnouncementContent>
        New version 2.0 is now available.
      </AnnouncementContent>
      <AnnouncementAction onPress={() => console.log('Learn more clicked')}>
        Learn more
      </AnnouncementAction>
    </Announcement>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Announcement variant="info" dismissible onDismiss={() => console.log('Dismissed')}>
      <AnnouncementContent>
        This announcement can be dismissed.
      </AnnouncementContent>
      <AnnouncementClose />
    </Announcement>
  ),
};

export const WithCountdown: Story = {
  render: () => {
    const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    return (
      <Announcement variant="promo">
        <AnnouncementContent>
          Flash sale ends soon!
        </AnnouncementContent>
        <AnnouncementCountdown
          targetDate={targetDate}
          prefix="Ends in"
          onEnd={() => console.log('Countdown ended')}
        />
      </Announcement>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Announcement variant="info">
        <AnnouncementContent>Info announcement</AnnouncementContent>
      </Announcement>
      <Announcement variant="warning">
        <AnnouncementContent>Warning announcement</AnnouncementContent>
      </Announcement>
      <Announcement variant="success">
        <AnnouncementContent>Success announcement</AnnouncementContent>
      </Announcement>
      <Announcement variant="promo">
        <AnnouncementContent>Promo announcement</AnnouncementContent>
      </Announcement>
    </View>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <Announcement variant="promo" dismissible onDismiss={() => console.log('Dismissed')}>
      <AnnouncementContent>
        Limited time offer - Get 30% off your first month!
      </AnnouncementContent>
      <AnnouncementAction onPress={() => console.log('Claim clicked')}>
        Claim offer
      </AnnouncementAction>
      <AnnouncementClose />
    </Announcement>
  ),
};
