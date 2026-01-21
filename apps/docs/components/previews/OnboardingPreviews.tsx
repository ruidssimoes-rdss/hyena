'use client';

/**
 * Onboarding Previews for Docs
 *
 * Premium, dark-mode-first onboarding previews inspired by Linear.
 * Features:
 * - Bold typography with intentional hierarchy
 * - Vibrant gradient accents and depth
 * - Smooth animations and micro-interactions
 * - Drag/swipe gesture support
 * - Keyboard navigation (arrow keys)
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ============================================================================
// Design Tokens
// ============================================================================

const theme = {
  // Dark backgrounds with depth
  bg: {
    primary: '#0A0A0B',
    secondary: '#111113',
    elevated: '#18181B',
    card: 'rgba(24, 24, 27, 0.8)',
  },
  // Text colors
  text: {
    primary: '#FAFAFA',
    secondary: '#A1A1AA',
    muted: '#71717A',
  },
  // Accent gradients
  gradients: {
    blue: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    purple: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    green: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
    orange: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    cyan: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
  },
  // Glow effects
  glow: {
    blue: '0 0 60px rgba(59, 130, 246, 0.3)',
    purple: '0 0 60px rgba(139, 92, 246, 0.3)',
    green: '0 0 60px rgba(16, 185, 129, 0.3)',
  },
};

// ============================================================================
// Premium Content - Compelling, not generic
// ============================================================================

const premiumSteps = [
  {
    id: 'welcome',
    headline: 'Your workspace,',
    headlineAccent: 'reimagined.',
    description: 'Everything you need, nothing you don\'t. Build something extraordinary.',
    gradient: theme.gradients.blue,
    glow: theme.glow.blue,
    accentColor: '#3B82F6',
    visualType: 'orbs' as const,
  },
  {
    id: 'speed',
    headline: 'Work at the',
    headlineAccent: 'speed of thought.',
    description: 'Keyboard-first. AI-powered. Zero friction between idea and execution.',
    gradient: theme.gradients.purple,
    glow: theme.glow.purple,
    accentColor: '#8B5CF6',
    visualType: 'waves' as const,
  },
  {
    id: 'ready',
    headline: 'Ready when',
    headlineAccent: 'you are.',
    description: 'Your setup is complete. Let\'s build something great together.',
    gradient: theme.gradients.green,
    glow: theme.glow.green,
    accentColor: '#10B981',
    visualType: 'rings' as const,
  },
];

// ============================================================================
// Hook for swipe/drag gestures and keyboard navigation
// ============================================================================

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

// ============================================================================
// Visual Elements - Premium abstract graphics
// ============================================================================

function OrbsVisual({ color, glow }: { color: string; glow: string }) {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* Main orb */}
      <div
        className="absolute w-32 h-32 rounded-full blur-sm animate-pulse"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}60, ${color}20)`,
          boxShadow: glow,
        }}
      />
      {/* Floating orbs */}
      <div
        className="absolute w-16 h-16 rounded-full blur-sm"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent)`,
          top: '15%',
          right: '20%',
          animation: 'float 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-10 h-10 rounded-full blur-sm"
        style={{
          background: `radial-gradient(circle, ${color}30, transparent)`,
          bottom: '20%',
          left: '25%',
          animation: 'float 5s ease-in-out infinite reverse',
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${color}15 1px, transparent 1px),
            linear-gradient(90deg, ${color}15 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
        }}
      />
    </div>
  );
}

