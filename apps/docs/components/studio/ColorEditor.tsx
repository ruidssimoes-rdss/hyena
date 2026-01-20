'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import { checkContrast, getContrastText } from '@/lib/studio/color-utils';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { cn } from '@/lib/utils';

interface ColorRowProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

function ChevronDownIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function ColorRow({ label, color, onChange }: ColorRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = getContrastText(color);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full p-3 rounded-lg flex items-center justify-between transition-all duration-200',
          'studio-glass-subtle studio-glass-hover',
          isOpen && 'studio-glass-active'
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-md shadow-sm ring-1 ring-white/10"
            style={{ backgroundColor: color }}
          />
          <div className="text-left">
            <div className="text-sm font-medium text-[var(--studio-text)]">{label}</div>
            <code className="text-xs text-[var(--studio-text-dimmed)]">{color}</code>
          </div>
        </div>
        <ChevronDownIcon
          size={14}
        />
      </button>

      {isOpen && (
        <div className="studio-glass-strong p-4 rounded-lg space-y-4 animate-in fade-in slide-in-from-top-2">
          {/* Color picker */}
          <div className="[&_.react-colorful]:w-full [&_.react-colorful]:h-[160px] [&_.react-colorful__saturation]:rounded-lg [&_.react-colorful__hue]:rounded-full [&_.react-colorful__hue]:h-3 [&_.react-colorful__pointer]:w-4 [&_.react-colorful__pointer]:h-4">
            <HexColorPicker color={color} onChange={onChange} />
          </div>

          {/* Hex input */}
          <div className="flex items-center gap-2 p-2 rounded-md bg-black/30 border border-[var(--studio-glass-border)]">
            <span className="text-xs text-[var(--studio-text-dimmed)] pl-1">#</span>
            <HexColorInput
              color={color}
              onChange={onChange}
              className="flex-1 bg-transparent text-sm text-[var(--studio-text)] outline-none font-mono"
              prefixed={false}
            />
          </div>

          {/* Quick color preview */}
          <div
            className="h-10 rounded-md flex items-center justify-center text-xs font-medium shadow-inner"
            style={{ backgroundColor: color, color: textColor }}
          >
            Preview Text
          </div>
        </div>
      )}
    </div>
  );
}

export function ColorEditor() {
  const { state, setPrimaryColor, setSecondaryColor, setAccentColor } = useStudio();
  const { colors } = state.theme;

  // Calculate contrast levels
  const primaryContrast = checkContrast(getContrastText(colors.primary), colors.primary);
  const accentContrast = checkContrast(getContrastText(colors.accent), colors.accent);

  return (
    <div className="space-y-3">
      <ColorRow label="Primary" color={colors.primary} onChange={setPrimaryColor} />
      <ColorRow label="Secondary" color={colors.secondary} onChange={setSecondaryColor} />
      <ColorRow label="Accent" color={colors.accent} onChange={setAccentColor} />

      {/* Contrast indicator */}
      <div className="studio-glass-subtle p-3 rounded-lg space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-[var(--studio-text-dimmed)] font-medium">
          WCAG Contrast
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <div
              className="h-7 rounded-md flex items-center justify-center text-[10px] font-semibold"
              style={{
                backgroundColor: colors.primary,
                color: getContrastText(colors.primary),
              }}
            >
              {primaryContrast.level}
            </div>
            <div className="text-[10px] text-center mt-1 text-[var(--studio-text-dimmed)]">Primary</div>
          </div>
          <div className="flex-1">
            <div
              className="h-7 rounded-md flex items-center justify-center text-[10px] font-semibold"
              style={{
                backgroundColor: colors.accent,
                color: getContrastText(colors.accent),
              }}
            >
              {accentContrast.level}
            </div>
            <div className="text-[10px] text-center mt-1 text-[var(--studio-text-dimmed)]">Accent</div>
          </div>
        </div>
      </div>
    </div>
  );
}
