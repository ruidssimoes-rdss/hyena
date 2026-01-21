'use client';

import Link from 'next/link';

/**
 * Homepage v9 - Square Grid Layout (jonasemmertsen.com inspired - CORRECTED)
 *
 * True square grid (both vertical AND horizontal lines) like graph paper.
 * Items placed deliberately within specific grid cells.
 * Clean sans-serif typography (not serif).
 * Pure white background (not warm gray).
 * Orange accent (#e85a2a) for links only.
 */

// Square Grid Background - creates graph paper effect
function SquareGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e8e8e8 1px, transparent 1px),
          linear-gradient(to bottom, #e8e8e8 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
  );
}

// Component Card - dark card that spans grid cells
function ComponentCard({
  name,
  category,
  children,
  style,
}: {
  name: string;
  category: string;
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div className="absolute" style={style}>
      {/* Labels */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-medium">{name}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#999]">{category}</span>
      </div>
      {/* Dark card */}
      <div className="bg-[#1a1a1a] rounded-xl p-6 h-[calc(100%-24px)]">
        {children}
      </div>
    </div>
  );
}

export default function HomePage() {
  // Grid cell size
  const cell = 80;

  return (
    <div className="bg-white min-h-screen relative">
      {/* Square Grid Background */}
      <SquareGrid />

      {/* Content positioned on grid */}
      <div className="relative z-10">

        {/* Hero Section - positioned in specific grid cells */}
        <section className="relative" style={{ minHeight: cell * 8 }}>

          {/* Left anchor - CTA (column 1, row 3-4) */}
          <div
            className="absolute"
            style={{
              left: cell * 1,
              top: cell * 3,
              width: cell * 2,
            }}
          >
            <Link
              href="/docs/installation"
              className="text-[11px] uppercase tracking-[0.2em] text-[#e85a2a] hover:underline block mb-1 font-medium"
            >
              Get Started
            </Link>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#e85a2a] block">
              npx hyena init
            </span>
          </div>

          {/* Headline (columns 4-11, rows 2-5) */}
          <div
            className="absolute"
            style={{
              left: cell * 3.5,
              top: cell * 2,
              width: cell * 8,
            }}
          >
            <h1 className="text-[64px] md:text-[80px] leading-[0.95] text-[#1a1a1a] tracking-[-0.02em] font-bold">
              Universal components for React Native.
            </h1>
            <p className="mt-6 text-lg text-[#666] max-w-lg">
              Build once, ship everywhere. Production-ready components for iOS, Android, and Web.
            </p>
          </div>

        </section>

        {/* Component Cards - each positioned in specific grid cells */}
        <section className="relative" style={{ minHeight: cell * 16 }}>

          {/* Card 1 - Button (columns 6-9, rows 1-4) - 3x3 cells */}
          <ComponentCard
            name="Button"
            category="Inputs"
            style={{
              left: cell * 5,
              top: cell * 0,
              width: cell * 4,
              height: cell * 3,
            }}
          >
            <div className="space-y-2.5">
              <button className="w-full px-4 py-2 bg-white text-[#1a1a1a] text-sm rounded-lg font-medium">
                Primary Button
              </button>
              <button className="w-full px-4 py-2 bg-transparent border border-white/20 text-white text-sm rounded-lg">
                Secondary
              </button>
              <button className="w-full px-4 py-2 text-white/60 text-sm">
                Ghost Button
              </button>
            </div>
          </ComponentCard>

          {/* Card 2 - Card (columns 1-3, rows 4-6) - 3x2 cells */}
          <ComponentCard
            name="Card"
            category="Layout"
            style={{
              left: cell * 0.5,
              top: cell * 4,
              width: cell * 3,
              height: cell * 2.5,
            }}
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-white text-sm font-medium">Card Title</div>
              <div className="text-white/50 text-xs mt-1">Supporting text for this card.</div>
              <button className="mt-3 text-[#e85a2a] text-xs">Learn more →</button>
            </div>
          </ComponentCard>

          {/* Card 3 - Toast (columns 9-12, rows 3-6) - 3x3 cells */}
          <ComponentCard
            name="Toast"
            category="Feedback"
            style={{
              left: cell * 9,
              top: cell * 3,
              width: cell * 3.5,
              height: cell * 2.5,
            }}
          >
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-white text-sm">Saved successfully</div>
                <div className="text-white/40 text-xs">Changes have been saved.</div>
              </div>
            </div>
          </ComponentCard>

          {/* Card 4 - Switch (columns 4-6, rows 7-9) - 2x2 cells */}
          <ComponentCard
            name="Switch"
            category="Inputs"
            style={{
              left: cell * 4,
              top: cell * 7,
              width: cell * 2.5,
              height: cell * 2.5,
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Notifications</span>
                <div className="w-10 h-5 bg-[#e85a2a] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">Dark mode</span>
                <div className="w-10 h-5 bg-white/20 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* Card 5 - Modal (columns 1-4, rows 8-11) - 4x3 cells */}
          <ComponentCard
            name="Modal"
            category="Overlay"
            style={{
              left: cell * 0.5,
              top: cell * 10,
              width: cell * 4,
              height: cell * 3,
            }}
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="text-white font-medium text-sm">Confirm Action</div>
              <div className="text-white/50 text-xs mt-1">Are you sure? This cannot be undone.</div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-1.5 bg-white/10 text-white text-xs rounded-lg">Cancel</button>
                <button className="flex-1 px-3 py-1.5 bg-white text-[#1a1a1a] text-xs rounded-lg font-medium">Confirm</button>
              </div>
            </div>
          </ComponentCard>

          {/* Card 6 - Tabs (columns 8-12, rows 9-11) - 4x2 cells */}
          <ComponentCard
            name="Tabs"
            category="Navigation"
            style={{
              left: cell * 7.5,
              top: cell * 9,
              width: cell * 4.5,
              height: cell * 2.5,
            }}
          >
            <div>
              <div className="flex border-b border-white/10">
                <button className="px-3 py-1.5 text-white text-xs border-b-2 border-[#e85a2a]">Overview</button>
                <button className="px-3 py-1.5 text-white/40 text-xs">Features</button>
                <button className="px-3 py-1.5 text-white/40 text-xs">API</button>
              </div>
              <div className="pt-3 text-white/60 text-xs">
                Tab content appears here.
              </div>
            </div>
          </ComponentCard>

          {/* Card 7 - Input (columns 5-8, rows 12-15) - 3x3 cells */}
          <ComponentCard
            name="Input"
            category="Inputs"
            style={{
              left: cell * 4.5,
              top: cell * 13,
              width: cell * 4,
              height: cell * 3,
            }}
          >
            <div className="space-y-3">
              <div>
                <label className="text-white/50 text-[10px] uppercase tracking-wider block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none"
                  readOnly
                />
              </div>
              <div>
                <label className="text-white/50 text-[10px] uppercase tracking-wider block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none"
                  readOnly
                />
              </div>
            </div>
          </ComponentCard>

          {/* Card 8 - Progress (columns 10-12, rows 13-15) - 2x2 cells */}
          <ComponentCard
            name="Progress"
            category="Feedback"
            style={{
              left: cell * 9.5,
              top: cell * 13,
              width: cell * 3,
              height: cell * 2.5,
            }}
          >
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] text-white/50 mb-1">
                  <span>Uploading...</span>
                  <span>75%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full">
                  <div className="h-1 bg-[#e85a2a] rounded-full w-3/4" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-white/50 mb-1">
                  <span>Processing</span>
                  <span>40%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full">
                  <div className="h-1 bg-white/40 rounded-full w-2/5" />
                </div>
              </div>
            </div>
          </ComponentCard>

        </section>

        {/* Install Section */}
        <section
          className="relative"
          style={{
            paddingTop: cell * 2,
            paddingBottom: cell * 2,
            marginLeft: cell * 0.5,
          }}
        >
          <div className="flex justify-between items-end max-w-[1200px]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#666] mb-3 font-medium">Install</p>
              <code className="text-[#1a1a1a] font-mono text-lg">
                npm install @hyena-studio/react-native
              </code>
            </div>
            <Link
              href="/docs"
              className="text-[11px] uppercase tracking-[0.2em] text-[#e85a2a] hover:underline font-medium"
            >
              Read the documentation →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="relative border-t border-[#e8e8e8]"
          style={{
            paddingTop: cell * 0.5,
            paddingBottom: cell * 0.5,
            marginLeft: cell * 0.5,
            marginRight: cell * 0.5,
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[#1a1a1a] font-semibold">hyena</span>
            <div className="flex items-center gap-8">
              <Link href="/docs" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors">
                Docs
              </Link>
              <Link href="/docs/components" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors">
                Components
              </Link>
              <a
                href="https://github.com/ruidssimoes-rdss/hyena"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                GitHub
              </a>
              <span className="text-sm text-[#999]">
                Built by{' '}
                <a
                  href="https://github.com/ruidssimoes-rdss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e85a2a] hover:underline"
                >
                  Rui Simões
                </a>
              </span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
