'use client';

import React from 'react';

// ============================================================================
// ResizablePanels Previews (Web simulation)
// ============================================================================

// Horizontal Two-Panel Preview
export function ResizablePanelsHorizontalPreview() {
  return (
    <div className="w-full h-64 border border-[var(--border-default)] rounded-lg overflow-hidden flex">
      <div className="flex-[0_0_40%] bg-[var(--bg-raised)] p-4 flex items-center justify-center">
        <div className="text-center">
          <span className="text-sm font-medium text-[var(--text-primary)]">Panel 1</span>
          <p className="text-xs text-[var(--text-secondary)] mt-1">40% width</p>
        </div>
      </div>
      <div className="w-2 bg-[var(--border-default)] cursor-col-resize flex items-center justify-center hover:bg-[var(--accent-blue)]">
        <div className="flex flex-col gap-0.5">
          <div className="w-0.5 h-3 bg-[var(--text-muted)] rounded" />
        </div>
      </div>
      <div className="flex-1 bg-[var(--bg-surface)] p-4 flex items-center justify-center">
        <div className="text-center">
          <span className="text-sm font-medium text-[var(--text-primary)]">Panel 2</span>
          <p className="text-xs text-[var(--text-secondary)] mt-1">60% width</p>
        </div>
      </div>
    </div>
  );
}

// Vertical Two-Panel Preview
export function ResizablePanelsVerticalPreview() {
  return (
    <div className="w-full h-64 border border-[var(--border-default)] rounded-lg overflow-hidden flex flex-col">
      <div className="flex-[0_0_40%] bg-[var(--bg-raised)] p-4 flex items-center justify-center">
        <div className="text-center">
          <span className="text-sm font-medium text-[var(--text-primary)]">Top Panel</span>
          <p className="text-xs text-[var(--text-secondary)] mt-1">40% height</p>
        </div>
      </div>
      <div className="h-2 bg-[var(--border-default)] cursor-row-resize flex items-center justify-center hover:bg-[var(--accent-blue)]">
        <div className="flex gap-0.5">
          <div className="h-0.5 w-3 bg-[var(--text-muted)] rounded" />
        </div>
      </div>
      <div className="flex-1 bg-[var(--bg-surface)] p-4 flex items-center justify-center">
        <div className="text-center">
          <span className="text-sm font-medium text-[var(--text-primary)]">Bottom Panel</span>
          <p className="text-xs text-[var(--text-secondary)] mt-1">60% height</p>
        </div>
      </div>
    </div>
  );
}

// Three Panels Preview
export function ResizablePanelsThreePreview() {
  return (
    <div className="w-full h-64 border border-[var(--border-default)] rounded-lg overflow-hidden flex">
      <div className="flex-[0_0_25%] bg-[var(--bg-raised)] p-4 flex items-center justify-center">
        <span className="text-sm font-medium text-[var(--text-primary)]">Sidebar</span>
      </div>
      <div className="w-2 bg-[var(--border-default)] cursor-col-resize flex items-center justify-center">
        <div className="w-0.5 h-3 bg-[var(--text-muted)] rounded" />
      </div>
      <div className="flex-1 bg-[var(--bg-surface)] p-4 flex items-center justify-center">
        <span className="text-sm font-medium text-[var(--text-primary)]">Main Content</span>
      </div>
      <div className="w-2 bg-[var(--border-default)] cursor-col-resize flex items-center justify-center">
        <div className="w-0.5 h-3 bg-[var(--text-muted)] rounded" />
      </div>
      <div className="flex-[0_0_20%] bg-[var(--bg-elevated)] p-4 flex items-center justify-center">
        <span className="text-sm font-medium text-[var(--text-primary)]">Details</span>
      </div>
    </div>
  );
}

// With Min/Max Constraints Preview
export function ResizablePanelsConstraintsPreview() {
  return (
    <div className="w-full h-64 border border-[var(--border-default)] rounded-lg overflow-hidden flex">
      <div className="flex-[0_0_30%] min-w-[100px] max-w-[300px] bg-[var(--bg-raised)] p-4 flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-[var(--text-primary)]">Constrained</span>
        <p className="text-xs text-[var(--text-secondary)] mt-1">Min: 100px</p>
        <p className="text-xs text-[var(--text-secondary)]">Max: 300px</p>
      </div>
      <div className="w-2 bg-[var(--border-default)] cursor-col-resize flex items-center justify-center">
        <div className="w-0.5 h-3 bg-[var(--text-muted)] rounded" />
      </div>
      <div className="flex-1 bg-[var(--bg-surface)] p-4 flex items-center justify-center">
        <span className="text-sm font-medium text-[var(--text-primary)]">Flexible</span>
      </div>
    </div>
  );
}

// Collapsible Sidebar Preview
export function ResizablePanelsCollapsiblePreview() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="w-full h-64 border border-[var(--border-default)] rounded-lg overflow-hidden flex">
      {!collapsed && (
        <>
          <div className="flex-[0_0_200px] bg-[var(--bg-raised)] p-4">
            <div className="text-sm font-medium text-[var(--text-primary)] mb-2">Sidebar</div>
            <div className="space-y-2">
              <div className="h-6 bg-[var(--bg-surface)] rounded" />
              <div className="h-6 bg-[var(--bg-surface)] rounded" />
              <div className="h-6 bg-[var(--bg-surface)] rounded" />
            </div>
          </div>
          <div
            className="w-2 bg-[var(--border-default)] cursor-col-resize flex items-center justify-center hover:bg-[var(--accent-blue)]"
            onDoubleClick={() => setCollapsed(true)}
          >
            <div className="w-0.5 h-3 bg-[var(--text-muted)] rounded" />
          </div>
        </>
      )}
      {collapsed && (
        <div
          className="w-2 bg-[var(--border-strong)] cursor-pointer hover:bg-[var(--accent-blue)]"
          onClick={() => setCollapsed(false)}
        />
      )}
      <div className="flex-1 bg-[var(--bg-surface)] p-4 flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-[var(--text-primary)]">Main Content</span>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          {collapsed ? 'Click divider to expand' : 'Double-click divider to collapse'}
        </p>
      </div>
    </div>
  );
}

// Nested Panels Preview
export function ResizablePanelsNestedPreview() {
  return (
    <div className="w-full h-72 border border-[var(--border-default)] rounded-lg overflow-hidden flex flex-col">
      <div className="flex-[0_0_40%] flex">
        <div className="flex-1 bg-[var(--bg-raised)] p-3 flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--text-primary)]">Top Left</span>
        </div>
        <div className="w-2 bg-[var(--border-default)] cursor-col-resize" />
        <div className="flex-1 bg-[var(--bg-surface)] p-3 flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--text-primary)]">Top Right</span>
        </div>
      </div>
      <div className="h-2 bg-[var(--border-default)] cursor-row-resize" />
      <div className="flex-1 flex">
        <div className="flex-[0_0_30%] bg-[var(--bg-elevated)] p-3 flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--text-primary)]">Sidebar</span>
        </div>
        <div className="w-2 bg-[var(--border-default)] cursor-col-resize" />
        <div className="flex-1 bg-[var(--bg-raised)] p-3 flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--text-primary)]">Main</span>
        </div>
        <div className="w-2 bg-[var(--border-default)] cursor-col-resize" />
        <div className="flex-[0_0_25%] bg-[var(--bg-surface)] p-3 flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--text-primary)]">Details</span>
        </div>
      </div>
    </div>
  );
}
