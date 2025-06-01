import { useCallback, useEffect, useRef, useState } from "react";

interface UseMarqueeSliderOptions {
  scrollSpeed?: number;
  pauseOnHover?: boolean;
  autoStart?: boolean;
}

interface UseMarqueeSliderReturn<T> {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  duplicatedItems: T[];
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  reset: () => void;
}

export const useMarqueeSlider = <T>(
  items: T[],
  options: UseMarqueeSliderOptions = {}
): UseMarqueeSliderReturn<T> => {
  const { scrollSpeed = 1, pauseOnHover = true, autoStart = true } = options;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const animationIdRef = useRef<number | null>(null);
  const scrollAmountRef = useRef<number>(0);

  // Duplicate items for seamless marquee scroll
  const duplicatedItems = [...items, ...items];

  // Reset scroll position to beginning
  const reset = useCallback(() => {
    scrollAmountRef.current = 0;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  // Mouse event handlers for pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.scrollWidth / 2; // Half because we duplicated content

    const scroll = () => {
      if (!isPaused) {
        scrollAmountRef.current += scrollSpeed;

        // Reset to beginning when we've scrolled through one full set
        if (scrollAmountRef.current >= containerWidth) {
          scrollAmountRef.current = 0;
        }

        container.scrollLeft = scrollAmountRef.current;

        // Continue animation if not paused
        animationIdRef.current = requestAnimationFrame(scroll);
      } else {
        // Clear animation ID when paused
        animationIdRef.current = null;
      }
    };

    // Start or resume the animation based on pause state
    if (!isPaused && !animationIdRef.current) {
      animationIdRef.current = requestAnimationFrame(scroll);
    } else if (isPaused && animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [isPaused, scrollSpeed]);

  // Separate effect to start animation when container becomes available
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    if (!animationIdRef.current) {
      const containerWidth = container.scrollWidth / 2;

      const scroll = () => {
        if (!isPaused) {
          scrollAmountRef.current += scrollSpeed;

          if (scrollAmountRef.current >= containerWidth) {
            scrollAmountRef.current = 0;
          }

          container.scrollLeft = scrollAmountRef.current;
          animationIdRef.current = requestAnimationFrame(scroll);
        }
      };

      animationIdRef.current = requestAnimationFrame(scroll);
    }
  }); // Run on every render to check if container is available

  return {
    scrollContainerRef,
    isPaused,
    setIsPaused,
    duplicatedItems,
    handleMouseEnter,
    handleMouseLeave,
    reset,
  };
};
