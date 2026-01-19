'use client';

/**
 * BentoGrid Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function BentoItem({
  colSpan = 1,
  rowSpan = 1,
  children,
  className = '',
}: {
  colSpan?: number;
  rowSpan?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-4 bg-[var(--component-bg)] border border-[var(--component-border)] rounded-xl overflow-hidden ${className}`}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  );
}

export function BentoGridBasicPreview() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">1</div>
      </BentoItem>
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">2</div>
      </BentoItem>
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">3</div>
      </BentoItem>
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">4</div>
      </BentoItem>
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">5</div>
      </BentoItem>
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">6</div>
      </BentoItem>
    </div>
  );
}

export function BentoGridSpanningPreview() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
      <BentoItem colSpan={2} rowSpan={2}>
        <div className="h-full min-h-[160px] flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-lg bg-[var(--track-fill)]/10 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-[var(--track-fill)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[var(--component-text)]">Featured</h3>
          <p className="text-sm text-[var(--component-text-muted)] mt-1">Main highlight area</p>
        </div>
      </BentoItem>
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">Item 1</div>
      </BentoItem>
      <BentoItem>
        <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">Item 2</div>
      </BentoItem>
      <BentoItem colSpan={3}>
        <div className="h-16 flex items-center justify-center text-sm text-[var(--component-text-muted)]">Full Width</div>
      </BentoItem>
    </div>
  );
}

export function BentoGridResponsivePreview() {
  return (
    <div className="w-full max-w-xl">
      <p className="text-xs text-[var(--component-text-muted)] mb-4">Resize your browser to see responsive behavior</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <BentoItem key={i}>
            <div className="h-20 flex items-center justify-center text-sm text-[var(--component-text-muted)]">{i}</div>
          </BentoItem>
        ))}
      </div>
    </div>
  );
}

export function BentoGridDashboardPreview() {
  return (
    <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
      {/* Stats row */}
      <BentoItem>
        <p className="text-xs text-[var(--component-text-muted)]">Revenue</p>
        <p className="text-xl font-bold text-[var(--component-text)]">$12.5k</p>
        <p className="text-xs text-emerald-500 mt-1">+12%</p>
      </BentoItem>
      <BentoItem>
        <p className="text-xs text-[var(--component-text-muted)]">Users</p>
        <p className="text-xl font-bold text-[var(--component-text)]">1,234</p>
        <p className="text-xs text-emerald-500 mt-1">+5%</p>
      </BentoItem>
      <BentoItem>
        <p className="text-xs text-[var(--component-text-muted)]">Orders</p>
        <p className="text-xl font-bold text-[var(--component-text)]">456</p>
        <p className="text-xs text-red-500 mt-1">-2%</p>
      </BentoItem>
      <BentoItem>
        <p className="text-xs text-[var(--component-text-muted)]">Growth</p>
        <p className="text-xl font-bold text-[var(--component-text)]">8.2%</p>
        <p className="text-xs text-emerald-500 mt-1">+1.2%</p>
      </BentoItem>

      {/* Chart area */}
      <BentoItem colSpan={2} rowSpan={2}>
        <p className="text-sm font-medium text-[var(--component-text)] mb-4">Analytics</p>
        <div className="flex items-end gap-2 h-24">
          {[40, 60, 30, 80, 50, 70, 45].map((h, i) => (
            <div key={i} className="flex-1 bg-[var(--track-fill)]/20 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
      </BentoItem>

      {/* Activity */}
      <BentoItem colSpan={2} rowSpan={2}>
        <p className="text-sm font-medium text-[var(--component-text)] mb-3">Recent Activity</p>
        <div className="space-y-2">
          {['New user signup', 'Order #1234', 'Payment received'].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-[var(--track-fill)]" />
              <span className="text-[var(--component-text-muted)]">{item}</span>
            </div>
          ))}
        </div>
      </BentoItem>
    </div>
  );
}

export function BentoGridMarketingPreview() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
      <BentoItem colSpan={2}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--component-text)]">Ship faster</h3>
            <p className="text-sm text-[var(--component-text-muted)]">Build and deploy in minutes</p>
          </div>
        </div>
      </BentoItem>
      <BentoItem rowSpan={2}>
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-bold text-[var(--component-text)]">99.9%</div>
          <p className="text-sm text-[var(--component-text-muted)] mt-1">Uptime SLA</p>
        </div>
      </BentoItem>
      <BentoItem>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--component-text)]">Secure</p>
            <p className="text-xs text-[var(--component-text-muted)]">SOC 2 compliant</p>
          </div>
        </div>
      </BentoItem>
      <BentoItem>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--component-text)]">Fast</p>
            <p className="text-xs text-[var(--component-text-muted)]">Edge network</p>
          </div>
        </div>
      </BentoItem>
    </div>
  );
}
