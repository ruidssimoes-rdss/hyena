import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  ResizablePanels,
  ResizablePanel,
  ResizableHandle,
  Button,
  colors,
} from '@hyena-studio/react-native';

const meta: Meta<typeof ResizablePanels> = {
  title: 'Components/Layout/ResizablePanels',
  component: ResizablePanels,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof ResizablePanels>;

// ============================================================================
// Helper Components
// ============================================================================

const PanelContent = ({ title, color, description }: { title: string; color: string; description?: string }) => (
  <View style={[panelStyles.content, { backgroundColor: color }]}>
    <Text style={panelStyles.title}>{title}</Text>
    {description && <Text style={panelStyles.description}>{description}</Text>}
  </View>
);

const FileTree = () => (
  <View style={fileTreeStyles.container}>
    <Text style={fileTreeStyles.header}>Explorer</Text>
    <View style={fileTreeStyles.item}>
      <Text style={fileTreeStyles.folder}>📁 src</Text>
    </View>
    <View style={[fileTreeStyles.item, { paddingLeft: 24 }]}>
      <Text style={fileTreeStyles.folder}>📁 components</Text>
    </View>
    <View style={[fileTreeStyles.item, { paddingLeft: 40 }]}>
      <Text style={fileTreeStyles.file}>📄 Button.tsx</Text>
    </View>
    <View style={[fileTreeStyles.item, { paddingLeft: 40 }]}>
      <Text style={fileTreeStyles.file}>📄 Card.tsx</Text>
    </View>
    <View style={[fileTreeStyles.item, { paddingLeft: 24 }]}>
      <Text style={fileTreeStyles.folder}>📁 hooks</Text>
    </View>
    <View style={[fileTreeStyles.item, { paddingLeft: 40 }]}>
      <Text style={fileTreeStyles.file}>📄 useAuth.ts</Text>
    </View>
    <View style={fileTreeStyles.item}>
      <Text style={fileTreeStyles.file}>📄 package.json</Text>
    </View>
    <View style={fileTreeStyles.item}>
      <Text style={fileTreeStyles.file}>📄 README.md</Text>
    </View>
  </View>
);

const CodeEditor = () => (
  <View style={editorStyles.container}>
    <View style={editorStyles.tabs}>
      <View style={editorStyles.tabActive}>
        <Text style={editorStyles.tabText}>Button.tsx</Text>
      </View>
      <View style={editorStyles.tab}>
        <Text style={editorStyles.tabTextInactive}>Card.tsx</Text>
      </View>
    </View>
    <ScrollView style={editorStyles.content}>
      <Text style={editorStyles.lineNumber}>1</Text>
      <Text style={editorStyles.code}>import React from 'react';</Text>
      <Text style={editorStyles.lineNumber}>2</Text>
      <Text style={editorStyles.code}>{''}</Text>
      <Text style={editorStyles.lineNumber}>3</Text>
      <Text style={editorStyles.code}>export function Button() {'{'}</Text>
      <Text style={editorStyles.lineNumber}>4</Text>
      <Text style={editorStyles.code}>{'  '}return {'<'}button{'>'}Click me{'<'}/button{'>'};</Text>
      <Text style={editorStyles.lineNumber}>5</Text>
      <Text style={editorStyles.code}>{'}'}</Text>
    </ScrollView>
  </View>
);

const Terminal = () => (
  <View style={terminalStyles.container}>
    <View style={terminalStyles.header}>
      <Text style={terminalStyles.headerText}>Terminal</Text>
    </View>
    <View style={terminalStyles.content}>
      <Text style={terminalStyles.line}>$ npm run dev</Text>
      <Text style={terminalStyles.line}>Starting development server...</Text>
      <Text style={terminalStyles.success}>Ready on http://localhost:3000</Text>
      <Text style={terminalStyles.cursor}>|</Text>
    </View>
  </View>
);

// ============================================================================
// Horizontal Split (2 panels)
// ============================================================================

export const HorizontalSplit: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={30}>
        <PanelContent
          title="Left Panel"
          color={colors.bg.surface}
          description="Drag the handle to resize"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <PanelContent
          title="Right Panel"
          color={colors.bg.elevated}
          description="Main content area"
        />
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// Vertical Split (2 panels)
// ============================================================================

export const VerticalSplit: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="vertical">
      <ResizablePanel defaultSize={60}>
        <PanelContent
          title="Top Panel"
          color={colors.bg.surface}
          description="Editor area"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <PanelContent
          title="Bottom Panel"
          color={colors.bg.elevated}
          description="Terminal or output"
        />
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// Multiple Panels (3+)
// ============================================================================

export const ThreePanels: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={25} minSize={15}>
        <PanelContent title="Sidebar" color={colors.bg.surface} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={20}>
        <PanelContent title="Main" color={colors.bg.elevated} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <PanelContent title="Details" color={colors.bg.surface} />
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// Nested Panels
// ============================================================================

export const NestedPanels: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainerTall}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={25} minSize={15}>
        <PanelContent title="Navigation" color={colors.bg.surface} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanels direction="vertical">
          <ResizablePanel defaultSize={70}>
            <PanelContent title="Editor" color={colors.bg.elevated} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <PanelContent title="Terminal" color={colors.bg.base} />
          </ResizablePanel>
        </ResizablePanels>
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// With Min/Max Constraints
// ============================================================================

