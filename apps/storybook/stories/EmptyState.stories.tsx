import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from '@r-ui/react-native';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
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
      <View style={{ padding: 20, maxWidth: 400, minHeight: 300, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <EmptyStateIcon icon="no-data" />
      <EmptyStateTitle>No data available</EmptyStateTitle>
      <EmptyStateDescription>
        There's nothing here yet. Start by adding some data.
      </EmptyStateDescription>
      <EmptyStateAction onPress={() => console.log('Add clicked')}>
        Add Item
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const NoData: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon icon="no-data" />
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        We couldn't find any items matching your criteria.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const Error: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon icon="error" />
      <EmptyStateTitle>Something went wrong</EmptyStateTitle>
      <EmptyStateDescription>
        We encountered an error while loading your data. Please try again.
      </EmptyStateDescription>
      <EmptyStateAction onPress={() => console.log('Retry clicked')}>
        Try Again
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const Search: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon icon="search" />
      <EmptyStateTitle>No search results</EmptyStateTitle>
      <EmptyStateDescription>
        Try adjusting your search terms or filters to find what you're looking for.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const Permission: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon icon="permission" />
      <EmptyStateTitle>Access denied</EmptyStateTitle>
      <EmptyStateDescription>
        You don't have permission to view this content. Contact your administrator for access.
      </EmptyStateDescription>
      <EmptyStateAction variant="secondary" onPress={() => console.log('Contact clicked')}>
        Contact Admin
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const Folder: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon icon="folder" />
      <EmptyStateTitle>Folder is empty</EmptyStateTitle>
      <EmptyStateDescription>
        This folder doesn't contain any files yet.
      </EmptyStateDescription>
      <EmptyStateAction onPress={() => console.log('Upload clicked')}>
        Upload Files
      </EmptyStateAction>
    </EmptyState>
  ),
};

export const Compact: Story = {
  render: () => (
    <EmptyState variant="compact">
      <EmptyStateIcon icon="no-data" size={48} />
      <EmptyStateTitle>No items</EmptyStateTitle>
      <EmptyStateDescription>
        Nothing to show here.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

export const WithMultipleActions: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateIcon icon="no-data" />
      <EmptyStateTitle>Get started</EmptyStateTitle>
      <EmptyStateDescription>
        Create your first project to begin organizing your work.
      </EmptyStateDescription>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <EmptyStateAction onPress={() => console.log('Create clicked')}>
          Create Project
        </EmptyStateAction>
        <EmptyStateAction variant="secondary" onPress={() => console.log('Import clicked')}>
          Import
        </EmptyStateAction>
      </View>
    </EmptyState>
  ),
};

export const AllIconTypes: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="no-data" size={48} />
        <EmptyStateTitle>no-data</EmptyStateTitle>
      </EmptyState>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="error" size={48} />
        <EmptyStateTitle>error</EmptyStateTitle>
      </EmptyState>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="search" size={48} />
        <EmptyStateTitle>search</EmptyStateTitle>
      </EmptyState>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="permission" size={48} />
        <EmptyStateTitle>permission</EmptyStateTitle>
      </EmptyState>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="folder" size={48} />
        <EmptyStateTitle>folder</EmptyStateTitle>
      </EmptyState>
    </View>
  ),
};

export const CustomIconSize: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap' }}>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="no-data" size={32} />
        <EmptyStateTitle>32px</EmptyStateTitle>
      </EmptyState>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="no-data" size={48} />
        <EmptyStateTitle>48px</EmptyStateTitle>
      </EmptyState>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="no-data" size={64} />
        <EmptyStateTitle>64px</EmptyStateTitle>
      </EmptyState>
      <EmptyState variant="compact">
        <EmptyStateIcon icon="no-data" size={96} />
        <EmptyStateTitle>96px</EmptyStateTitle>
      </EmptyState>
    </View>
  ),
};

export const InCard: Story = {
  render: () => (
    <View style={{
      backgroundColor: '#f9fafb',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      padding: 24,
    }}>
      <EmptyState>
        <EmptyStateIcon icon="no-data" />
        <EmptyStateTitle>No notifications</EmptyStateTitle>
        <EmptyStateDescription>
          You're all caught up! Check back later for new updates.
        </EmptyStateDescription>
      </EmptyState>
    </View>
  ),
};
