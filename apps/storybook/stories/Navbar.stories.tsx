import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Input,
  colors,
} from '@hyena-studio/react-native';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

// ============================================================================
// Helper Components
// ============================================================================

const Logo = () => (
  <View style={logoStyles.container}>
    <View style={logoStyles.icon}>
      <Text style={logoStyles.iconText}>R</Text>
    </View>
    <Text style={logoStyles.text}>R-UI</Text>
  </View>
);

const SearchIcon = () => (
  <Text style={{ fontSize: 16, color: colors.text.muted }}>🔍</Text>
);

const BellIcon = () => (
  <Text style={{ fontSize: 18 }}>🔔</Text>
);

const MenuIcon = () => (
  <Text style={{ fontSize: 20 }}>☰</Text>
);

// ============================================================================
// Default
// ============================================================================

export const Default: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.fullscreen}>
        <Story />
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content below navbar</Text>
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem active>Home</NavbarItem>
        <NavbarItem>Products</NavbarItem>
        <NavbarItem>About</NavbarItem>
        <NavbarItem>Contact</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button variant="primary" size="sm">Sign In</Button>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// With Search
// ============================================================================

export const WithSearch: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.fullscreen}>
        <Story />
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem active>Dashboard</NavbarItem>
        <NavbarItem>Projects</NavbarItem>
        <NavbarItem>Team</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" style={{ gap: 12 }}>
        <View style={searchStyles.container}>
          <SearchIcon />
          <TextInput
            placeholder="Search..."
            placeholderTextColor={colors.text.muted}
            style={searchStyles.input}
          />
        </View>
        <Button variant="primary" size="sm">New Project</Button>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// With User Menu
// ============================================================================

export const WithUserMenu: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.fullscreen}>
        <Story />
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem active>Dashboard</NavbarItem>
        <NavbarItem>Projects</NavbarItem>
        <NavbarItem>Team</NavbarItem>
        <NavbarItem>Reports</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" style={{ gap: 12 }}>
        <Dropdown>
          <DropdownTrigger>
            <Pressable style={userMenuStyles.trigger}>
              <Avatar size="sm">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Text style={userMenuStyles.name}>John Doe</Text>
              <Text style={userMenuStyles.chevron}>▼</Text>
            </Pressable>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onSelect={() => console.log('Profile')}>
              Profile
            </DropdownItem>
            <DropdownItem onSelect={() => console.log('Settings')}>
              Settings
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem onSelect={() => console.log('Sign out')}>
              Sign out
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// Mobile Responsive (Hamburger Menu)
// ============================================================================

export const MobileResponsive: Story = {
  decorators: [
    (Story) => (
      <View style={[decoratorStyles.fullscreen, { position: 'relative' }]}>
        <Story />
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
      </View>
    ),
  ],
  render: function MobileNavStory() {
    return (
      <Navbar>
        <NavbarBrand>
          <Logo />
        </NavbarBrand>

        {/* Desktop navigation - hidden on mobile */}
        <NavbarContent style={{ display: 'none' }}>
          <NavbarItem active>Home</NavbarItem>
          <NavbarItem>Products</NavbarItem>
          <NavbarItem>About</NavbarItem>
          <NavbarItem>Contact</NavbarItem>
        </NavbarContent>

        {/* Mobile menu toggle */}
        <NavbarContent justify="end">
          <NavbarMenuToggle>
            <MenuIcon />
          </NavbarMenuToggle>
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu>
          <NavbarMenuItem active>Home</NavbarMenuItem>
          <NavbarMenuItem>Products</NavbarMenuItem>
          <NavbarMenuItem>About</NavbarMenuItem>
          <NavbarMenuItem>Contact</NavbarMenuItem>
          <View style={{ marginTop: 12 }}>
            <Button variant="primary">Sign In</Button>
          </View>
        </NavbarMenu>
      </Navbar>
    );
  },
};

// ============================================================================
// Transparent (Hero Section)
// ============================================================================

export const Transparent: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.heroBackground}>
        <Story />
        <View style={decoratorStyles.heroContent}>
          <Text style={decoratorStyles.heroTitle}>Welcome to Our Platform</Text>
          <Text style={decoratorStyles.heroSubtitle}>
            Build beautiful apps with our design system
          </Text>
          <Button variant="primary" size="lg">Get Started</Button>
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar bordered={false} blur style={{ backgroundColor: 'transparent' }}>
      <NavbarBrand>
        <View style={logoStyles.container}>
          <View style={[logoStyles.icon, { backgroundColor: colors.white }]}>
            <Text style={[logoStyles.iconText, { color: colors.accent.blue.DEFAULT }]}>R</Text>
          </View>
          <Text style={[logoStyles.text, { color: colors.white }]}>R-UI</Text>
        </View>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>Features</NavbarItem>
        <NavbarItem>Pricing</NavbarItem>
        <NavbarItem>Docs</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button variant="secondary" size="sm">Sign In</Button>
        <Button variant="primary" size="sm">Get Started</Button>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// Sticky
