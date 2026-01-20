import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Chart,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  ChartLegend,
  Badge,
  Spinner,
  colors,
} from '@r-ui/react-native';

const meta: Meta<typeof Chart> = {
  title: 'Components/Data Display/Chart',
  component: Chart,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof Chart>;

// ============================================================================
// Sample Data
// ============================================================================

const revenueData = [
  { label: 'Jan', value: 4000 },
  { label: 'Feb', value: 3000 },
  { label: 'Mar', value: 2000 },
  { label: 'Apr', value: 2780 },
  { label: 'May', value: 1890 },
  { label: 'Jun', value: 2390 },
];

const pieData = [
  { label: 'Chrome', value: 62 },
  { label: 'Safari', value: 19 },
  { label: 'Firefox', value: 11 },
  { label: 'Edge', value: 5 },
  { label: 'Other', value: 3 },
];

const trafficData = [
  { label: 'Mon', value: 1200 },
  { label: 'Tue', value: 1800 },
  { label: 'Wed', value: 1600 },
  { label: 'Thu', value: 2200 },
  { label: 'Fri', value: 1900 },
  { label: 'Sat', value: 800 },
  { label: 'Sun', value: 600 },
];

// ============================================================================
// Bar Chart Stories
// ============================================================================

export const BarChartDefault: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Revenue</Text>
      <Chart data={revenueData} height={300}>
        <BarChart />
      </Chart>
    </View>
  ),
};

export const BarChartHorizontal: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Browser Market Share</Text>
      <Chart data={pieData} height={300}>
        <BarChart horizontal />
      </Chart>
    </View>
  ),
};

export const BarChartCustomColors: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Traffic</Text>
      <Chart
        data={trafficData}
        height={300}
        colors={['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#f43f5e']}
      >
        <BarChart barRadius={8} barGap={12} />
      </Chart>
    </View>
  ),
};

// ============================================================================
// Line Chart Stories
// ============================================================================

export const LineChartDefault: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue Trend</Text>
      <Chart data={revenueData} height={300}>
        <LineChart />
      </Chart>
    </View>
  ),
};

export const LineChartWithArea: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue Trend (with area fill)</Text>
      <Chart data={revenueData} height={300}>
        <LineChart fill />
      </Chart>
    </View>
  ),
};

export const LineChartWithDots: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Line Chart with Dots</Text>
      <Chart data={trafficData} height={300} colors={['#8b5cf6']}>
        <LineChart fill strokeWidth={3} dotSize={6} />
      </Chart>
    </View>
  ),
};

// ============================================================================
// Area Chart Stories
// ============================================================================

export const AreaChartDefault: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Traffic Overview</Text>
      <Chart data={trafficData} height={300} colors={['#3b82f6']}>
        <AreaChart />
      </Chart>
    </View>
  ),
};

export const AreaChartCustomOpacity: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Revenue Growth</Text>
      <Chart data={revenueData} height={300} colors={['#10b981']}>
        <AreaChart fillOpacity={0.5} />
      </Chart>
    </View>
  ),
};

// ============================================================================
// Pie Chart Stories
// ============================================================================

export const PieChartDefault: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Browser Usage</Text>
      <Chart data={pieData} height={300}>
        <PieChart />
      </Chart>
    </View>
  ),
};

export const PieChartDonut: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Browser Usage (Donut)</Text>
      <Chart data={pieData} height={300}>
        <PieChart innerRadius={0.5} />
      </Chart>
    </View>
  ),
};

export const PieChartWithLabels: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Browser Usage</Text>
      <Chart data={pieData} height={300}>
        <PieChart showLabels />
      </Chart>
    </View>
  ),
};

// ============================================================================
// With Legend
// ============================================================================

export const WithLegend: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Browser Market Share</Text>
      <Chart data={pieData} height={350} showLegend>
        <PieChart innerRadius={0.4} />
        <ChartLegend position="bottom" />
      </Chart>
    </View>
  ),
};

export const LegendPositions: Story = {
  render: () => (
    <View style={styles.gridContainer}>
      <View style={styles.gridItem}>
        <Text style={styles.subtitle}>Legend Bottom</Text>
        <Chart data={pieData.slice(0, 4)} height={250} showLegend>
          <PieChart innerRadius={0.4} />
          <ChartLegend position="bottom" />
        </Chart>
      </View>
      <View style={styles.gridItem}>
        <Text style={styles.subtitle}>Legend Right</Text>
        <Chart data={pieData.slice(0, 4)} height={250} showLegend>
          <PieChart innerRadius={0.4} />
          <ChartLegend position="right" />
        </Chart>
      </View>
    </View>
  ),
};

// ============================================================================
// With Tooltip
// ============================================================================

