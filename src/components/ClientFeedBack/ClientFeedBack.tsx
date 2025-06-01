"use client";

import { clientFeedbacks } from "@/data/clientFeedbacks";
import { useCarousel } from "@/hooks/carousel/useCarousel";
import ClientFeedbackCard from "./FeedBackCard/FeedBackCard";
import NavigationArrows from "./NavigationArrows/NavigationArrows";

export default function ClientFeedBack() {
  const {
    currentIndex,
    containerRef,
    maxIndex,
    goToPrevious,
    goToNext,
    goToSlide,
    getTransform,
  } = useCarousel({
    totalItems: clientFeedbacks.length,
    cardWidth: 320,
    cardGap: 24,
    containerPadding: 32,
  });

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
                  transform: getTransform(),
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
