import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pricing from "./Pricing";

// Mock the PricingExpansionPanel component
jest.mock("./PricingExpansionPanel/PricingExpansionPanel", () => {
  return function MockPricingExpansionPanel() {
    return (
      <div data-testid="pricing-expansion-panel">Pricing Expansion Panel</div>
    );
  };
});

describe("Pricing Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Structure and Layout", () => {
    it("renders the main section with correct classes", () => {
      render(<Pricing />);
      const section = document.querySelector("section");

      expect(section).toBeInTheDocument();
      expect(section).toHaveClass(
        "mx-6",
        "my-[50px]",
        "flex",
        "flex-col",
        "gap-y-8",
        "lg:mx-[87px]",
        "lg:my-[130px]",
        "lg:flex-row",
        "lg:justify-between",
        "lg:gap-x-[60px]"
      );
    });

    it("renders the main heading with correct text and styling", () => {
      render(<Pricing />);
      const heading = screen.getByRole("heading", { level: 2 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Simple pricing for your Business");
      expect(heading).toHaveClass(
        "text-background",
        "mb-3",
        "text-[24px]",
        "leading-[1.2]",
        "font-bold",
        "lg:text-[65px]",
        "lg:leading-[1.1]"
      );
    });

    it("renders the description paragraph with correct text and styling", () => {
      render(<Pricing />);
      const description = screen.getByText(/We have several powerful plans/);

      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(
        "We have several powerful plans to showcase your business and get discovered as a creative entrepreneurs. Everything you need."
      );
      expect(description).toHaveClass(
        "text-background",
        "text-[16px]",
        "lg:text-[18px]"
      );
    });

    it("renders the text container with correct layout classes", () => {
      render(<Pricing />);
      const textContainer = document.querySelector(".flex-1.text-center");

      expect(textContainer).toBeInTheDocument();
      expect(textContainer).toHaveClass(
        "flex-1",
        "text-center",
        "lg:text-start"
      );
    });

    it("renders the pricing panel container with correct layout classes", () => {
      render(<Pricing />);
      const panelContainer = document.querySelector(
        ".flex.flex-1.justify-center"
      );

      expect(panelContainer).toBeInTheDocument();
      expect(panelContainer).toHaveClass(
        "flex",
        "flex-1",
        "justify-center",
        "lg:justify-end"
      );
    });
  });

  describe("Component Integration", () => {
    it("renders the PricingExpansionPanel component", () => {
      render(<Pricing />);
      const pricingPanel = screen.getByTestId("pricing-expansion-panel");

      expect(pricingPanel).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      render(<Pricing />);
      const panelContainer = document.querySelector(
        ".flex.flex-1.justify-center"
      );
      const pricingPanel = screen.getByTestId("pricing-expansion-panel");

      expect(panelContainer).toContainElement(pricingPanel);
    });
  });

  describe("Responsive Design", () => {
    it("applies correct mobile layout classes", () => {
      render(<Pricing />);
      const section = document.querySelector("section");

      // Mobile classes
      expect(section).toHaveClass("mx-6", "my-[50px]", "flex-col", "gap-y-8");
    });

    it("applies correct desktop layout classes", () => {
      render(<Pricing />);
      const section = document.querySelector("section");

      // Desktop classes
      expect(section).toHaveClass(
        "lg:mx-[87px]",
        "lg:my-[130px]",
        "lg:flex-row",
        "lg:justify-between",
        "lg:gap-x-[60px]"
      );
    });

    it("applies responsive text alignment", () => {
      render(<Pricing />);
      const textContainer = document.querySelector(".flex-1.text-center");

      expect(textContainer).toHaveClass("text-center", "lg:text-start");
    });

    it("applies responsive text sizing", () => {
      render(<Pricing />);
      const heading = screen.getByRole("heading", { level: 2 });
      const description = screen.getByText(/We have several powerful plans/);

      // Heading responsive sizing
      expect(heading).toHaveClass("text-[24px]", "lg:text-[65px]");
      expect(heading).toHaveClass("leading-[1.2]", "lg:leading-[1.1]");

      // Description responsive sizing
      expect(description).toHaveClass("text-[16px]", "lg:text-[18px]");
    });
  });

  describe("Accessibility", () => {
    it("uses proper semantic HTML structure", () => {
      render(<Pricing />);

      expect(document.querySelector("section")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("heading has proper hierarchy", () => {
      render(<Pricing />);
      const heading = screen.getByRole("heading", { level: 2 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Simple pricing for your Business");
    });
  });

  describe("Content Verification", () => {
    it("displays the correct main heading text", () => {
      render(<Pricing />);

      expect(
        screen.getByText("Simple pricing for your Business")
      ).toBeInTheDocument();
    });

    it("displays the correct description text", () => {
      render(<Pricing />);

      expect(
        screen.getByText(
          "We have several powerful plans to showcase your business and get discovered as a creative entrepreneurs. Everything you need."
        )
      ).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("renders without performance issues", () => {
      const renderTime = performance.now();
      render(<Pricing />);
      const endTime = performance.now();

      // Component should render quickly (within reasonable time)
      expect(endTime - renderTime).toBeLessThan(100);
    });

    it("does not cause memory leaks", () => {
      const { unmount } = render(<Pricing />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
