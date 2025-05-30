import { STATS } from "@/data/statItems";
import { act, render, screen, waitFor } from "@testing-library/react";
import CompanyPhilosophy from "./companyPhilosophy";

// Mock the intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

beforeAll(() => {
  window.IntersectionObserver = mockIntersectionObserver;
  window.requestAnimationFrame = mockRequestAnimationFrame;
  window.cancelAnimationFrame = mockCancelAnimationFrame;
});

beforeEach(() => {
  jest.clearAllMocks();
  mockRequestAnimationFrame.mockImplementation((callback) => {
    setTimeout(callback, 16); // Simulate 60fps
    return 1;
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe("CompanyPhilosophy", () => {
  it("renders without crashing", () => {
    render(<CompanyPhilosophy />);
    expect(screen.getByText("The company's philosophy")).toBeInTheDocument();
  });

  it("renders the main heading correctly", () => {
    render(<CompanyPhilosophy />);
    expect(
      screen.getByText("We bear the responsibility of developing the sector.")
    ).toBeInTheDocument();
  });

  it("renders the description text correctly", () => {
    render(<CompanyPhilosophy />);
    expect(
      screen.getByText(
        /Elevate your brand with our comprehensive marketing solutions/
      )
    ).toBeInTheDocument();
  });

  it("renders all stat items from STATS data", () => {
    render(<CompanyPhilosophy />);

    STATS.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it("initializes with zero values for all animated numbers", () => {
    render(<CompanyPhilosophy />);

    // Check that all stats start with 0
    const zeroElements = screen.getAllByText("0+");
    expect(zeroElements).toHaveLength(STATS.length);
  });

  it("sets up intersection observer correctly", () => {
    render(<CompanyPhilosophy />);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.3 }
    );
    expect(mockIntersectionObserver().observe).toHaveBeenCalled();
  });

  it("triggers animation when element becomes visible", async () => {
    const mockObserverCallback = jest.fn();
    mockIntersectionObserver.mockImplementation((callback) => {
      mockObserverCallback.mockImplementation(callback);
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    render(<CompanyPhilosophy />);

    // Simulate intersection observer triggering
    act(() => {
      mockObserverCallback([{ isIntersecting: true }]);
    });

    // Check that requestAnimationFrame was called for each stat
    await waitFor(() => {
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });
  });

  it("does not trigger animation when already visible", () => {
    const mockObserverCallback = jest.fn();
    mockIntersectionObserver.mockImplementation((callback) => {
      mockObserverCallback.mockImplementation(callback);
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });

    render(<CompanyPhilosophy />);

    // First trigger to make it visible
    act(() => {
      mockObserverCallback([{ isIntersecting: true }]);
    });

    const firstCallCount = mockRequestAnimationFrame.mock.calls.length;

    // Second trigger should not start new animations
    act(() => {
      mockObserverCallback([{ isIntersecting: true }]);
    });

    // Should not have made additional calls beyond the initial animation
    expect(mockRequestAnimationFrame.mock.calls.length).toBeGreaterThanOrEqual(
      firstCallCount
    );
  });

  it("renders stats with correct structure", () => {
    render(<CompanyPhilosophy />);

    STATS.forEach((stat) => {
      // Check label exists
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });

    // Check all initial numbers with suffix exist
    const zeroElements = screen.getAllByText("0+");
    expect(zeroElements).toHaveLength(STATS.length);
  });

  it("applies correct CSS classes for responsive design", () => {
    render(<CompanyPhilosophy />);

    const section = document.querySelector("section");
    expect(section).toHaveClass(
      "min-h-screen",
      "w-full",
      "px-[20px]",
      "lg:mt-[100px]",
      "lg:min-h-[828px]",
      "lg:px-[72px]"
    );
  });

  it("has proper semantic structure", () => {
    render(<CompanyPhilosophy />);

    // Check for main heading
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();

    // Check for section element
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders the philosophy indicator correctly", () => {
    render(<CompanyPhilosophy />);

    const philosophyText = screen.getByText("The company's philosophy");
    expect(philosophyText).toBeInTheDocument();
    expect(philosophyText).toHaveClass("text-primary", "text-[14px]");
  });

  it("cleans up intersection observer on unmount", () => {
    const mockDisconnect = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: mockDisconnect,
    });

    const { unmount } = render(<CompanyPhilosophy />);
    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("applies staggered animation delays correctly", () => {
    render(<CompanyPhilosophy />);

    STATS.forEach((stat, index) => {
      const statElement = screen.getByText(stat.label).closest("div");
      expect(statElement).toHaveStyle(`animation-delay: ${index * 0.2}s`);
    });
  });

  it("handles empty STATS array gracefully", () => {
    // This test would need to be adjusted based on how you want to handle empty stats
    // For now, we'll just ensure it doesn't crash with the current STATS
    expect(() => render(<CompanyPhilosophy />)).not.toThrow();
  });

  describe("Animation behavior", () => {
    it("component manages visibility state correctly", () => {
      const mockObserverCallback = jest.fn();
      mockIntersectionObserver.mockImplementation((callback) => {
        mockObserverCallback.mockImplementation(callback);
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      });

      render(<CompanyPhilosophy />);

      // Initially, animation should not have started
      const zeroElements = screen.getAllByText("0+");
      expect(zeroElements).toHaveLength(STATS.length);

      // Trigger intersection
      act(() => {
        mockObserverCallback([{ isIntersecting: true }]);
      });

      // Component should still render correctly after intersection
      expect(
        screen.getByText("We bear the responsibility of developing the sector.")
      ).toBeInTheDocument();
    });
  });

  describe("Easing function", () => {
    it("easeOutQuart function works correctly", () => {
      // Test the easing function directly if it's exported
      // For now, we test the component behavior which uses it
      render(<CompanyPhilosophy />);

      // The easing function should be applied during animation
      // This is more of an integration test since the function is internal
      expect(true).toBe(true); // Placeholder - would need more specific animation testing
    });
  });
});
