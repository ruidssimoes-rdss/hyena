'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { HexColorPicker } from 'react-colorful';
import { ColorToken } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

// Icons
function XIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
}

interface ColorSwatchProps {
  color: ColorToken;
  type: 'brand' | 'semantic';
  size?: 'sm' | 'md';
}

export function ColorSwatch({ color, type, size = 'md' }: ColorSwatchProps) {
  const { updateBrandColor, updateSemanticColor, removeBrandColor } = useTokens();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState<'light' | 'dark'>('light');

  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
  };

  const handleColorChange = (newColor: string) => {
    const newValue = {
      ...color.value,
      [editMode]: newColor,
    };

    if (type === 'brand') {
      updateBrandColor(color.id, newValue);
    } else {
      updateSemanticColor(color.id, newValue);
    }
  };

  return (
    <div className="relative group">
      {/* Swatch Button - Diagonal split showing both modes */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'rounded-lg overflow-hidden border border-[#E5E7EB] hover:border-[#9CA3AF] transition-all hover:scale-105',
          sizes[size]
        )}
      >
        <div className="w-full h-full relative">
          {/* Light mode - top left triangle */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: color.value.light,
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            }}
          />
          {/* Dark mode - bottom right triangle */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: color.value.dark,
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>
      </button>

      {/* Name */}
      <div className="mt-1 text-[10px] text-center text-[#6B7280] truncate max-w-16">
        {color.name}
      </div>

      {/* Remove button (for brand colors only) */}
      {type === 'brand' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeBrandColor(color.id);
          }}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F3F4F6]"
        >
          <XIcon />
        </button>
      )}

      {/* Color Picker Popover */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-50 min-w-[200px]">
            {/* Mode Toggle */}
            <div className="flex gap-1 mb-3">
              <button
                onClick={() => setEditMode('light')}
                className={cn(
                  'flex-1 py-1.5 text-xs rounded-md transition-colors',
                  editMode === 'light'
                    ? 'bg-[#F3F4F6] text-[#111827]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                )}
              >
                Light
              </button>
              <button
                onClick={() => setEditMode('dark')}
                className={cn(
                  'flex-1 py-1.5 text-xs rounded-md transition-colors',
                  editMode === 'dark'
                    ? 'bg-[#F3F4F6] text-[#111827]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                )}
              >
                Dark
              </button>
            </div>

            {/* Picker */}
            <HexColorPicker
              color={color.value[editMode]}
              onChange={handleColorChange}
            />

            {/* Hex Value */}
            <div className="mt-3 text-xs font-mono text-center text-[#6B7280]">
              {color.value[editMode]}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
