'use client';

import { useTokens } from '@/lib/studio/context';
import { PreviewShowcase } from './preview/PreviewShowcase';
import { TokenSystem, PreviewMode } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

function generateCSSVariables(
  tokens: TokenSystem,
  mode: PreviewMode
): React.CSSProperties {
  const vars: Record<string, string> = {};

  // Brand colors
  tokens.colors.brand.forEach((c) => {
    vars[`--color-${c.name}`] = c.value[mode];
  });

  // Semantic colors
  tokens.colors.semantic.forEach((c) => {
    vars[`--color-${c.name}`] = c.value[mode];
  });

  // Surface colors
  Object.entries(tokens.colors.surface).forEach(([name, value]) => {
    const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    vars[`--color-${kebabName}`] = value[mode];
  });

  // Neutrals
  Object.entries(tokens.colors.neutral.scale).forEach(([key, value]) => {
    vars[`--color-neutral-${key}`] = value;
  });

  // Radius
  vars['--radius-base'] = `${tokens.radius.base}px`;
  tokens.radius.scale.forEach((r) => {
    vars[`--radius-${r.name}`] =
      r.value === 9999 ? '9999px' : `${r.value}px`;
  });

  // Typography
  tokens.typography.families.forEach((f) => {
    vars[`--font-${f.name}`] = f.value;
  });

  // Shadows
  tokens.shadows.scale.forEach((s) => {
    vars[`--shadow-${s.name}`] = s.value;
  });

  return vars as React.CSSProperties;
}

export function StudioPreview() {
  const { state } = useTokens();
  const { previewMode, previewDevice, tokens } = state;

  // Generate CSS variables from tokens
  const cssVariables = generateCSSVariables(tokens, previewMode);

  return (
    <div
      className={cn(
        'h-full overflow-auto',
        // Light gray background like playground - NOT pure white
        previewMode === 'light' ? 'bg-[#F9FAFB]' : 'bg-[#09090b]'
      )}
    >
      <div
        className={cn(
          'min-h-full p-8 flex items-center justify-center',
          previewDevice === 'mobile' && 'max-w-[375px] mx-auto',
          previewDevice === 'tablet' && 'max-w-[600px] mx-auto'
        )}
        style={cssVariables}
      >
        <PreviewShowcase mode={previewMode} />
      </div>
    </div>
  );
}
