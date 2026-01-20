'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import { getContrastText } from '@/lib/studio/color-utils';

interface ComponentShowcaseProps {
  mode: 'light' | 'dark';
}

function StarIcon({ size = 20, fill, color }: { size?: number; fill?: string; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SearchIcon({ size = 18 }: { size?: number }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MailIcon({ size = 18 }: { size?: number }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowRightIcon({ size = 18 }: { size?: number }) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function UserIcon({ size = 20 }: { size?: number }) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function ComponentShowcase({ mode }: ComponentShowcaseProps) {
  const { state } = useStudio();
  const { theme } = state;
  const [switchValue, setSwitchValue] = useState(true);
  const [checkValue, setCheckValue] = useState(true);

  const textColor = mode === 'dark' ? '#fafafa' : '#09090b';
  const mutedColor = mode === 'dark' ? '#a1a1aa' : '#71717a';
  const borderColor = mode === 'dark' ? '#27272a' : '#e4e4e7';
  const mutedBg = mode === 'dark' ? '#27272a' : '#f4f4f5';

  // Apply theme's radius
  const radius = theme.radius[theme.radius.default];

  return (
    <div className="space-y-8" style={{ color: textColor }}>
      {/* Section: Buttons */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium" style={{ color: mutedColor }}>
          Buttons
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: getContrastText(theme.colors.primary),
              borderRadius: radius,
            }}
          >
            Primary
          </button>
          <button
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: mutedBg,
              color: textColor,
              borderRadius: radius,
            }}
          >
            Secondary
          </button>
          <button
            className="px-4 py-2 text-sm font-medium border transition-colors"
            style={{
              borderColor: borderColor,
              color: textColor,
              borderRadius: radius,
              backgroundColor: 'transparent',
            }}
          >
            Outline
          </button>
          <button
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              color: textColor,
              borderRadius: radius,
              backgroundColor: 'transparent',
            }}
          >
            Ghost
          </button>
          <button
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme.colors.error,
              color: getContrastText(theme.colors.error),
              borderRadius: radius,
            }}
          >
            Destructive
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: getContrastText(theme.colors.primary),
              borderRadius: radius,
            }}
          >
            Small
          </button>
          <button
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: getContrastText(theme.colors.primary),
              borderRadius: radius,
            }}
          >
            Medium
          </button>
          <button
            className="px-6 py-3 text-base font-medium transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: getContrastText(theme.colors.primary),
              borderRadius: radius,
            }}
          >
            Large
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center transition-colors"
            style={{
              backgroundColor: theme.colors.primary,
              color: getContrastText(theme.colors.primary),
              borderRadius: radius,
            }}
          >
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </section>

      {/* Section: Inputs */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium" style={{ color: mutedColor }}>
          Inputs
        </h3>
        <div className="space-y-2 max-w-sm">
          <input
            type="text"
            placeholder="Default input"
            className="w-full px-3 py-2 text-sm border outline-none focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              borderColor: borderColor,
              borderRadius: radius,
              backgroundColor: 'transparent',
              color: textColor,
            }}
          />
          <div
            className="flex items-center gap-2 px-3 py-2 border"
            style={{
              borderColor: borderColor,
              borderRadius: radius,
            }}
          >
            <span style={{ color: mutedColor }}>
              <SearchIcon size={18} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: textColor }}
            />
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 border"
            style={{
              borderColor: borderColor,
              borderRadius: radius,
            }}
          >
            <span style={{ color: mutedColor }}>
              <MailIcon size={18} />
            </span>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: textColor }}
            />
          </div>
        </div>
      </section>

      {/* Section: Cards */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium" style={{ color: mutedColor }}>
          Cards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="border p-4 space-y-3"
            style={{
              borderColor: borderColor,
              borderRadius: radius,
            }}
          >
            <div>
              <h4 className="font-semibold">Card Title</h4>
              <p className="text-sm" style={{ color: mutedColor }}>
                Card description goes here
              </p>
            </div>
            <p className="text-sm" style={{ color: mutedColor }}>
              This is the card content area. You can put anything here.
            </p>
            <div>
              <button
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: getContrastText(theme.colors.primary),
                  borderRadius: radius,
                }}
              >
                Action
              </button>
            </div>
          </div>

          <div
            className="border p-4 space-y-3"
            style={{
              borderColor: borderColor,
              borderRadius: radius,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  backgroundColor: mutedBg,
                  borderRadius: '50%',
                  color: mutedColor,
                }}
              >
                <UserIcon size={20} />
              </div>
              <div>
                <h4 className="font-semibold">User Profile</h4>
                <p className="text-sm" style={{ color: mutedColor }}>
                  @username
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className="px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: getContrastText(theme.colors.primary),
                  borderRadius: radius,
                }}
              >
                Pro
              </span>
              <span
                className="px-2 py-0.5 text-xs font-medium border"
                style={{
                  borderColor: borderColor,
                  color: textColor,
                  borderRadius: radius,
                }}
              >
                Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Form Controls */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium" style={{ color: mutedColor }}>
          Form Controls
        </h3>
        <div className="flex flex-wrap items-center gap-6">
          {/* Switch */}
          <button
            className="relative w-11 h-6 rounded-full transition-colors"
            style={{
              backgroundColor: switchValue ? theme.colors.primary : mutedBg,
            }}
            onClick={() => setSwitchValue(!switchValue)}
          >
            <span
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm"
              style={{
                left: switchValue ? '22px' : '2px',
              }}
            />
          </button>

          {/* Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <button
              className="w-4 h-4 border flex items-center justify-center transition-colors"
              style={{
                borderColor: checkValue ? theme.colors.primary : borderColor,
                backgroundColor: checkValue ? theme.colors.primary : 'transparent',
                borderRadius: radius / 2,
              }}
              onClick={() => setCheckValue(!checkValue)}
            >
              {checkValue && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={getContrastText(theme.colors.primary)}
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <span className="text-sm">Checkbox</span>
          </label>

          {/* Stars */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                size={20}
                fill={i <= 4 ? theme.colors.accent : 'none'}
                color={theme.colors.accent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Badges */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium" style={{ color: mutedColor }}>
          Badges
        </h3>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: theme.colors.primary,
              color: getContrastText(theme.colors.primary),
              borderRadius: radius,
            }}
          >
            Primary
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: theme.colors.secondary,
              color: getContrastText(theme.colors.secondary),
              borderRadius: radius,
            }}
          >
            Secondary
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: theme.colors.accent,
              color: getContrastText(theme.colors.accent),
              borderRadius: radius,
            }}
          >
            Accent
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: theme.colors.success,
              color: getContrastText(theme.colors.success),
              borderRadius: radius,
            }}
          >
            Success
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: theme.colors.warning,
              color: getContrastText(theme.colors.warning),
              borderRadius: radius,
            }}
          >
            Warning
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: theme.colors.error,
              color: getContrastText(theme.colors.error),
              borderRadius: radius,
            }}
          >
            Error
          </span>
        </div>
      </section>

      {/* Section: Progress */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium" style={{ color: mutedColor }}>
          Progress
        </h3>
        <div className="space-y-2 max-w-sm">
          <div
            className="h-2 overflow-hidden"
            style={{
              backgroundColor: mutedBg,
              borderRadius: radius,
            }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: '75%',
                backgroundColor: theme.colors.primary,
                borderRadius: radius,
              }}
            />
          </div>
          <div
            className="h-2 overflow-hidden"
            style={{
              backgroundColor: mutedBg,
              borderRadius: radius,
            }}
          >
            <div
              className="h-full transition-all"
              style={{
                width: '45%',
                backgroundColor: theme.colors.accent,
                borderRadius: radius,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
