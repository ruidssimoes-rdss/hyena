'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorToken, ColorValue } from '@/lib/studio/types';
import { getContrastText } from '@/lib/studio/utils/color';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: ColorToken;
  onChange: (value: Partial<ColorValue>) => void;
  onRemove?: () => void;
  showBothModes?: boolean;
  compact?: boolean;
}

export function ColorPicker({
  color,
  onChange,
  onRemove,
  showBothModes = false,
  compact = false,
}: ColorPickerProps) {
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light');
  const [showPicker, setShowPicker] = useState(false);

  const currentColor = color.value[activeMode];

  return (
    <div className={cn('relative group', compact ? 'space-y-1' : 'space-y-2')}>
      {/* Color Name */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'font-medium truncate',
            compact ? 'text-[10px]' : 'text-xs'
          )}
        >
          {color.name}
        </span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-muted-foreground hover:text-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Color Swatches - Premium split view */}
      {showBothModes ? (
        <button
          onClick={() => setShowPicker(true)}
          className={cn(
            'w-full rounded-xl overflow-hidden border border-white/10 transition-all hover:scale-[1.02]',
            compact ? 'h-10' : 'aspect-[4/3]',
            showPicker && 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
          )}
        >
          {/* Split view: Light on top, Dark on bottom */}
          <div className="h-1/2" style={{ backgroundColor: color.value.light }} />
          <div className="h-1/2" style={{ backgroundColor: color.value.dark }} />
        </button>
      ) : (
        <button
          onClick={() => setShowPicker(!showPicker)}
          className={cn(
            'w-full rounded-lg border border-white/10 transition-all hover:scale-[1.02]',
            compact ? 'h-8' : 'h-10',
            showPicker && 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
          )}
          style={{ backgroundColor: currentColor }}
        />
      )}

      {/* Color Picker Popover */}
      {showPicker && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowPicker(false)}
          />

          {/* Picker */}
          <div className="absolute left-0 top-full z-50 mt-2 p-3 glass-panel-subtle rounded-xl shadow-2xl">
            {showBothModes && (
              <div className="flex gap-1 mb-3">
                <button
                  onClick={() => setActiveMode('light')}
                  className={cn(
                    'flex-1 px-2 py-1.5 text-xs rounded-md transition-colors',
                    activeMode === 'light'
                      ? 'bg-foreground text-background'
                      : 'bg-white/5 text-muted-foreground hover:text-foreground'
                  )}
                >
                  Light
                </button>
                <button
                  onClick={() => setActiveMode('dark')}
                  className={cn(
                    'flex-1 px-2 py-1.5 text-xs rounded-md transition-colors',
                    activeMode === 'dark'
                      ? 'bg-foreground text-background'
                      : 'bg-white/5 text-muted-foreground hover:text-foreground'
                  )}
                >
                  Dark
                </button>
              </div>
            )}

            <HexColorPicker
              color={currentColor}
              onChange={(newColor) => onChange({ [activeMode]: newColor })}
            />

            <input
              type="text"
              value={currentColor}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange({ [activeMode]: val });
                }
              }}
              className="w-full mt-3 px-2 py-1.5 text-xs font-mono bg-white/5 border border-white/10 rounded-md focus:border-white/20 focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  );
}
