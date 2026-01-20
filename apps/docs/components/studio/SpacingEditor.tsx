'use client';

import { useStudio } from '@/lib/studio/theme-context';
import { cn } from '@/lib/utils';

export function SpacingEditor() {
  const { state, setBaseUnit } = useStudio();
  const { spacing } = state.theme;

  return (
    <div className="space-y-4">
      {/* Base unit selector */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Base Unit</label>
        <div className="flex gap-2">
          {[2, 4, 8].map((unit) => (
            <button
              key={unit}
              onClick={() => setBaseUnit(unit)}
              className={cn(
                'flex-1 py-2 px-3 rounded-md border text-sm font-medium transition-all',
                spacing.baseUnit === unit
                  ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                  : 'border-zinc-700 hover:border-blue-500/50 text-white'
              )}
            >
              {unit}px
            </button>
          ))}
        </div>
      </div>

      {/* Scale visualization */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Scale Preview</label>
        <div className="space-y-1">
          {spacing.scale.slice(1, 8).map((value, i) => (
            <div key={i} className="flex items-center gap-2">
              <code className="text-xs text-zinc-500 w-8">{value}</code>
              <div className="h-2 bg-white rounded-full" style={{ width: value * 2 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
