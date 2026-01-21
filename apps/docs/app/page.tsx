'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Homepage v6 - Bequant Editorial + Glass on Dark
 *
 * Light, minimal, editorial aesthetic inspired by Bequant.
 * Stark contrast between sections (light → dark → light).
 * Glassmorphism effects on dark sections.
 * Wireframe-style illustrations. Elegant typography.
 */

// Icons
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
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

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm install @hyena-studio/react-native');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* SECTION 1: Hero (Light) */}
      <section className="min-h-[90vh] bg-[#f5f5f5] px-6 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Headline - large, elegant */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#1a1a1a] leading-[1.1] max-w-3xl">
            Build once,
            <br />
            ship everywhere.
          </h1>

          {/* Wireframe illustrations row */}
          <div className="mt-16 flex items-end gap-4">
            <div className="w-16 h-16 border-2 border-[#1a1a1a]" />
            <div className="w-32 h-24 border-2 border-[#1a1a1a]" />
            <div className="w-16 h-20 border-2 border-[#1a1a1a]" />
            <div className="w-24 h-16 border-2 border-[#1a1a1a]" />
            <div className="w-20 h-28 border-2 border-[#1a1a1a]" />
          </div>

          {/* Bottom row - CTA and description */}
          <div className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <Link
                href="/docs/installation"
                className="inline-block px-6 py-3 bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#333] transition-colors"
              >
                Get Started
              </Link>
            </div>

            <p className="text-sm text-[#666] max-w-xs md:text-right">
              Universal React Native components for iOS, Android and Web. Copy, paste, ship.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Features (Dark + Glass Cards) */}
      <section className="bg-[#0a0a0a] px-6 py-24 relative overflow-hidden">
        {/* Subtle background glow for glass effect */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-8">Hyena Platform</p>

              <h2 className="text-4xl md:text-5xl font-normal text-white leading-tight">
                What makes Hyena
                <br />
                <span className="text-white/60">different.</span>
              </h2>

              <p className="mt-6 text-sm text-white/40 max-w-xs">
                Explore the core features of the Hyena component library.
              </p>
            </div>

            {/* Corner dots */}
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#e63946]" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Glass feature cards - 3 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Universal */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col h-full">
              {/* Wireframe illustration */}
              <div className="h-32 mb-6 flex items-center justify-center">
                <div className="w-full h-20 border border-white/20 rounded" />
              </div>

              <h3 className="text-xl text-white font-medium mb-3">Universal</h3>

              <p className="text-sm text-white/50 leading-relaxed flex-grow">
                Same components across iOS, Android and Web. Write once, deploy everywhere with native performance.
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <span className="text-xs text-white/30 uppercase tracking-widest">Universal</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">01</span>
                  <div className="w-2 h-2 rounded-full bg-[#e63946]" />
                </div>
              </div>
            </div>

            {/* Card 2 - Themeable */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col h-full">
              {/* Wireframe illustration - bars */}
              <div className="h-32 mb-6 flex items-end justify-center gap-1">
                <div className="w-3 h-8 bg-white/20" />
                <div className="w-3 h-12 bg-white/20" />
                <div className="w-3 h-16 bg-white/20" />
                <div className="w-3 h-10 bg-white/20" />
                <div className="w-3 h-20 bg-white/20" />
                <div className="w-3 h-14 bg-white/20" />
                <div className="w-3 h-[4.5rem] bg-white/20" />
                <div className="w-3 h-12 bg-white/20" />
              </div>

              <h3 className="text-xl text-white font-medium mb-3">Themeable</h3>

              <p className="text-sm text-white/50 leading-relaxed flex-grow">
                4 built-in themes: Dark, Light, Oatmeal and Glass. Switch instantly, customize everything.
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <span className="text-xs text-white/30 uppercase tracking-widest">Themeable</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">02</span>
                  <div className="w-2 h-2 rounded-full bg-[#e63946]" />
                </div>
              </div>
            </div>

            {/* Card 3 - Accessible */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col h-full">
              {/* Wireframe illustration - line chart */}
              <div className="h-32 mb-6 flex items-center justify-center">
                <svg className="w-full h-16" viewBox="0 0 100 40">
                  <polyline
                    points="0,35 20,28 40,32 60,15 80,20 100,8"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <h3 className="text-xl text-white font-medium mb-3">Accessible</h3>

              <p className="text-sm text-white/50 leading-relaxed flex-grow">
                WCAG compliant, screen reader tested, keyboard navigable. Built for everyone from day one.
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <span className="text-xs text-white/30 uppercase tracking-widest">Accessible</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/30">03</span>
                  <div className="w-2 h-2 rounded-full bg-[#e63946]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Component Showcase (Light + Accent) */}
      <section className="bg-[#f5f5f5] px-6 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Section header bar */}
          <div className="flex items-center justify-between border-b border-[#ddd] pb-4 mb-16">
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#1a1a1a]">01</span>
              <span className="text-sm text-[#1a1a1a]">Components</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 border border-[#ddd] flex items-center justify-center hover:bg-white transition-colors">
                <span className="text-xs">→</span>
              </button>
              <button className="w-8 h-8 border border-[#ddd] flex items-center justify-center hover:bg-white transition-colors">
                <span className="text-xs">×</span>
              </button>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left - headline */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#1a1a1a] leading-[1.1]">
                73+ production-ready
                <br />
                <span className="text-[#e63946]">components.</span>
              </h2>

              <div className="mt-12">
                <p className="text-xs text-[#999] uppercase tracking-widest mb-2">Hyena Components</p>
                <p className="text-sm text-[#666]">Built for React Native, works on Web.</p>
              </div>
            </div>

            {/* Right - component preview */}
            <div className="border-2 border-[#1a1a1a] p-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="px-4 py-2 bg-[#1a1a1a] text-white text-sm">Button</div>
                  <div className="px-4 py-2 border border-[#1a1a1a] text-sm">Outline</div>
                </div>
                <div className="border border-[#ddd] p-4">
                  <div className="font-medium text-sm">Card Component</div>
                  <div className="text-xs text-[#666] mt-1">With title and description</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-5 bg-[#1a1a1a] rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                  <span className="text-sm">Switch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Install (Dark + Glass) */}
      <section className="bg-[#0a0a0a] px-6 py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />

        <div className="max-w-xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-8">
            Start building today.
          </h2>

          {/* Glass install card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 inline-flex items-center gap-4">
            <code className="text-sm text-white/80 font-mono">
              npm install @hyena-studio/react-native
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded transition-colors"
              aria-label={copied ? 'Copied' : 'Copy command'}
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-green-400" />
              ) : (
                <CopyIcon className="w-4 h-4 text-white/50" />
              )}
            </button>
          </div>

          <div className="mt-8">
            <Link
              href="/docs/installation"
              className="inline-block px-6 py-3 bg-white text-[#0a0a0a] text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: Footer (Light) */}
      <footer className="bg-[#f5f5f5] px-6 py-16 border-t border-[#ddd]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-lg font-medium text-[#1a1a1a]">hyena</div>

          <div className="flex items-center gap-8 text-sm text-[#666]">
            <Link href="/docs" className="hover:text-[#1a1a1a] transition-colors">
              Docs
            </Link>
            <Link href="/docs/components" className="hover:text-[#1a1a1a] transition-colors">
              Components
            </Link>
            <a
              href="https://github.com/ruidssimoes-rdss/hyena"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              GitHub
            </a>
          </div>

          <p className="text-sm text-[#666]">
            Built by{' '}
            <a
              href="https://github.com/ruidssimoes-rdss"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              Rui Simões
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
