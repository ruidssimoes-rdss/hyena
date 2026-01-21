import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Calendar,
  CalendarHeader,
  CalendarGrid,
  Badge,
  Button,
  colors,
} from '@hyena-studio/react-native';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Forms/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

// ============================================================================
// Default
// ============================================================================

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Calendar mode="single">
        <CalendarHeader />
        <CalendarGrid />
      </Calendar>
    </View>
  ),
};

// ============================================================================
// With Selected Date
// ============================================================================

export const WithSelectedDate: Story = {
  render: function WithSelectedDateStory() {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <View style={styles.container}>
        <Calendar mode="single" value={date} onValueChange={setDate}>
          <CalendarHeader />
          <CalendarGrid />
        </Calendar>
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>Selected:</Text>
          <Text style={styles.selectedValue}>
            {date ? date.toLocaleDateString() : 'None'}
          </Text>
        </View>
      </View>
    );
  },
};

// ============================================================================
// Date Range Selection
// ============================================================================

export const DateRangeSelection: Story = {
  render: function DateRangeStory() {
    const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });

    return (
      <View style={styles.container}>
        <Calendar mode="range" value={range} onValueChange={setRange}>
          <CalendarHeader />
          <CalendarGrid />
        </Calendar>
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>Range:</Text>
          <Text style={styles.selectedValue}>
            {range.start ? range.start.toLocaleDateString() : '---'} to{' '}
            {range.end ? range.end.toLocaleDateString() : '---'}
          </Text>
        </View>
      </View>
    );
  },
};

// ============================================================================
// Multiple Selection
// ============================================================================

export const MultipleSelection: Story = {
  render: function MultipleSelectionStory() {
    const [dates, setDates] = useState<Date[]>([]);

    return (
      <View style={styles.container}>
        <Calendar mode="multiple" value={dates} onValueChange={setDates}>
          <CalendarHeader />
          <CalendarGrid />
        </Calendar>
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>Selected dates:</Text>
          <Text style={styles.selectedValue}>
            {dates.length > 0 ? `${dates.length} dates selected` : 'None'}
          </Text>
        </View>
      </View>
    );
  },
};

// ============================================================================
// With Min/Max Dates
// ============================================================================

export const WithMinMaxDates: Story = {
  render: function MinMaxStory() {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7); // 7 days ago
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // 30 days from now

    const [date, setDate] = useState<Date | null>(null);

    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Only dates from {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()} are selectable
          </Text>
        </View>
        <Calendar
          mode="single"
          value={date}
          onValueChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        >
          <CalendarHeader />
          <CalendarGrid />
        </Calendar>
      </View>
    );
  },
};

// ============================================================================
// With Disabled Dates (Weekends)
// ============================================================================

export const WithDisabledWeekends: Story = {
  render: function DisabledWeekendsStory() {
    const [date, setDate] = useState<Date | null>(null);

    const disableWeekends = (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday or Saturday
    };

    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Weekends are disabled</Text>
        </View>
        <Calendar
          mode="single"
          value={date}
          onValueChange={setDate}
          disabledDates={disableWeekends}
        >
          <CalendarHeader />
          <CalendarGrid />
        </Calendar>
      </View>
    );
  },
};

// ============================================================================
// With Custom Disabled Dates
// ============================================================================

export const WithCustomDisabledDates: Story = {
  render: function CustomDisabledStory() {
    const [date, setDate] = useState<Date | null>(null);

    // Disable specific dates (e.g., holidays)
    const holidays = [
      new Date(2026, 0, 1),   // New Year's Day
      new Date(2026, 6, 4),   // Independence Day
      new Date(2026, 11, 25), // Christmas
    ];

    const isHoliday = (date: Date) => {
      return holidays.some(
        (holiday) =>
          holiday.getDate() === date.getDate() &&
          holiday.getMonth() === date.getMonth() &&
          holiday.getFullYear() === date.getFullYear()
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Holidays are disabled (Jan 1, Jul 4, Dec 25)</Text>
        </View>
        <Calendar
          mode="single"
          value={date}
          onValueChange={setDate}
          disabledDates={isHoliday}
        >
          <CalendarHeader />
          <CalendarGrid />
        </Calendar>
      </View>
    );
  },
};

// ============================================================================
// Monday Start (Localization)
// ============================================================================

export const MondayStart: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Week starts on Monday</Text>
      </View>
      <Calendar mode="single" weekStartsOn={1}>
        <CalendarHeader />
        <CalendarGrid />
      </Calendar>
    </View>
  ),
};

// ============================================================================
// Controlled vs Uncontrolled
// ============================================================================

export const Controlled: Story = {
  render: function ControlledStory() {
    const [date, setDate] = useState<Date | null>(new Date());

    const goToToday = () => setDate(new Date());
    const clearSelection = () => setDate(null);
    const goToNextWeek = () => {
      const next = new Date(date || new Date());
      next.setDate(next.getDate() + 7);
      setDate(next);
    };

    return (
      <View style={styles.container}>
        <Calendar mode="single" value={date} onValueChange={setDate}>
          <CalendarHeader />
          <CalendarGrid />
        </Calendar>

        <View style={styles.controlsContainer}>
          <Text style={styles.controlLabel}>External Controls:</Text>
          <View style={styles.buttonRow}>
            <Button size="sm" variant="secondary" onPress={goToToday}>
              Today
            </Button>
            <Button size="sm" variant="secondary" onPress={goToNextWeek}>
              +1 Week
            </Button>
            <Button size="sm" variant="ghost" onPress={clearSelection}>
              Clear
            </Button>
          </View>
        </View>
      </View>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Uncontrolled: manages its own state</Text>
      </View>
      <Calendar mode="single" defaultValue={new Date()}>
        <CalendarHeader />
        <CalendarGrid />
      </Calendar>
    </View>
  ),
};

// ============================================================================
// Disabled State
// ============================================================================

export const Disabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Calendar mode="single" disabled defaultValue={new Date()}>
        <CalendarHeader />
        <CalendarGrid />
      </Calendar>
    </View>
  ),
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: 320,
    padding: 16,
    backgroundColor: colors.bg.surface,
    borderRadius: 12,
  },
  selectedInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedLabel: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  selectedValue: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  infoBox: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.bg.elevated,
    borderRadius: 8,
  },
  infoText: {
    color: colors.text.secondary,
    fontSize: 13,
  },
  controlsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  controlLabel: {
    color: colors.text.muted,
    fontSize: 12,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
});
