"use client";
import { partners } from "@/data/partners";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Partners: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const scrollAmountRef = useRef<number>(0);

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 1; // pixels per frame
    const containerWidth = container.scrollWidth / 2; // Half because we duplicated content

    const scroll = () => {
      if (!isPaused) {
        scrollAmountRef.current += scrollSpeed;

        // Reset to beginning when we've scrolled through one full set
        if (scrollAmountRef.current >= containerWidth) {
          scrollAmountRef.current = 0;
        }

        container.scrollLeft = scrollAmountRef.current;

        // Only continue animation if not paused
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
  }, [isPaused]); // Include isPaused in dependencies to handle pause/resume

  const handlePartnerClick = (website: string) => {
    window.open(website, "_blank", "noopener,noreferrer");
  };

  return (
    <section>
      <div className="mx-auto lg:my-10">
        {/* Section Header */}
        <div className="mb-[4px] text-center lg:mb-[54px]">
          <h2 className="font-display text-background text-[18px] font-bold lg:text-[48px]">
            Our Partners
          </h2>
        </div>

        {/* Auto-scrolling Partners Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="overflow-hidden whitespace-nowrap"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="inline-flex gap-x-3">
              {duplicatedPartners.map((partner, index) => (
                <Image
                  key={`${partner.id}-${index}`}
                  className="inline-block h-[88px] w-[200px] flex-shrink-0 cursor-pointer rounded-lg object-contain duration-300 lg:w-[300px]"
                  onClick={() => handlePartnerClick(partner.website)}
                  src={partner.logo}
                  alt={partner.name}
                  width={419}
                  height={88}
                  priority={index < partners.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
