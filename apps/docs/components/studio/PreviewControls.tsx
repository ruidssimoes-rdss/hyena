'use client';

import { useStudio } from '@/lib/studio/theme-context';
import { cn } from '@/lib/utils';

function MonitorIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function TabletIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function SmartphoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

export function PreviewControls() {
  const { state, setDevice, setMode } = useStudio();

  return (
    <div className="flex items-center gap-6">
      {/* Device selector */}
      <div className="flex items-center gap-1 studio-glass-subtle rounded-lg p-1">
        {[
          { key: 'mobile', icon: SmartphoneIcon, label: 'Mobile' },
          { key: 'tablet', icon: TabletIcon, label: 'Tablet' },
          { key: 'desktop', icon: MonitorIcon, label: 'Desktop' },
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setDevice(key as 'mobile' | 'tablet' | 'desktop')}
            className={cn(
              'p-2 rounded-md transition-all duration-200',
              state.device === key
                ? 'bg-[var(--studio-primary)] text-white shadow-lg shadow-[var(--studio-primary)]/30'
                : 'text-[var(--studio-text-muted)] hover:text-[var(--studio-text)] hover:bg-white/5'
            )}
            title={label}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-[var(--studio-glass-border)]" />

      {/* Theme mode selector */}
      <div className="flex items-center gap-1 studio-glass-subtle rounded-lg p-1">
        {[
          { key: 'light', icon: SunIcon, label: 'Light' },
          { key: 'dark', icon: MoonIcon, label: 'Dark' },
        ].map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setMode(key as 'light' | 'dark')}
            className={cn(
              'p-2 rounded-md transition-all duration-200',
              state.mode === key
                ? 'bg-[var(--studio-primary)] text-white shadow-lg shadow-[var(--studio-primary)]/30'
                : 'text-[var(--studio-text-muted)] hover:text-[var(--studio-text)] hover:bg-white/5'
            )}
            title={label}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
