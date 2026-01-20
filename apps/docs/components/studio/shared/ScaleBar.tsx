'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorScale } from '@/lib/studio/types';
import { getContrastText } from '@/lib/studio/utils/color';

interface ScaleBarProps {
  scale: ColorScale;
  baseColor: string;
  onBaseChange: (color: string) => void;
}

export function ScaleBar({ scale, baseColor, onBaseChange }: ScaleBarProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      {/* Base color picker */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#6B7280]">Base</span>
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-6 h-6 rounded border border-[#E5E7EB] hover:border-[#9CA3AF] transition-colors"
            style={{ backgroundColor: baseColor }}
          />
          {showPicker && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowPicker(false)}
              />
              <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-50">
                <HexColorPicker color={baseColor} onChange={onBaseChange} />
                <div className="mt-2 text-xs font-mono text-center text-[#6B7280]">
                  {baseColor}
                </div>
              </div>
            </>
          )}
        </div>
        <span className="text-xs font-mono text-[#6B7280]">{baseColor}</span>
      </div>

      {/* Scale visualization */}
      <div className="flex h-8 rounded-md overflow-hidden border border-[#E5E7EB]">
        {Object.entries(scale).map(([key, value]) => (
          <div
            key={key}
            className="flex-1 relative group cursor-pointer hover:flex-[1.5] transition-all"
            style={{ backgroundColor: value }}
            title={`${key}: ${value}`}
          >
            <span
              className="absolute inset-0 flex items-center justify-center text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: getContrastText(value) }}
            >
              {key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
