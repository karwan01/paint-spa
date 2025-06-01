import { act, renderHook } from "@testing-library/react";
import { useCarousel } from "./useCarousel";

// Mock getBoundingClientRect and offsetWidth
const mockOffsetWidth = jest.fn();
Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
  get: mockOffsetWidth,
  configurable: true,
});

// Mock window.addEventListener and removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
Object.defineProperty(window, "addEventListener", {
  value: mockAddEventListener,
  writable: true,
});
Object.defineProperty(window, "removeEventListener", {
  value: mockRemoveEventListener,
  writable: true,
});

describe("useCarousel", () => {
  const defaultOptions = {
    totalItems: 10,
    cardWidth: 320,
    cardGap: 24,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockOffsetWidth.mockReturnValue(1200); // Default container width
  });

  describe("initialization", () => {
    it("returns expected properties and functions", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      expect(result.current).toHaveProperty("currentIndex", 0);
      expect(result.current).toHaveProperty("containerRef");
      expect(result.current).toHaveProperty("visibleCards", 1);
      expect(result.current).toHaveProperty("maxIndex");
      expect(result.current).toHaveProperty("goToPrevious");
      expect(result.current).toHaveProperty("goToNext");
      expect(result.current).toHaveProperty("goToSlide");
      expect(result.current).toHaveProperty("canGoPrevious");
      expect(result.current).toHaveProperty("canGoNext");
      expect(result.current).toHaveProperty("getTransform");
    });

    it("uses default values correctly", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      expect(result.current.currentIndex).toBe(0);
      expect(result.current.visibleCards).toBe(1);
    });

    it("uses custom initial index", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, initialIndex: 3 })
      );

      expect(result.current.currentIndex).toBe(3);
    });

    it("sets up resize event listener", () => {
      renderHook(() => useCarousel(defaultOptions));

      expect(mockAddEventListener).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );
    });
  });

  describe("visible cards calculation", () => {
    it("calculates visible cards based on container width", () => {
      // Container width 1200px, card width 320px, gap 24px, padding 32px
      // Available width: 1200 - 32 = 1168px
      // Cards with gaps: floor((1168 + 24) / (320 + 24)) = floor(1192 / 344) = 3
      mockOffsetWidth.mockReturnValue(1200);

      const { result } = renderHook(() => useCarousel(defaultOptions));

      // Mock the container ref to have the mocked offsetWidth
      const mockElement = { offsetWidth: 1200 };
      Object.defineProperty(result.current.containerRef, "current", {
        value: mockElement,
        writable: true,
      });

      // Trigger the resize calculation
      act(() => {
        const resizeHandler = mockAddEventListener.mock.calls.find(
          (call) => call[0] === "resize"
        )?.[1];
        if (resizeHandler) {
          resizeHandler();
        }
      });

      expect(result.current.visibleCards).toBe(3);
    });

    it("ensures at least 1 visible card", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      // Mock the container ref with very small width
      const mockElement = { offsetWidth: 100 };
      Object.defineProperty(result.current.containerRef, "current", {
        value: mockElement,
        writable: true,
      });

      act(() => {
        const resizeHandler = mockAddEventListener.mock.calls.find(
          (call) => call[0] === "resize"
        )?.[1];
        if (resizeHandler) {
          resizeHandler();
        }
      });

      expect(result.current.visibleCards).toBe(1);
    });

    it("limits visible cards to total items", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, totalItems: 2 })
      );

      // Mock the container ref with very large width
      const mockElement = { offsetWidth: 2000 };
      Object.defineProperty(result.current.containerRef, "current", {
        value: mockElement,
        writable: true,
      });

      act(() => {
        const resizeHandler = mockAddEventListener.mock.calls.find(
          (call) => call[0] === "resize"
        )?.[1];
        if (resizeHandler) {
          resizeHandler();
        }
      });

      expect(result.current.visibleCards).toBe(2);
    });
  });

  describe("navigation functions", () => {
    it("goToPrevious decreases current index", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, initialIndex: 3 })
      );

      act(() => {
        result.current.goToPrevious();
      });

      expect(result.current.currentIndex).toBe(2);
    });

    it("goToPrevious does not go below 0", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, initialIndex: 0 })
      );

      act(() => {
        result.current.goToPrevious();
      });

      expect(result.current.currentIndex).toBe(0);
    });

    it("goToNext increases current index", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      act(() => {
        result.current.goToNext();
      });

      expect(result.current.currentIndex).toBe(1);
    });

    it("goToNext does not exceed maxIndex", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, totalItems: 3, initialIndex: 2 })
      );

      // With 3 items and 1 visible card, maxIndex should be 2
      expect(result.current.maxIndex).toBe(2);

      act(() => {
        result.current.goToNext();
      });

      expect(result.current.currentIndex).toBe(2);
    });

    it("goToSlide sets specific index", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      act(() => {
        result.current.goToSlide(5);
      });

      expect(result.current.currentIndex).toBe(5);
    });

    it("goToSlide clamps index to valid range", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, totalItems: 5 })
      );

      // maxIndex should be 4 (5 items - 1 visible card)
      act(() => {
        result.current.goToSlide(10); // Beyond maxIndex
      });

      expect(result.current.currentIndex).toBe(4);

      act(() => {
        result.current.goToSlide(-1); // Below 0
      });

      expect(result.current.currentIndex).toBe(0);
    });
  });

  describe("navigation state", () => {
    it("canGoPrevious is false at index 0", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      expect(result.current.canGoPrevious).toBe(false);
    });

    it("canGoPrevious is true when index > 0", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, initialIndex: 1 })
      );

      expect(result.current.canGoPrevious).toBe(true);
    });

    it("canGoNext is false at maxIndex", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, totalItems: 3, initialIndex: 2 })
      );

      expect(result.current.canGoNext).toBe(false);
    });

    it("canGoNext is true when index < maxIndex", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      expect(result.current.canGoNext).toBe(true);
    });
  });

  describe("transform calculation", () => {
    it("calculates correct transform value", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, initialIndex: 2 })
      );

      const transform = result.current.getTransform();
      // 2 * (320 + 24) = 2 * 344 = 688
      expect(transform).toBe("translateX(-688px)");
    });

    it("returns zero transform at index 0", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      const transform = result.current.getTransform();
      expect(transform).toBe("translateX(-0px)");
    });
  });

  describe("cleanup", () => {
    it("removes resize event listener on unmount", () => {
      const { unmount } = renderHook(() => useCarousel(defaultOptions));

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );
    });
  });

  describe("responsive behavior", () => {
    it("updates visible cards when container width changes", () => {
      const { result } = renderHook(() => useCarousel(defaultOptions));

      // Initial state with 800px container
      // Available width: 800 - 32 = 768px
      // Cards with gaps: floor((768 + 24) / (320 + 24)) = floor(792 / 344) = 2
      const mockElement = { offsetWidth: 800 };
      Object.defineProperty(result.current.containerRef, "current", {
        value: mockElement,
        writable: true,
      });

      act(() => {
        const resizeHandler = mockAddEventListener.mock.calls.find(
          (call) => call[0] === "resize"
        )?.[1];
        if (resizeHandler) {
          resizeHandler();
        }
      });

      expect(result.current.visibleCards).toBe(2);

      // Simulate container resize to 1200px
      mockElement.offsetWidth = 1200;

      act(() => {
        const resizeHandler = mockAddEventListener.mock.calls.find(
          (call) => call[0] === "resize"
        )?.[1];
        if (resizeHandler) {
          resizeHandler();
        }
      });

      // After resize to 1200px
      // Available width: 1200 - 32 = 1168px
      // Cards with gaps: floor((1168 + 24) / (320 + 24)) = floor(1192 / 344) = 3
      expect(result.current.visibleCards).toBe(3);
    });

    it("adjusts current index when visible cards increase", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, totalItems: 5, initialIndex: 4 })
      );

      // With 1 visible card, maxIndex is 4, so index 4 is valid
      expect(result.current.currentIndex).toBe(4);

      // Simulate container resize that increases visible cards to 3
      const mockElement = { offsetWidth: 1200 };
      Object.defineProperty(result.current.containerRef, "current", {
        value: mockElement,
        writable: true,
      });

      act(() => {
        const resizeHandler = mockAddEventListener.mock.calls.find(
          (call) => call[0] === "resize"
        )?.[1];
        if (resizeHandler) {
          resizeHandler();
        }
      });

      // With 3 visible cards and 5 total items, maxIndex becomes 2
      // So currentIndex should be adjusted from 4 to 2
      expect(result.current.currentIndex).toBe(2);
    });
  });

  describe("custom container padding", () => {
    it("uses custom container padding in calculations", () => {
      const { result } = renderHook(() =>
        useCarousel({ ...defaultOptions, containerPadding: 64 })
      );

      // Mock the container ref with specific width
      const mockElement = { offsetWidth: 1000 };
      Object.defineProperty(result.current.containerRef, "current", {
        value: mockElement,
        writable: true,
      });

      act(() => {
        const resizeHandler = mockAddEventListener.mock.calls.find(
          (call) => call[0] === "resize"
        )?.[1];
        if (resizeHandler) {
          resizeHandler();
        }
      });

      // With 64px padding instead of 32px
      // Available width: 1000 - 64 = 936px
      // Cards with gaps: floor((936 + 24) / (320 + 24)) = floor(960 / 344) = 2
      expect(result.current.visibleCards).toBe(2);
    });
  });
});
