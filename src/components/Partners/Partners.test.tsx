import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Partners from "./Partners";

// Mock the useMarqueeSlider hook
const mockHandleMouseEnter = jest.fn();
const mockHandleMouseLeave = jest.fn();
const mockScrollContainerRef = { current: null };

jest.mock("@/hooks/marqueeSlider/useMarqueeSlider", () => ({
  useMarqueeSlider: jest.fn(() => ({
    scrollContainerRef: mockScrollContainerRef,
    duplicatedItems: [
      {
        id: 1,
        name: "Creative Studios",
        logo: "/partners/bmw-partner.svg",
        website: "#",
      },
      {
        id: 2,
        name: "Design Hub",
        logo: "/partners/nasa-partner.svg",
        website: "#",
      },
      {
        id: 3,
        name: "Art Collective",
        logo: "/partners/bmw-partner.svg",
        website: "#",
      },
      {
        id: 1,
        name: "Creative Studios",
        logo: "/partners/bmw-partner.svg",
        website: "#",
      },
      {
        id: 2,
        name: "Design Hub",
        logo: "/partners/nasa-partner.svg",
        website: "#",
      },
      {
        id: 3,
        name: "Art Collective",
        logo: "/partners/bmw-partner.svg",
        website: "#",
      },
    ],
    handleMouseEnter: mockHandleMouseEnter,
    handleMouseLeave: mockHandleMouseLeave,
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Partners Component", () => {
  it("renders the Partners section with title", () => {
    render(<Partners />);

    const title = screen.getByText("Our Partners");
    expect(title).toBeInTheDocument();
  });

  it("renders partner logos from hook's duplicated items", () => {
    render(<Partners />);

    // Check that partner images are rendered (using alt text since they're images now)
    const partnerImages = screen.getAllByRole("img");
    expect(partnerImages.length).toBeGreaterThan(0);

    // Check specific partner logos by alt text (from mocked duplicated items)
    expect(screen.getAllByAltText("Creative Studios")).toHaveLength(2);
    expect(screen.getAllByAltText("Design Hub")).toHaveLength(2);
    expect(screen.getAllByAltText("Art Collective")).toHaveLength(2);
  });

  it("has proper container structure and styling", () => {
    render(<Partners />);

    // Check that the scrollable container exists with overflow hidden
    const scrollContainer = document.querySelector(".overflow-hidden");
    expect(scrollContainer).toBeInTheDocument();
    expect(scrollContainer).toHaveClass("whitespace-nowrap");
    expect(scrollContainer).toHaveStyle({
      scrollbarWidth: "none",
    });
  });

  it("partner images have correct styling for carousel", () => {
    render(<Partners />);

    const partnerImages = screen.getAllByRole("img");
    expect(partnerImages.length).toBeGreaterThan(0);

    // Check that images have proper styling
    partnerImages.forEach((image) => {
      expect(image).toHaveClass("flex-shrink-0");
      expect(image).toHaveClass("cursor-pointer");
      expect(image).toHaveClass("inline-block");
    });
  });

  it("clicking on a partner image opens external link", () => {
    // Mock window.open
    const mockWindowOpen = jest.fn();
    Object.defineProperty(window, "open", {
      value: mockWindowOpen,
      writable: true,
    });

    render(<Partners />);

    // Find the first partner image and click it
    const partnerImage = screen.getAllByAltText("Creative Studios")[0];
    fireEvent.click(partnerImage);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      "#",
      "_blank",
      "noopener,noreferrer"
    );
  });

  it("integrates correctly with useMarqueeSlider hook", () => {
    render(<Partners />);

    // Verify hook handlers are connected to DOM events
    const scrollContainer = document.querySelector(".overflow-hidden");
    expect(scrollContainer).toBeInTheDocument();

    // Mouse enter should call hook handler
    fireEvent.mouseEnter(scrollContainer!);
    expect(mockHandleMouseEnter).toHaveBeenCalled();

    // Mouse leave should call hook handler
    fireEvent.mouseLeave(scrollContainer!);
    expect(mockHandleMouseLeave).toHaveBeenCalled();
  });
});
