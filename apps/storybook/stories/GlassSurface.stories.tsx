import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { GlassSurface } from '@hyena-studio/react-native';

const meta: Meta<typeof GlassSurface> = {
  title: 'Primitives/GlassSurface',
  component: GlassSurface,
  argTypes: {
    intensity: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Blur intensity (0-100)',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Surface opacity (0-1)',
    },
    borderRadius: {
      control: { type: 'range', min: 0, max: 40 },
      description: 'Border radius',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Shadow size',
    },
    tint: {
      control: 'select',
      options: ['light', 'dark', 'default'],
      description: 'Tint color for native blur',
    },
  },
  args: {
    intensity: 24,
    opacity: 0.65,
    borderRadius: 20,
    bordered: true,
    shadow: 'md',
    tint: 'light',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 40, backgroundColor: '#E8E4DF', minHeight: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GlassSurface>;

export const Default: Story = {
  render: (args) => (
    <GlassSurface {...args} style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>
        Glass Surface
      </Text>
      <Text style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
        This is a frosted glass container that works across platforms.
      </Text>
    </GlassSurface>
  ),
};

export const Shadows: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <GlassSurface shadow="sm" style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Small shadow</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Subtle elevation for lightweight cards
        </Text>
      </GlassSurface>
      <GlassSurface shadow="md" style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Medium shadow (default)</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Standard elevation for most surfaces
        </Text>
      </GlassSurface>
      <GlassSurface shadow="lg" style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Large shadow</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Prominent elevation for modals and dialogs
        </Text>
      </GlassSurface>
      <GlassSurface shadow="none" style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>No shadow</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Flat surface without elevation
        </Text>
      </GlassSurface>
    </View>
  ),
};

export const Intensities: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <GlassSurface intensity={12} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Light blur (12)</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Subtle glass effect
        </Text>
      </GlassSurface>
      <GlassSurface intensity={24} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Medium blur (24)</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Default glass effect
        </Text>
      </GlassSurface>
      <GlassSurface intensity={40} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Heavy blur (40)</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Strong frosted glass effect
        </Text>
      </GlassSurface>
    </View>
  ),
};

export const Opacities: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <GlassSurface opacity={0.5} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>50% opacity</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          More transparent surface
        </Text>
      </GlassSurface>
      <GlassSurface opacity={0.65} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>65% opacity (default)</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Balanced transparency
        </Text>
      </GlassSurface>
      <GlassSurface opacity={0.8} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>80% opacity</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          More opaque surface
        </Text>
      </GlassSurface>
    </View>
  ),
};

export const WithoutBorder: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <GlassSurface bordered={true} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>With border</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Default appearance with subtle white border
        </Text>
      </GlassSurface>
      <GlassSurface bordered={false} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Without border</Text>
        <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
          Cleaner look without border
        </Text>
      </GlassSurface>
    </View>
  ),
};

export const BorderRadiusVariants: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <GlassSurface borderRadius={8} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Small radius (8)</Text>
      </GlassSurface>
      <GlassSurface borderRadius={12} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Medium radius (12)</Text>
      </GlassSurface>
      <GlassSurface borderRadius={20} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Large radius (20) - default</Text>
      </GlassSurface>
      <GlassSurface borderRadius={28} style={{ padding: 20 }}>
        <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>XL radius (28)</Text>
      </GlassSurface>
    </View>
  ),
};

export const NestedSurfaces: Story = {
  render: () => (
    <GlassSurface shadow="lg" style={{ padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 16 }}>
        Parent Surface
      </Text>
      <View style={{ gap: 12 }}>
        <GlassSurface
          opacity={0.5}
          shadow="sm"
          borderRadius={12}
          style={{ padding: 16 }}
        >
          <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Nested Card 1</Text>
          <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
            Inner glass surface
          </Text>
        </GlassSurface>
        <GlassSurface
          opacity={0.5}
          shadow="sm"
          borderRadius={12}
          style={{ padding: 16 }}
        >
          <Text style={{ color: '#1a1a1a', fontWeight: '500' }}>Nested Card 2</Text>
          <Text style={{ color: '#666', fontSize: 13, marginTop: 4 }}>
            Another inner surface
          </Text>
        </GlassSurface>
      </View>
    </GlassSurface>
  ),
};
