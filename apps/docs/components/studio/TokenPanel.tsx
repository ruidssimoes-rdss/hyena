'use client';

import { PresetPicker } from './PresetPicker';
import { ColorEditor } from './ColorEditor';
import { RadiusEditor } from './RadiusEditor';
import { SpacingEditor } from './SpacingEditor';

export function TokenPanel() {
  return (
    <div className="p-5 space-y-6">
      {/* Presets */}
      <section>
        <h3 className="studio-section-header">Presets</h3>
        <PresetPicker />
      </section>

      <div className="studio-divider" />

      {/* Colors */}
      <section>
        <h3 className="studio-section-header">Colors</h3>
        <ColorEditor />
      </section>

      <div className="studio-divider" />

      {/* Radius */}
      <section>
        <h3 className="studio-section-header">Border Radius</h3>
        <RadiusEditor />
      </section>

      <div className="studio-divider" />

      {/* Spacing */}
      <section>
        <h3 className="studio-section-header">Spacing</h3>
        <SpacingEditor />
      </section>
    </div>
  );
}
