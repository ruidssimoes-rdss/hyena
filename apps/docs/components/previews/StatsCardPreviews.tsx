'use client';

/**
 * StatsCard Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function TrendIndicator({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const isPositive = value >= 0;
  return (
    <div className="flex items-center gap-1">
      <svg
        className={`w-3 h-3 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {isPositive ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        )}
      </svg>
      <span className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
        {Math.abs(value)}{suffix}
      </span>
    </div>
  );
}

function StatsCard({
  title,
  value,
  trend,
  description,
  icon,
}: {
  title: string;
  value: string | number;
  trend?: number;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-[var(--component-bg)] border border-[var(--component-border)] rounded-xl">
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-[var(--component-bg-elevated)] flex items-center justify-center mb-3">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-[var(--component-text-muted)]">{title}</p>
      <p className="text-2xl font-bold text-[var(--component-text)] mt-1">{value}</p>
      {(trend !== undefined || description) && (
        <div className="mt-2 flex items-center gap-2">
          {trend !== undefined && <TrendIndicator value={trend} />}
          {description && (
            <span className="text-xs text-[var(--component-text-muted)]">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

export function StatsCardBasicPreview() {
  return (
    <div className="w-64">
      <StatsCard
        title="Total Revenue"
        value="$45,231"
      />
    </div>
  );
}

export function StatsCardWithTrendPositivePreview() {
  return (
    <div className="w-64">
      <StatsCard
        title="Total Revenue"
        value="$45,231"
        trend={12.5}
        description="vs last month"
      />
    </div>
  );
}

export function StatsCardWithTrendNegativePreview() {
  return (
    <div className="w-64">
      <StatsCard
        title="Bounce Rate"
        value="42.3%"
        trend={-8.2}
        description="vs last week"
      />
    </div>
  );
}

export function StatsCardWithIconPreview() {
  return (
    <div className="w-64">
      <StatsCard
        title="Active Users"
        value="2,847"
        trend={18.2}
        icon={
          <svg className="w-5 h-5 text-[var(--track-fill)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
      />
    </div>
  );
}

export function StatsCardWithDescriptionPreview() {
  return (
    <div className="w-64">
      <StatsCard
        title="Conversion Rate"
        value="3.24%"
        description="From 2.1% last quarter"
      />
    </div>
  );
}

export function StatsCardGridPreview() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
      <StatsCard
        title="Revenue"
        value="$45,231"
        trend={12.5}
        icon={
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <StatsCard
        title="Users"
        value="2,847"
        trend={8.1}
        icon={
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
      />
      <StatsCard
        title="Orders"
        value="1,234"
        trend={-2.4}
        icon={
          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        }
      />
      <StatsCard
        title="Conversion"
        value="3.24%"
        trend={5.7}
        icon={
          <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
    </div>
  );
}
