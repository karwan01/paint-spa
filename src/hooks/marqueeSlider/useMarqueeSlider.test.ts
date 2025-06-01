import { act, renderHook } from "@testing-library/react";
import { useMarqueeSlider } from "./useMarqueeSlider";

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

Object.defineProperty(window, "requestAnimationFrame", {
  value: mockRequestAnimationFrame,
  writable: true,
});

Object.defineProperty(window, "cancelAnimationFrame", {
  value: mockCancelAnimationFrame,
  writable: true,
});

describe("useMarqueeSlider", () => {
  const testItems = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup requestAnimationFrame to call callback immediately
    mockRequestAnimationFrame.mockImplementation((callback) => {
      const id = Math.random();
      setTimeout(callback, 0);
      return id;
    });
  });

  describe("initialization", () => {
    it("returns expected properties and functions", () => {
      const { result } = renderHook(() => useMarqueeSlider(testItems));

      expect(result.current).toHaveProperty("scrollContainerRef");
      expect(result.current).toHaveProperty("isPaused");
      expect(result.current).toHaveProperty("setIsPaused");
      expect(result.current).toHaveProperty("duplicatedItems");
      expect(result.current).toHaveProperty("handleMouseEnter");
      expect(result.current).toHaveProperty("handleMouseLeave");
      expect(result.current).toHaveProperty("reset");
      expect(typeof result.current.handleMouseEnter).toBe("function");
      expect(typeof result.current.handleMouseLeave).toBe("function");
      expect(typeof result.current.reset).toBe("function");
    });

    it("initializes with correct default values", () => {
      const { result } = renderHook(() => useMarqueeSlider(testItems));

      expect(result.current.isPaused).toBe(false); // autoStart is true by default
      expect(result.current.duplicatedItems).toHaveLength(testItems.length * 2);
      expect(result.current.duplicatedItems).toEqual([
        ...testItems,
        ...testItems,
      ]);
    });

    it("respects autoStart option", () => {
      const { result } = renderHook(() =>
        useMarqueeSlider(testItems, { autoStart: false })
      );

      expect(result.current.isPaused).toBe(true);
    });

    it("duplicates items correctly", () => {
      const { result } = renderHook(() => useMarqueeSlider(testItems));

      expect(result.current.duplicatedItems).toEqual([
        ...testItems,
        ...testItems,
      ]);
      expect(result.current.duplicatedItems).toHaveLength(6);
    });
  });

  describe("pause/resume functionality", () => {
    it("allows manual pause and resume", () => {
      const { result } = renderHook(() => useMarqueeSlider(testItems));

      expect(result.current.isPaused).toBe(false);

      act(() => {
        result.current.setIsPaused(true);
      });

      expect(result.current.isPaused).toBe(true);

      act(() => {
        result.current.setIsPaused(false);
      });

      expect(result.current.isPaused).toBe(false);
    });

    it("handles mouse enter when pauseOnHover is enabled", () => {
      const { result } = renderHook(() =>
        useMarqueeSlider(testItems, { pauseOnHover: true })
      );

      expect(result.current.isPaused).toBe(false);

      act(() => {
        result.current.handleMouseEnter();
      });

      expect(result.current.isPaused).toBe(true);
    });

    it("handles mouse leave when pauseOnHover is enabled", () => {
      const { result } = renderHook(() =>
        useMarqueeSlider(testItems, { pauseOnHover: true })
      );

      // First pause it
      act(() => {
        result.current.handleMouseEnter();
      });

      expect(result.current.isPaused).toBe(true);

      // Then resume
      act(() => {
        result.current.handleMouseLeave();
      });

      expect(result.current.isPaused).toBe(false);
    });

    it("ignores mouse events when pauseOnHover is disabled", () => {
      const { result } = renderHook(() =>
        useMarqueeSlider(testItems, { pauseOnHover: false })
      );

      expect(result.current.isPaused).toBe(false);

      act(() => {
        result.current.handleMouseEnter();
      });

      expect(result.current.isPaused).toBe(false);

      act(() => {
        result.current.handleMouseLeave();
      });

      expect(result.current.isPaused).toBe(false);
    });
  });

  describe("animation control", () => {
    it("provides scroll container ref", () => {
      const { result } = renderHook(() => useMarqueeSlider(testItems));

      expect(result.current.scrollContainerRef).toBeDefined();
      expect(result.current.scrollContainerRef.current).toBeNull(); // Initially null
    });

    it("cleans up animation on unmount", () => {
      const { unmount } = renderHook(() => useMarqueeSlider(testItems));

      // Unmount should not throw and should clean up properly
      expect(() => unmount()).not.toThrow();
    });
  });

  describe("reset functionality", () => {
    it("provides reset function", () => {
      const { result } = renderHook(() => useMarqueeSlider(testItems));

      expect(typeof result.current.reset).toBe("function");

      // Reset should not throw
      act(() => {
        result.current.reset();
      });
    });
  });

  describe("configuration options", () => {
    it("uses custom scroll speed", () => {
      const { result } = renderHook(() =>
        useMarqueeSlider(testItems, { scrollSpeed: 5 })
      );

      expect(result.current).toBeDefined();
      // Scroll speed is used internally, hard to test directly
    });

    it("respects pauseOnHover setting", () => {
      const { result: withHover } = renderHook(() =>
        useMarqueeSlider(testItems, { pauseOnHover: true })
      );

      const { result: withoutHover } = renderHook(() =>
        useMarqueeSlider(testItems, { pauseOnHover: false })
      );

      // Test mouse enter behavior
      act(() => {
        withHover.current.handleMouseEnter();
        withoutHover.current.handleMouseEnter();
      });

      expect(withHover.current.isPaused).toBe(true);
      expect(withoutHover.current.isPaused).toBe(false);
    });

    it("respects autoStart setting", () => {
      const { result: autoStart } = renderHook(() =>
        useMarqueeSlider(testItems, { autoStart: true })
      );

      const { result: noAutoStart } = renderHook(() =>
        useMarqueeSlider(testItems, { autoStart: false })
      );

      expect(autoStart.current.isPaused).toBe(false);
      expect(noAutoStart.current.isPaused).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("handles empty items array", () => {
      const { result } = renderHook(() => useMarqueeSlider([]));

      expect(result.current.duplicatedItems).toEqual([]);
    });

    it("handles single item", () => {
      const singleItem = [{ id: 1, name: "Single" }];
      const { result } = renderHook(() => useMarqueeSlider(singleItem));

      expect(result.current.duplicatedItems).toEqual([
        ...singleItem,
        ...singleItem,
      ]);
      expect(result.current.duplicatedItems).toHaveLength(2);
    });
  });
});
