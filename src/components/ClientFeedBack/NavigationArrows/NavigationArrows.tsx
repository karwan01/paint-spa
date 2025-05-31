import ArrowButton from "./ArrowButton/ArrowButton";

interface NavigationArrowsProps {
  currentIndex: number;
  maxIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function NavigationArrows({
  currentIndex,
  maxIndex,
  onPrevious,
  onNext,
}: NavigationArrowsProps) {
  return (
    <>
      {/* Navigation Arrows - Mobile */}
      <div className="mx-3 mt-4 md:hidden">
        {currentIndex > 0 && (
          <ArrowButton
            direction="previous"
            onClick={onPrevious}
            variant="mobile"
            position="left"
          />
        )}

        {currentIndex < maxIndex && (
          <ArrowButton
            direction="next"
            onClick={onNext}
            variant="mobile"
            position="right"
          />
        )}
      </div>

      {/* Navigation Arrows - Desktop */}
      {currentIndex > 0 && (
        <ArrowButton
          direction="previous"
          onClick={onPrevious}
          variant="desktop"
          position="left"
        />
      )}

      {currentIndex < maxIndex && (
        <ArrowButton
          direction="next"
          onClick={onNext}
          variant="desktop"
          position="right"
        />
      )}
    </>
  );
}
