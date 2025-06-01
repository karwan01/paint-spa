"use client";
import { partners } from "@/data/partners";
import { useMarqueeSlider } from "@/hooks/marqueeSlider/useMarqueeSlider";
import Image from "next/image";
import React from "react";

const Partners: React.FC = () => {
  const {
    scrollContainerRef,
    duplicatedItems: duplicatedPartners,
    handleMouseEnter,
    handleMouseLeave,
  } = useMarqueeSlider(partners, {
    scrollSpeed: 1,
    pauseOnHover: true,
    autoStart: true,
  });

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
