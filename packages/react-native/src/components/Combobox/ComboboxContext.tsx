import React, { createContext, useContext, useCallback, useMemo } from 'react';

export interface ComboboxItemData {
  /** Unique value for the item */
  value: string;
  /** Display label for the item */
  label: string;
  /** Additional keywords for search matching */
  keywords?: string[];
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface ComboboxContextValue {
  /** Whether the dropdown is open */
  open: boolean;
  /** Update open state */
  setOpen: (open: boolean) => void;
  /** Currently selected value */
  value: string;
  /** Callback when value changes */
  onValueChange: (value: string) => void;
  /** Current search query */
  search: string;
  /** Update search query */
  setSearch: (search: string) => void;
  /** All registered items */
  items: ComboboxItemData[];
  /** Register an item */
  registerItem: (item: ComboboxItemData) => void;
  /** Unregister an item */
  unregisterItem: (value: string) => void;
  /** Currently highlighted index for keyboard navigation */
  highlightedIndex: number;
  /** Update highlighted index */
  setHighlightedIndex: (index: number) => void;
  /** Custom filter function */
  filter?: (value: string, search: string, keywords?: string[]) => boolean;
  /** Trigger layout for positioning */
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  /** Update trigger layout */
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number } | null) => void;
  /** Whether the combobox is disabled */
  disabled: boolean;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export function useCombobox() {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error('Combobox components must be used within a Combobox');
  }
  return context;
}

export function useComboboxContext() {
  return useContext(ComboboxContext);
}

/** Default filter function - case insensitive includes match */
export function defaultComboboxFilter(
  value: string,
  search: string,
  keywords?: string[]
): boolean {
  if (!search) return true;

  const searchLower = search.toLowerCase();
  const valueLower = value.toLowerCase();

  // Check value
  if (valueLower.includes(searchLower)) return true;

  // Check keywords
  if (keywords?.some((k) => k.toLowerCase().includes(searchLower))) {
    return true;
  }

  return false;
}

export { ComboboxContext };
