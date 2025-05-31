import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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
          <button
            onClick={onPrevious}
            className="group bg-background float-left flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Previous feedback"
          >
            <IoChevronBack className="text-on-background h-4 w-4" />
          </button>
        )}

        {currentIndex < maxIndex && (
          <button
            onClick={onNext}
            className="group bg-background float-right flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Next feedback"
          >
            <IoChevronForward className="text-on-background h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation Arrows - Desktop */}
      {currentIndex > 0 && (
        <button
          onClick={onPrevious}
          className="group bg-background absolute top-1/3 left-14 z-20 hidden h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110 md:flex"
          aria-label="Previous feedback"
        >
          <IoChevronBack className="text-on-background h-6 w-6" />
        </button>
      )}

      {currentIndex < maxIndex && (
        <button
          onClick={onNext}
          className="group bg-background absolute top-1/3 right-14 z-20 hidden h-[56px] w-[56px] cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-110 md:flex"
          aria-label="Next feedback"
        >
          <IoChevronForward className="text-on-background h-6 w-6" />
        </button>
      )}
    </>
  );
}