function WavesVisual({ color, glow }: { color: string; glow: string }) {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
      {/* Wave layers */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{
            height: '120px',
            bottom: `${i * 20}px`,
            background: `linear-gradient(180deg, transparent 0%, ${color}${30 - i * 8} 100%)`,
            borderRadius: '50% 50% 0 0',
            transform: `scaleX(${1.2 - i * 0.1})`,
            animation: `wave ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      {/* Glow center */}
      <div
        className="absolute w-24 h-24 rounded-full blur-xl"
        style={{
          background: color,
          opacity: 0.3,
          boxShadow: glow,
        }}
      />
    </div>
  );
}

function RingsVisual({ color, glow }: { color: string; glow: string }) {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* Concentric rings */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            borderColor: `${color}${40 - i * 10}`,
            animation: `pulse-ring ${2 + i * 0.5}s ease-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      {/* Center dot */}
      <div
        className="w-4 h-4 rounded-full"
        style={{
          background: color,
          boxShadow: glow,
        }}
      />
      {/* Checkmark */}
      <svg
        className="absolute w-12 h-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.8 }}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

// ============================================================================
// Premium Dots Indicator
// ============================================================================

function PremiumDots({
  current,
  total,
  variant = 'dots',
  accentColor,
  onDotClick,
}: {
  current: number;
  total: number;
  variant?: 'dots' | 'pills' | 'numbers' | 'line';
  accentColor: string;
  onDotClick?: (index: number) => void;
}) {
  if (variant === 'line') {
    return (
      <div className="flex items-center gap-3 py-4">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            className="relative h-1 flex-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ backgroundColor: `${accentColor}20` }}
            aria-label={`Go to step ${i + 1}`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
              style={{
                width: i < current ? '100%' : i === current ? '100%' : '0%',
                background: i <= current ? accentColor : 'transparent',
                boxShadow: i === current ? `0 0 8px ${accentColor}` : 'none',
              }}
            />
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'numbers') {
    return (
      <div className="flex items-center justify-center gap-3 py-4">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === current;
          const isPast = i < current;
          return (
            <button
              key={i}
              onClick={() => onDotClick?.(i)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              style={{
                background: isActive ? accentColor : isPast ? `${accentColor}30` : 'transparent',
                border: `2px solid ${isActive || isPast ? accentColor : `${accentColor}40`}`,
                color: isActive ? '#fff' : isPast ? accentColor : theme.text.muted,
                boxShadow: isActive ? `0 0 20px ${accentColor}50` : 'none',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
              aria-label={`Go to step ${i + 1}`}
            >
              {isPast ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => onDotClick?.(i)}
              className="h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: isActive ? '32px' : '8px',
                background: isActive ? accentColor : `${accentColor}30`,
                boxShadow: isActive ? `0 0 12px ${accentColor}60` : 'none',
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          );
        })}
      </div>
    );
  }

  // Default dots
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        return (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              background: isActive ? accentColor : `${accentColor}30`,
              boxShadow: isActive ? `0 0 12px ${accentColor}60` : 'none',
              transform: isActive ? 'scale(1.3)' : 'scale(1)',
            }}
            aria-label={`Go to step ${i + 1}`}
          />
        );
      })}
    </div>
  );
}

// ============================================================================
// Progress Bar Variants
// ============================================================================