export const WithTooltip: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Interactive Chart (tap bars for tooltip)</Text>
      <Chart data={revenueData} height={300} showTooltip>
        <BarChart />
      </Chart>
    </View>
  ),
};

// ============================================================================
// Custom Colors
// ============================================================================

export const CustomColors: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Color Palette</Text>
      <Chart
        data={pieData}
        height={300}
        colors={['#f43f5e', '#f97316', '#facc15', '#4ade80', '#2dd4bf']}
      >
        <PieChart innerRadius={0.4} showLabels />
      </Chart>
    </View>
  ),
};

// ============================================================================
// Responsive Sizing
// ============================================================================

export const ResponsiveSizing: Story = {
  render: () => (
    <View style={styles.responsiveContainer}>
      <Text style={styles.title}>Responsive Chart (full width)</Text>
      <Chart data={revenueData} height={200}>
        <BarChart />
      </Chart>
    </View>
  ),
};

// ============================================================================
// Empty State
// ============================================================================

export const EmptyState: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Data</Text>
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>📊</Text>
        <Text style={styles.emptyTitle}>No data available</Text>
        <Text style={styles.emptyDescription}>
          Data will appear here once you have some sales
        </Text>
      </View>
    </View>
  ),
};

// ============================================================================
// Loading State
// ============================================================================

export const LoadingState: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Data</Text>
      <View style={styles.loadingState}>
        <Spinner size="lg" />
        <Text style={styles.loadingText}>Loading chart data...</Text>
      </View>
    </View>
  ),
};

// ============================================================================
// Interactive Demo
// ============================================================================

export const InteractiveDemo: Story = {
  render: function InteractiveDemoStory() {
    const [chartType, setChartType] = useState<'bar' | 'line' | 'area' | 'pie'>('bar');

    const renderChart = () => {
      switch (chartType) {
        case 'bar':
          return <BarChart />;
        case 'line':
          return <LineChart fill />;
        case 'area':
          return <AreaChart />;
        case 'pie':
          return <PieChart innerRadius={0.4} />;
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Interactive Chart Demo</Text>

        <View style={styles.chartTypeSelector}>
          {(['bar', 'line', 'area', 'pie'] as const).map((type) => (
            <Pressable
              key={type}
              onPress={() => setChartType(type)}
              style={[
                styles.chartTypeButton,
                chartType === type && styles.chartTypeButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.chartTypeText,
                  chartType === type && styles.chartTypeTextActive,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <Chart
          data={chartType === 'pie' ? pieData : revenueData}
          height={300}
          showTooltip
        >
          {renderChart()}
        </Chart>
      </View>
    );
  },
};

// ============================================================================
// Dashboard Example
// ============================================================================

export const DashboardExample: Story = {
  render: () => (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>Analytics Dashboard</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Revenue</Text>
          <Text style={styles.statValue}>$16,060</Text>
          <Badge variant="success" size="sm">+12.5%</Badge>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Users</Text>
          <Text style={styles.statValue}>2,847</Text>
          <Badge variant="default" size="sm">+8.2%</Badge>
        </View>
      </View>

      <View style={styles.chartRow}>
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Revenue Trend</Text>
          <Chart data={revenueData} height={200}>
            <AreaChart />
          </Chart>
        </View>
      </View>

      <View style={styles.chartRow}>
        <View style={styles.chartCardHalf}>
          <Text style={styles.cardTitle}>Weekly Traffic</Text>
          <Chart data={trafficData} height={180}>
            <BarChart barRadius={4} />
          </Chart>
        </View>
        <View style={styles.chartCardHalf}>
          <Text style={styles.cardTitle}>Browser Share</Text>
          <Chart data={pieData.slice(0, 4)} height={180}>
            <PieChart innerRadius={0.3} />
          </Chart>
        </View>
      </View>
    </View>
  ),
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: 500,
    padding: 24,
    backgroundColor: colors.bg.surface,
    borderRadius: 12,
  },
  responsiveContainer: {
    width: '100%',
    padding: 24,
    backgroundColor: colors.bg.surface,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  gridItem: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg.surface,
    borderRadius: 12,
  },
  emptyState: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  loadingState: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.text.secondary,
  },
  chartTypeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  chartTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.bg.elevated,
  },
  chartTypeButtonActive: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  chartTypeText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  chartTypeTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  dashboardContainer: {
    width: 700,
    padding: 24,
    backgroundColor: colors.bg.base,
    borderRadius: 12,
    gap: 20,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg.surface,
    borderRadius: 12,
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.muted,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  chartRow: {
    flexDirection: 'row',
    gap: 16,
  },
  chartCard: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg.surface,
    borderRadius: 12,
  },
  chartCardHalf: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg.surface,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
});
