import React, { createContext, useContext } from 'react';

export type DatePickerView = 'calendar' | 'months' | 'years';

export interface DatePickerContextValue {
  /** Whether the dropdown is open */
  open: boolean;
  /** Update open state */
  setOpen: (open: boolean) => void;
  /** Currently selected date */
  value: Date | null;
  /** Callback when value changes */
  onValueChange: (date: Date | null) => void;

  /** Current view date (for navigation) */
  viewDate: Date;
  /** Update view date */
  setViewDate: (date: Date) => void;
  /** Current view mode */
  view: DatePickerView;
  /** Update view mode */
  setView: (view: DatePickerView) => void;

  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Custom function to disable dates */
  disabledDates?: (date: Date) => boolean;

  /** Whether the picker is disabled */
  disabled: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Date format string */
  format: string;

  /** Trigger layout for positioning */
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  /** Update trigger layout */
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number } | null) => void;
}

const DatePickerContext = createContext<DatePickerContextValue | null>(null);

export function useDatePicker() {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error('DatePicker components must be used within a DatePicker');
  }
  return context;
}

export function useDatePickerContext() {
  return useContext(DatePickerContext);
}

export { DatePickerContext };
