'use client';

import { useState, useRef, useEffect } from 'react';
import { useTokens } from '@/lib/studio/context';
import { TokenTab } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

// Icons
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="10.5" r="2.5" />
      <circle cx="8.5" cy="7.5" r="2.5" />
      <circle cx="6.5" cy="12.5" r="2.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}

function SpaceIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" x2="9" y1="3" y2="21" />
      <line x1="15" x2="15" y1="3" y2="21" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="3" x2="21" y1="15" y2="15" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="6" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="12" height="12" rx="2" />
      <path d="M9 21h12a2 2 0 0 0 2-2V9" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const categories: { id: TokenTab; label: string; icon: React.ReactNode }[] = [
  { id: 'colors', label: 'Colors', icon: <PaletteIcon /> },
  { id: 'typography', label: 'Typography', icon: <TypeIcon /> },
  { id: 'spacing', label: 'Spacing', icon: <SpaceIcon /> },
  { id: 'radius', label: 'Radius', icon: <CircleIcon /> },
  { id: 'shadows', label: 'Shadows', icon: <LayersIcon /> },
  { id: 'animations', label: 'Motion', icon: <ZapIcon /> },
];

export function CategoryDropdown() {
  const { state, setActiveTab } = useTokens();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active = categories.find((c) => c.id === state.activeTab)!;

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors text-[#374151]',
          open ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'
        )}
      >
        {active.icon}
        {active.label}
        <ChevronDownIcon
          className={cn('text-[#6B7280] transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 py-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg min-w-[160px] z-50">
          {categories.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors',
                state.activeTab === id
                  ? 'bg-[#F9FAFB] text-[#111827]'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
              )}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
