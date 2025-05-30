"use client";

import { STATS } from "@/data/statItems";
import { StatItem } from "@/types/StatTypes";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ANIMATION_DURATION = 2000;
const STAGGER_DELAY = 200;
const INTERSECTION_THRESHOLD = 0.3;

// Easing function moved outside component
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

const CompanyPhilosophy: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<{
    [key: number]: number;
  }>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFramesRef = useRef<number[]>([]);

  // Memoize initial numbers to prevent recreation
  const initialNumbers = useMemo(() => {
    const numbers: { [key: number]: number } = {};
    STATS.forEach((stat) => {
      numbers[stat.id] = 0;
    });
    return numbers;
  }, []);

  // Initialize animated numbers only once
  useEffect(() => {
    setAnimatedNumbers(initialNumbers);
  }, [initialNumbers]);

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
      threshold: INTERSECTION_THRESHOLD,
    });

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  // Optimized animation with cleanup
  useEffect(() => {
    if (!isVisible) return;

    // Clear any existing animations
    animationFramesRef.current.forEach(cancelAnimationFrame);
    animationFramesRef.current = [];

    STATS.forEach((stat, index) => {
      const startTime = Date.now() + index * STAGGER_DELAY;
      const endValue = stat.number;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;

        if (elapsed < 0) {
          const frameId = requestAnimationFrame(animate);
          animationFramesRef.current.push(frameId);
          return;
        }

        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
        const currentValue = Math.floor(endValue * easeOutQuart(progress));

        setAnimatedNumbers((prev) => ({
          ...prev,
          [stat.id]: currentValue,
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
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full px-[20px] lg:mt-[100px] lg:min-h-[828px] lg:px-[72px]"
    >
      {/*  */}
      <div className="mb-[20px] flex items-center gap-2 border-b border-[#D9DEDD] pb-4 lg:mb-[56px]">
        <div className="bg-background h-2 w-2 rounded-full"></div>
        <p className="text-primary text-[14px]">
          The company&apos;s philosophy
        </p>
      </div>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        {/* LEFT PART - 8 columns */}
        <div className="lg:col-span-8 lg:max-w-[592px]">
          <h1 className="text-primary text-start text-[32px] leading-[1.1] font-medium lg:text-[62px] lg:leading-[1.1] lg:font-bold">
            We bear the responsibility of developing the sector.
          </h1>
          <p className="text-secondary mt-6 text-start text-[16px] leading-[1.5] lg:text-[24px] lg:leading-[1.5]">
            Elevate your brand with our comprehensive marketing solutions,
            including Digital Marketing, Content Creation, and Social Media
            Strategy. Enhance visibility through expert SEO and PPC management,
          </p>
        </div>
        {/* RIGHT PART Stats Grid - 4 columns */}
        <div className="mt-8 grid grid-cols-2 gap-y-8 lg:col-span-4 lg:mt-0 lg:flex lg:flex-col lg:gap-y-[64px]">
          {STATS.map((stat: StatItem, index: number) => (
            <div
              className="flex flex-col"
              key={stat.id}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Animated Number */}
              <p className="text-background text-[27px] md:text-[48px] md:font-bold">
                {animatedNumbers[stat.id] || 0}
                {stat.suffix}
              </p>

              {/* Label */}
              <p className="text-secondary text-[16px] font-medium md:text-[18px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyPhilosophy;
