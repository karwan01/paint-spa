import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

// Default easing function - ease out quart
const defaultEasingFunction = (t: number): number => 1 - Math.pow(1 - t, 4);

export const useCountUpAnimation = ({
  items,
  animationDuration = 2000,
  staggerDelay = 200,
  intersectionThreshold = 0.3,
  easingFunction,
}: UseCountUpAnimationOptions): UseCountUpAnimationReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{
    [key: number]: number;
  }>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFramesRef = useRef<number[]>([]);

  // Memoize initial values to prevent recreation
  const initialValues = useMemo(() => {
    const values: { [key: number]: number } = {};
    items.forEach((item) => {
      values[item.id] = 0;
    });
    return values;
  }, [items]);

  // Initialize animated values only once
  useEffect(() => {
    setAnimatedValues(initialValues);
  }, [initialValues]);

  // Memoized intersection observer callback
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    },
    [isVisible]
  );

  // Intersection Observer with memoized callback
  useEffect(() => {
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: intersectionThreshold,
    });

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, intersectionThreshold]);

  // Function to manually trigger animation
  const triggerAnimation = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Animation effect - with proper dependencies to avoid stale closure
  useEffect(() => {
    if (!isVisible) return;

    // Clear any existing animations
    animationFramesRef.current.forEach(cancelAnimationFrame);
    animationFramesRef.current = [];

    const easing = easingFunction || defaultEasingFunction;

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
        const currentValue = Math.floor(endValue * easing(progress));

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
