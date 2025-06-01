"use client";

import { STATS } from "@/data/statItems";
import { useCountUpAnimation } from "@/hooks/animations/countUp/useCountUpAnimation";
import { StatItem } from "@/types/StatTypes";
import React, { useMemo } from "react";

const CompanyPhilosophy: React.FC = () => {
  // Transform STATS data to match hook's expected format
  const countUpItems = useMemo(
    () => STATS.map((stat) => ({ id: stat.id, value: stat.number })),
    []
  );

  const { sectionRef, animatedValues } = useCountUpAnimation({
    items: countUpItems,
    animationDuration: 2000,
    staggerDelay: 200,
    intersectionThreshold: 0.3,
  });

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
                {animatedValues[stat.id] || 0}
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
