import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
  SidebarNavGroup,
  SidebarSeparator,
  Button,
  Avatar,
  AvatarFallback,
  Badge,
  colors,
} from '@hyena-studio/react-native';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

// ============================================================================
// Helper Icons
// ============================================================================

const HomeIcon = () => <Text style={iconStyles.icon}>🏠</Text>;
const DashboardIcon = () => <Text style={iconStyles.icon}>📊</Text>;
const UsersIcon = () => <Text style={iconStyles.icon}>👥</Text>;
const ProjectsIcon = () => <Text style={iconStyles.icon}>📁</Text>;
const SettingsIcon = () => <Text style={iconStyles.icon}>⚙️</Text>;
const CalendarIcon = () => <Text style={iconStyles.icon}>📅</Text>;
const MessagesIcon = () => <Text style={iconStyles.icon}>💬</Text>;
const AnalyticsIcon = () => <Text style={iconStyles.icon}>📈</Text>;
const HelpIcon = () => <Text style={iconStyles.icon}>❓</Text>;
const LogoutIcon = () => <Text style={iconStyles.icon}>🚪</Text>;
const DocsIcon = () => <Text style={iconStyles.icon}>📖</Text>;
const ReportsIcon = () => <Text style={iconStyles.icon}>📑</Text>;

const Logo = () => (
  <View style={logoStyles.container}>
    <View style={logoStyles.icon}>
      <Text style={logoStyles.iconText}>R</Text>
    </View>
    <Text style={logoStyles.text}>R-UI</Text>
  </View>
);

const LogoCompact = () => (
  <View style={logoStyles.icon}>
    <Text style={logoStyles.iconText}>R</Text>
  </View>
);

// ============================================================================
// Default Expanded
// ============================================================================

export const DefaultExpanded: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Sidebar defaultOpen>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem icon={<HomeIcon />} active>
            Home
          </SidebarNavItem>
          <SidebarNavItem icon={<DashboardIcon />}>
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem icon={<ProjectsIcon />}>
            Projects
          </SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />}>
            Team
          </SidebarNavItem>
          <SidebarNavItem icon={<CalendarIcon />}>
            Calendar
          </SidebarNavItem>
        </SidebarNav>
        <SidebarFooter>
          <SidebarNavItem icon={<SettingsIcon />}>
            Settings
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContent>
      <View style={decoratorStyles.mainContent}>
        <Text style={decoratorStyles.contentText}>Main content area</Text>
      </View>
    </Sidebar>
  ),
};

// ============================================================================
// Collapsed (Icons Only)
// ============================================================================

export const CollapsedIconsOnly: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Sidebar defaultOpen collapsible collapsed>
      <SidebarContent collapsedWidth={64}>
        <SidebarHeader>
          <LogoCompact />
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem icon={<HomeIcon />} active>
            Home
          </SidebarNavItem>
          <SidebarNavItem icon={<DashboardIcon />}>
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem icon={<ProjectsIcon />}>
            Projects
          </SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />}>
            Team
          </SidebarNavItem>
        </SidebarNav>
        <SidebarFooter>
          <SidebarNavItem icon={<SettingsIcon />}>
            Settings
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContent>
      <View style={decoratorStyles.mainContent}>
        <Text style={decoratorStyles.contentText}>Main content area</Text>
      </View>
    </Sidebar>
  ),
};

// ============================================================================
// With Nested Navigation
// ============================================================================

export const WithNestedNavigation: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Sidebar defaultOpen>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem icon={<HomeIcon />} active>
            Home
          </SidebarNavItem>
          <SidebarNavItem icon={<DashboardIcon />}>
            Dashboard
          </SidebarNavItem>

          <SidebarNavGroup label="Projects" icon={<ProjectsIcon />} defaultExpanded>
            <SidebarNavItem>Website Redesign</SidebarNavItem>
            <SidebarNavItem>Mobile App</SidebarNavItem>
            <SidebarNavItem>API Integration</SidebarNavItem>
          </SidebarNavGroup>

          <SidebarNavGroup label="Reports" icon={<ReportsIcon />}>
            <SidebarNavItem>Monthly Report</SidebarNavItem>
            <SidebarNavItem>Annual Summary</SidebarNavItem>
            <SidebarNavItem>Custom Report</SidebarNavItem>
          </SidebarNavGroup>

          <SidebarNavItem icon={<CalendarIcon />}>
            Calendar
          </SidebarNavItem>
        </SidebarNav>
        <SidebarFooter>
          <SidebarNavItem icon={<SettingsIcon />}>
            Settings
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContent>
      <View style={decoratorStyles.mainContent}>
        <Text style={decoratorStyles.contentText}>Main content area</Text>
      </View>
    </Sidebar>
  ),
};

// ============================================================================
// With Sections/Groups
// ============================================================================

