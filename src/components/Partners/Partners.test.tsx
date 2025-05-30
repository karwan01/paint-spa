import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Partners from "./Partners";

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

beforeAll(() => {
  Object.defineProperty(window, "requestAnimationFrame", {
    value: mockRequestAnimationFrame,
    writable: true,
  });
  Object.defineProperty(window, "cancelAnimationFrame", {
    value: mockCancelAnimationFrame,
    writable: true,
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  mockRequestAnimationFrame.mockImplementation((callback) => {
    setTimeout(callback, 16); // Simulate 60fps
    return 1;
  });
});

describe("Partners Component", () => {
  it("renders the Partners section with title", () => {
    render(<Partners />);

    const title = screen.getByText("Our Partners");
    expect(title).toBeInTheDocument();
  });

  it("renders partner logos in auto-scrolling carousel", () => {
    render(<Partners />);

    // Check that partner images are rendered (using alt text since they're images now)
    const partnerImages = screen.getAllByRole("img");
    expect(partnerImages.length).toBeGreaterThan(0);

    // Check specific partner logos by alt text
    expect(screen.getAllByAltText("Creative Studios")).toHaveLength(2); // Duplicated for infinite scroll
    expect(screen.getAllByAltText("Design Hub")).toHaveLength(2);
    expect(screen.getAllByAltText("Art Collective")).toHaveLength(2);
  });

  it("has auto-scrolling container with proper styling", () => {
    render(<Partners />);

    // Check that the scrollable container exists with overflow hidden
    const scrollContainer = document.querySelector(".overflow-hidden");
    expect(scrollContainer).toBeInTheDocument();
    expect(scrollContainer).toHaveClass("whitespace-nowrap");
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

  it("starts auto-scrolling animation on mount", () => {
    render(<Partners />);

    // Verify that requestAnimationFrame is called to start the animation
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it("pauses animation on mouse enter and resumes on mouse leave", async () => {
    render(<Partners />);

    const scrollContainer = document.querySelector(".overflow-hidden");
    expect(scrollContainer).toBeInTheDocument();

    // Clear previous calls
    jest.clearAllMocks();

    // Mouse enter should pause animation
    fireEvent.mouseEnter(scrollContainer!);

    await waitFor(() => {
      expect(mockCancelAnimationFrame).toHaveBeenCalled();
    });

    // Mouse leave should resume animation
    fireEvent.mouseLeave(scrollContainer!);

    await waitFor(() => {
      expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });
  });

  it("duplicates partners for seamless infinite scroll", () => {
    render(<Partners />);

    // Each partner should appear twice (original + duplicate)
    const creativStudiosImages = screen.getAllByAltText("Creative Studios");
    expect(creativStudiosImages).toHaveLength(2);

    const designHubImages = screen.getAllByAltText("Design Hub");
    expect(designHubImages).toHaveLength(2);
  });

  it("carousel container has hidden scrollbars", () => {
    render(<Partners />);

    const scrollContainer = document.querySelector(".overflow-hidden");
    expect(scrollContainer).toBeInTheDocument();
    expect(scrollContainer).toHaveStyle({
      scrollbarWidth: "none",
    });
  });
});
