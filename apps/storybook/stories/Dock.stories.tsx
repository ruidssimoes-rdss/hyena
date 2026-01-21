import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import {
  Dock,
  DockItem,
  DockSeparator,
  Text,
} from '@hyena-studio/react-native';

// Simple icon components for the stories
const HomeIcon = () => <RNText style={styles.icon}>🏠</RNText>;
const SearchIcon = () => <RNText style={styles.icon}>🔍</RNText>;
const FolderIcon = () => <RNText style={styles.icon}>📁</RNText>;
const MailIcon = () => <RNText style={styles.icon}>✉️</RNText>;
const CalendarIcon = () => <RNText style={styles.icon}>📅</RNText>;
const SettingsIcon = () => <RNText style={styles.icon}>⚙️</RNText>;
const MusicIcon = () => <RNText style={styles.icon}>🎵</RNText>;
const PhotoIcon = () => <RNText style={styles.icon}>📷</RNText>;
const VideoIcon = () => <RNText style={styles.icon}>🎬</RNText>;
const ChatIcon = () => <RNText style={styles.icon}>💬</RNText>;
const CartIcon = () => <RNText style={styles.icon}>🛒</RNText>;
const TrashIcon = () => <RNText style={styles.icon}>🗑️</RNText>;

const meta: Meta<typeof Dock> = {
  title: 'Components/Navigation/Dock',
  component: Dock,
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom', 'left', 'right'],
      description: 'Position of the dock',
    },
    magnification: {
      control: 'boolean',
      description: 'Enable magnification effect on hover',
    },
    magnificationScale: {
      control: { type: 'range', min: 1, max: 2, step: 0.1 },
      description: 'Scale factor for magnification',
    },
    autoHide: {
      control: 'boolean',
      description: 'Auto-hide the dock when not in use',
    },
  },
  args: {
    position: 'bottom',
    magnification: true,
    magnificationScale: 1.5,
    autoHide: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>Hover over the dock to see the magnification effect</Text>
        </View>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dock>;

export const Default: Story = {
  render: (args) => (
    <Dock {...args}>
      <DockItem icon={<HomeIcon />} label="Home" onPress={() => {}} />
      <DockItem icon={<SearchIcon />} label="Search" onPress={() => {}} />
      <DockItem icon={<FolderIcon />} label="Files" onPress={() => {}} />
      <DockItem icon={<MailIcon />} label="Mail" badge={3} onPress={() => {}} />
      <DockItem icon={<CalendarIcon />} label="Calendar" onPress={() => {}} />
      <DockSeparator />
      <DockItem icon={<SettingsIcon />} label="Settings" onPress={() => {}} />
    </Dock>
  ),
};

export const WithActiveState: Story = {
  render: function ActiveStateStory() {
    const [activeItem, setActiveItem] = useState('home');

    return (
      <Dock position="bottom" magnification>
        <DockItem
          icon={<HomeIcon />}
          label="Home"
          active={activeItem === 'home'}
          onPress={() => setActiveItem('home')}
        />
        <DockItem
          icon={<SearchIcon />}
          label="Search"
          active={activeItem === 'search'}
          onPress={() => setActiveItem('search')}
        />
        <DockItem
          icon={<FolderIcon />}
          label="Files"
          active={activeItem === 'files'}
          onPress={() => setActiveItem('files')}
        />
        <DockItem
          icon={<MailIcon />}
          label="Mail"
          active={activeItem === 'mail'}
          onPress={() => setActiveItem('mail')}
        />
        <DockItem
          icon={<CalendarIcon />}
          label="Calendar"
          active={activeItem === 'calendar'}
          onPress={() => setActiveItem('calendar')}
        />
      </Dock>
    );
  },
};

export const WithBadges: Story = {
  render: () => (
    <Dock position="bottom" magnification>
      <DockItem icon={<MailIcon />} label="Mail" badge={12} onPress={() => {}} />
      <DockItem icon={<ChatIcon />} label="Messages" badge={5} onPress={() => {}} />
      <DockItem icon={<CartIcon />} label="Cart" badge={2} onPress={() => {}} />
      <DockItem icon={<CalendarIcon />} label="Calendar" badge="!" onPress={() => {}} />
      <DockItem icon={<HomeIcon />} label="Home" onPress={() => {}} />
    </Dock>
  ),
};

export const LeftPosition: Story = {
  render: () => (
    <Dock position="left" magnification>
      <DockItem icon={<HomeIcon />} label="Home" active onPress={() => {}} />
      <DockItem icon={<SearchIcon />} label="Search" onPress={() => {}} />
      <DockItem icon={<FolderIcon />} label="Files" onPress={() => {}} />
      <DockSeparator />
      <DockItem icon={<MailIcon />} label="Mail" badge={7} onPress={() => {}} />
      <DockItem icon={<CalendarIcon />} label="Calendar" onPress={() => {}} />
      <DockSeparator />
      <DockItem icon={<SettingsIcon />} label="Settings" onPress={() => {}} />
    </Dock>
  ),
};

export const RightPosition: Story = {
  render: () => (
    <Dock position="right" magnification>
      <DockItem icon={<MusicIcon />} label="Music" onPress={() => {}} />
      <DockItem icon={<PhotoIcon />} label="Photos" onPress={() => {}} />
      <DockItem icon={<VideoIcon />} label="Videos" onPress={() => {}} />
      <DockSeparator />
      <DockItem icon={<TrashIcon />} label="Trash" onPress={() => {}} />
    </Dock>
  ),
};

export const NoMagnification: Story = {
  render: () => (
    <Dock position="bottom" magnification={false}>
      <DockItem icon={<HomeIcon />} label="Home" onPress={() => {}} />
      <DockItem icon={<SearchIcon />} label="Search" onPress={() => {}} />
      <DockItem icon={<FolderIcon />} label="Files" onPress={() => {}} />
      <DockItem icon={<MailIcon />} label="Mail" onPress={() => {}} />
      <DockItem icon={<CalendarIcon />} label="Calendar" onPress={() => {}} />
    </Dock>
  ),
};

export const HighMagnification: Story = {
  render: () => (
    <Dock position="bottom" magnification magnificationScale={2}>
      <DockItem icon={<HomeIcon />} label="Home" onPress={() => {}} />
      <DockItem icon={<SearchIcon />} label="Search" onPress={() => {}} />
      <DockItem icon={<FolderIcon />} label="Files" onPress={() => {}} />
      <DockItem icon={<MailIcon />} label="Mail" onPress={() => {}} />
      <DockItem icon={<CalendarIcon />} label="Calendar" onPress={() => {}} />
    </Dock>
  ),
};

export const MultipleSeparators: Story = {
  render: () => (
    <Dock position="bottom" magnification>
      <DockItem icon={<HomeIcon />} label="Home" active onPress={() => {}} />
      <DockItem icon={<SearchIcon />} label="Search" onPress={() => {}} />
      <DockSeparator />
      <DockItem icon={<MailIcon />} label="Mail" badge={3} onPress={() => {}} />
      <DockItem icon={<ChatIcon />} label="Messages" onPress={() => {}} />
      <DockItem icon={<CalendarIcon />} label="Calendar" onPress={() => {}} />
      <DockSeparator />
      <DockItem icon={<MusicIcon />} label="Music" onPress={() => {}} />
      <DockItem icon={<PhotoIcon />} label="Photos" onPress={() => {}} />
      <DockSeparator />
      <DockItem icon={<TrashIcon />} label="Trash" onPress={() => {}} />
    </Dock>
  ),
};

export const MinimalDock: Story = {
  render: () => (
    <Dock position="bottom" magnification>
      <DockItem icon={<HomeIcon />} label="Home" onPress={() => {}} />
      <DockItem icon={<SettingsIcon />} label="Settings" onPress={() => {}} />
    </Dock>
  ),
};

export const LargeBadgeNumbers: Story = {
  render: () => (
    <Dock position="bottom" magnification>
      <DockItem icon={<MailIcon />} label="Mail" badge={99} onPress={() => {}} />
      <DockItem icon={<ChatIcon />} label="Messages" badge={150} onPress={() => {}} />
      <DockItem icon={<CalendarIcon />} label="Notifications" badge={999} onPress={() => {}} />
    </Dock>
  ),
};

export const ApplicationDock: Story = {
  render: function ApplicationDockStory() {
    const [activeApp, setActiveApp] = useState('finder');

    return (
      <Dock position="bottom" magnification magnificationScale={1.4}>
        <DockItem
          icon={<FolderIcon />}
          label="Finder"
          active={activeApp === 'finder'}
          onPress={() => setActiveApp('finder')}
        />
        <DockItem
          icon={<HomeIcon />}
          label="Safari"
          active={activeApp === 'safari'}
          onPress={() => setActiveApp('safari')}
        />
        <DockItem
          icon={<MailIcon />}
          label="Mail"
          badge={8}
          active={activeApp === 'mail'}
          onPress={() => setActiveApp('mail')}
        />
        <DockItem
          icon={<CalendarIcon />}
          label="Calendar"
          active={activeApp === 'calendar'}
          onPress={() => setActiveApp('calendar')}
        />
        <DockItem
          icon={<ChatIcon />}
          label="Messages"
          badge={2}
          active={activeApp === 'messages'}
          onPress={() => setActiveApp('messages')}
        />
        <DockItem
          icon={<MusicIcon />}
          label="Music"
          active={activeApp === 'music'}
          onPress={() => setActiveApp('music')}
        />
        <DockSeparator />
        <DockItem
          icon={<FolderIcon />}
          label="Downloads"
          active={activeApp === 'downloads'}
          onPress={() => setActiveApp('downloads')}
        />
        <DockItem
          icon={<TrashIcon />}
          label="Trash"
          active={activeApp === 'trash'}
          onPress={() => setActiveApp('trash')}
        />
      </Dock>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
  },
});
