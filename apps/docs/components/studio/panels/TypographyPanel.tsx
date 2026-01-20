'use client';

import { useTokens } from '@/lib/studio/context';
import { cn } from '@/lib/utils';

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

function XIcon() {
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
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
}

export function TypographyPanel() {
  const { state, updateFontFamily, updateFontSize, addFontSize, removeFontSize } =
    useTokens();
  const { typography } = state.tokens;

  return (
    <div className="p-4 space-y-6">
      {/* Font Families */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Font Families
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
          {typography.families.map((family) => (
            <div key={family.id} className="p-3 space-y-2">
              <label className="text-xs text-[#6B7280]">{family.name}</label>
              <input
                type="text"
                value={family.value}
                onChange={(e) => updateFontFamily(family.id, e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F9FAFB] rounded-md border border-[#E5E7EB] focus:border-[#9CA3AF] focus:outline-none transition-colors"
                placeholder="Inter, system-ui, sans-serif"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Font Sizes */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">
            Font Sizes
          </h3>
          <button
            onClick={addFontSize}
            className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors"
          >
            <PlusIcon />
            Add
          </button>
        </div>

        <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
          {typography.sizes.map((size, index) => (
            <div key={size.name} className="flex items-center gap-2 p-3">
              <input
                type="text"
                value={size.name}
                onChange={(e) =>
                  updateFontSize(index, { ...size, name: e.target.value })
                }
                className="w-16 px-2 py-1.5 text-xs bg-[#F9FAFB] rounded-md border border-[#E5E7EB] focus:border-[#9CA3AF] focus:outline-none"
              />
              <input
                type="number"
                value={size.size}
                onChange={(e) =>
                  updateFontSize(index, {
                    ...size,
                    size: Number(e.target.value),
                  })
                }
                className="w-14 px-2 py-1.5 text-xs bg-[#F9FAFB] rounded-md border border-[#E5E7EB] text-center focus:border-[#9CA3AF] focus:outline-none"
              />
              <span className="text-xs text-[#9CA3AF]">px</span>
              <input
                type="number"
                value={size.lineHeight}
                onChange={(e) =>
                  updateFontSize(index, {
                    ...size,
                    lineHeight: Number(e.target.value),
                  })
                }
                className="w-14 px-2 py-1.5 text-xs bg-[#F9FAFB] rounded-md border border-[#E5E7EB] text-center focus:border-[#9CA3AF] focus:outline-none"
                step={0.1}
                min={1}
                max={3}
              />
              <span className="text-xs text-[#9CA3AF]">lh</span>
              <div className="flex-1" />
              <span
                className="text-[#6B7280] truncate max-w-[60px]"
                style={{ fontSize: size.size, lineHeight: size.lineHeight }}
              >
                Aa
              </span>
              <button
                onClick={() => removeFontSize(index)}
                className="p-1 text-[#9CA3AF] hover:text-[#111827] transition-colors"
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Font Weights
        </h3>

        <div className="flex flex-wrap gap-2">
          {typography.weights.map((weight) => (
            <div
              key={weight.name}
              className="px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg"
            >
              <span className="text-xs text-[#374151]" style={{ fontWeight: weight.value }}>
                {weight.name} ({weight.value})
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
