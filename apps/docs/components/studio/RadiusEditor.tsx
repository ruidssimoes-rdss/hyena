'use client';

import { useStudio } from '@/lib/studio/theme-context';
import { cn } from '@/lib/utils';

const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

function CheckIcon({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function RadiusEditor() {
  const { state, setDefaultRadius } = useStudio();
  const { radius } = state.theme;

  return (
    <div className="space-y-4">
      {/* Visual radius picker */}
      <div className="grid grid-cols-3 gap-2">
        {radiusOptions.map((key) => {
          const value = radius[key];
          const isSelected = radius.default === key;

          return (
            <button
              key={key}
              onClick={() => setDefaultRadius(key)}
              className={cn(
                'relative p-3 rounded-lg flex flex-col items-center gap-2 transition-all duration-200',
                'studio-glass-subtle studio-glass-hover',
                isSelected && 'studio-glass-active'
              )}
            >
              {/* Visual preview */}
              <div
                className="w-10 h-10 bg-gradient-to-br from-[var(--studio-primary)] to-purple-600 shadow-lg shadow-[var(--studio-primary)]/20"
                style={{ borderRadius: key === 'full' ? '50%' : value }}
              />

              <div className="text-center">
                <div className="text-xs font-medium text-[var(--studio-text)]">{key}</div>
                <div className="text-[10px] text-[var(--studio-text-dimmed)]">
                  {key === 'full' ? '50%' : `${value}px`}
                </div>
              </div>

              {/* Selected check */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--studio-primary)] flex items-center justify-center text-white">
                  <CheckIcon size={8} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Current selection display */}
      <div className="flex items-center justify-between p-2 rounded-md studio-glass-subtle">
        <span className="text-xs text-[var(--studio-text-muted)]">Default radius</span>
        <code className="px-2 py-0.5 rounded text-xs font-mono text-[var(--studio-text)] bg-black/20">
          {radius.default} ({radius[radius.default]}px)
        </code>
      </div>
    </div>
  );
}