export const WithSections: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Sidebar defaultOpen>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarNav>
          <Text style={sectionStyles.label}>MAIN</Text>
          <SidebarNavItem icon={<HomeIcon />} active>
            Home
          </SidebarNavItem>
          <SidebarNavItem icon={<DashboardIcon />}>
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem icon={<AnalyticsIcon />}>
            Analytics
          </SidebarNavItem>

          <SidebarSeparator />

          <Text style={sectionStyles.label}>WORKSPACE</Text>
          <SidebarNavItem icon={<ProjectsIcon />}>
            Projects
          </SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />}>
            Team
          </SidebarNavItem>
          <SidebarNavItem icon={<CalendarIcon />}>
            Calendar
          </SidebarNavItem>

          <SidebarSeparator />

          <Text style={sectionStyles.label}>RESOURCES</Text>
          <SidebarNavItem icon={<DocsIcon />}>
            Documentation
          </SidebarNavItem>
          <SidebarNavItem icon={<HelpIcon />}>
            Help Center
          </SidebarNavItem>
        </SidebarNav>
        <SidebarFooter>
          <SidebarNavItem icon={<SettingsIcon />}>
            Settings
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContent>
      <View style={decoratorStyles.mainContent}>
        <Text style={decoratorStyles.contentText}>Main content area</Text>
      </View>
    </Sidebar>
  ),
};

// ============================================================================
// With Badges/Indicators
// ============================================================================

export const WithBadges: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Sidebar defaultOpen>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem icon={<HomeIcon />} active>
            Home
          </SidebarNavItem>
          <View style={badgeStyles.itemWithBadge}>
            <SidebarNavItem icon={<MessagesIcon />} style={{ flex: 1 }}>
              Messages
            </SidebarNavItem>
            <Badge variant="default" size="sm">12</Badge>
          </View>
          <View style={badgeStyles.itemWithBadge}>
            <SidebarNavItem icon={<ProjectsIcon />} style={{ flex: 1 }}>
              Projects
            </SidebarNavItem>
            <View style={badgeStyles.dot} />
          </View>
          <SidebarNavItem icon={<UsersIcon />}>
            Team
          </SidebarNavItem>
          <View style={badgeStyles.itemWithBadge}>
            <SidebarNavItem icon={<CalendarIcon />} style={{ flex: 1 }}>
              Calendar
            </SidebarNavItem>
            <Badge variant="warning" size="sm">3</Badge>
          </View>
        </SidebarNav>
        <SidebarFooter>
          <SidebarNavItem icon={<SettingsIcon />}>
            Settings
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContent>
      <View style={decoratorStyles.mainContent}>
        <Text style={decoratorStyles.contentText}>Main content area</Text>
      </View>
    </Sidebar>
  ),
};

// ============================================================================
// With Footer Content
// ============================================================================

export const WithFooterContent: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Sidebar defaultOpen>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem icon={<HomeIcon />} active>
            Home
          </SidebarNavItem>
          <SidebarNavItem icon={<DashboardIcon />}>
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem icon={<ProjectsIcon />}>
            Projects
          </SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />}>
            Team
          </SidebarNavItem>
        </SidebarNav>
        <SidebarFooter>
          <SidebarSeparator />
          <View style={footerStyles.user}>
            <Avatar size="sm">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <View style={footerStyles.userInfo}>
              <Text style={footerStyles.userName}>John Doe</Text>
              <Text style={footerStyles.userEmail}>john@example.com</Text>
            </View>
          </View>
          <SidebarNavItem icon={<SettingsIcon />}>
            Settings
          </SidebarNavItem>
          <SidebarNavItem icon={<LogoutIcon />}>
            Sign out
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContent>
      <View style={decoratorStyles.mainContent}>
        <Text style={decoratorStyles.contentText}>Main content area</Text>
      </View>
    </Sidebar>
  ),
};

// ============================================================================
// Controlled Toggle
// ============================================================================

export const ControlledToggle: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: function ControlledToggleStory() {
    const [open, setOpen] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Sidebar
        open={open}
        onOpenChange={setOpen}
        collapsible
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      >
        <SidebarContent collapsedWidth={64}>
          <SidebarHeader>
            {collapsed ? <LogoCompact /> : <Logo />}
          </SidebarHeader>
          <SidebarNav>
            <SidebarNavItem icon={<HomeIcon />} active>
              Home
            </SidebarNavItem>
            <SidebarNavItem icon={<DashboardIcon />}>
              Dashboard
            </SidebarNavItem>
            <SidebarNavItem icon={<ProjectsIcon />}>
              Projects
            </SidebarNavItem>
          </SidebarNav>
          <SidebarFooter>
            <SidebarNavItem icon={<SettingsIcon />}>
              Settings
            </SidebarNavItem>
          </SidebarFooter>
        </SidebarContent>
        <View style={decoratorStyles.mainContent}>
          <View style={controlStyles.controls}>
            <Button
              variant="secondary"
              size="sm"
              onPress={() => setOpen(!open)}
            >
              {open ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onPress={() => setCollapsed(!collapsed)}
              disabled={!open}
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </Button>
          </View>
          <Text style={decoratorStyles.contentText}>
            Sidebar is {open ? 'open' : 'closed'} and {collapsed ? 'collapsed' : 'expanded'}
          </Text>
        </View>
      </Sidebar>
    );
  },
};

