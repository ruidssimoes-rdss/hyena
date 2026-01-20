'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { cn } from '@/lib/utils';

export function MotionPanel() {
  const { state, updateDuration, updateEasing } = useTokens();
  const { animations } = state.tokens;
  const [playing, setPlaying] = useState<string | null>(null);

  const playAnimation = (name: string) => {
    setPlaying(name);
    setTimeout(() => setPlaying(null), 1000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Durations */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Durations
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
          {animations.durations.map((duration, index) => (
            <div key={duration.name} className="flex items-center gap-3 p-3">
              <span className="text-xs font-medium text-[#374151] w-16">{duration.name}</span>
              <input
                type="number"
                value={duration.value}
                onChange={(e) => updateDuration(index, Number(e.target.value))}
                className="w-20 px-2 py-1.5 text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-center focus:border-[#9CA3AF] focus:outline-none"
                min={0}
                max={2000}
                step={50}
              />
              <span className="text-xs text-[#9CA3AF]">ms</span>
              <input
                type="range"
                value={duration.value}
                onChange={(e) => updateDuration(index, Number(e.target.value))}
                className={cn(
                  'flex-1 h-1 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer',
                  '[&::-webkit-slider-thumb]:appearance-none',
                  '[&::-webkit-slider-thumb]:w-3',
                  '[&::-webkit-slider-thumb]:h-3',
                  '[&::-webkit-slider-thumb]:rounded-full',
                  '[&::-webkit-slider-thumb]:bg-[#18181B]'
                )}
                min={0}
                max={1000}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Easings */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Easings
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
          {animations.easings.map((easing, index) => (
            <div key={easing.name} className="flex items-center gap-3 p-3">
              <span className="text-xs font-medium text-[#374151] w-20">{easing.name}</span>
              <input
                type="text"
                value={easing.value}
                onChange={(e) => updateEasing(index, e.target.value)}
                className="flex-1 px-2 py-1.5 text-xs font-mono bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:border-[#9CA3AF] focus:outline-none"
              />
              <button
                onClick={() => playAnimation(easing.name)}
                className="px-2 py-1.5 text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-md hover:bg-[#F3F4F6] transition-colors"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Preview
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-4">
          {animations.easings.map((easing) => (
            <div key={easing.name} className="flex items-center gap-3">
              <span className="text-xs text-[#6B7280] w-20">{easing.name}</span>
              <div className="flex-1 h-8 bg-[#F9FAFB] rounded-md relative overflow-hidden border border-[#E5E7EB]">
                <div
                  className="absolute top-1 bottom-1 left-1 w-6 bg-[#18181B] rounded"
                  style={{
                    transition:
                      playing === easing.name
                        ? `transform ${animations.durations[1]?.value || 200}ms ${easing.value}`
                        : 'none',
                    transform:
                      playing === easing.name
                        ? 'translateX(calc(100% - 32px))'
                        : 'translateX(0)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Reference */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Usage Reference
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4 text-xs text-[#6B7280] space-y-2">
          <p>
            <span className="font-medium text-[#374151]">fast:</span> Micro interactions, button states
          </p>
          <p>
            <span className="font-medium text-[#374151]">normal:</span> Most UI transitions
          </p>
          <p>
            <span className="font-medium text-[#374151]">slow:</span> Page transitions, complex animations
          </p>
          <p>
            <span className="font-medium text-[#374151]">ease-out:</span> Objects entering (preferred)
          </p>
          <p>
            <span className="font-medium text-[#374151]">ease-in:</span> Objects leaving
          </p>
        </div>
      </section>
    </div>
  );
}
