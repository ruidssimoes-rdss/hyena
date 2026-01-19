import React, { useState, useCallback, useMemo } from 'react';
import {
  ComboboxContext,
  ComboboxContextValue,
  ComboboxItemData,
  defaultComboboxFilter,
} from './ComboboxContext';

export interface ComboboxProps {
  /** Combobox content */
  children: React.ReactNode;
  /** Controlled value */
  value?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disable the combobox */
  disabled?: boolean;
  /** Custom filter function */
  filter?: (value: string, search: string, keywords?: string[]) => boolean;
}

export function Combobox({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue = '',
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  filter = defaultComboboxFilter,
}: ComboboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<ComboboxItemData[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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
        setSearch('');
        setHighlightedIndex(0);
      }
    },
    [isOpenControlled, onOpenChange]
  );

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange, setOpen]
  );

  const registerItem = useCallback((item: ComboboxItemData) => {
    setItems((prev) => {
      if (prev.some((i) => i.value === item.value)) {
        // Update existing item
        return prev.map((i) => (i.value === item.value ? item : i));
      }
      return [...prev, item];
    });
  }, []);

  const unregisterItem = useCallback((value: string) => {
    setItems((prev) => prev.filter((i) => i.value !== value));
  }, []);

  const contextValue = useMemo<ComboboxContextValue>(
    () => ({
      open,
      setOpen,
      value,
      onValueChange: handleValueChange,
      search,
      setSearch,
      items,
      registerItem,
      unregisterItem,
      highlightedIndex,
      setHighlightedIndex,
      filter,
      triggerLayout,
      setTriggerLayout,
      disabled,
    }),
    [
      open,
      setOpen,
      value,
      handleValueChange,
      search,
      items,
      registerItem,
      unregisterItem,
      highlightedIndex,
      filter,
      triggerLayout,
      disabled,
    ]
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      {children}
    </ComboboxContext.Provider>
  );
}
