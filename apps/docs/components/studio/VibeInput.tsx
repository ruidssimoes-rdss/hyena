'use client';

import { useState } from 'react';

interface VibeInputProps {
  onGenerate: (vibe: string) => Promise<void>;
  isLoading: boolean;
}

const exampleVibes = [
  'dark mode, teal accents, minimal like Linear',
  'warm and friendly, soft shadows, rounded corners',
  'brutalist, black and white only, sharp edges',
  'glassmorphic depth, purple accents, modern',
  'enterprise dashboard, professional blues',
  'playful startup, gradients, purple and pink',
];

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

export function VibeInput({ onGenerate, isLoading }: VibeInputProps) {
  const [vibe, setVibe] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (vibe.trim().length < 3) {
      setError('Please describe your vibe (at least 3 characters)');
      return;
    }

    try {
      await onGenerate(vibe.trim());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate. Please try again.'
      );
    }
  };

  const handleExampleClick = (example: string) => {
    setVibe(example);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="vibe-input"
            className="block text-sm font-medium text-[#6B7280] mb-2"
          >
            Describe your vibe
          </label>
          <div className="relative">
            <textarea
              id="vibe-input"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="dark mode, glassmorphic, teal accents, like Linear meets Vercel..."
              className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#18181B]/20 focus:border-[#18181B] resize-none text-sm"
              rows={3}
              maxLength={500}
              disabled={isLoading}
            />
            <div className="absolute bottom-2 right-2 text-xs text-[#9CA3AF]">
              {vibe.length}/500
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || vibe.trim().length < 3}
          className="w-full px-4 py-2.5 bg-[#18181B] text-white font-medium rounded-lg hover:bg-[#27272A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon />
              Generate Design System
            </>
          )}
        </button>
      </form>

      {/* Example vibes */}
      <div className="space-y-2">
        <p className="text-xs text-[#9CA3AF]">Try an example:</p>
        <div className="flex flex-wrap gap-1.5">
          {exampleVibes.map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              className="px-2 py-1 text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[#6B7280] hover:text-[#111827] hover:border-[#D1D5DB] hover:bg-[#F3F4F6] transition-colors disabled:opacity-50"
            >
              {example.length > 35 ? example.slice(0, 35) + '...' : example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
