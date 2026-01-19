import React, { useState, useCallback, useMemo } from 'react';
import {
  DatePickerContext,
  DatePickerContextValue,
  DatePickerView,
} from './DatePickerContext';

export interface DatePickerProps {
  /** DatePicker content */
  children: React.ReactNode;
  /** Controlled value */
  value?: Date | null;
  /** Callback when value changes */
  onValueChange?: (date: Date | null) => void;
  /** Default value (uncontrolled) */
  defaultValue?: Date | null;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disable the picker */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Date format string */
  format?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Custom function to disable dates */
  disabledDates?: (date: Date) => boolean;
}

export function DatePicker({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue = null,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  placeholder = 'Select date...',
  format = 'MMM d, yyyy',
  minDate,
  maxDate,
  disabledDates,
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(defaultValue || new Date());
  const [view, setView] = useState<DatePickerView>('calendar');
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const isOpenControlled = controlledOpen !== undefined;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (isOpenControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
      if (newOpen) {
        // Reset view to calendar and set viewDate to current value or today
        setView('calendar');
        setViewDate(value || new Date());
      }
    },
    [isOpenControlled, onOpenChange, value]
  );

  const handleValueChange = useCallback(
    (newValue: Date | null) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange, setOpen]
  );

  const contextValue = useMemo<DatePickerContextValue>(
    () => ({
      open,
      setOpen,
      value,
      onValueChange: handleValueChange,
      viewDate,
      setViewDate,
      view,
      setView,
      minDate,
      maxDate,
      disabledDates,
      disabled,
      placeholder,
      format,
      triggerLayout,
      setTriggerLayout,
    }),
    [
      open,
      setOpen,
      value,
      handleValueChange,
      viewDate,
      view,
      minDate,
      maxDate,
      disabledDates,
      disabled,
      placeholder,
      format,
      triggerLayout,
    ]
  );

  return (
    <DatePickerContext.Provider value={contextValue}>
      {children}
    </DatePickerContext.Provider>
  );
}
