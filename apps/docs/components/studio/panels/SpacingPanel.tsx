'use client';

import { useTokens } from '@/lib/studio/context';
import { cn } from '@/lib/utils';

export function SpacingPanel() {
  const { state, updateSpacingBase } = useTokens();
  const { spacing } = state.tokens;

  return (
    <div className="p-4 space-y-6">
      {/* Base Unit */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Base Unit
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={spacing.baseUnit}
              onChange={(e) => updateSpacingBase(Number(e.target.value))}
              className="w-20 px-3 py-2 text-sm bg-[#F9FAFB] rounded-md border border-[#E5E7EB] text-center focus:border-[#9CA3AF] focus:outline-none"
              min={1}
              max={16}
            />
            <span className="text-sm text-[#6B7280]">px</span>
            <input
              type="range"
              value={spacing.baseUnit}
              onChange={(e) => updateSpacingBase(Number(e.target.value))}
              className={cn(
                'flex-1 h-1 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer',
                '[&::-webkit-slider-thumb]:appearance-none',
                '[&::-webkit-slider-thumb]:w-4',
                '[&::-webkit-slider-thumb]:h-4',
                '[&::-webkit-slider-thumb]:rounded-full',
                '[&::-webkit-slider-thumb]:bg-[#18181B]',
                '[&::-webkit-slider-thumb]:cursor-pointer'
              )}
              min={1}
              max={16}
            />
          </div>

          <p className="text-xs text-[#9CA3AF] mt-3">
            The base unit multiplied by scale factors generates your spacing system.
          </p>
        </div>
      </section>

      {/* Scale Preview */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Scale
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-2">
          {spacing.scale.map((value, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-[#9CA3AF] w-6 text-right">
                {index}
              </span>
              <div
                className="h-4 bg-[#18181B] rounded-sm transition-all"
                style={{ width: Math.min(value, 200) }}
              />
              <span className="text-xs text-[#6B7280]">{value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Reference */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Usage Reference
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Tight:</span>
              <span className="font-mono text-[#374151]">spacing-1 ({spacing.scale[1]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Small:</span>
              <span className="font-mono text-[#374151]">spacing-2 ({spacing.scale[2]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Medium:</span>
              <span className="font-mono text-[#374151]">spacing-4 ({spacing.scale[4]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Large:</span>
              <span className="font-mono text-[#374151]">spacing-6 ({spacing.scale[6]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Section:</span>
              <span className="font-mono text-[#374151]">spacing-8 ({spacing.scale[8]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Page:</span>
              <span className="font-mono text-[#374151]">spacing-12 ({spacing.scale[12]}px)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
