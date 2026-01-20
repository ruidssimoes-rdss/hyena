'use client';

import { useStudio } from '@/lib/studio/theme-context';
import { cn } from '@/lib/utils';

const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

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
                'p-3 border rounded-lg flex flex-col items-center gap-2 transition-all',
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-zinc-700 hover:border-blue-500/50'
              )}
            >
              {/* Visual preview */}
              <div
                className="w-10 h-10 bg-white"
                style={{ borderRadius: key === 'full' ? '50%' : value }}
              />

              <div className="text-xs">
                <div className="font-medium text-white">{key}</div>
                <div className="text-zinc-400">{key === 'full' ? '50%' : `${value}px`}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current selection */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-400">Default radius:</span>
        <code className="bg-zinc-800 px-2 py-0.5 rounded text-xs text-white">
          {radius.default} ({radius[radius.default]}px)
        </code>
      </div>
    </div>
  );
}
