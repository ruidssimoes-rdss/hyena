'use client';

/**
 * Onboarding Previews for Docs
 *
 * Premium, fully interactive onboarding previews with:
 * - Smooth CSS animations and transitions
 * - Drag/swipe gesture support
 * - Keyboard navigation (arrow keys)
 * - Polished visuals with gradients and icons
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// Base styles
const containerStyles = 'flex flex-col bg-[var(--color-bg-base)] rounded-xl overflow-hidden border border-[var(--color-border-default)] select-none';
const stepContainerStyles = 'flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden';
const titleStyles = 'text-2xl font-bold text-[var(--color-text-primary)] text-center mb-2';
const descriptionStyles = 'text-base text-[var(--color-text-secondary)] text-center max-w-xs';
const actionsStyles = 'flex flex-row items-center justify-between p-4 border-t border-[var(--color-border-default)]';

// Icon props type
interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Sparkles icon for premium feel
function SparklesIcon({ size = 48, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

// Icon components
function LayersIcon({ size = 48, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function CheckSquareIcon({ size = 48, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function RocketIcon({ size = 48, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

// Hook for swipe/drag gestures and keyboard navigation
function useSwipeNavigation(
  totalSteps: number,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const goToNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps, setStep]);

  const goToPrevious = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, [setStep]);

  // Keyboard navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Mouse/touch drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    dragStartX.current = clientX;
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (dragStartX.current === null) return;
    const diff = clientX - dragStartX.current;
    // Apply resistance at edges
    const resistance = (step === 0 && diff > 0) || (step === totalSteps - 1 && diff < 0) ? 0.3 : 1;
    setDragOffset(diff * resistance);
  }, [step, totalSteps]);

  const handleDragEnd = useCallback(() => {
    if (dragStartX.current === null) return;

    const threshold = 50;
    if (dragOffset > threshold && step > 0) {
      goToPrevious();
    } else if (dragOffset < -threshold && step < totalSteps - 1) {
      goToNext();
    }

    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }, [dragOffset, step, totalSteps, goToNext, goToPrevious]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) handleDragEnd();
  }, [isDragging, handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  return {
    containerRef,
    dragOffset,
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}

// Steps data with premium gradients
const steps = [
  {
    icon: SparklesIcon,
    title: 'Welcome to AppName',
    description: 'Discover a better way to manage your tasks and boost your productivity.',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.1) 100%)',
    iconBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
  },
  {
    icon: CheckSquareIcon,
    title: 'Powerful Features',
    description: 'Everything you need to stay organized and achieve your goals.',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(134, 239, 172, 0.1) 100%)',
    iconBg: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)',
  },
  {
    icon: RocketIcon,
    title: 'Ready to Start?',
    description: "Let's get you set up in seconds. Your productivity journey begins now.",
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(216, 180, 254, 0.1) 100%)',
    iconBg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 100%)',
  },
];

// Dots component with smooth animations
function Dots({
  current,
  total,
  variant = 'dots',
  onDotClick,
}: {
  current: number;
  total: number;
  variant?: 'dots' | 'pills' | 'numbers';
  onDotClick?: (index: number) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-2 py-4">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;

        if (variant === 'numbers') {
          return (
            <button
              key={i}
              onClick={() => onDotClick?.(i)}
              className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                transition-all duration-300 ease-out cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)] focus:ring-offset-2
                ${isActive
                  ? 'bg-[var(--color-accent-blue)] text-white scale-110 shadow-md'
                  : 'bg-transparent border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-text-primary)]'
                }
              `}
              aria-label={`Go to step ${i + 1}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {i + 1}
            </button>
          );
        }

        if (variant === 'pills') {
          return (
            <button
              key={i}
              onClick={() => onDotClick?.(i)}
              className={`
                h-2 rounded-full transition-all duration-300 ease-out cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)] focus:ring-offset-2
                ${isActive
                  ? 'w-7 bg-[var(--color-accent-blue)] shadow-sm'
                  : 'w-2 bg-[var(--color-border-default)] opacity-60 hover:opacity-100'
                }
              `}
              aria-label={`Go to step ${i + 1}`}
              aria-current={isActive ? 'step' : undefined}
            />
          );
        }

        return (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-blue)] focus:ring-offset-2
              ${isActive
                ? 'bg-[var(--color-accent-blue)] scale-125 shadow-sm'
                : 'bg-[var(--color-border-default)] opacity-50 hover:opacity-100 hover:scale-110'
              }
            `}
            aria-label={`Go to step ${i + 1}`}
            aria-current={isActive ? 'step' : undefined}
          />
        );
      })}
    </div>
  );
}

// Progress bar component with smooth animations
function ProgressBar({ current, total, variant = 'bar' }: { current: number; total: number; variant?: 'bar' | 'segmented' }) {
  const progress = ((current + 1) / total) * 100;

  if (variant === 'segmented') {
    return (
      <div className="flex flex-row gap-1.5 px-4 py-4">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`
              flex-1 h-1.5 rounded-full transition-all duration-500 ease-out
              ${i <= current
                ? 'bg-[var(--color-accent-blue)] shadow-sm'
                : 'bg-[var(--color-border-default)]'
              }
            `}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="h-1 rounded-full bg-[var(--color-border-default)] overflow-hidden">
        <div
          className="h-full bg-[var(--color-accent-blue)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Animated step content wrapper
function AnimatedStepContent({
  step,
  currentStep,
  totalSteps,
  dragOffset,
  isDragging,
  children,
}: {
  step: typeof steps[number];
  currentStep: number;
  totalSteps: number;
  dragOffset: number;
  isDragging: boolean;
  children: React.ReactNode;
}) {
  // Calculate animation offset
  const offset = dragOffset;
  const transitionStyle = isDragging ? 'none' : 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)';

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        transform: `translateX(${offset}px)`,
        transition: transitionStyle,
      }}
    >
      {children}
    </div>
  );
}

// Premium icon wrapper with gradient background
function IconWrapper({
  step,
  isAnimating,
}: {
  step: typeof steps[number];
  isAnimating: boolean;
}) {
  const Icon = step.icon;

  return (
    <div
      className={`
        w-28 h-28 rounded-full flex items-center justify-center mb-6
        transition-all duration-500 ease-out
        ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}
      style={{
        background: step.iconBg,
        boxShadow: `0 8px 32px ${step.color}20`,
      }}
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${step.color}30, transparent 60%)`,
        }}
      >
        <Icon size={48} style={{ stroke: step.color }} />
      </div>
    </div>
  );
}

// === Preview Components ===

export function OnboardingBasicPreview() {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentStep = steps[step];
  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    steps.length,
    step,
    (newStep) => {
      if (typeof newStep === 'function') {
        setStep((s) => {
          const next = newStep(s);
          if (next !== s) setAnimationKey((k) => k + 1);
          return next;
        });
      } else {
        if (newStep !== step) setAnimationKey((k) => k + 1);
        setStep(newStep);
      }
    }
  );

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleSkip = () => {
    setStep(steps.length - 1);
    setAnimationKey((k) => k + 1);
  };

  return (
    <div
      ref={containerRef}
      className={containerStyles}
      style={{ height: 420 }}
      tabIndex={0}
      {...handlers}
    >
      <div className={stepContainerStyles} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <AnimatedStepContent
          step={currentStep}
          currentStep={step}
          totalSteps={steps.length}
          dragOffset={dragOffset}
          isDragging={isDragging}
        >
          <IconWrapper step={currentStep} isAnimating key={`icon-${animationKey}`} />
          <h2
            key={`title-${animationKey}`}
            className={`${titleStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            {currentStep.title}
          </h2>
          <p
            key={`desc-${animationKey}`}
            className={`${descriptionStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            {currentStep.description}
          </p>
        </AnimatedStepContent>
      </div>

      <Dots current={step} total={steps.length} onDotClick={(i) => { setStep(i); setAnimationKey((k) => k + 1); }} />

      <div className={actionsStyles}>
        {step < steps.length - 1 ? (
          <button
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors px-2 py-1"
            onClick={handleSkip}
          >
            Skip
          </button>
        ) : (
          <div />
        )}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingPillsPreview() {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentStep = steps[step];
  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    steps.length,
    step,
    (newStep) => {
      if (typeof newStep === 'function') {
        setStep((s) => {
          const next = newStep(s);
          if (next !== s) setAnimationKey((k) => k + 1);
          return next;
        });
      } else {
        if (newStep !== step) setAnimationKey((k) => k + 1);
        setStep(newStep);
      }
    }
  );

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleSkip = () => {
    setStep(steps.length - 1);
    setAnimationKey((k) => k + 1);
  };

  return (
    <div
      ref={containerRef}
      className={containerStyles}
      style={{ height: 420 }}
      tabIndex={0}
      {...handlers}
    >
      <div className={stepContainerStyles} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <AnimatedStepContent
          step={currentStep}
          currentStep={step}
          totalSteps={steps.length}
          dragOffset={dragOffset}
          isDragging={isDragging}
        >
          <IconWrapper step={currentStep} isAnimating key={`icon-${animationKey}`} />
          <h2
            key={`title-${animationKey}`}
            className={`${titleStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            {currentStep.title}
          </h2>
          <p
            key={`desc-${animationKey}`}
            className={`${descriptionStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            {currentStep.description}
          </p>
        </AnimatedStepContent>
      </div>

      <Dots current={step} total={steps.length} variant="pills" onDotClick={(i) => { setStep(i); setAnimationKey((k) => k + 1); }} />

      <div className={actionsStyles}>
        {step < steps.length - 1 ? (
          <button
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors px-2 py-1"
            onClick={handleSkip}
          >
            Skip
          </button>
        ) : (
          <div />
        )}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Continue'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingProgressPreview() {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentStep = steps[step];
  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    steps.length,
    step,
    (newStep) => {
      if (typeof newStep === 'function') {
        setStep((s) => {
          const next = newStep(s);
          if (next !== s) setAnimationKey((k) => k + 1);
          return next;
        });
      } else {
        if (newStep !== step) setAnimationKey((k) => k + 1);
        setStep(newStep);
      }
    }
  );

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnimationKey((k) => k + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerStyles}
      style={{ height: 420 }}
      tabIndex={0}
      {...handlers}
    >
      <ProgressBar current={step} total={steps.length} />

      <div className={stepContainerStyles} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <AnimatedStepContent
          step={currentStep}
          currentStep={step}
          totalSteps={steps.length}
          dragOffset={dragOffset}
          isDragging={isDragging}
        >
          <IconWrapper step={currentStep} isAnimating key={`icon-${animationKey}`} />
          <h2
            key={`title-${animationKey}`}
            className={`${titleStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            {currentStep.title}
          </h2>
          <p
            key={`desc-${animationKey}`}
            className={`${descriptionStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            {currentStep.description}
          </p>
        </AnimatedStepContent>
      </div>

      <div className={actionsStyles}>
        {step > 0 ? (
          <button
            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-2 py-1"
            onClick={handleBack}
          >
            <ArrowLeftIcon size={14} />
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingSegmentedPreview() {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentStep = steps[step];
  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    steps.length,
    step,
    (newStep) => {
      if (typeof newStep === 'function') {
        setStep((s) => {
          const next = newStep(s);
          if (next !== s) setAnimationKey((k) => k + 1);
          return next;
        });
      } else {
        if (newStep !== step) setAnimationKey((k) => k + 1);
        setStep(newStep);
      }
    }
  );

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnimationKey((k) => k + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerStyles}
      style={{ height: 420 }}
      tabIndex={0}
      {...handlers}
    >
      <ProgressBar current={step} total={steps.length} variant="segmented" />

      <div className={stepContainerStyles} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <AnimatedStepContent
          step={currentStep}
          currentStep={step}
          totalSteps={steps.length}
          dragOffset={dragOffset}
          isDragging={isDragging}
        >
          <IconWrapper step={currentStep} isAnimating key={`icon-${animationKey}`} />
          <h2
            key={`title-${animationKey}`}
            className={`${titleStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            {currentStep.title}
          </h2>
          <p
            key={`desc-${animationKey}`}
            className={`${descriptionStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            {currentStep.description}
          </p>
        </AnimatedStepContent>
      </div>

      <div className={actionsStyles}>
        {step > 0 ? (
          <button
            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-2 py-1"
            onClick={handleBack}
          >
            <ArrowLeftIcon size={14} />
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? 'Finish Setup' : 'Continue'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingNumbersPreview() {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentStep = steps[step];
  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    steps.length,
    step,
    (newStep) => {
      if (typeof newStep === 'function') {
        setStep((s) => {
          const next = newStep(s);
          if (next !== s) setAnimationKey((k) => k + 1);
          return next;
        });
      } else {
        if (newStep !== step) setAnimationKey((k) => k + 1);
        setStep(newStep);
      }
    }
  );

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnimationKey((k) => k + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerStyles}
      style={{ height: 420 }}
      tabIndex={0}
      {...handlers}
    >
      <div className={stepContainerStyles} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <AnimatedStepContent
          step={currentStep}
          currentStep={step}
          totalSteps={steps.length}
          dragOffset={dragOffset}
          isDragging={isDragging}
        >
          <IconWrapper step={currentStep} isAnimating key={`icon-${animationKey}`} />
          <h2
            key={`title-${animationKey}`}
            className={`${titleStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '100ms', animationFillMode: 'both' }}
          >
            {currentStep.title}
          </h2>
          <p
            key={`desc-${animationKey}`}
            className={`${descriptionStyles} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}
          >
            {currentStep.description}
          </p>
        </AnimatedStepContent>
      </div>

      <Dots current={step} total={steps.length} variant="numbers" onDotClick={(i) => { setStep(i); setAnimationKey((k) => k + 1); }} />

      <div className={actionsStyles}>
        {step > 0 ? (
          <button
            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-2 py-1"
            onClick={handleBack}
          >
            <ArrowLeftIcon size={14} />
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          onClick={handleNext}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingMinimalPreview() {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const titles = ['Welcome', 'Simple', 'Ready'];
  const descriptions = [
    'A minimalist onboarding experience.',
    'No distractions. Just what you need.',
    "Let's begin your journey.",
  ];
  const colors = ['#3B82F6', '#22c55e', '#a855f7'];

  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    3,
    step,
    (newStep) => {
      if (typeof newStep === 'function') {
        setStep((s) => {
          const next = newStep(s);
          if (next !== s) setAnimationKey((k) => k + 1);
          return next;
        });
      } else {
        if (newStep !== step) setAnimationKey((k) => k + 1);
        setStep(newStep);
      }
    }
  );

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
      setAnimationKey((k) => k + 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerStyles}
      style={{ height: 420 }}
      tabIndex={0}
      {...handlers}
    >
      <div
        className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 opacity-30 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors[step]}20, transparent 70%)`,
          }}
        />
        <div
          className="relative z-10 flex flex-col items-center"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <h2
            key={`title-${animationKey}`}
            className="text-4xl font-bold text-[var(--color-text-primary)] text-center mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationFillMode: 'both' }}
          >
            {titles[step]}
          </h2>
          <p
            key={`desc-${animationKey}`}
            className="text-lg text-[var(--color-text-secondary)] text-center max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: '150ms', animationFillMode: 'both' }}
          >
            {descriptions[step]}
          </p>
        </div>
      </div>

      <Dots current={step} total={3} variant="pills" onDotClick={(i) => { setStep(i); setAnimationKey((k) => k + 1); }} />

      <div className={actionsStyles}>
        <div />
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          onClick={handleNext}
        >
          {step === 2 ? 'Get Started' : 'Next'}
          {step < 2 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingAllIndicatorsPreview() {
  const [dotsStep, setDotsStep] = useState(0);
  const [pillsStep, setPillsStep] = useState(1);
  const [numbersStep, setNumbersStep] = useState(2);
  const [barStep, setBarStep] = useState(2);
  const [segmentedStep, setSegmentedStep] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">Dots (default)</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg p-4 border border-[var(--color-border-default)]">
          <Dots current={dotsStep} total={4} variant="dots" onDotClick={setDotsStep} />
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">Pills</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg p-4 border border-[var(--color-border-default)]">
          <Dots current={pillsStep} total={4} variant="pills" onDotClick={setPillsStep} />
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">Numbers</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg p-4 border border-[var(--color-border-default)]">
          <Dots current={numbersStep} total={4} variant="numbers" onDotClick={setNumbersStep} />
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">Progress Bar</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg border border-[var(--color-border-default)]">
          <ProgressBar current={barStep} total={4} variant="bar" />
          <div className="flex justify-center gap-2 pb-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setBarStep(i)}
                className={`w-6 h-6 text-xs rounded-full transition-all ${
                  i === barStep
                    ? 'bg-[var(--color-accent-blue)] text-white'
                    : 'bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-medium">Segmented Progress</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg border border-[var(--color-border-default)]">
          <ProgressBar current={segmentedStep} total={4} variant="segmented" />
          <div className="flex justify-center gap-2 pb-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setSegmentedStep(i)}
                className={`w-6 h-6 text-xs rounded-full transition-all ${
                  i === segmentedStep
                    ? 'bg-[var(--color-accent-blue)] text-white'
                    : 'bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
