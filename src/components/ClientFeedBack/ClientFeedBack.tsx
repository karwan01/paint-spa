"use client";

import { clientFeedbacks } from "@/data/clientFeedbacks";
import { useEffect, useRef, useState } from "react";
import ClientFeedbackCard from "./FeedBackCard/FeedBackCard";
import NavigationArrows from "./NavigationArrows/NavigationArrows";

export default function ClientFeedBack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(1);

  // Card dimensions
  const cardWidth = 320;
  const cardGap = 24;

  // Calculate how many cards can fit based on container width
  useEffect(() => {
    const updateVisibleCards = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;

        // Calculate how many full cards can fit with gaps
        const availableWidth = width - 32; // Account for container padding
        const cardsWithGaps = Math.floor(
          (availableWidth + cardGap) / (cardWidth + cardGap)
        );
        const maxCards = Math.max(
          1,
          Math.min(cardsWithGaps, clientFeedbacks.length)
        );

        setVisibleCards(maxCards);

        // Adjust current index if it would show empty space
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, clientFeedbacks.length - maxCards);
          return Math.min(prevIndex, maxIndex);
        });
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, clientFeedbacks.length - visibleCards);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToSlide = (index: number) => {
    const clampedIndex = Math.min(index, maxIndex);
    setCurrentIndex(clampedIndex);
  };

  return (
    <>
      <section className="bg-primary flex min-h-screen items-center justify-center bg-gradient-to-br">
        <div className="w-full max-w-full">
          {/* Header */}
          <div className="mb-8 text-center md:mb-16 lg:block">
            <h2 className="text-background mb-[4px] text-[24px] font-bold md:text-[32px] lg:mb-[32px] lg:text-[48px]">
              Our clients opinions
            </h2>
          </div>

          {/* Carousel Container */}
          <div
            className="relative ms-6 md:pb-0 lg:ms-[76px]"
            ref={containerRef}
          >
            {/* Responsive Cards Layout */}
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`,
                }}
              >
                {clientFeedbacks.map((feedback) => (
                  <div key={feedback.id} className="w-[320px] flex-shrink-0">
                    <ClientFeedbackCard clientFeedBack={feedback} />
                  </div>
                ))}
              </div>
            </div>

            <NavigationArrows
              currentIndex={currentIndex}
              maxIndex={maxIndex}
              onPrevious={goToPrevious}
              onNext={goToNext}
            />
          </div>

          {/* Pagination Dots - Desktop Only */}
          <div className="mt-12 hidden justify-center space-x-3 md:flex">
            {Array.from({ length: maxIndex + 1 }, (_, i) => i).map(
              (dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => goToSlide(dotIndex)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    dotIndex === currentIndex
                      ? "bg-on-background scale-125"
                      : "bg-on-background/40 hover:bg-on-background/60"
                  }`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              )
            )}
          </div>
        </div>
      </section>

      <div className="bg-on-background min-h-[500px]" />
    </>
  );
}
