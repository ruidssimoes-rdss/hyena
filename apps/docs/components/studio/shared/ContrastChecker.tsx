'use client';

import { ColorValue } from '@/lib/studio/types';
import {
  getContrastRatio,
  getContrastLevel,
} from '@/lib/studio/utils/contrast';
import { cn } from '@/lib/utils';

interface ContrastCheckerProps {
  foreground: ColorValue;
  background: ColorValue;
}

export function ContrastChecker({
  foreground,
  background,
}: ContrastCheckerProps) {
  const lightRatio = getContrastRatio(foreground.light, background.light);
  const darkRatio = getContrastRatio(foreground.dark, background.dark);

  const lightLevel = getContrastLevel(lightRatio);
  const darkLevel = getContrastLevel(darkRatio);

  return (
    <div className="glass-panel-subtle rounded-xl p-4 space-y-3">
      {/* Light Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md border border-white/10 flex items-center justify-center"
            style={{ backgroundColor: background.light }}
          >
            <span
              className="text-[10px] font-bold"
              style={{ color: foreground.light }}
            >
              Aa
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Light mode</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono">{lightRatio.toFixed(2)}:1</span>
          <span
            className={cn(
              'text-[10px] px-1.5 py-0.5 rounded font-medium',
              lightLevel === 'AAA' && 'bg-green-500/20 text-green-400',
              lightLevel === 'AA' && 'bg-green-500/20 text-green-400',
              lightLevel === 'AA Large' && 'bg-yellow-500/20 text-yellow-400',
              lightLevel === 'Fail' && 'bg-red-500/20 text-red-400'
            )}
          >
            {lightLevel}
          </span>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md border border-white/10 flex items-center justify-center"
            style={{ backgroundColor: background.dark }}
          >
            <span
              className="text-[10px] font-bold"
              style={{ color: foreground.dark }}
            >
              Aa
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Dark mode</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono">{darkRatio.toFixed(2)}:1</span>
          <span
            className={cn(
              'text-[10px] px-1.5 py-0.5 rounded font-medium',
              darkLevel === 'AAA' && 'bg-green-500/20 text-green-400',
              darkLevel === 'AA' && 'bg-green-500/20 text-green-400',
              darkLevel === 'AA Large' && 'bg-yellow-500/20 text-yellow-400',
              darkLevel === 'Fail' && 'bg-red-500/20 text-red-400'
            )}
          >
            {darkLevel}
          </span>
        </div>
      </div>

      {/* Legend */}
      <p className="text-[10px] text-muted-foreground pt-2 border-t border-white/5">
        WCAG 2.1: AA requires 4.5:1 for normal text, 3:1 for large text. AAA
        requires 7:1.
      </p>
    </div>
  );
}