function PremiumProgressBar({
  current,
  total,
  variant = 'bar',
  accentColor,
}: {
  current: number;
  total: number;
  variant?: 'bar' | 'segmented';
  accentColor: string;
}) {
  const progress = ((current + 1) / total) * 100;

  if (variant === 'segmented') {
    return (
      <div className="flex gap-2 px-6 py-4">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full overflow-hidden transition-all duration-500"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: i <= current ? '100%' : '0%',
                background: accentColor,
                boxShadow: i === current ? `0 0 8px ${accentColor}` : 'none',
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            background: accentColor,
            boxShadow: `0 0 12px ${accentColor}60`,
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Arrow Icons
// ============================================================================

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

// ============================================================================
// CSS Keyframes (injected via style tag)
// ============================================================================

const keyframesCSS = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes wave {
    0%, 100% { transform: scaleX(1) translateY(0); }
    50% { transform: scaleX(1.05) translateY(-5px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.3); opacity: 0; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// ============================================================================
// Main Preview Component - Premium Dark Theme
// ============================================================================

function PremiumOnboardingPreview({
  indicatorVariant = 'dots',
  showProgress = false,
  progressVariant = 'bar',
}: {
  indicatorVariant?: 'dots' | 'pills' | 'numbers' | 'line';
  showProgress?: boolean;
  progressVariant?: 'bar' | 'segmented';
}) {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentStep = premiumSteps[step];

  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    premiumSteps.length,
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
    if (step < premiumSteps.length - 1) {
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

  const handleSkip = () => {
    setStep(premiumSteps.length - 1);
    setAnimationKey((k) => k + 1);
  };

  const handleDotClick = (i: number) => {
    setStep(i);
    setAnimationKey((k) => k + 1);
  };

  // Render visual based on step
  const renderVisual = () => {
    const props = { color: currentStep.accentColor, glow: currentStep.glow };
    switch (currentStep.visualType) {
      case 'waves':
        return <WavesVisual {...props} />;
      case 'rings':
        return <RingsVisual {...props} />;
      default:
        return <OrbsVisual {...props} />;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />
      <div
        ref={containerRef}
        className="flex flex-col rounded-2xl overflow-hidden select-none"
        style={{
          height: 520,
          background: theme.bg.primary,
          border: `1px solid ${theme.bg.elevated}`,
        }}
        tabIndex={0}
        {...handlers}
      >
        {/* Progress bar at top (if enabled) */}
        {showProgress && (
          <PremiumProgressBar
            current={step}
            total={premiumSteps.length}
            variant={progressVariant}
            accentColor={currentStep.accentColor}
          />
        )}

        {/* Main content area */}
        <div
          className="flex-1 flex flex-col items-center justify-center px-8 relative overflow-hidden"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Background gradient glow */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${currentStep.accentColor}15 0%, transparent 60%)`,
            }}
          />

          {/* Content with drag offset */}
          <div
            className="relative z-10 flex flex-col items-center w-full max-w-sm"
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            {/* Visual element */}
            <div
              key={`visual-${animationKey}`}
              className="animate-in fade-in zoom-in-95 duration-700"
              style={{ animationFillMode: 'both' }}
            >
              {renderVisual()}
            </div>

            {/* Typography */}
            <div className="text-center mt-4">
              <h2
                key={`headline-${animationKey}`}
                className="text-3xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{
                  color: theme.text.primary,
                  animationDelay: '150ms',
                  animationFillMode: 'both',
                }}
              >
                {currentStep.headline}
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: currentStep.gradient }}
                >
                  {currentStep.headlineAccent}
                </span>
              </h2>
              <p
                key={`desc-${animationKey}`}
                className="mt-4 text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500"
                style={{
                  color: theme.text.secondary,
                  animationDelay: '300ms',
                  animationFillMode: 'both',
                  maxWidth: '280px',
                }}
              >
                {currentStep.description}
              </p>
            </div>
          </div>
        </div>

        {/* Indicator */}
        {!showProgress && (
          <div className="px-6">
            <PremiumDots
              current={step}
              total={premiumSteps.length}
              variant={indicatorVariant}
              accentColor={currentStep.accentColor}
              onDotClick={handleDotClick}
            />
          </div>
        )}

        {/* Actions */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderTop: `1px solid ${theme.bg.elevated}` }}
        >
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/5"
              style={{ color: theme.text.secondary }}
            >
              <ArrowLeftIcon size={14} />
              Back
            </button>
          ) : step < premiumSteps.length - 1 ? (
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/5"
              style={{ color: theme.text.muted }}
            >
              Skip
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: currentStep.gradient,
              color: '#fff',
              boxShadow: `0 4px 20px ${currentStep.accentColor}40`,
            }}
          >
            {step === premiumSteps.length - 1 ? 'Get Started' : 'Continue'}
            {step < premiumSteps.length - 1 && <ArrowRightIcon size={14} />}
          </button>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Exported Preview Components
// ============================================================================

export function OnboardingBasicPreview() {
  return <PremiumOnboardingPreview indicatorVariant="dots" />;
}

export function OnboardingPillsPreview() {
  return <PremiumOnboardingPreview indicatorVariant="pills" />;
}

export function OnboardingProgressPreview() {
  return <PremiumOnboardingPreview showProgress progressVariant="bar" />;
}

export function OnboardingSegmentedPreview() {
  return <PremiumOnboardingPreview showProgress progressVariant="segmented" />;
}

export function OnboardingNumbersPreview() {
  return <PremiumOnboardingPreview indicatorVariant="numbers" />;
}

export function OnboardingMinimalPreview() {
  return <PremiumOnboardingPreview indicatorVariant="line" />;
}

export function OnboardingAllIndicatorsPreview() {
  const [dotsStep, setDotsStep] = useState(0);
  const [pillsStep, setPillsStep] = useState(1);
  const [numbersStep, setNumbersStep] = useState(2);
  const [lineStep, setLineStep] = useState(1);

  const accentColor = '#3B82F6';

  return (
    <div
      className="flex flex-col gap-6 p-6 rounded-2xl"
      style={{ background: theme.bg.primary, border: `1px solid ${theme.bg.elevated}` }}
    >
      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Dots (default)
        </p>
        <div className="rounded-xl p-4" style={{ background: theme.bg.secondary }}>
          <PremiumDots current={dotsStep} total={4} variant="dots" accentColor={accentColor} onDotClick={setDotsStep} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Pills
        </p>
        <div className="rounded-xl p-4" style={{ background: theme.bg.secondary }}>
          <PremiumDots current={pillsStep} total={4} variant="pills" accentColor={accentColor} onDotClick={setPillsStep} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Numbers
        </p>
        <div className="rounded-xl p-4" style={{ background: theme.bg.secondary }}>
          <PremiumDots current={numbersStep} total={4} variant="numbers" accentColor={accentColor} onDotClick={setNumbersStep} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Line Progress
        </p>
        <div className="rounded-xl p-4" style={{ background: theme.bg.secondary }}>
          <PremiumDots current={lineStep} total={4} variant="line" accentColor={accentColor} onDotClick={setLineStep} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Progress Bar
        </p>
        <div className="rounded-xl" style={{ background: theme.bg.secondary }}>
          <PremiumProgressBar current={1} total={4} variant="bar" accentColor={accentColor} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Segmented Progress
        </p>
        <div className="rounded-xl" style={{ background: theme.bg.secondary }}>
          <PremiumProgressBar current={2} total={4} variant="segmented" accentColor={accentColor} />
        </div>
      </div>
    </div>
  );
}
