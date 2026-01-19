'use client';

import { useState } from 'react';
import { usePlayground, DeviceMode, ViewMode } from './PlaygroundContext';

// ========================================
// Icons
// ========================================

function MobileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TabletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function DesktopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SplitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <line x1="12" x2="12" y1="3" y2="21" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ========================================
// Components
// ========================================

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function ToolbarButton({ icon, label, active, onClick, disabled }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 rounded-md transition-colors
        ${active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-gray-200" />;
}

interface ToolbarGroupProps {
  children: React.ReactNode;
}

function ToolbarGroup({ children }: ToolbarGroupProps) {
  return (
    <div className="flex items-center gap-0.5">
      {children}
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export function PlaygroundToolbar() {
  const {
    deviceMode,
    setDeviceMode,
    viewMode,
    setViewMode,
    previewTheme,
    setPreviewTheme,
    copyCode,
    refreshPreview,
    openInNewTab,
    activeVariant,
  } = usePlayground();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyCode();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!activeVariant) return;
    const blob = new Blob([activeVariant.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeVariant.id}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deviceModes: { mode: DeviceMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'mobile', icon: <MobileIcon />, label: 'Mobile (375px)' },
    { mode: 'tablet', icon: <TabletIcon />, label: 'Tablet (768px)' },
    { mode: 'desktop', icon: <DesktopIcon />, label: 'Desktop (100%)' },
  ];

  const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'preview', icon: <EyeIcon />, label: 'Preview only' },
    { mode: 'code', icon: <CodeIcon />, label: 'Code only' },
    { mode: 'split', icon: <SplitIcon />, label: 'Split view' },
  ];

  return (
    <div className="flex items-center px-4 py-2 border-b border-gray-200 bg-gray-50/50">
      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Device mode */}
        <ToolbarGroup>
          {deviceModes.map(({ mode, icon, label }) => (
            <ToolbarButton
              key={mode}
              icon={icon}
              label={label}
              active={deviceMode === mode}
              onClick={() => setDeviceMode(mode)}
            />
          ))}
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Theme toggle */}
        <ToolbarButton
          icon={previewTheme === 'light' ? <SunIcon /> : <MoonIcon />}
          label={`Preview theme: ${previewTheme}`}
          onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
        />

        {/* Refresh */}
        <ToolbarButton
          icon={<RefreshIcon />}
          label="Refresh preview"
          onClick={refreshPreview}
        />

        <ToolbarDivider />

        {/* View mode */}
        <ToolbarGroup>
          {viewModes.map(({ mode, icon, label }) => (
            <ToolbarButton
              key={mode}
              icon={icon}
              label={label}
              active={viewMode === mode}
              onClick={() => setViewMode(mode)}
            />
          ))}
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Actions */}
        <ToolbarGroup>
          <ToolbarButton
            icon={copied ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
            label={copied ? 'Copied!' : 'Copy code'}
            onClick={handleCopy}
          />
          <ToolbarButton
            icon={<DownloadIcon />}
            label="Download component"
            onClick={handleDownload}
          />
          <ToolbarButton
            icon={<ExternalLinkIcon />}
            label="Open in new tab"
            onClick={openInNewTab}
          />
        </ToolbarGroup>
      </div>
    </div>
  );
}

