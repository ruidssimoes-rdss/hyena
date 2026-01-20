'use client';

import { useTokens } from '@/lib/studio/context';
import { ExportDropdown } from './ExportDropdown';
import { cn } from '@/lib/utils';
import { TokenTab } from '@/lib/studio/types';

// Icons
function MobileIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  );
}

// Category Icons
function PaletteIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}

function LayoutGridIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function SquareIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

const categories: { id: TokenTab; icon: React.ReactNode; label: string }[] = [
  { id: 'colors', icon: <PaletteIcon />, label: 'Colors' },
  { id: 'typography', icon: <TypeIcon />, label: 'Typography' },
  { id: 'spacing', icon: <LayoutGridIcon />, label: 'Spacing' },
  { id: 'radius', icon: <CircleIcon />, label: 'Radius' },
  { id: 'shadows', icon: <SquareIcon />, label: 'Shadows' },
  { id: 'animations', icon: <ZapIcon />, label: 'Motion' },
];

export function StudioToolbar() {
  const { state, setPreviewDevice, setPreviewMode, setViewMode, setActiveTab } = useTokens();

  return (
    <div className="h-11 flex-shrink-0 border-b border-[#E5E7EB] flex items-center justify-between px-3 bg-white">
      {/* Left: Device, Theme & Code Toggle */}
      <div className="flex items-center">
        {/* Device Toggle */}
        <div className="flex items-center">
          {[
            { key: 'mobile' as const, icon: <MobileIcon />, label: 'Mobile (375px)' },
            { key: 'tablet' as const, icon: <TabletIcon />, label: 'Tablet (768px)' },
            { key: 'desktop' as const, icon: <DesktopIcon />, label: 'Desktop (100%)' },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setPreviewDevice(key)}
              className={cn(
                'p-2 transition-colors',
                state.previewDevice === key
                  ? 'text-[#18181B]'
                  : 'text-[#9CA3AF] hover:text-[#374151]'
              )}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

        {/* Theme Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setPreviewMode('light')}
            className={cn(
              'p-2 transition-colors',
              state.previewMode === 'light'
                ? 'text-[#18181B]'
                : 'text-[#9CA3AF] hover:text-[#374151]'
            )}
            title="Light mode"
          >
            <SunIcon />
          </button>
          <button
            onClick={() => setPreviewMode('dark')}
            className={cn(
              'p-2 transition-colors',
              state.previewMode === 'dark'
                ? 'text-[#18181B]'
                : 'text-[#9CA3AF] hover:text-[#374151]'
            )}
            title="Dark mode"
          >
            <MoonIcon />
          </button>
        </div>

        <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

        {/* Code Toggle */}
        <button
          onClick={() => setViewMode(state.viewMode === 'preview' ? 'code' : 'preview')}
          className={cn(
            'p-2 transition-colors',
            state.viewMode === 'code'
              ? 'text-[#18181B]'
              : 'text-[#9CA3AF] hover:text-[#374151]'
          )}
          title={state.viewMode === 'preview' ? 'Show code' : 'Show preview'}
        >
          <CodeIcon />
        </button>
      </div>

      {/* Right: Export Format + Category Tabs */}
      <div className="flex items-center">
        <ExportDropdown />

        <div className="w-px h-4 bg-[#E5E7EB] mx-2" />

        {/* Category Tabs */}
        <div className="flex items-center">
          {categories.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'p-2 transition-colors',
                state.activeTab === id
                  ? 'text-[#18181B]'
                  : 'text-[#9CA3AF] hover:text-[#374151]'
              )}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
