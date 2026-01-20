'use client';

import { useTokens } from '@/lib/studio/context';
import { ColorSwatch } from '../shared/ColorSwatch';
import { ScaleBar } from '../shared/ScaleBar';
import { TokenRow } from '../shared/TokenRow';

// Icons
function PlusIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export function ColorsPanel() {
  const { state, addBrandColor, updateNeutralBase, updateSurfaceColor } = useTokens();
  const { colors } = state.tokens;

  return (
    <div className="p-4 space-y-6">
      {/* Brand Colors */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
            Brand
          </h3>
          <button
            onClick={addBrandColor}
            className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors"
          >
            <PlusIcon />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {colors.brand.map((color) => (
            <ColorSwatch key={color.id} color={color} type="brand" />
          ))}
        </div>
      </section>

      {/* Semantic Colors */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Semantic
        </h3>

        <div className="flex flex-wrap gap-2">
          {colors.semantic.map((color) => (
            <ColorSwatch key={color.id} color={color} type="semantic" size="sm" />
          ))}
        </div>
      </section>

      {/* Neutral Scale */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
            Neutral
          </h3>
          <button
            onClick={() => updateNeutralBase(colors.neutral.baseColor)}
            className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors"
          >
            <RefreshIcon />
          </button>
        </div>

        <ScaleBar
          scale={colors.neutral.scale}
          baseColor={colors.neutral.baseColor}
          onBaseChange={updateNeutralBase}
        />
      </section>

      {/* Surface Colors */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Surface
        </h3>

        <div className="space-y-1">
          {Object.entries(colors.surface).map(([name, value]) => (
            <TokenRow
              key={name}
              name={name}
              value={value}
              onChange={(newValue) =>
                updateSurfaceColor(
                  name as keyof typeof colors.surface,
                  newValue
                )
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
