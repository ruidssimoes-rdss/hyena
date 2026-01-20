'use client';

import { useState, useRef, useEffect } from 'react';
import { useTokens } from '@/lib/studio/context';
import { ExportFormat } from '@/lib/studio/types';
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

const formats: { id: ExportFormat; label: string }[] = [
  { id: 'css', label: 'CSS' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'rui', label: 'r/ui' },
  { id: 'json', label: 'JSON' },
];

export function ExportDropdown() {
  const { state, setExportFormat } = useTokens();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active = formats.find((f) => f.id === state.exportFormat)!;

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
        className="flex items-center gap-1 px-2 py-1.5 text-xs text-[#6B7280] hover:text-[#111827] transition-colors"
      >
        {active.label}
        <ChevronDownIcon className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 py-1 bg-white border border-[#E5E7EB] rounded-md shadow-lg min-w-[100px] z-50">
          {formats.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setExportFormat(id);
                setOpen(false);
              }}
              className={cn(
                'w-full px-3 py-1.5 text-xs text-left transition-colors',
                state.exportFormat === id
                  ? 'bg-[#F9FAFB] text-[#111827]'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
