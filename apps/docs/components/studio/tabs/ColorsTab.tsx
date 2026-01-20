'use client';

import { useTokens } from '@/lib/studio/context';
import { ColorPicker } from '../shared/ColorPicker';
import { ContrastChecker } from '../shared/ContrastChecker';
import { getContrastText } from '@/lib/studio/utils/color';

export function ColorsTab() {
  const {
    state,
    updateBrandColor,
    addBrandColor,
    removeBrandColor,
    updateSemanticColor,
    updateNeutralBase,
    updateSurfaceColor,
  } = useTokens();
  const { colors } = state.tokens;

  return (
    <div className="space-y-6">
      {/* Brand Colors */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Brand Colors
          </h3>
          <button
            onClick={addBrandColor}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {colors.brand.map((color) => (
            <ColorPicker
              key={color.id}
              color={color}
              onChange={(value) => updateBrandColor(color.id, value)}
              onRemove={
                colors.brand.length > 1
                  ? () => removeBrandColor(color.id)
                  : undefined
              }
              showBothModes
            />
          ))}
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Semantic Colors
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {colors.semantic.map((color) => (
            <ColorPicker
              key={color.id}
              color={color}
              onChange={(value) => updateSemanticColor(color.id, value)}
              showBothModes
              compact
            />
          ))}
        </div>
      </section>

      {/* Neutral Scale */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Neutral Scale
          </h3>
          <button
            onClick={() => updateNeutralBase(colors.neutral.baseColor)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            Regenerate
          </button>
        </div>

        <div className="space-y-3">
          {/* Base color picker */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Base</span>
            <button
              className="w-8 h-8 rounded-lg border border-white/10 relative overflow-hidden"
              style={{ backgroundColor: colors.neutral.baseColor }}
            >
              <input
                type="color"
                value={colors.neutral.baseColor}
                onChange={(e) => updateNeutralBase(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </button>
            <span className="text-xs font-mono text-muted-foreground">
              {colors.neutral.baseColor}
            </span>
          </div>

          {/* Scale preview - glass container */}
          <div className="glass-panel-subtle rounded-xl overflow-hidden">
            <div className="flex h-12">
              {Object.entries(colors.neutral.scale).map(([key, value]) => (
                <div
                  key={key}
                  className="flex-1 relative group cursor-pointer transition-transform hover:scale-y-110"
                  style={{ backgroundColor: value }}
                  title={`${key}: ${value}`}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: getContrastText(value) }}
                  >
                    {key}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Surface Colors */}
      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Surface Colors
        </h3>

        <div className="glass-panel-subtle rounded-xl divide-y divide-white/5">
          {Object.entries(colors.surface).map(([name, value]) => (
            <div key={name} className="flex items-center justify-between p-3">
              <span className="text-xs text-muted-foreground">
                {name
                  .replace(/([A-Z])/g, ' $1')
                  .trim()
                  .toLowerCase()}
              </span>
              <div className="flex items-center gap-2">
                {/* Light mode */}
                <div className="flex items-center gap-1.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <button
                    className="w-6 h-6 rounded-md border border-white/10 relative overflow-hidden"
                    style={{ backgroundColor: value.light }}
                  >
                    <input
                      type="color"
                      value={value.light}
                      onChange={(e) =>
                        updateSurfaceColor(
                          name as keyof typeof colors.surface,
                          {
                            ...value,
                            light: e.target.value,
                          }
                        )
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </button>
                </div>
                {/* Dark mode */}
                <div className="flex items-center gap-1.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <button
                    className="w-6 h-6 rounded-md border border-white/10 relative overflow-hidden"
                    style={{ backgroundColor: value.dark }}
                  >
                    <input
                      type="color"
                      value={value.dark}
                      onChange={(e) =>
                        updateSurfaceColor(
                          name as keyof typeof colors.surface,
                          {
                            ...value,
                            dark: e.target.value,
                          }
                        )
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contrast Checker */}
      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Contrast Check
        </h3>
        <ContrastChecker
          foreground={colors.surface.foreground}
          background={colors.surface.background}
        />
      </section>
    </div>
  );
}
