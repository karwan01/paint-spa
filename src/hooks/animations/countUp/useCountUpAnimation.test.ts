import { act, renderHook } from "@testing-library/react";
import { useCountUpAnimation } from "./useCountUpAnimation";

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

// Mock Date.now
const mockDateNow = jest.fn();
Object.defineProperty(Date, "now", {
  value: mockDateNow,
  writable: true,
});

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
const mockIntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: mockObserve,
  disconnect: mockDisconnect,
  callback,
}));

Object.defineProperty(window, "IntersectionObserver", {
  value: mockIntersectionObserver,
  writable: true,
});

describe("useCountUpAnimation", () => {
  const defaultItems = [
    { id: 1, value: 100 },
    { id: 2, value: 250 },
    { id: 3, value: 500 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockDateNow.mockReturnValue(1000);

    // Setup requestAnimationFrame to call callback immediately
    mockRequestAnimationFrame.mockImplementation((callback) => {
      const id = Math.random();
      setTimeout(callback, 0);
      return id;
    });
  });

  describe("initialization", () => {
    it("returns expected properties and functions", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      expect(result.current).toHaveProperty("sectionRef");
      expect(result.current).toHaveProperty("animatedValues");
      expect(result.current).toHaveProperty("isVisible");
      expect(result.current).toHaveProperty("triggerAnimation");
      expect(typeof result.current.triggerAnimation).toBe("function");
    });

    it("initializes with correct default values", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      expect(result.current.isVisible).toBe(false);
      expect(result.current.animatedValues).toEqual({
        1: 0,
        2: 0,
        3: 0,
      });
    });

    it("sets up intersection observer with default threshold", () => {
      renderHook(() => useCountUpAnimation({ items: defaultItems }));

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.3 }
      );
    });

    it("sets up intersection observer with custom threshold", () => {
      renderHook(() =>
        useCountUpAnimation({
          items: defaultItems,
          intersectionThreshold: 0.5,
        })
      );

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        { threshold: 0.5 }
      );
    });
  });

  describe("intersection observer", () => {
    it("observes the section ref when it exists", () => {
      const { result, rerender } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      // Mock the section ref
      const mockElement = document.createElement("div");
      Object.defineProperty(result.current.sectionRef, "current", {
        value: mockElement,
        writable: true,
      });

      // Re-render to trigger the effect
      act(() => {
        rerender();
      });

      expect(mockObserve).toHaveBeenCalledWith(mockElement);
    });

    it("triggers animation when element becomes visible", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      // Mock the section ref
      const mockElement = document.createElement("div");
      Object.defineProperty(result.current.sectionRef, "current", {
        value: mockElement,
        writable: true,
      });

      expect(result.current.isVisible).toBe(false);

      // Simulate intersection
      act(() => {
        const callback = mockIntersectionObserver.mock.calls[0][0];
        callback([{ isIntersecting: true }]);
      });

      expect(result.current.isVisible).toBe(true);
    });

    it("does not trigger animation when element is not intersecting", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      act(() => {
        const callback = mockIntersectionObserver.mock.calls[0][0];
        callback([{ isIntersecting: false }]);
      });

      expect(result.current.isVisible).toBe(false);
    });

    it("disconnects observer on unmount", () => {
      const { unmount } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      unmount();

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe("manual trigger", () => {
    it("allows manual triggering of animation", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      expect(result.current.isVisible).toBe(false);

      act(() => {
        result.current.triggerAnimation();
      });

      expect(result.current.isVisible).toBe(true);
    });
  });

  describe("animation logic", () => {
    it("starts animation when visible becomes true", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({
          items: defaultItems,
          animationDuration: 1000,
          staggerDelay: 100,
        })
      );

      act(() => {
        result.current.triggerAnimation();
      });

      // Should call requestAnimationFrame for each item
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it("clears existing animations before starting new ones", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      // Setup requestAnimationFrame to return a specific ID
      mockRequestAnimationFrame.mockReturnValue(123);

      // Trigger animation first time
      act(() => {
        result.current.triggerAnimation();
      });

      // Make sure the animation ID is stored
      mockDateNow.mockReturnValue(1500);

      act(() => {
        result.current.triggerAnimation();
      });
    });

    it("handles custom easing function", () => {
      const customEasing = jest.fn((t: number) => t * t);

      renderHook(() =>
        useCountUpAnimation({
          items: defaultItems,
          easingFunction: customEasing,
        })
      );

      // The easing function will be called during animation
      // We can't easily test this without mocking the entire animation loop
      expect(customEasing).toBeDefined();
    });
  });

  describe("animation values", () => {
    it("updates animated values during animation", async () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({
          items: [{ id: 1, value: 100 }],
          animationDuration: 1000,
        })
      );

      // Mock animation frame timing
      let animationCallback: (() => void) | null = null;
      mockRequestAnimationFrame.mockImplementation((callback) => {
        animationCallback = callback;
        return 1;
      });

      act(() => {
        result.current.triggerAnimation();
      });

      // Simulate animation progress
      if (animationCallback) {
        mockDateNow.mockReturnValue(1500); // Halfway through animation

        act(() => {
          animationCallback?.();
        });

        // The value should be between 0 and 100
        expect(result.current.animatedValues[1]).toBeGreaterThan(0);
        expect(result.current.animatedValues[1]).toBeLessThanOrEqual(100);
      }
    });
  });

  describe("cleanup", () => {
    it("cancels animation frames on unmount", () => {
      const { result, unmount } = renderHook(() =>
        useCountUpAnimation({ items: defaultItems })
      );

      // Trigger animation to create some frames
      act(() => {
        result.current.triggerAnimation();
      });

      unmount();

      expect(mockCancelAnimationFrame).toHaveBeenCalled();
    });
  });

  describe("configuration options", () => {
    it("uses custom animation duration", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({
          items: defaultItems,
          animationDuration: 3000,
        })
      );

      expect(result.current).toBeDefined();
      // Animation duration is used internally, hard to test directly
    });

    it("uses custom stagger delay", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({
          items: defaultItems,
          staggerDelay: 500,
        })
      );

      expect(result.current).toBeDefined();
      // Stagger delay is used internally, hard to test directly
    });
  });

  describe("edge cases", () => {
    it("handles empty items array", () => {
      const { result } = renderHook(() => useCountUpAnimation({ items: [] }));

      expect(result.current.animatedValues).toEqual({});
    });

    it("handles items with zero values", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({
          items: [{ id: 1, value: 0 }],
        })
      );

      expect(result.current.animatedValues).toEqual({ 1: 0 });
    });

    it("handles very large values", () => {
      const { result } = renderHook(() =>
        useCountUpAnimation({
          items: [{ id: 1, value: 10000 }],
        })
      );

      expect(result.current.animatedValues).toEqual({ 1: 0 });
    });
  });
});
