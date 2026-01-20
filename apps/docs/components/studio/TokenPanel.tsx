'use client';

import { PresetPicker } from './PresetPicker';
import { ColorEditor } from './ColorEditor';
import { RadiusEditor } from './RadiusEditor';
import { SpacingEditor } from './SpacingEditor';

export function TokenPanel() {
  return (
    <div className="p-4 space-y-6">
      {/* Presets */}
      <section>
        <h3 className="text-sm font-medium mb-3 text-white">Presets</h3>
        <PresetPicker />
      </section>

      <div className="h-px bg-zinc-800" />

      {/* Colors */}
      <section>
        <h3 className="text-sm font-medium mb-3 text-white">Colors</h3>
        <ColorEditor />
      </section>

      <div className="h-px bg-zinc-800" />

      {/* Radius */}
      <section>
        <h3 className="text-sm font-medium mb-3 text-white">Border Radius</h3>
        <RadiusEditor />
      </section>

      <div className="h-px bg-zinc-800" />

      {/* Spacing */}
      <section>
        <h3 className="text-sm font-medium mb-3 text-white">Spacing</h3>
        <SpacingEditor />
      </section>
    </div>
  );
}
