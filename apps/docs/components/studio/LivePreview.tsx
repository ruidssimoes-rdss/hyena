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
          'relative rounded-2xl overflow-hidden transition-all duration-500',
          'shadow-2xl shadow-black/40',
          'ring-1 ring-white/10'
        )}
        style={{
          width: device === 'desktop' ? '100%' : deviceWidths[device],
          maxWidth: deviceWidths[device],
        }}
      >
        {/* Device chrome */}
        {device !== 'desktop' && (
          <div
            className={cn(
              'relative h-8 flex items-center justify-center',
              mode === 'dark' ? 'bg-[#18181b]' : 'bg-gray-100'
            )}
          >
            {/* Notch for mobile */}
            {device === 'mobile' && (
              <div
                className={cn(
                  'absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl',
                  mode === 'dark' ? 'bg-[#09090b]' : 'bg-gray-200'
                )}
              />
            )}
            {/* Pill indicator for tablet */}
            {device === 'tablet' && (
              <div
                className={cn(
                  'w-16 h-1 rounded-full',
                  mode === 'dark' ? 'bg-[#27272a]' : 'bg-gray-300'
                )}
              />
            )}
          </div>
        )}

        {/* Preview content */}
        <div
          className={cn(
            'transition-colors duration-300',
            mode === 'dark' ? 'bg-[#09090b]' : 'bg-white'
          )}
          style={cssVariables}
        >
          <div className={cn(
            'p-6',
            device === 'mobile' && 'px-4',
            device === 'tablet' && 'px-5'
          )}>
            <ComponentShowcase mode={mode} />
          </div>
        </div>

        {/* Bottom bar for mobile */}
        {device === 'mobile' && (
          <div
            className={cn(
              'h-8 flex items-center justify-center',
              mode === 'dark' ? 'bg-[#18181b]' : 'bg-gray-100'
            )}
          >
            <div
              className={cn(
                'w-32 h-1 rounded-full',
                mode === 'dark' ? 'bg-[#3f3f46]' : 'bg-gray-400'
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
