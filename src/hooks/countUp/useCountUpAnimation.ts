import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface CountUpItem {
  id: number;
  value: number;
}

interface UseCountUpAnimationOptions {
  items: CountUpItem[];
  animationDuration?: number;
  staggerDelay?: number;
  intersectionThreshold?: number;
  easingFunction?: (t: number) => number;
}

interface UseCountUpAnimationReturn {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  animatedValues: { [key: number]: number };
  isVisible: boolean;
  triggerAnimation: () => void;
}

// Default easing function - ease out quart (moved outside component to prevent recreation)
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export const useCountUpAnimation = ({
  items,
  animationDuration = 2000,
  staggerDelay = 200,
  intersectionThreshold = 0.3,
  easingFunction = easeOutQuart,
}: UseCountUpAnimationOptions): UseCountUpAnimationReturn => {
  const [isVisible, setIsVisible] = useState(false);

  // Initialize animated values directly based on items
  const [animatedValues, setAnimatedValues] = useState<{
    [key: number]: number;
  }>(() => {
    const values: { [key: number]: number } = {};
    items.forEach((item) => {
      values[item.id] = 0;
    });
    return values;
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFramesRef = useRef<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoized intersection observer callback - exactly like the working component
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    },
    [isVisible]
  );

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: intersectionThreshold,
    });

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    // Store observer for cleanup
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [handleIntersection, intersectionThreshold]);

  // Re-observe when ref changes (for cases where ref is set after initial render)
  useLayoutEffect(() => {
    const current = sectionRef.current;
    if (current && observerRef.current) {
      observerRef.current.observe(current);
    }
  });

  // Function to manually trigger animation
  const triggerAnimation = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Optimized animation with cleanup - follows the exact pattern from working component
  useEffect(() => {
    if (!isVisible) return;

    // Clear any existing animations
    animationFramesRef.current.forEach(cancelAnimationFrame);
    animationFramesRef.current = [];

    items.forEach((item, index) => {
      const startTime = Date.now() + index * staggerDelay;
      const endValue = item.value;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;

        if (elapsed < 0) {
          const frameId = requestAnimationFrame(animate);
          animationFramesRef.current.push(frameId);
          return;
        }

        const progress = Math.min(elapsed / animationDuration, 1);
        const currentValue = Math.floor(endValue * easingFunction(progress));

        setAnimatedValues((prev) => ({
          ...prev,
          [item.id]: currentValue,
        }));

        if (progress < 1) {
          const frameId = requestAnimationFrame(animate);
          animationFramesRef.current.push(frameId);
        }
      };

      const initialFrameId = requestAnimationFrame(animate);
      animationFramesRef.current.push(initialFrameId);
    });

    // Cleanup function
    return () => {
      animationFramesRef.current.forEach(cancelAnimationFrame);
      animationFramesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]); // Intentionally only depend on isVisible to match working pattern

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animationFramesRef.current.forEach(cancelAnimationFrame);
      animationFramesRef.current = [];
    };
  }, []);

  return {
    sectionRef,
    animatedValues,
    isVisible,
    triggerAnimation,
  };
};
