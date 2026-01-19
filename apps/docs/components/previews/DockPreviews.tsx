'use client';

import React, { useState } from 'react';

// ============================================================================
// Icons for Dock
// ============================================================================

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

// ============================================================================
// Dock Item Component
// ============================================================================

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number | string;
  scale?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function DockItem({ icon, label, active, badge, scale = 1, onMouseEnter, onMouseLeave }: DockItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => {
        setShowTooltip(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
        onMouseLeave?.();
      }}
    >
      {showTooltip && (
        <div className="absolute bottom-full mb-2 px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded text-xs text-[var(--text-primary)] whitespace-nowrap z-10">
          {label}
        </div>
      )}
      <div
        className="w-12 h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-all duration-150"
        style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      >
        {icon}
        {badge !== undefined && (
          <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center px-1">
            <span className="text-[10px] font-semibold text-white">
              {typeof badge === 'number' && badge > 99 ? '99+' : badge}
            </span>
          </div>
        )}
      </div>
      {active && (
        <div className="w-1 h-1 bg-[var(--text-primary)] rounded-full mt-1" />
      )}
    </div>
  );
}

// ============================================================================
// Basic Dock Preview
// ============================================================================

export function DockBasicPreview() {
  return (
    <div className="w-full h-40 flex items-end justify-center pb-4">
      <div className="flex items-end gap-2 px-3 py-2 bg-[var(--bg-elevated)]/80 backdrop-blur-lg border border-[var(--border-default)] rounded-2xl">
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<SearchIcon />} label="Search" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
      </div>
    </div>
  );
}

// ============================================================================
// Magnification Dock Preview
// ============================================================================

export function DockMagnificationPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.4;
    if (distance === 1) return 1.2;
    if (distance === 2) return 1.05;
    return 1;
  };

  const items = [
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <SearchIcon />, label: 'Search' },
    { icon: <FolderIcon />, label: 'Files' },
    { icon: <MailIcon />, label: 'Mail' },
    { icon: <CalendarIcon />, label: 'Calendar' },
    { icon: <SettingsIcon />, label: 'Settings' },
  ];

  return (
    <div className="w-full h-48 flex items-end justify-center pb-4">
      <div
        className="flex items-end gap-2 px-3 py-2 bg-[var(--bg-elevated)]/80 backdrop-blur-lg border border-[var(--border-default)] rounded-2xl"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {items.map((item, index) => (
          <DockItem
            key={item.label}
            {...item}
            scale={getScale(index)}
            onMouseEnter={() => setHoveredIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Left Position Dock Preview
// ============================================================================

export function DockLeftPreview() {
  return (
    <div className="w-full h-64 flex items-center justify-start pl-4">
      <div className="flex flex-col items-center gap-2 px-2 py-3 bg-[var(--bg-elevated)]/80 backdrop-blur-lg border border-[var(--border-default)] rounded-2xl">
        <DockItem icon={<HomeIcon />} label="Home" active />
        <DockItem icon={<SearchIcon />} label="Search" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
      </div>
    </div>
  );
}

// ============================================================================
// With Badges Preview
// ============================================================================

export function DockBadgesPreview() {
  return (
    <div className="w-full h-40 flex items-end justify-center pb-4">
      <div className="flex items-end gap-2 px-3 py-2 bg-[var(--bg-elevated)]/80 backdrop-blur-lg border border-[var(--border-default)] rounded-2xl">
        <DockItem icon={<HomeIcon />} label="Home" />
        <DockItem icon={<MailIcon />} label="Mail" badge={12} />
        <DockItem icon={<CalendarIcon />} label="Calendar" badge={3} />
        <DockItem icon={<MusicIcon />} label="Music" badge="!" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
      </div>
    </div>
  );
}

// ============================================================================
// With Active Indicators Preview
// ============================================================================

export function DockActivePreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { icon: <HomeIcon />, label: 'Home' },
    { icon: <SearchIcon />, label: 'Search' },
    { icon: <FolderIcon />, label: 'Files' },
    { icon: <MailIcon />, label: 'Mail' },
    { icon: <SettingsIcon />, label: 'Settings' },
  ];

  return (
    <div className="w-full h-40 flex items-end justify-center pb-4">
      <div className="flex items-end gap-2 px-3 py-2 bg-[var(--bg-elevated)]/80 backdrop-blur-lg border border-[var(--border-default)] rounded-2xl">
        {items.map((item, index) => (
          <div key={item.label} onClick={() => setActiveIndex(index)} className="cursor-pointer">
            <DockItem {...item} active={index === activeIndex} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// With Separators Preview
// ============================================================================

export function DockSeparatorsPreview() {
  return (
    <div className="w-full h-40 flex items-end justify-center pb-4">
      <div className="flex items-end gap-2 px-3 py-2 bg-[var(--bg-elevated)]/80 backdrop-blur-lg border border-[var(--border-default)] rounded-2xl">
        <DockItem icon={<HomeIcon />} label="Home" active />
        <DockItem icon={<SearchIcon />} label="Search" />
        <DockItem icon={<FolderIcon />} label="Files" />
        <div className="w-px h-8 bg-[var(--border-default)] mx-1" />
        <DockItem icon={<MailIcon />} label="Mail" badge={5} />
        <DockItem icon={<CalendarIcon />} label="Calendar" />
        <div className="w-px h-8 bg-[var(--border-default)] mx-1" />
        <DockItem icon={<SettingsIcon />} label="Settings" />
      </div>
    </div>
  );
}

// ============================================================================
// Auto-hide Preview
// ============================================================================

export function DockAutoHidePreview() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="w-full h-40 flex items-end justify-center relative bg-[var(--bg-raised)] rounded-lg"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]">
        Hover near bottom to show dock
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 flex justify-center pb-4 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="flex items-end gap-2 px-3 py-2 bg-[var(--bg-elevated)]/80 backdrop-blur-lg border border-[var(--border-default)] rounded-2xl">
          <DockItem icon={<HomeIcon />} label="Home" />
          <DockItem icon={<SearchIcon />} label="Search" />
          <DockItem icon={<FolderIcon />} label="Files" />
          <DockItem icon={<SettingsIcon />} label="Settings" />
        </div>
      </div>
    </div>
  );
}
