'use client';

import { useTokens } from '@/lib/studio/context';
import { cn } from '@/lib/utils';

export function RadiusPanel() {
  const { state, updateRadiusBase, updateRadiusValue } = useTokens();
  const { radius } = state.tokens;

  return (
    <div className="p-4 space-y-6">
      {/* Base Radius */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Base Radius
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={radius.base}
              onChange={(e) => updateRadiusBase(Number(e.target.value))}
              className="w-20 px-3 py-2 text-sm bg-[#F9FAFB] rounded-md border border-[#E5E7EB] text-center focus:border-[#9CA3AF] focus:outline-none"
              min={0}
              max={32}
            />
            <span className="text-sm text-[#6B7280]">px</span>
            <input
              type="range"
              value={radius.base}
              onChange={(e) => updateRadiusBase(Number(e.target.value))}
              className={cn(
                'flex-1 h-1 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer',
                '[&::-webkit-slider-thumb]:appearance-none',
                '[&::-webkit-slider-thumb]:w-4',
                '[&::-webkit-slider-thumb]:h-4',
                '[&::-webkit-slider-thumb]:rounded-full',
                '[&::-webkit-slider-thumb]:bg-[#18181B]',
                '[&::-webkit-slider-thumb]:cursor-pointer'
              )}
              min={0}
              max={32}
            />
          </div>

          <p className="text-xs text-[#9CA3AF] mt-3">
            Changing the base radius regenerates the entire scale proportionally.
          </p>
        </div>
      </section>

      {/* Scale */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Scale
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4">
          <div className="grid grid-cols-4 gap-4">
            {radius.scale.map((item, index) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 bg-[#18181B] transition-all"
                  style={{
                    borderRadius:
                      item.value === 9999 ? '50%' : `${item.value}px`,
                  }}
                />
                <span className="text-xs text-[#6B7280]">{item.name}</span>
                {item.name !== 'full' ? (
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) =>
                      updateRadiusValue(index, Number(e.target.value))
                    }
                    className="w-12 px-1 py-1 text-[10px] bg-[#F9FAFB] border border-[#E5E7EB] rounded text-center focus:border-[#9CA3AF] focus:outline-none"
                    min={0}
                    max={100}
                  />
                ) : (
                  <span className="text-[10px] text-[#9CA3AF]">9999px</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Examples */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Preview
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-4 bg-[#F9FAFB]">
          {/* Buttons */}
          <div className="flex gap-2">
            {radius.scale.slice(1, 5).map((r) => (
              <div
                key={r.name}
                className="px-4 py-2 bg-[#18181B] text-white text-xs"
                style={{ borderRadius: r.value }}
              >
                Button
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="flex gap-3">
            {radius.scale.slice(2, 6).map((r) => (
              <div
                key={r.name}
                className="flex-1 h-20 bg-white border border-[#E5E7EB]"
                style={{ borderRadius: r.value }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
