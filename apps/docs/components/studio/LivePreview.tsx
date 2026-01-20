'use client';

import { useStudio } from '@/lib/studio/theme-context';
import { ComponentShowcase } from './ComponentShowcase';
import { cn } from '@/lib/utils';

const deviceWidths = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
};

export function LivePreview() {
  const { state } = useStudio();
  const { theme, device, mode } = state;

  // Generate CSS variables from theme
  const cssVariables = {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': mode === 'dark' ? '#09090b' : '#ffffff',
    '--color-foreground': mode === 'dark' ? '#fafafa' : '#09090b',
    '--color-muted': mode === 'dark' ? '#27272a' : '#f4f4f5',
    '--color-muted-foreground': mode === 'dark' ? '#a1a1aa' : '#71717a',
    '--color-border': mode === 'dark' ? '#27272a' : '#e4e4e7',
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--radius-default': `${theme.radius[theme.radius.default]}px`,
    '--radius-sm': `${theme.radius.sm}px`,
    '--radius-md': `${theme.radius.md}px`,
    '--radius-lg': `${theme.radius.lg}px`,
  } as React.CSSProperties;

  return (
    <div className="flex justify-center">
      <div
        className={cn(
          'border border-zinc-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300',
          mode === 'dark' ? 'bg-[#09090b]' : 'bg-white'
        )}
        style={{
          width: device === 'desktop' ? '100%' : deviceWidths[device],
          maxWidth: deviceWidths[device],
          ...cssVariables,
        }}
      >
        {/* Device frame header (for mobile/tablet) */}
        {device !== 'desktop' && (
          <div
            className={cn(
              'h-6 flex items-center justify-center',
              mode === 'dark' ? 'bg-[#18181b]' : 'bg-gray-100'
            )}
          >
            <div
              className={cn(
                'w-16 h-1 rounded-full',
                mode === 'dark' ? 'bg-[#27272a]' : 'bg-gray-300'
              )}
            />
          </div>
        )}

        {/* Component showcase */}
        <div className="p-6">
          <ComponentShowcase mode={mode} />
        </div>
      </div>
    </div>
  );
}
