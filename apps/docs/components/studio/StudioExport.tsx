'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { generateCSS } from '@/lib/studio/generators/css';
import { generateTailwind } from '@/lib/studio/generators/tailwind';
import { generateRUITheme } from '@/lib/studio/generators/rui-theme';
import { generateJSON } from '@/lib/studio/generators/json';

// Icons
function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function StudioExport() {
  const { state } = useTokens();
  const [expanded, setExpanded] = useState(true);

  const getCode = () => {
    switch (state.exportFormat) {
      case 'css':
        return generateCSS(state.tokens);
      case 'tailwind':
        return generateTailwind(state.tokens);
      case 'rui':
        return generateRUITheme(state.tokens);
      case 'json':
        return generateJSON(state.tokens);
    }
  };

  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full h-10 flex items-center justify-between px-4 bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors"
      >
        <span className="text-xs font-medium text-[#6B7280]">
          Generated Code
        </span>
        {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {/* Code */}
      {expanded && (
        <div className="bg-[#18181B] p-4 max-h-[200px] overflow-auto">
          <pre className="text-[11px] text-[#A1A1AA] font-mono leading-relaxed">
            <code>{getCode()}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