// ============================================================================
// Right Side
// ============================================================================

export const RightSide: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Sidebar defaultOpen side="right">
      <View style={decoratorStyles.mainContent}>
        <Text style={decoratorStyles.contentText}>Main content area</Text>
      </View>
      <SidebarContent>
        <SidebarHeader>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text.primary }}>
            Details Panel
          </Text>
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem icon={<HomeIcon />}>
            Overview
          </SidebarNavItem>
          <SidebarNavItem icon={<UsersIcon />} active>
            Properties
          </SidebarNavItem>
          <SidebarNavItem icon={<CalendarIcon />}>
            History
          </SidebarNavItem>
          <SidebarNavItem icon={<MessagesIcon />}>
            Comments
          </SidebarNavItem>
        </SidebarNav>
      </SidebarContent>
    </Sidebar>
  ),
};

// ============================================================================
// Dashboard Layout Example
// ============================================================================

export const DashboardLayout: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <Story />
      </View>
    ),
  ],
  render: function DashboardLayoutStory() {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
      <Sidebar defaultOpen>
        <SidebarContent width={240}>
          <SidebarHeader>
            <View style={logoStyles.container}>
              <View style={logoStyles.icon}>
                <Text style={logoStyles.iconText}>A</Text>
              </View>
              <View>
                <Text style={logoStyles.text}>Acme Inc</Text>
                <Text style={logoStyles.subtitle}>Enterprise</Text>
              </View>
            </View>
          </SidebarHeader>
          <SidebarNav>
            <Text style={sectionStyles.label}>OVERVIEW</Text>
            <SidebarNavItem
              icon={<DashboardIcon />}
              active={activeItem === 'dashboard'}
              onPress={() => setActiveItem('dashboard')}
            >
              Dashboard
            </SidebarNavItem>
            <SidebarNavItem
              icon={<AnalyticsIcon />}
              active={activeItem === 'analytics'}
              onPress={() => setActiveItem('analytics')}
            >
              Analytics
            </SidebarNavItem>
            <SidebarNavItem
              icon={<ReportsIcon />}
              active={activeItem === 'reports'}
              onPress={() => setActiveItem('reports')}
            >
              Reports
            </SidebarNavItem>

            <SidebarSeparator />

            <Text style={sectionStyles.label}>MANAGEMENT</Text>
            <SidebarNavItem
              icon={<UsersIcon />}
              active={activeItem === 'users'}
              onPress={() => setActiveItem('users')}
            >
              Users
            </SidebarNavItem>
            <SidebarNavItem
              icon={<ProjectsIcon />}
              active={activeItem === 'projects'}
              onPress={() => setActiveItem('projects')}
            >
              Projects
            </SidebarNavItem>
            <SidebarNavItem
              icon={<CalendarIcon />}
              active={activeItem === 'calendar'}
              onPress={() => setActiveItem('calendar')}
            >
              Calendar
            </SidebarNavItem>
          </SidebarNav>
          <SidebarFooter>
            <View style={footerStyles.upgrade}>
              <Text style={footerStyles.upgradeTitle}>Upgrade Plan</Text>
              <Text style={footerStyles.upgradeText}>
                Get more features with Pro
              </Text>
              <Button variant="primary" size="sm">Upgrade</Button>
            </View>
            <SidebarSeparator />
            <View style={footerStyles.user}>
              <Avatar size="sm">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <View style={footerStyles.userInfo}>
                <Text style={footerStyles.userName}>John Doe</Text>
                <Text style={footerStyles.userEmail}>Admin</Text>
              </View>
            </View>
          </SidebarFooter>
        </SidebarContent>
        <View style={dashboardStyles.content}>
          <Text style={dashboardStyles.title}>
            {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
          </Text>
          <Text style={dashboardStyles.subtitle}>
            Welcome back! Here's what's happening.
          </Text>
        </View>
      </Sidebar>
    );
  },
};

// ============================================================================
// Styles
// ============================================================================

const decoratorStyles = StyleSheet.create({
  container: {
    height: 600,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.bg.base,
  },
  mainContent: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.bg.base,
  },
  contentText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

const iconStyles = StyleSheet.create({
  icon: {
    fontSize: 18,
  },
});

const logoStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.accent.blue.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.text.muted,
  },
});

const sectionStyles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text.muted,
    letterSpacing: 0.5,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
});

const badgeStyles = StyleSheet.create({
  itemWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.semantic.success,
  },
});

const footerStyles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  userEmail: {
    fontSize: 12,
    color: colors.text.muted,
  },
  upgrade: {
    margin: 12,
    padding: 12,
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
    gap: 8,
  },
  upgradeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  upgradeText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

const controlStyles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
});

const dashboardStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.bg.base,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
