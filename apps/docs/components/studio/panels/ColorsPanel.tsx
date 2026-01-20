'use client';

import { useTokens } from '@/lib/studio/context';
import { ColorInput } from '../shared/ColorInput';
import { NeutralScaleSelector } from '../shared/NeutralScaleSelector';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { AddButton } from '../shared/AddButton';

export function ColorsPanel() {
  const {
    state,
    updateBrandColor,
    addBrandColor,
    updateSemanticColor,
    updateNeutralBase,
    updateSurfaceColor,
  } = useTokens();

  const { colors } = state.tokens;

  // Map brand colors to display names
  const brandColorLabels: Record<string, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    accent: 'Tertiary',
  };

  // Map semantic colors to display names
  const semanticColorLabels: Record<string, string> = {
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    info: 'Info',
  };

  // Map surface colors to display names
  const surfaceColorLabels: Record<string, string> = {
    background: 'Background',
    foreground: 'Foreground',
    card: 'Card',
    muted: 'Muted',
    mutedForeground: 'MutedForeground',
    border: 'Border',
  };

  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Brand Colors Section */}
      <SectionLabel>Brand Colors</SectionLabel>

      <div className="grid grid-cols-3 gap-3 px-6">
        {colors.brand.slice(0, 3).map((color) => (
          <ColorInput
            key={color.id}
            label={brandColorLabels[color.name] || color.name}
            value={color.value}
            onChange={(value) => updateBrandColor(color.id, value)}
          />
        ))}
      </div>

      <AddButton onClick={addBrandColor}>Add color</AddButton>

      <SectionDivider />

      {/* Semantic Colors Section */}
      <SectionLabel>Semantic</SectionLabel>

      <div className="grid grid-cols-3 gap-3 px-6">
        {colors.semantic.slice(0, 3).map((color) => (
          <ColorInput
            key={color.id}
            label={semanticColorLabels[color.name] || color.name}
            value={color.value}
            onChange={(value) => updateSemanticColor(color.id, value)}
          />
        ))}
      </div>

      <AddButton onClick={() => {}}>Add semantic</AddButton>

      <SectionDivider />

      {/* Neutral Scale Section */}
      <NeutralScaleSelector value={colors.neutral} onChange={updateNeutralBase} />

      <SectionDivider />

      {/* Surface Colors Section */}
      <SectionLabel>Surface</SectionLabel>

      {/* First row: Background, Foreground, Card */}
      <div className="grid grid-cols-3 gap-3 px-6 mb-3">
        {['background', 'foreground', 'card'].map((name) => (
          <ColorInput
            key={name}
            label={surfaceColorLabels[name] || name}
            value={colors.surface[name as keyof typeof colors.surface]}
            onChange={(newValue) =>
              updateSurfaceColor(name as keyof typeof colors.surface, newValue)
            }
          />
        ))}
      </div>

      {/* Second row: Muted, MutedForeground, Border */}
      <div className="grid grid-cols-3 gap-3 px-6">
        {['muted', 'mutedForeground', 'border'].map((name) => (
          <ColorInput
            key={name}
            label={surfaceColorLabels[name] || name}
            value={colors.surface[name as keyof typeof colors.surface]}
            onChange={(newValue) =>
              updateSurfaceColor(name as keyof typeof colors.surface, newValue)
            }
          />
        ))}
      </div>

      <AddButton onClick={() => {}}>Add surface</AddButton>
    </div>
  );
}
