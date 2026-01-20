'use client';

import { useTokens } from '@/lib/studio/context';

export function ShadowsPanel() {
  const { state, updateShadow } = useTokens();
  const { shadows } = state.tokens;

  return (
    <div className="p-4 space-y-6">
      {/* Shadow Scale */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Shadow Scale
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
          {shadows.scale.map((shadow, index) => (
            <div key={shadow.name} className="flex items-center gap-3 p-3">
              <span className="text-xs font-medium text-[#374151] w-12">{shadow.name}</span>
              <div
                className="w-14 h-14 bg-white rounded-lg flex-shrink-0 border border-[#F3F4F6]"
                style={{ boxShadow: shadow.value }}
              />
              <input
                type="text"
                value={shadow.value}
                onChange={(e) => updateShadow(index, e.target.value)}
                className="flex-1 px-2 py-1.5 text-xs font-mono bg-[#F9FAFB] border border-[#E5E7EB] rounded-md focus:border-[#9CA3AF] focus:outline-none"
                placeholder="none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Preview on Cards
        </h3>

        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded-lg border border-[#E5E7EB]">
          {shadows.scale.slice(1).map((shadow) => (
            <div
              key={shadow.name}
              className="bg-white rounded-lg p-4 flex flex-col items-center justify-center h-20"
              style={{ boxShadow: shadow.value }}
            >
              <span className="text-xs font-medium text-[#374151]">
                {shadow.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guide */}
      <section>
        <h3 className="text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-3">
          Usage Guide
        </h3>

        <div className="border border-[#E5E7EB] rounded-lg p-4 text-xs text-[#6B7280] space-y-2">
          <p>
            <span className="font-medium text-[#374151]">sm:</span> Subtle depth for buttons, inputs
          </p>
          <p>
            <span className="font-medium text-[#374151]">md:</span> Cards, dropdowns, popovers
          </p>
          <p>
            <span className="font-medium text-[#374151]">lg:</span> Modals, dialogs
          </p>
          <p>
            <span className="font-medium text-[#374151]">xl:</span> Hero sections, large floating elements
          </p>
          <p>
            <span className="font-medium text-[#374151]">2xl:</span> Maximum elevation, dramatic effect
          </p>
        </div>
      </section>
    </div>
  );
}
