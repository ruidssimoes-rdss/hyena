'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import { checkContrast, getContrastText } from '@/lib/studio/color-utils';
import { HexColorPicker, HexColorInput } from 'react-colorful';

interface ColorRowProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

function ColorRow({ label, color, onChange }: ColorRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = getContrastText(color);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm text-zinc-400">{label}</label>
        <code className="text-xs text-zinc-500">{color}</code>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 rounded-md border border-zinc-700 flex items-center justify-center text-sm font-medium transition-all hover:scale-[1.02]"
        style={{ backgroundColor: color, color: textColor }}
      >
        {color}
      </button>

      {isOpen && (
        <div className="p-3 bg-zinc-800 rounded-lg space-y-3">
          <HexColorPicker color={color} onChange={onChange} style={{ width: '100%' }} />
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">#</span>
            <HexColorInput
              color={color}
              onChange={onChange}
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white"
              prefixed={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function ColorEditor() {
  const { state, setPrimaryColor, setSecondaryColor, setAccentColor } = useStudio();
  const { colors } = state.theme;

  return (
    <div className="space-y-4">
      <ColorRow label="Primary" color={colors.primary} onChange={setPrimaryColor} />

      <ColorRow label="Secondary" color={colors.secondary} onChange={setSecondaryColor} />

      <ColorRow label="Accent" color={colors.accent} onChange={setAccentColor} />

      {/* Contrast indicator */}
      <div className="p-3 bg-zinc-800 rounded-lg">
        <div className="text-xs text-zinc-400 mb-2">Contrast Check</div>
        <div className="flex items-center gap-2">
          <div
            className="flex-1 h-8 rounded flex items-center justify-center text-xs font-medium"
            style={{
              backgroundColor: colors.primary,
              color: getContrastText(colors.primary),
            }}
          >
            {checkContrast(getContrastText(colors.primary), colors.primary).level}
          </div>
          <div
            className="flex-1 h-8 rounded flex items-center justify-center text-xs font-medium"
            style={{
              backgroundColor: colors.accent,
              color: getContrastText(colors.accent),
            }}
          >
            {checkContrast(getContrastText(colors.accent), colors.accent).level}
          </div>
        </div>
      </div>
    </div>
  );
}
