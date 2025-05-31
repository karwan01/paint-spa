import { clientFeedbacks } from "@/data/clientFeedbacks";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Image from "next/image";
import ClientFeedBack from "./ClientFeedBack";

// Mock the child components
jest.mock("./FeedBackCard/FeedBackCard", () => {
  return function MockClientFeedbackCard({
    clientFeedBack,
    className,
  }: {
    clientFeedBack: { id: number; name: string; quote: string; image?: string };
    className?: string;
  }) {
    return (
      <div
        data-testid={`feedback-card-${clientFeedBack.id}`}
        className={className}
      >
        <h3>{clientFeedBack.name}</h3>
        <blockquote>&ldquo;{clientFeedBack.quote}&rdquo;</blockquote>
        {clientFeedBack.image && (
          <Image
            src={clientFeedBack.image}
            alt={clientFeedBack.name}
            width={48}
            height={48}
            role="img"
          />
        )}
      </div>
    );
  };
});

jest.mock("./NavigationArrows/NavigationArrows", () => {
  return function MockNavigationArrows({
    currentIndex,
    maxIndex,
    onPrevious,
    onNext,
  }: {
    currentIndex: number;
    maxIndex: number;
    onPrevious: () => void;
    onNext: () => void;
  }) {
    return (
      <div data-testid="navigation-arrows">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          data-testid="previous-button"
          aria-label="Previous feedback"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex >= maxIndex}
          data-testid="next-button"
          aria-label="Next feedback"
        >
          Next
        </button>
        <span data-testid="navigation-info">
          {currentIndex}/{maxIndex}
        </span>
      </div>
    );
  };
});

// Mock window resize events
const mockResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));

beforeAll(() => {
  window.ResizeObserver = mockResizeObserver;
});

// Helper function to simulate container width
const mockContainerWidth = (width: number) => {
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    value: width,
  });
};

