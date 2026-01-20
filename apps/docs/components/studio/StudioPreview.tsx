'use client';

import { useTokens } from '@/lib/studio/context';
import { PreviewShowcase } from './preview/PreviewShowcase';
import { TokenSystem, PreviewMode } from '@/lib/studio/types';
import { cn } from '@/lib/utils';
import { generateCSS } from '@/lib/studio/generators/css';
import { generateTailwind } from '@/lib/studio/generators/tailwind';
import { generateRUITheme } from '@/lib/studio/generators/rui-theme';
import { generateJSON } from '@/lib/studio/generators/json';

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

function getCode(tokens: TokenSystem, format: string) {
  switch (format) {
    case 'css':
      return generateCSS(tokens);
    case 'tailwind':
      return generateTailwind(tokens);
    case 'rui':
      return generateRUITheme(tokens);
    case 'json':
      return generateJSON(tokens);
    default:
      return generateCSS(tokens);
  }
}

export function StudioPreview() {
  const { state } = useTokens();
  const { previewMode, previewDevice, tokens, viewMode, exportFormat } = state;

  // Generate CSS variables from tokens
  const cssVariables = generateCSSVariables(tokens, previewMode);

  // Code view
  if (viewMode === 'code') {
    return (
      <div className="h-full overflow-auto bg-[#18181B] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <pre className="p-4 text-[11px] text-[#A1A1AA] font-mono leading-relaxed">
          <code>{getCode(tokens, exportFormat)}</code>
        </pre>
      </div>
    );
  }

  // Preview view
  return (
    <div
      className={cn(
        'h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
        previewMode === 'light' ? 'bg-[#F9FAFB]' : 'bg-[#09090b]'
      )}
    >
      <div
        className={cn(
          'min-h-full p-12',
          previewDevice === 'mobile' && 'max-w-[375px] mx-auto',
          previewDevice === 'tablet' && 'max-w-[768px] mx-auto'
        )}
        style={cssVariables}
      >
        <PreviewShowcase mode={previewMode} />
      </div>
    </div>
  );
}
