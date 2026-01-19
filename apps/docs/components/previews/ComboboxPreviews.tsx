'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

/**
 * Combobox Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboboxProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  emptyMessage?: string;
}

function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  disabled = false,
  emptyMessage = 'No results found.',
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setHighlightedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      const option = filteredOptions[highlightedIndex];
      if (option && !option.disabled) {
        onChange?.(option.value);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg border
          bg-[var(--input-bg)] border-[var(--input-border)] transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--component-border-muted)]'}
          ${open ? 'ring-2 ring-[var(--track-fill)] border-transparent' : ''}
        `}
      >
        <span className={selectedOption ? 'text-[var(--input-text)]' : 'text-[var(--input-placeholder)]'}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-[var(--component-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-3 py-2.5 border-b border-[var(--component-border)]">
            <svg
              className="w-4 h-4 text-[var(--component-text-muted)] mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  inputRef.current?.focus();
                }}
                className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-6 text-sm text-[var(--component-text-muted)] text-center">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  disabled={option.disabled}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange?.(option.value);
                      setOpen(false);
                    }
                  }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors
                    ${option.disabled
                      ? 'text-[var(--component-text-muted)] cursor-not-allowed'
                      : 'text-[var(--component-text)]'
                    }
                    ${index === highlightedIndex && !option.disabled ? 'bg-[var(--component-bg-elevated)]' : ''}
                    ${option.value === value ? 'bg-[var(--track-fill)] text-white' : ''}
                  `}
                  onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                >
                  <span className="w-4">
                    {option.value === value && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Grouped Combobox variant
interface GroupedOption {
  label: string;
  options: Option[];
}

interface GroupedComboboxProps {
  groups: GroupedOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  emptyMessage?: string;
}

function GroupedCombobox({
  groups,
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  disabled = false,
  emptyMessage = 'No results found.',
}: GroupedComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allOptions = groups.flatMap((g) => g.options);
  const selectedOption = allOptions.find((opt) => opt.value === value);

  const filteredGroups = useMemo(() => {
    if (!search) return groups;
    return groups
      .map((group) => ({
        ...group,
        options: group.options.filter((opt) =>
          opt.label.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((group) => group.options.length > 0);
  }, [groups, search]);

  const flatFilteredOptions = filteredGroups.flatMap((g) => g.options);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setHighlightedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, flatFilteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      const option = flatFilteredOptions[highlightedIndex];
      if (option && !option.disabled) {
        onChange?.(option.value);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  let globalIndex = -1;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg border
          bg-[var(--input-bg)] border-[var(--input-border)] transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--component-border-muted)]'}
          ${open ? 'ring-2 ring-[var(--track-fill)] border-transparent' : ''}
        `}
      >
        <span className={selectedOption ? 'text-[var(--input-text)]' : 'text-[var(--input-placeholder)]'}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-[var(--component-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center px-3 py-2.5 border-b border-[var(--component-border)]">
            <svg
              className="w-4 h-4 text-[var(--component-text-muted)] mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  inputRef.current?.focus();
                }}
                className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-auto py-1">
            {flatFilteredOptions.length === 0 ? (
              <div className="px-3 py-6 text-sm text-[var(--component-text-muted)] text-center">
                {emptyMessage}
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.label}>
                  <div className="px-3 py-2 text-xs font-medium text-[var(--component-text-muted)] uppercase tracking-wide">
                    {group.label}
                  </div>
                  {group.options.map((option) => {
                    globalIndex++;
                    const currentIndex = globalIndex;
                    return (
                      <button
                        key={option.value}
                        disabled={option.disabled}
                        onClick={() => {
                          if (!option.disabled) {
                            onChange?.(option.value);
                            setOpen(false);
                          }
                        }}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors
                          ${option.disabled
                            ? 'text-[var(--component-text-muted)] cursor-not-allowed'
                            : 'text-[var(--component-text)]'
                          }
                          ${currentIndex === highlightedIndex && !option.disabled ? 'bg-[var(--component-bg-elevated)]' : ''}
                          ${option.value === value ? 'bg-[var(--track-fill)] text-white' : ''}
                        `}
                        onMouseEnter={() => !option.disabled && setHighlightedIndex(currentIndex)}
                      >
                        <span className="w-4">
                          {option.value === value && (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Preview Components

export function ComboboxBasicPreview() {
  const [value, setValue] = useState<string>();

  return (
    <div className="w-64">
      <Combobox
        options={[
          { value: 'react', label: 'React' },
          { value: 'react-native', label: 'React Native' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'solid', label: 'Solid' },
          { value: 'next', label: 'Next.js' },
          { value: 'nuxt', label: 'Nuxt' },
          { value: 'remix', label: 'Remix' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
      />
    </div>
  );
}

export function ComboboxWithGroupsPreview() {
  const [value, setValue] = useState<string>();

  return (
    <div className="w-64">
      <GroupedCombobox
        groups={[
          {
            label: 'React Ecosystem',
            options: [
              { value: 'react', label: 'React' },
              { value: 'react-native', label: 'React Native' },
              { value: 'next', label: 'Next.js' },
              { value: 'remix', label: 'Remix' },
            ],
          },
          {
            label: 'Other Frameworks',
            options: [
              { value: 'vue', label: 'Vue' },
              { value: 'angular', label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'solid', label: 'Solid' },
            ],
          },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
      />
    </div>
  );
}

export function ComboboxDisabledPreview() {
  return (
    <div className="w-64">
      <Combobox
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
        ]}
        value="react"
        disabled
        placeholder="Select framework..."
      />
    </div>
  );
}

export function ComboboxWithDisabledItemsPreview() {
  const [value, setValue] = useState<string>();

  return (
    <div className="w-64">
      <Combobox
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular (coming soon)', disabled: true },
          { value: 'svelte', label: 'Svelte (coming soon)', disabled: true },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
      />
    </div>
  );
}
