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
        <div className="text-xs text-[var(--studio-text-muted)]">Base Unit</div>
        <div className="flex gap-2">
          {[2, 4, 8].map((unit) => (
            <button
              key={unit}
              onClick={() => setBaseUnit(unit)}
              className={cn(
                'flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200',
                'studio-glass-subtle studio-glass-hover',
                spacing.baseUnit === unit && 'studio-glass-active text-[var(--studio-primary)]'
              )}
            >
              <span className={spacing.baseUnit === unit ? 'text-[var(--studio-text)]' : 'text-[var(--studio-text-muted)]'}>
                {unit}px
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scale visualization */}
      <div className="space-y-2">
        <div className="text-xs text-[var(--studio-text-muted)]">Scale Preview</div>
        <div className="studio-glass-subtle p-3 rounded-lg space-y-2">
          {spacing.scale.slice(1, 8).map((value, i) => (
            <div key={i} className="flex items-center gap-3">
              <code className="text-[10px] text-[var(--studio-text-dimmed)] w-6 text-right font-mono">
                {value}
              </code>
              <div className="flex-1 h-1.5 rounded-full bg-black/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--studio-primary)] to-purple-500"
                  style={{ width: `${Math.min(value * 1.5, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
