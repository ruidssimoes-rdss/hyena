'use client';

/**
 * Timeline Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

type TimelineStatus = 'completed' | 'active' | 'pending';

function TimelineDot({ status }: { status: TimelineStatus }) {
  const statusClasses: Record<TimelineStatus, string> = {
    completed: 'bg-emerald-500 border-emerald-500',
    active: 'border-blue-500 bg-transparent',
    pending: 'border-[var(--component-border)] bg-transparent',
  };

  return (
    <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${statusClasses[status]}`}>
      {status === 'completed' && (
        <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      {status === 'active' && (
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      )}
    </div>
  );
}

function TimelineItem({
  title,
  description,
  time,
  status = 'pending',
  isLast = false,
  icon,
}: {
  title: string;
  description?: string;
  time?: string;
  status?: TimelineStatus;
  isLast?: boolean;
  icon?: React.ReactNode;
}) {
  const connectorColor = status === 'completed' ? 'bg-emerald-500' : 'bg-[var(--component-border)]';

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        {icon ? (
          <div className="w-8 h-8 rounded-full bg-[var(--component-bg-elevated)] flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <TimelineDot status={status} />
        )}
        {!isLast && (
          <div className={`w-0.5 flex-1 min-h-[32px] mt-2 ${connectorColor}`} />
        )}
      </div>
      <div className="pb-8 flex-1">
        <h4 className="text-sm font-semibold text-[var(--component-text)]">{title}</h4>
        {description && (
          <p className="text-sm text-[var(--component-text-muted)] mt-0.5">{description}</p>
        )}
        {time && (
          <p className="text-xs text-[var(--component-text-muted)] mt-1">{time}</p>
        )}
      </div>
    </div>
  );
}

export function TimelineBasicPreview() {
  return (
    <div className="w-full max-w-sm">
      <TimelineItem
        title="Order placed"
        description="Your order has been placed successfully."
        status="completed"
      />
      <TimelineItem
        title="Processing"
        description="Your order is being processed."
        status="completed"
      />
      <TimelineItem
        title="Shipped"
        description="Your order has been shipped."
        status="active"
      />
      <TimelineItem
        title="Delivered"
        description="Package will be delivered soon."
        status="pending"
        isLast
      />
    </div>
  );
}

export function TimelineWithIconsPreview() {
  return (
    <div className="w-full max-w-sm">
      <TimelineItem
        title="Account created"
        description="Welcome to the platform!"
        status="completed"
        icon={
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        }
      />
      <TimelineItem
        title="Profile setup"
        description="Complete your profile information."
        status="completed"
        icon={
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />
      <TimelineItem
        title="Verification"
        description="Verify your email address."
        status="active"
        icon={
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />
      <TimelineItem
        title="Get started"
        description="Start using the app."
        status="pending"
        icon={
          <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        isLast
      />
    </div>
  );
}

export function TimelineWithTimestampsPreview() {
  return (
    <div className="w-full max-w-sm">
      <TimelineItem
        title="Project kickoff"
        description="Initial planning and requirements gathering."
        time="Jan 5, 2025 - 10:00 AM"
        status="completed"
      />
      <TimelineItem
        title="Design phase"
        description="UI/UX design and prototyping."
        time="Jan 12, 2025 - 2:30 PM"
        status="completed"
      />
      <TimelineItem
        title="Development"
        description="Frontend and backend implementation."
        time="Jan 20, 2025 - 9:00 AM"
        status="active"
      />
      <TimelineItem
        title="Launch"
        description="Deploy to production."
        time="Feb 1, 2025"
        status="pending"
        isLast
      />
    </div>
  );
}

export function TimelineAlternatingPreview() {
  const items = [
    { title: 'Founded', description: 'Company was founded', time: '2020', status: 'completed' as const },
    { title: 'Series A', description: 'Raised $10M', time: '2021', status: 'completed' as const },
    { title: 'Expansion', description: 'Opened 3 new offices', time: '2023', status: 'completed' as const },
    { title: 'IPO', description: 'Going public', time: '2025', status: 'active' as const },
  ];

  return (
    <div className="w-full max-w-lg">
      {items.map((item, index) => (
        <div key={index} className={`flex items-start gap-4 ${index % 2 === 0 ? '' : 'flex-row-reverse text-right'}`}>
          <div className={`flex-1 pb-8 ${index % 2 === 0 ? 'pr-4' : 'pl-4'}`}>
            <h4 className="text-sm font-semibold text-[var(--component-text)]">{item.title}</h4>
            <p className="text-sm text-[var(--component-text-muted)] mt-0.5">{item.description}</p>
            <p className="text-xs text-[var(--component-text-muted)] mt-1">{item.time}</p>
          </div>
          <div className="flex flex-col items-center">
            <TimelineDot status={item.status} />
            {index < items.length - 1 && (
              <div className={`w-0.5 flex-1 min-h-[32px] mt-2 ${item.status === 'completed' ? 'bg-emerald-500' : 'bg-[var(--component-border)]'}`} />
            )}
          </div>
          <div className="flex-1" />
        </div>
      ))}
    </div>
  );
}

export function TimelineStatusIndicatorsPreview() {
  return (
    <div className="w-full max-w-sm">
      <TimelineItem
        title="Completed task"
        description="This step is done."
        status="completed"
      />
      <TimelineItem
        title="In progress"
        description="Currently working on this."
        status="active"
      />
      <TimelineItem
        title="Pending task"
        description="This step is next."
        status="pending"
        isLast
      />
    </div>
  );
}

export function TimelineActivityFeedPreview() {
  return (
    <div className="w-full max-w-md p-4 bg-[var(--component-bg)] border border-[var(--component-border)] rounded-lg">
      <h3 className="text-sm font-semibold text-[var(--component-text)] mb-4">Activity Feed</h3>
      <TimelineItem
        title="John commented on issue #42"
        time="2 hours ago"
        status="completed"
        icon={
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-medium">
            JD
          </div>
        }
      />
      <TimelineItem
        title="Sarah merged PR #156"
        time="4 hours ago"
        status="completed"
        icon={
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-medium">
            SM
          </div>
        }
      />
      <TimelineItem
        title="Mike opened issue #43"
        time="Yesterday"
        status="completed"
        icon={
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-medium">
            MK
          </div>
        }
        isLast
      />
    </div>
  );
}
