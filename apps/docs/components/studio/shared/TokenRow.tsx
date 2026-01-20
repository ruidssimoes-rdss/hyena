'use client';

import { ColorValue } from '@/lib/studio/types';

// Icons
function SunIcon() {
  return (
    <svg
      width="10"
      height="10"
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
      width="10"
      height="10"
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

interface TokenRowProps {
  name: string;
  value: ColorValue;
  onChange: (value: ColorValue) => void;
}

export function TokenRow({ name, value, onChange }: TokenRowProps) {
  // Convert camelCase to display name
  const displayName = name
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase();

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-[#6B7280]">{displayName}</span>

      <div className="flex items-center gap-2">
        {/* Light */}
        <div className="flex items-center gap-1">
          <span className="text-[#9CA3AF]">
            <SunIcon />
          </span>
          <div className="relative">
            <button
              className="w-5 h-5 rounded border border-[#E5E7EB] hover:border-[#9CA3AF] transition-colors"
              style={{ backgroundColor: value.light }}
            >
              <input
                type="color"
                value={value.light}
                onChange={(e) => onChange({ ...value, light: e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </button>
          </div>
        </div>

        {/* Dark */}
        <div className="flex items-center gap-1">
          <span className="text-[#9CA3AF]">
            <MoonIcon />
          </span>
          <div className="relative">
            <button
              className="w-5 h-5 rounded border border-[#E5E7EB] hover:border-[#9CA3AF] transition-colors"
              style={{ backgroundColor: value.dark }}
            >
              <input
                type="color"
                value={value.dark}
                onChange={(e) => onChange({ ...value, dark: e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
