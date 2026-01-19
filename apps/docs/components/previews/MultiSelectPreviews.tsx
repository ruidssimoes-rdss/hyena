'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * MultiSelect Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface Option {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select items...',
  maxItems,
  creatable = false,
  disabled = false,
}: {
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  creatable?: boolean;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

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

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChange?.(value.filter((v) => v !== val));
    } else {
      if (maxItems && value.length >= maxItems) return;
      onChange?.([...value, val]);
    }
  };

  const removeValue = (val: string) => {
    onChange?.(value.filter((v) => v !== val));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && creatable && search && !filteredOptions.find(o => o.value === search)) {
      if (maxItems && value.length >= maxItems) return;
      onChange?.([...value, search]);
      setSearch('');
    }
  };

  // Group options
  const groupedOptions = new Map<string, Option[]>();
  filteredOptions.forEach((opt) => {
    const group = opt.group || '';
    const list = groupedOptions.get(group) || [];
    list.push(opt);
    groupedOptions.set(group, list);
  });

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg border min-h-[42px]
          bg-[var(--input-bg)] border-[var(--input-border)] transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--component-border-muted)]'}
          ${open ? 'ring-2 ring-[var(--track-fill)] border-transparent' : ''}
        `}
      >
        <div className="flex-1 flex flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions.slice(0, 3).map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-[var(--track-fill)] text-white rounded"
                >
                  {opt.label}
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeValue(opt.value);
                      }}
                      className="hover:bg-white/20 rounded"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </span>
              ))}
              {selectedOptions.length > 3 && (
                <span className="text-xs text-[var(--component-text-muted)]">
                  +{selectedOptions.length - 3} more
                </span>
              )}
            </>
          ) : (
            <span className="text-[var(--input-placeholder)]">{placeholder}</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-[var(--component-text-muted)] transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          <div className="p-2 border-b border-[var(--component-border)]">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-[var(--component-bg-elevated)] rounded-md">
              <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] outline-none"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-sm text-[var(--component-text-muted)]">
                {creatable && search ? `Press Enter to create "${search}"` : 'No options found'}
              </div>
            ) : (
              Array.from(groupedOptions.entries()).map(([group, opts]) => (
                <div key={group || 'ungrouped'}>
                  {group && (
                    <div className="px-2 py-1.5 text-xs font-semibold text-[var(--component-text-muted)] uppercase tracking-wide">
                      {group}
                    </div>
                  )}
                  {opts.map((option) => {
                    const isSelected = value.includes(option.value);
                    const isAtLimit = maxItems !== undefined && value.length >= maxItems && !isSelected;
                    const isDisabled = option.disabled || isAtLimit;

                    return (
                      <button
                        key={option.value}
                        disabled={isDisabled}
                        onClick={() => toggleValue(option.value)}
                        className={`
                          w-full flex items-center gap-2 px-2 py-1.5 text-sm text-left rounded transition-colors
                          ${isDisabled
                            ? 'text-[var(--component-text-muted)] cursor-not-allowed'
                            : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                          }
                          ${isSelected ? 'bg-[var(--component-bg-elevated)]' : ''}
                        `}
                      >
                        <div className={`
                          w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                          ${isSelected
                            ? 'bg-[var(--track-fill)] border-[var(--track-fill)]'
                            : 'border-[var(--component-border)]'
                          }
                        `}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
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

export function MultiSelectBasicPreview() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="w-80">
      <MultiSelect
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'solid', label: 'Solid' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select frameworks..."
      />
    </div>
  );
}

export function MultiSelectWithSearchPreview() {
  const [value, setValue] = useState<string[]>(['react', 'typescript']);

  return (
    <div className="w-80">
      <MultiSelect
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
          { value: 'rust', label: 'Rust' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Search and select..."
      />
    </div>
  );
}

export function MultiSelectMaxItemsPreview() {
  const [value, setValue] = useState<string[]>(['frontend']);

  return (
    <div className="w-80 space-y-2">
      <MultiSelect
        options={[
          { value: 'frontend', label: 'Frontend' },
          { value: 'backend', label: 'Backend' },
          { value: 'fullstack', label: 'Full Stack' },
          { value: 'devops', label: 'DevOps' },
          { value: 'mobile', label: 'Mobile' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select up to 3 roles..."
        maxItems={3}
      />
      <p className="text-xs text-[var(--component-text-muted)]">Maximum 3 selections allowed</p>
    </div>
  );
}

export function MultiSelectCreatablePreview() {
  const [value, setValue] = useState<string[]>([]);
  const [options, setOptions] = useState([
    { value: 'bug', label: 'Bug' },
    { value: 'feature', label: 'Feature' },
    { value: 'documentation', label: 'Documentation' },
  ]);

  const handleChange = (newValue: string[]) => {
    // Add any new values to options
    const newOptions = [...options];
    newValue.forEach((v) => {
      if (!options.find((o) => o.value === v)) {
        newOptions.push({ value: v, label: v });
      }
    });
    setOptions(newOptions);
    setValue(newValue);
  };

  return (
    <div className="w-80 space-y-2">
      <MultiSelect
        options={options}
        value={value}
        onChange={handleChange}
        placeholder="Type to create tags..."
        creatable
      />
      <p className="text-xs text-[var(--component-text-muted)]">Press Enter to create new tags</p>
    </div>
  );
}

export function MultiSelectGroupedPreview() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="w-80">
      <MultiSelect
        options={[
          { value: 'react', label: 'React', group: 'Frontend' },
          { value: 'vue', label: 'Vue', group: 'Frontend' },
          { value: 'angular', label: 'Angular', group: 'Frontend' },
          { value: 'node', label: 'Node.js', group: 'Backend' },
          { value: 'python', label: 'Python', group: 'Backend' },
          { value: 'go', label: 'Go', group: 'Backend' },
          { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
          { value: 'mongodb', label: 'MongoDB', group: 'Database' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select technologies..."
      />
    </div>
  );
}

export function MultiSelectDisabledPreview() {
  return (
    <div className="w-80">
      <MultiSelect
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
        ]}
        value={['react', 'vue']}
        disabled
      />
    </div>
  );
}
