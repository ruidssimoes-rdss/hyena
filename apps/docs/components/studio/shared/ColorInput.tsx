'use client';

import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';

interface ColorInputProps {
  label: string;
  value: { light: string; dark: string };
  onChange: (value: { light: string; dark: string }) => void;
}

export function ColorInput({ label, value, onChange }: ColorInputProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentColor = value[mode];

  return (
    <div ref={ref} className="relative flex flex-col gap-1.5">
      {/* Label */}
      <span className="text-[11px] text-[#9CA3AF]">{label}</span>

      {/* Input */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'h-9 flex items-center gap-2 px-2.5 py-2 rounded-lg border border-[#E5E5E5] bg-white transition-colors',
          'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
          'hover:border-[#D4D4D4]',
          open && 'border-[#D4D4D4] ring-1 ring-[#E5E5E5]'
        )}
      >
        {/* Color Circle with gradient split */}
        <div className="relative w-4 h-4 rounded-full overflow-hidden border border-[#E5E7EB] flex-shrink-0">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${value.light} 50%, ${value.dark} 50%)`,
            }}
          />
        </div>

        {/* Hex Value */}
        <span className="text-sm font-mono text-[#374151]">{currentColor}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 w-[220px]">
          {/* Light/Dark Toggle */}
          <div className="flex gap-1 p-1 bg-[#F3F4F6] rounded-md mb-3">
            <button
              onClick={() => setMode('light')}
              className={cn(
                'flex-1 py-1.5 text-xs font-medium rounded transition-colors',
                mode === 'light'
                  ? 'bg-white text-[#18181B] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#374151]'
              )}
            >
              Light
            </button>
            <button
              onClick={() => setMode('dark')}
              className={cn(
                'flex-1 py-1.5 text-xs font-medium rounded transition-colors',
                mode === 'dark'
                  ? 'bg-white text-[#18181B] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#374151]'
              )}
            >
              Dark
            </button>
          </div>

          {/* Color Picker */}
          <div className="color-picker-wrapper">
            <HexColorPicker
              color={currentColor}
              onChange={(color) => onChange({ ...value, [mode]: color })}
              style={{ width: '100%' }}
            />
          </div>

          {/* Hex Input */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[#9CA3AF]">Hex</span>
            <input
              type="text"
              value={currentColor}
              onChange={(e) => {
                const hex = e.target.value;
                if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                  onChange({ ...value, [mode]: hex });
                }
              }}
              className="flex-1 px-2 py-1 text-xs font-mono bg-[#F3F4F6] rounded border-0 focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