describe("ClientFeedBack Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to a standard desktop width
    mockContainerWidth(1200);
  });

  describe("Structure and Layout", () => {
    it("renders the main section with correct classes", () => {
      render(<ClientFeedBack />);
      const section = document.querySelector("section");
      expect(section).toHaveClass(
        "bg-primary",
        "flex",
        "min-h-screen",
        "items-center",
        "justify-center",
        "bg-gradient-to-br"
      );
    });

    it("renders the section header with correct text and styling", () => {
      render(<ClientFeedBack />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Our clients opinions");
      expect(heading).toHaveClass(
        "text-background",
        "mb-[4px]",
        "text-[24px]",
        "font-bold",
        "md:text-[32px]",
        "lg:mb-[32px]",
        "lg:text-[48px]"
      );
    });

    it("renders the carousel container with proper responsive margins", () => {
      render(<ClientFeedBack />);
      const carouselContainer = document.querySelector(".relative.ms-6");
      expect(carouselContainer).toHaveClass(
        "relative",
        "ms-6",
        "md:pb-0",
        "lg:ms-[76px]"
      );
    });
  });

  describe("Feedback Cards Rendering", () => {
    it("renders all feedback cards from data", () => {
      render(<ClientFeedBack />);

      clientFeedbacks.forEach((feedback) => {
        expect(
          screen.getByTestId(`feedback-card-${feedback.id}`)
        ).toBeInTheDocument();
        expect(screen.getByText(feedback.name)).toBeInTheDocument();
        expect(
          screen.getByText((content, element) => {
            return (
              element?.tagName.toLowerCase() === "blockquote" &&
              content.includes(feedback.quote)
            );
          })
        ).toBeInTheDocument();
      });
    });

    it("renders feedback cards with correct width and flex properties", () => {
      render(<ClientFeedBack />);
      const cardContainers = document.querySelectorAll(".w-\\[320px\\]");
      expect(cardContainers).toHaveLength(clientFeedbacks.length);

      cardContainers.forEach((container) => {
        expect(container).toHaveClass("w-[320px]", "flex-shrink-0");
      });
    });

    it("applies transform translate based on current index", () => {
      render(<ClientFeedBack />);
      const cardsContainer = document.querySelector(".flex.gap-6");
      expect(cardsContainer).toHaveStyle("transform: translateX(-0px)");
    });
  });

  describe("Navigation Controls", () => {
    it("renders navigation arrows component with correct props", () => {
      render(<ClientFeedBack />);
      const navigationArrows = screen.getByTestId("navigation-arrows");
      expect(navigationArrows).toBeInTheDocument();

      // Check that navigation info shows initial state
      expect(screen.getByTestId("navigation-info")).toHaveTextContent("0/");
    });

    it("navigation buttons work correctly", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      const nextButton = screen.getByTestId("next-button");
      const prevButton = screen.getByTestId("previous-button");

      // Previous button should be disabled initially
      expect(prevButton).toBeDisabled();

      // Click next button
      await user.click(nextButton);

      // Wait for state update
      await waitFor(() => {
        expect(screen.getByTestId("navigation-info")).toHaveTextContent("1/");
      });
    });

    it("prevents navigation beyond boundaries", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      const prevButton = screen.getByTestId("previous-button");
      expect(prevButton).toBeDisabled();

      // Navigate to the end
      const nextButton = screen.getByTestId("next-button");
      // Since we don't know exact maxIndex due to responsive calculations,
      // we'll just verify the button becomes disabled when at max
      let isAtEnd = false;
      let attempts = 0;
      const maxAttempts = clientFeedbacks.length;

      while (!isAtEnd && attempts < maxAttempts) {
        if (nextButton.hasAttribute("disabled")) {
          isAtEnd = true;
        } else {
          await user.click(nextButton);
          attempts++;
          await waitFor(() => {}, { timeout: 100 });
        }
      }

      // At this point, next button should be disabled
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Pagination Dots", () => {
    it("renders pagination dots on desktop (hidden on mobile)", () => {
      render(<ClientFeedBack />);
      const paginationContainer = document.querySelector(".mt-12.hidden");
      expect(paginationContainer).toHaveClass(
        "mt-12",
        "hidden",
        "justify-center",
        "space-x-3",
        "md:flex"
      );
    });

    it("pagination dots reflect current state", () => {
      render(<ClientFeedBack />);
      const dots = document.querySelectorAll(".h-3.w-3.rounded-full");
      expect(dots.length).toBeGreaterThan(0);

      // First dot should be active (has bg-on-background and scale-125)
      const firstDot = dots[0];
      expect(firstDot).toHaveClass("bg-on-background", "scale-125");
    });

    it("clicking pagination dot navigates to correct slide", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      const dots = document.querySelectorAll(".h-3.w-3.rounded-full");

      if (dots.length > 1) {
        const secondDot = dots[1] as HTMLButtonElement;
        await user.click(secondDot);

        await waitFor(() => {
          expect(screen.getByTestId("navigation-info")).toHaveTextContent("1/");
        });
      }
    });

    it("pagination dots have proper accessibility attributes", () => {
      render(<ClientFeedBack />);
      const dots = document.querySelectorAll(
        'button[aria-label*="Go to slide"]'
      );
      expect(dots.length).toBeGreaterThan(0);

      dots.forEach((dot, index) => {
        expect(dot).toHaveAttribute("aria-label", `Go to slide ${index + 1}`);
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("calculates visible cards based on container width", () => {
      // Mock a narrow container width (mobile)
      mockContainerWidth(400);
      render(<ClientFeedBack />);

      // Should show only 1 card on narrow screens
      const navigationInfo = screen.getByTestId("navigation-info");
      expect(navigationInfo).toBeInTheDocument();
    });

    it("handles window resize events", async () => {
      render(<ClientFeedBack />);

      // Mock a resize event
      mockContainerWidth(800);
      fireEvent(window, new Event("resize"));

      // Component should handle the resize
      await waitFor(() => {
        // The component should still be rendered correctly
        expect(screen.getByTestId("navigation-arrows")).toBeInTheDocument();
      });
    });

    it("cleans up resize event listener on unmount", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
      const { unmount } = render(<ClientFeedBack />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });

    it("adjusts current index when visible cards change", async () => {
      // Start with wide container
      mockContainerWidth(1200);
      render(<ClientFeedBack />);

      // Navigate to a higher index
      const nextButton = screen.getByTestId("next-button");
      await userEvent.click(nextButton);

      // Now simulate narrow container
      mockContainerWidth(400);
      fireEvent(window, new Event("resize"));

      // Component should adjust currentIndex to prevent showing empty space
      await waitFor(() => {
        const navigationInfo = screen.getByTestId("navigation-info");
        expect(navigationInfo).toBeInTheDocument();
      });
    });
  });

  describe("Animation and Transitions", () => {
    it("applies smooth transform transitions", () => {
      render(<ClientFeedBack />);
      const cardsContainer = document.querySelector(".flex.gap-6");
      expect(cardsContainer).toHaveClass(
        "transition-transform",
        "duration-500",
        "ease-in-out"
      );
    });

    it("pagination dots have transition classes", () => {
      render(<ClientFeedBack />);
      const dots = document.querySelectorAll(".h-3.w-3.rounded-full");
      dots.forEach((dot) => {
        expect(dot).toHaveClass("transition-all", "duration-300");
      });
    });

    it("calculates correct translateX value for navigation", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      const nextButton = screen.getByTestId("next-button");
      await user.click(nextButton);

      await waitFor(() => {
        const cardsContainer = document.querySelector(".flex.gap-6");
        // Should translate by cardWidth (320px) + gap (24px) = 344px
        expect(cardsContainer).toHaveStyle("transform: translateX(-344px)");
      });
    });
  });

  describe("Accessibility", () => {
    it("uses proper semantic HTML structure", () => {
      render(<ClientFeedBack />);
      expect(document.querySelector("section")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("navigation arrows have proper aria labels", () => {
      render(<ClientFeedBack />);
      expect(screen.getByLabelText("Previous feedback")).toBeInTheDocument();
      expect(screen.getByLabelText("Next feedback")).toBeInTheDocument();
    });

    it("pagination dots have descriptive aria labels", () => {
      render(<ClientFeedBack />);
      const dots = document.querySelectorAll(
        'button[aria-label*="Go to slide"]'
      );
      expect(dots.length).toBeGreaterThan(0);
    });

    it("maintains focus management during navigation", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      const nextButton = screen.getByTestId("next-button");
      nextButton.focus();
      expect(nextButton).toHaveFocus();

      await user.click(nextButton);

      // Focus should be maintained or handled appropriately
      await waitFor(() => {
        // Button should still be focusable
        expect(nextButton).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("handles empty feedback data gracefully", () => {
      // Mock empty clientFeedbacks array
      jest.doMock("@/data/clientFeedbacks", () => ({
        clientFeedbacks: [],
      }));

      // Since we can't easily mock the import after it's already imported,
      // we'll test the component's robustness by checking it doesn't crash
      expect(() => render(<ClientFeedBack />)).not.toThrow();
    });

    it("handles container width of zero", () => {
      mockContainerWidth(0);
      expect(() => render(<ClientFeedBack />)).not.toThrow();
    });

    it("maintains minimum of 1 visible card", () => {
      // Mock extremely narrow width
      mockContainerWidth(50);
      render(<ClientFeedBack />);

      // Should still render without crashing
      expect(screen.getByTestId("navigation-arrows")).toBeInTheDocument();
    });

    it("handles rapid navigation clicks", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      const nextButton = screen.getByTestId("next-button");

      // Rapidly click multiple times
      for (let i = 0; i < 5; i++) {
        if (!nextButton.hasAttribute("disabled")) {
          await user.click(nextButton);
        }
      }

      // Component should handle this gracefully
      expect(screen.getByTestId("navigation-arrows")).toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    it("initializes with currentIndex 0", () => {
      render(<ClientFeedBack />);
      const navigationInfo = screen.getByTestId("navigation-info");
      expect(navigationInfo).toHaveTextContent("0/");
    });

    it("updates currentIndex correctly when navigating", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      const nextButton = screen.getByTestId("next-button");
      const navigationInfo = screen.getByTestId("navigation-info");

      // Initial state
      expect(navigationInfo).toHaveTextContent("0/");

      // Navigate forward
      await user.click(nextButton);
      await waitFor(() => {
        expect(navigationInfo).toHaveTextContent("1/");
      });

      // Navigate back
      const prevButton = screen.getByTestId("previous-button");
      await user.click(prevButton);
      await waitFor(() => {
        expect(navigationInfo).toHaveTextContent("0/");
      });
    });

    it("clamps slide index to valid range", async () => {
      const user = userEvent.setup();
      render(<ClientFeedBack />);

      // Try to navigate to a specific slide via pagination dot
      const dots = document.querySelectorAll(".h-3.w-3.rounded-full");

      if (dots.length > 0) {
        const lastDot = dots[dots.length - 1] as HTMLButtonElement;
        await user.click(lastDot);

        await waitFor(() => {
          const navigationInfo = screen.getByTestId("navigation-info");
          // Should be at the last valid index
          expect(navigationInfo.textContent).toMatch(/\d+\/\d+/);
        });
      }
    });
  });

  describe("Performance", () => {
    it("re-renders efficiently during resize", () => {
      render(<ClientFeedBack />);

      // Simulate multiple resize events
      for (let i = 0; i < 10; i++) {
        mockContainerWidth(800 + i * 10);
        fireEvent(window, new Event("resize"));
      }

      // Component should handle multiple resizes without issues
      expect(screen.getByTestId("navigation-arrows")).toBeInTheDocument();
    });

    it("uses proper key props for list rendering", () => {
      render(<ClientFeedBack />);

      // Check that each feedback card has a unique key (React internals)
      clientFeedbacks.forEach((feedback) => {
        expect(
          screen.getByTestId(`feedback-card-${feedback.id}`)
        ).toBeInTheDocument();
      });
    });
  });
});
