import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
  totalItems: number;
  cardWidth: number;
  cardGap: number;
  containerPadding?: number;
  initialIndex?: number;
}

interface UseCarouselReturn {
  currentIndex: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  visibleCards: number;
  maxIndex: number;
  goToPrevious: () => void;
  goToNext: () => void;
  goToSlide: (index: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  getTransform: () => string;
}

export const useCarousel = ({
  totalItems,
  cardWidth,
  cardGap,
  containerPadding = 32,
  initialIndex = 0,
}: UseCarouselOptions): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(1);

  // Calculate how many cards can fit based on container width
  const updateVisibleCards = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;

      // Calculate how many full cards can fit with gaps
      const availableWidth = width - containerPadding;
      const cardsWithGaps = Math.floor(
        (availableWidth + cardGap) / (cardWidth + cardGap)
      );
      const maxCards = Math.max(1, Math.min(cardsWithGaps, totalItems));

      setVisibleCards(maxCards);

      // Adjust current index if it would show empty space
      setCurrentIndex((prevIndex) => {
        const newMaxIndex = Math.max(0, totalItems - maxCards);
        return Math.min(prevIndex, newMaxIndex);
      });
    }
  }, [totalItems, cardWidth, cardGap, containerPadding]);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [updateVisibleCards]);

  const maxIndex = Math.max(0, totalItems - visibleCards);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clampedIndex);
    },
    [maxIndex]
  );

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const getTransform = useCallback(() => {
    return `translateX(-${currentIndex * (cardWidth + cardGap)}px)`;
  }, [currentIndex, cardWidth, cardGap]);

  return {
    currentIndex,
    containerRef,
    visibleCards,
    maxIndex,
    goToPrevious,
    goToNext,
    goToSlide,
    canGoPrevious,
    canGoNext,
    getTransform,
  };
};