export const WithConstraints: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <PanelContent
          title="Constrained Panel"
          color={colors.bg.surface}
          description="Min: 20%, Max: 40%"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <PanelContent
          title="Flexible Panel"
          color={colors.bg.elevated}
          description="No constraints"
        />
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// With Custom Handle
// ============================================================================

export const CustomHandle: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <PanelContent title="Panel 1" color={colors.bg.surface} />
      </ResizablePanel>
      <ResizableHandle
        withHandle
        style={{ backgroundColor: colors.accent.blue.DEFAULT, width: 4 }}
      />
      <ResizablePanel defaultSize={50}>
        <PanelContent title="Panel 2" color={colors.bg.elevated} />
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// Without Handle Visual
// ============================================================================

export const WithoutHandleVisual: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <PanelContent title="Panel 1" color={colors.bg.surface} />
      </ResizablePanel>
      <ResizableHandle withHandle={false} />
      <ResizablePanel defaultSize={50}>
        <PanelContent title="Panel 2" color={colors.bg.elevated} />
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// Disabled Handle
// ============================================================================

export const DisabledHandle: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <PanelContent
          title="Fixed Size"
          color={colors.bg.surface}
          description="Handle is disabled"
        />
      </ResizablePanel>
      <ResizableHandle disabled withHandle />
      <ResizablePanel defaultSize={50}>
        <PanelContent title="Fixed Size" color={colors.bg.elevated} />
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// IDE Layout Example
// ============================================================================

export const IDELayout: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainerTall}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
        <FileTree />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <ResizablePanels direction="vertical">
          <ResizablePanel defaultSize={70} minSize={30}>
            <CodeEditor />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={15}>
            <Terminal />
          </ResizablePanel>
        </ResizablePanels>
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// Email Client Layout
// ============================================================================

export const EmailClientLayout: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainerTall}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <ResizablePanels direction="horizontal">
      <ResizablePanel defaultSize={20} minSize={15}>
        <View style={emailStyles.folders}>
          <Text style={emailStyles.folderHeader}>Folders</Text>
          <Text style={emailStyles.folderItem}>📥 Inbox (12)</Text>
          <Text style={emailStyles.folderItem}>📤 Sent</Text>
          <Text style={emailStyles.folderItem}>📝 Drafts (3)</Text>
          <Text style={emailStyles.folderItem}>🗑️ Trash</Text>
        </View>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={35} minSize={20}>
        <View style={emailStyles.list}>
          <Text style={emailStyles.listHeader}>Messages</Text>
          <View style={emailStyles.messagePreview}>
            <Text style={emailStyles.messageSender}>John Doe</Text>
            <Text style={emailStyles.messageSubject}>Meeting Tomorrow</Text>
            <Text style={emailStyles.messageTime}>2:30 PM</Text>
          </View>
          <View style={emailStyles.messagePreview}>
            <Text style={emailStyles.messageSender}>Jane Smith</Text>
            <Text style={emailStyles.messageSubject}>Project Update</Text>
            <Text style={emailStyles.messageTime}>1:15 PM</Text>
          </View>
          <View style={emailStyles.messagePreview}>
            <Text style={emailStyles.messageSender}>Support</Text>
            <Text style={emailStyles.messageSubject}>Your ticket has been resolved</Text>
            <Text style={emailStyles.messageTime}>11:00 AM</Text>
          </View>
        </View>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={45} minSize={25}>
        <View style={emailStyles.reader}>
          <Text style={emailStyles.readerHeader}>Meeting Tomorrow</Text>
          <Text style={emailStyles.readerMeta}>From: John Doe · 2:30 PM</Text>
          <Text style={emailStyles.readerBody}>
            Hi team,{'\n\n'}
            Just a reminder that we have a meeting scheduled for tomorrow at 10 AM.
            Please come prepared with your updates.{'\n\n'}
            Best,{'\n'}John
          </Text>
        </View>
      </ResizablePanel>
    </ResizablePanels>
  ),
};

