import { act, renderHook } from "@testing-library/react";
import { useSmoothScroll } from "./useSmoothScroll";

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, "scrollTo", {
  value: mockScrollTo,
  writable: true,
});

// Mock getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, "getElementById", {
  value: mockGetElementById,
  writable: true,
});

describe("useSmoothScroll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("hook initialization", () => {
    it("returns the expected functions", () => {
      const { result } = renderHook(() => useSmoothScroll());

      expect(result.current).toHaveProperty("smoothScrollTo");
      expect(result.current).toHaveProperty("scrollToTop");
      expect(result.current).toHaveProperty("handleNavClick");
      expect(typeof result.current.smoothScrollTo).toBe("function");
      expect(typeof result.current.scrollToTop).toBe("function");
      expect(typeof result.current.handleNavClick).toBe("function");
    });

    it("uses default navbarHeight of 80 when not provided", () => {
      const mockElement = { offsetTop: 200 };
      mockGetElementById.mockReturnValue(mockElement);

      const { result } = renderHook(() => useSmoothScroll());

      act(() => {
        result.current.smoothScrollTo("test-element");
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 120, // 200 - 80 (default navbar height)
        behavior: "smooth",
      });
    });

    it("uses custom navbarHeight when provided", () => {
      const mockElement = { offsetTop: 200 };
      mockGetElementById.mockReturnValue(mockElement);

      const { result } = renderHook(() =>
        useSmoothScroll({ navbarHeight: 100 })
      );

      act(() => {
        result.current.smoothScrollTo("test-element");
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 100, // 200 - 100 (custom navbar height)
        behavior: "smooth",
      });
    });
  });

  describe("smoothScrollTo", () => {
    it("scrolls to element with correct offset when element exists", () => {
      const mockElement = { offsetTop: 300 };
      mockGetElementById.mockReturnValue(mockElement);

      const { result } = renderHook(() =>
        useSmoothScroll({ navbarHeight: 80 })
      );

      act(() => {
        result.current.smoothScrollTo("about");
      });

      expect(mockGetElementById).toHaveBeenCalledWith("about");
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 220, // 300 - 80
        behavior: "smooth",
      });
    });

    it("does not scroll when element does not exist", () => {
      mockGetElementById.mockReturnValue(null);

      const { result } = renderHook(() => useSmoothScroll());

      act(() => {
        result.current.smoothScrollTo("non-existent");
      });

      expect(mockGetElementById).toHaveBeenCalledWith("non-existent");
      expect(mockScrollTo).not.toHaveBeenCalled();
    });

    it("handles elements at the top of the page correctly", () => {
      const mockElement = { offsetTop: 0 };
      mockGetElementById.mockReturnValue(mockElement);

      const { result } = renderHook(() =>
        useSmoothScroll({ navbarHeight: 80 })
      );

      act(() => {
        result.current.smoothScrollTo("top-element");
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: -80, // 0 - 80
        behavior: "smooth",
      });
    });
  });

  describe("scrollToTop", () => {
    it("scrolls to top of page", () => {
      const { result } = renderHook(() => useSmoothScroll());

      act(() => {
        result.current.scrollToTop();
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  describe("handleNavClick", () => {
    let mockEvent: Partial<React.MouseEvent<HTMLAnchorElement>>;

    beforeEach(() => {
      mockEvent = {
        preventDefault: jest.fn(),
      };
    });

    it("handles hash links by preventing default and smooth scrolling", () => {
      const mockElement = { offsetTop: 400 };
      mockGetElementById.mockReturnValue(mockElement);

      const { result } = renderHook(() =>
        useSmoothScroll({ navbarHeight: 80 })
      );

      act(() => {
        result.current.handleNavClick(
          mockEvent as React.MouseEvent<HTMLAnchorElement>,
          "#services"
        );
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockGetElementById).toHaveBeenCalledWith("services");
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 320, // 400 - 80
        behavior: "smooth",
      });
    });

    it("handles home link (/) by preventing default and scrolling to top", () => {
      const { result } = renderHook(() => useSmoothScroll());

      act(() => {
        result.current.handleNavClick(
          mockEvent as React.MouseEvent<HTMLAnchorElement>,
          "/"
        );
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    });

    it("does not prevent default for external links", () => {
      const { result } = renderHook(() => useSmoothScroll());

      act(() => {
        result.current.handleNavClick(
          mockEvent as React.MouseEvent<HTMLAnchorElement>,
          "https://example.com"
        );
      });

      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockScrollTo).not.toHaveBeenCalled();
    });

    it("does not prevent default for relative paths other than /", () => {
      const { result } = renderHook(() => useSmoothScroll());

      act(() => {
        result.current.handleNavClick(
          mockEvent as React.MouseEvent<HTMLAnchorElement>,
          "/about"
        );
      });

      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockScrollTo).not.toHaveBeenCalled();
    });

    it("calls onNavigate callback when provided for hash links", () => {
      const mockOnNavigate = jest.fn();
      const mockElement = { offsetTop: 400 };
      mockGetElementById.mockReturnValue(mockElement);

      const { result } = renderHook(() =>
        useSmoothScroll({ onNavigate: mockOnNavigate })
      );

      act(() => {
        result.current.handleNavClick(
          mockEvent as React.MouseEvent<HTMLAnchorElement>,
          "#about"
        );
      });

      expect(mockOnNavigate).toHaveBeenCalled();
    });

    it("calls onNavigate callback when provided for home link", () => {
      const mockOnNavigate = jest.fn();

      const { result } = renderHook(() =>
        useSmoothScroll({ onNavigate: mockOnNavigate })
      );

      act(() => {
        result.current.handleNavClick(
          mockEvent as React.MouseEvent<HTMLAnchorElement>,
          "/"
        );
      });

      expect(mockOnNavigate).toHaveBeenCalled();
    });

    it("does not call onNavigate for external links", () => {
      const mockOnNavigate = jest.fn();

      const { result } = renderHook(() =>
        useSmoothScroll({ onNavigate: mockOnNavigate })
      );

      act(() => {
        result.current.handleNavClick(
          mockEvent as React.MouseEvent<HTMLAnchorElement>,
          "https://example.com"
        );
      });

      expect(mockOnNavigate).not.toHaveBeenCalled();
    });
  });

  describe("function stability", () => {
    it("maintains function references when options don't change", () => {
      const { result, rerender } = renderHook(() =>
        useSmoothScroll({ navbarHeight: 80 })
      );

      const firstRender = result.current;

      rerender();

      expect(result.current.smoothScrollTo).toBe(firstRender.smoothScrollTo);
      expect(result.current.scrollToTop).toBe(firstRender.scrollToTop);
      expect(result.current.handleNavClick).toBe(firstRender.handleNavClick);
    });

    it("updates functions when navbarHeight changes", () => {
      const { result, rerender } = renderHook(
        (props) => useSmoothScroll(props),
        {
          initialProps: { navbarHeight: 80 },
        }
      );

      const firstRender = result.current;

      rerender({ navbarHeight: 100 });

      expect(result.current.smoothScrollTo).not.toBe(
        firstRender.smoothScrollTo
      );
      expect(result.current.handleNavClick).not.toBe(
        firstRender.handleNavClick
      );
      expect(result.current.scrollToTop).toBe(firstRender.scrollToTop); // Should remain the same
    });

    it("updates functions when onNavigate changes", () => {
      const mockOnNavigate1 = jest.fn();
      const mockOnNavigate2 = jest.fn();

      const { result, rerender } = renderHook(
        (props) => useSmoothScroll(props),
        {
          initialProps: { onNavigate: mockOnNavigate1 },
        }
      );

      const firstRender = result.current;

      rerender({ onNavigate: mockOnNavigate2 });

      expect(result.current.handleNavClick).not.toBe(
        firstRender.handleNavClick
      );
      expect(result.current.smoothScrollTo).toBe(firstRender.smoothScrollTo);
      expect(result.current.scrollToTop).toBe(firstRender.scrollToTop);
    });
  });
});
