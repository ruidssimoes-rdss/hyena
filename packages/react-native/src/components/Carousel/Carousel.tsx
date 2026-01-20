import React, { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  PanResponder,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import { CarouselContext, CarouselProps } from './CarouselContext';
import { CarouselContent } from './CarouselContent';
import { CarouselPrevious, CarouselNext } from './CarouselNavigation';
import { CarouselDots } from './CarouselDots';

/**
 * Carousel - Horizontal scrolling carousel with navigation and indicators.
 *
 * Supports autoplay, looping, dot indicators, navigation arrows, and touch/swipe gestures.
 * Uses compound components pattern for flexible composition.
 *
 * @example
 * ```tsx
 * <Carousel autoplay loop>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 *   <CarouselDots />
 * </Carousel>
 * ```
 */
export function Carousel({
  autoplay = false,
  interval = 5000,
  loop = false,
  showDots = true,
  showArrows = true,
  children,
  style,
  onSlideChange,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPanningRef = useRef(false);

  // Count slides from CarouselContent children
  const totalSlides = countSlides(children);

  const goToSlide = useCallback(
    (index: number, announce = true) => {
      let targetIndex = index;

      if (loop) {
        if (index < 0) targetIndex = totalSlides - 1;
        else if (index >= totalSlides) targetIndex = 0;
      } else {
        targetIndex = Math.max(0, Math.min(index, totalSlides - 1));
      }

      setCurrentIndex(targetIndex);
      onSlideChange?.(targetIndex);

      scrollViewRef.current?.scrollTo({
        x: targetIndex * containerWidth,
        animated: true,
      });

      // Announce slide change for screen readers
      if (announce && Platform.OS !== 'web') {
        AccessibilityInfo.announceForAccessibility(
          `Slide ${targetIndex + 1} of ${totalSlides}`
        );
      }
    },
    [totalSlides, loop, containerWidth, onSlideChange]
  );

  const goToPrevious = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);
  const goToNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);

  // Reset autoplay timer when slide changes
  const resetAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    if (autoplay && totalSlides > 1) {
      autoplayTimerRef.current = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, interval);
    }
  }, [autoplay, interval, currentIndex, totalSlides, goToSlide]);

  // Autoplay effect
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [resetAutoplay]);

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Respond to horizontal swipes > 10px
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < Math.abs(gestureState.dx);
      },
      onPanResponderGrant: () => {
        isPanningRef.current = true;
        // Pause autoplay during pan
        if (autoplayTimerRef.current) {
          clearInterval(autoplayTimerRef.current);
          autoplayTimerRef.current = null;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        isPanningRef.current = false;
        const swipeThreshold = 50;
        const velocityThreshold = 0.3;

        if (gestureState.dx > swipeThreshold || gestureState.vx > velocityThreshold) {
          // Swipe right - go to previous
          goToPrevious();
        } else if (gestureState.dx < -swipeThreshold || gestureState.vx < -velocityThreshold) {
          // Swipe left - go to next
          goToNext();
        }

        // Resume autoplay
        resetAutoplay();
      },
      onPanResponderTerminate: () => {
        isPanningRef.current = false;
        resetAutoplay();
      },
    })
  ).current;

  const handleLayout = useCallback((event: any) => {
    const width = event.nativeEvent.layout.width;
    if (width > 0) setContainerWidth(width);
  }, []);

  // Keyboard navigation for web
  const handleKeyDown = useCallback(
    (e: any) => {
      if (Platform.OS !== 'web') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    },
    [goToPrevious, goToNext, goToSlide, totalSlides]
  );

  // Handle accessibility actions
  const handleAccessibilityAction = useCallback(
    (event: any) => {
      const actionName = event.nativeEvent.actionName;
      if (actionName === 'increment') {
        goToNext();
      } else if (actionName === 'decrement') {
        goToPrevious();
      }
    },
    [goToNext, goToPrevious]
  );

  const contextValue = {
    currentIndex,
    totalSlides,
    goToSlide,
    goToPrevious,
    goToNext,
    scrollViewRef,
    itemWidth: containerWidth,
    loop,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <View
        style={[styles.carousel, style]}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
        // Accessibility props
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={`Carousel, slide ${currentIndex + 1} of ${totalSlides}`}
        accessibilityHint="Swipe left or right to navigate slides"
        accessibilityActions={[
          { name: 'increment', label: 'Next slide' },
          { name: 'decrement', label: 'Previous slide' },
        ]}
        onAccessibilityAction={handleAccessibilityAction}
        // @ts-ignore - Web-only props
        onKeyDown={Platform.OS === 'web' ? handleKeyDown : undefined}
        tabIndex={Platform.OS === 'web' ? 0 : undefined}
      >
        {renderChildren(children, showDots)}
        {showArrows && !hasChild(children, CarouselPrevious) && <CarouselPrevious />}
        {showArrows && !hasChild(children, CarouselNext) && <CarouselNext />}
        {showDots && !hasChild(children, CarouselDots) && <CarouselDots />}
      </View>
    </CarouselContext.Provider>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function countSlides(children: ReactNode): number {
  let count = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === CarouselContent) {
      count = React.Children.count(child.props.children);
    }
  });
  return count;
}

function hasChild(children: ReactNode, type: any): boolean {
  let found = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === type) found = true;
  });
  return found;
}

function renderChildren(children: ReactNode, showDots: boolean): ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === CarouselDots) return showDots ? child : null;
    return child;
  });
}

const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
    overflow: 'hidden',
  },
});