// ============================================================================
// With Layout Callback
// ============================================================================

export const WithLayoutCallback: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decoratorContainer}>
        <Story />
      </View>
    ),
  ],
  render: function LayoutCallbackStory() {
    const [sizes, setSizes] = useState<number[]>([50, 50]);

    return (
      <View style={{ flex: 1 }}>
        <View style={callbackStyles.info}>
          <Text style={callbackStyles.infoText}>
            Panel sizes: {sizes.map(s => `${s.toFixed(1)}%`).join(' | ')}
          </Text>
        </View>
        <ResizablePanels direction="horizontal" onLayoutChange={setSizes}>
          <ResizablePanel defaultSize={50}>
            <PanelContent title="Panel 1" color={colors.bg.surface} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <PanelContent title="Panel 2" color={colors.bg.elevated} />
          </ResizablePanel>
        </ResizablePanels>
      </View>
    );
  },
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  decoratorContainer: {
    height: 400,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.bg.base,
  },
  decoratorContainerTall: {
    height: 500,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.bg.base,
  },
});

const panelStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.text.secondary,
  },
});

const fileTreeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.surface,
    padding: 12,
  },
  header: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  item: {
    paddingVertical: 4,
  },
  folder: {
    fontSize: 13,
    color: colors.text.primary,
  },
  file: {
    fontSize: 13,
    color: colors.text.secondary,
  },
});

const editorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.bg.elevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.bg.base,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent.blue.DEFAULT,
  },
  tabText: {
    fontSize: 13,
    color: colors.text.primary,
  },
  tabTextInactive: {
    fontSize: 13,
    color: colors.text.muted,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  lineNumber: {
    fontSize: 12,
    color: colors.text.muted,
    position: 'absolute',
    left: 8,
  },
  code: {
    fontSize: 13,
    color: colors.text.primary,
    fontFamily: 'monospace',
    marginBottom: 4,
    marginLeft: 32,
  },
});

const terminalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 8,
    backgroundColor: '#16162a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4a',
  },
  headerText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  line: {
    fontSize: 13,
    color: '#ccc',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  success: {
    fontSize: 13,
    color: '#4ade80',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  cursor: {
    fontSize: 13,
    color: '#4ade80',
    fontFamily: 'monospace',
  },
});

const emailStyles = StyleSheet.create({
  folders: {
    flex: 1,
    backgroundColor: colors.bg.surface,
    padding: 16,
  },
  folderHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  folderItem: {
    fontSize: 14,
    color: colors.text.primary,
    paddingVertical: 8,
  },
  list: {
    flex: 1,
    backgroundColor: colors.bg.elevated,
  },
  listHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    padding: 12,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  messagePreview: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.muted,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  messageSubject: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  messageTime: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 4,
  },
  reader: {
    flex: 1,
    backgroundColor: colors.bg.base,
    padding: 20,
  },
  readerHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  readerMeta: {
    fontSize: 13,
    color: colors.text.muted,
    marginBottom: 20,
  },
  readerBody: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 22,
  },
});

const callbackStyles = StyleSheet.create({
  info: {
    padding: 12,
    backgroundColor: colors.bg.elevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  infoText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: 'monospace',
  },
});
