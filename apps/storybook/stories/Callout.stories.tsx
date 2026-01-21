import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  Callout,
  CalloutTitle,
  CalloutDescription,
} from '@hyena-studio/react-native';

const meta: Meta<typeof Callout> = {
  title: 'Components/Feedback/Callout',
  component: Callout,
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'error', 'success', 'tip'],
      description: 'Visual style variant',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
  },
  args: {
    variant: 'info',
    dismissible: false,
  },
};

export default meta;

type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  render: (args) => (
    <Callout {...args}>
      <CalloutTitle>Note</CalloutTitle>
      <CalloutDescription>
        This is an informational callout that provides helpful context.
      </CalloutDescription>
    </Callout>
  ),
};

export const Info: Story = {
  render: () => (
    <Callout variant="info">
      <CalloutTitle>Information</CalloutTitle>
      <CalloutDescription>
        This feature is currently in beta. Some functionality may change.
      </CalloutDescription>
    </Callout>
  ),
};

export const Warning: Story = {
  render: () => (
    <Callout variant="warning">
      <CalloutTitle>Warning</CalloutTitle>
      <CalloutDescription>
        This action cannot be undone. Please proceed with caution.
      </CalloutDescription>
    </Callout>
  ),
};

export const Error: Story = {
  render: () => (
    <Callout variant="error">
      <CalloutTitle>Error</CalloutTitle>
      <CalloutDescription>
        There was a problem processing your request. Please try again.
      </CalloutDescription>
    </Callout>
  ),
};

export const Success: Story = {
  render: () => (
    <Callout variant="success">
      <CalloutTitle>Success</CalloutTitle>
      <CalloutDescription>
        Your changes have been saved successfully.
      </CalloutDescription>
    </Callout>
  ),
};

export const Tip: Story = {
  render: () => (
    <Callout variant="tip">
      <CalloutTitle>Pro Tip</CalloutTitle>
      <CalloutDescription>
        You can use keyboard shortcuts to navigate faster. Press ? to see all shortcuts.
      </CalloutDescription>
    </Callout>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Callout variant="info" dismissible onDismiss={() => console.log('Dismissed')}>
      <CalloutTitle>Dismissible Callout</CalloutTitle>
      <CalloutDescription>
        Click the X button to dismiss this callout.
      </CalloutDescription>
    </Callout>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Callout variant="info">
      <CalloutTitle>This is a callout with only a title</CalloutTitle>
    </Callout>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <Callout variant="tip">
      <CalloutDescription>
        This is a callout with only a description, no title needed.
      </CalloutDescription>
    </Callout>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12, maxWidth: 400 }}>
      <Callout variant="info">
        <CalloutTitle>Info</CalloutTitle>
        <CalloutDescription>This is an info callout.</CalloutDescription>
      </Callout>
      <Callout variant="warning">
        <CalloutTitle>Warning</CalloutTitle>
        <CalloutDescription>This is a warning callout.</CalloutDescription>
      </Callout>
      <Callout variant="error">
        <CalloutTitle>Error</CalloutTitle>
        <CalloutDescription>This is an error callout.</CalloutDescription>
      </Callout>
      <Callout variant="success">
        <CalloutTitle>Success</CalloutTitle>
        <CalloutDescription>This is a success callout.</CalloutDescription>
      </Callout>
      <Callout variant="tip">
        <CalloutTitle>Tip</CalloutTitle>
        <CalloutDescription>This is a tip callout.</CalloutDescription>
      </Callout>
    </View>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Callout variant="info">
      <CalloutTitle>Custom Content</CalloutTitle>
      <CalloutDescription>
        You can include custom content inside callouts.
      </CalloutDescription>
      <View style={{ marginTop: 8, padding: 8, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 4 }}>
        <Text style={{ fontFamily: 'monospace', fontSize: 12, color: '#3b82f6' }}>
          npm install @hyena-studio/react-native
        </Text>
      </View>
    </Callout>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Callout variant="warning" style={{ maxWidth: 400 }}>
      <CalloutTitle>Important Security Notice</CalloutTitle>
      <CalloutDescription>
        We've detected unusual activity on your account. For your security, we recommend
        changing your password immediately. You should also enable two-factor authentication
        to add an extra layer of protection to your account.
      </CalloutDescription>
    </Callout>
  ),
};