// ============================================================================

export const Sticky: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.scrollableContainer}>
        <Story />
        <View style={decoratorStyles.scrollContent}>
          {Array.from({ length: 20 }).map((_, i) => (
            <View key={i} style={decoratorStyles.scrollItem}>
              <Text style={decoratorStyles.scrollItemText}>Section {i + 1}</Text>
              <Text style={decoratorStyles.scrollItemDescription}>
                Scroll to see the sticky navbar behavior
              </Text>
            </View>
          ))}
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar position="sticky">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem active>Home</NavbarItem>
        <NavbarItem>Products</NavbarItem>
        <NavbarItem>About</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button variant="primary" size="sm">Sign In</Button>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// With Notification Badge
// ============================================================================

export const WithNotifications: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.fullscreen}>
        <Story />
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem active>Dashboard</NavbarItem>
        <NavbarItem>Messages</NavbarItem>
        <NavbarItem>Settings</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" style={{ gap: 16 }}>
        <Pressable style={notificationStyles.button}>
          <BellIcon />
          <View style={notificationStyles.badge}>
            <Text style={notificationStyles.badgeText}>3</Text>
          </View>
        </Pressable>
        <Avatar size="sm">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// Multiple Nav Sections
// ============================================================================

export const MultipleNavSections: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.fullscreen}>
        <Story />
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem active>Overview</NavbarItem>
        <NavbarItem>Analytics</NavbarItem>
        <NavbarItem>Reports</NavbarItem>
        <NavbarItem>Settings</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <View style={searchStyles.containerWide}>
          <SearchIcon />
          <TextInput
            placeholder="Search anything..."
            placeholderTextColor={colors.text.muted}
            style={searchStyles.input}
          />
        </View>
      </NavbarContent>
      <NavbarContent justify="end" style={{ gap: 12 }}>
        <Button variant="ghost" size="sm">Help</Button>
        <Button variant="secondary" size="sm">Upgrade</Button>
        <Avatar size="sm">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// E-commerce Example
// ============================================================================

export const EcommerceExample: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.fullscreen}>
        <Story />
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Shop content</Text>
        </View>
      </View>
    ),
  ],
  render: () => (
    <Navbar>
      <NavbarBrand>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text.primary }}>
          ShopName
        </Text>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem active>New Arrivals</NavbarItem>
        <NavbarItem>Men</NavbarItem>
        <NavbarItem>Women</NavbarItem>
        <NavbarItem>Sale</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" style={{ gap: 16 }}>
        <Pressable>
          <SearchIcon />
        </Pressable>
        <Pressable>
          <Text style={{ fontSize: 18 }}>❤️</Text>
        </Pressable>
        <Pressable style={cartStyles.button}>
          <Text style={{ fontSize: 18 }}>🛒</Text>
          <View style={cartStyles.badge}>
            <Text style={cartStyles.badgeText}>2</Text>
          </View>
        </Pressable>
        <Avatar size="sm">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </NavbarContent>
    </Navbar>
  ),
};

// ============================================================================
// Styles
// ============================================================================

const decoratorStyles = StyleSheet.create({
  fullscreen: {
    minHeight: 400,
    backgroundColor: colors.bg.base,
  },
  content: {
    padding: 24,
  },
  contentText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  heroBackground: {
    minHeight: 500,
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    maxWidth: 400,
  },
  scrollableContainer: {
    height: 500,
    overflow: 'scroll',
  },
  scrollContent: {
    padding: 16,
  },
  scrollItem: {
    padding: 24,
    backgroundColor: colors.bg.surface,
    borderRadius: 8,
    marginBottom: 12,
  },
  scrollItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  scrollItemDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
});

const logoStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.accent.blue.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
});

const searchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 200,
  },
  containerWide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 300,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text.primary,
    paddingVertical: 2,
  },
});

const userMenuStyles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  chevron: {
    fontSize: 10,
    color: colors.text.muted,
  },
});

const notificationStyles = StyleSheet.create({
  button: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.semantic.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
});

const cartStyles = StyleSheet.create({
  button: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.white,
  },
});
