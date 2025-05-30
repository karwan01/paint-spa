import { CompanyService } from "@/types/CompanyServiceTypes";
import { render, screen } from "@testing-library/react";
import ServiceCard from "./ServiceCard";

const mockService: CompanyService = {
  id: 1,
  name: "Digital Marketing",
  description:
    "Comprehensive digital marketing strategies to boost your online presence and drive targeted traffic to your business.",
  img: "/icons/marketing.svg",
};

describe("ServiceCard Component", () => {
  beforeEach(() => {
    render(<ServiceCard service={mockService} />);
  });

  describe("Structure and Layout", () => {
    it("renders the main card container with correct classes", () => {
      const cardContainer = document.querySelector(".group");
      expect(cardContainer).toHaveClass(
        "group",
        "flex",
        "flex-col",
        "items-center",
        "text-center",
        "transition-all",
        "duration-300"
      );
    });

    it("renders the white rectangle container with proper styling", () => {
      const whiteContainer = document.querySelector(".bg-background");
      expect(whiteContainer).toHaveClass(
        "bg-background",
        "mb-6",
        "flex",
        "h-38",
        "w-38",
        "items-center",
        "justify-center",
        "rounded-md",
        "shadow-sm",
        "transition-all",
        "duration-300",
        "hover:shadow-md"
      );
    });

    it("renders the circular icon container with proper styling", () => {
      const iconContainer = document.querySelector(".bg-primary");
      expect(iconContainer).toHaveClass(
        "bg-primary",
        "flex",
        "h-36",
        "w-36",
        "items-center",
        "justify-center",
        "rounded-full",
        "transition-all",
        "duration-300",
        "group-hover:scale-105"
      );
    });
  });

  describe("Content Elements", () => {
    it("renders the service name as heading with responsive text sizing", () => {
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Digital Marketing");
      expect(heading).toHaveClass(
        "group-hover:text-primary",
        "text-background",
        "text-[16px]",
        "font-semibold",
        "transition-colors",
        "duration-300",
        "lg:text-[21px]"
      );
    });

    it("renders the service description with responsive text sizing", () => {
      const description = screen.getByText(
        /Comprehensive digital marketing strategies/
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass(
        "text-secondary",
        "text-[14px]",
        "leading-relaxed",
        "lg:text-[18px]"
      );
    });

    it("renders the service icon with correct attributes and styling", () => {
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src", "/icons/marketing.svg");
      expect(icon).toHaveAttribute("alt", "Digital Marketing icon");
      expect(icon).toHaveAttribute("width", "64");
      expect(icon).toHaveAttribute("height", "64");
      expect(icon).toHaveClass(
        "h-16",
        "w-16",
        "brightness-0",
        "invert",
        "transition-transform",
        "duration-300",
        "group-hover:scale-110"
      );
    });
  });

  describe("Interactive Effects", () => {
    it("has transition classes for main container hover effects", () => {
      const cardContainer = document.querySelector(".group");
      expect(cardContainer).toHaveClass("transition-all", "duration-300");
    });

    it("has white container with hover shadow effects", () => {
      const whiteContainer = document.querySelector(".bg-background");
      expect(whiteContainer).toHaveClass(
        "transition-all",
        "duration-300",
        "hover:shadow-md"
      );
    });

    it("has icon container with hover scale effects", () => {
      const iconContainer = document.querySelector(".bg-primary");
      expect(iconContainer).toHaveClass(
        "transition-all",
        "duration-300",
        "group-hover:scale-105"
      );
    });

    it("has icon with hover scale effects", () => {
      const icon = screen.getByRole("img");
      expect(icon).toHaveClass(
        "transition-transform",
        "duration-300",
        "group-hover:scale-110"
      );
    });

    it("has heading with hover color change", () => {
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveClass(
        "group-hover:text-primary",
        "transition-colors",
        "duration-300"
      );
    });
  });

  describe("Design System Colors", () => {
    it("uses proper design system color classes", () => {
      const whiteContainer = document.querySelector(".bg-background");
      const iconContainer = document.querySelector(".bg-primary");
      const heading = screen.getByRole("heading", { level: 3 });
      const description = screen.getByText(
        /Comprehensive digital marketing strategies/
      );

      expect(whiteContainer).toHaveClass("bg-background");
      expect(iconContainer).toHaveClass("bg-primary");
      expect(heading).toHaveClass("text-background");
      expect(description).toHaveClass("text-secondary");
    });

    it("applies brightness and invert filters for white icon effect", () => {
      const icon = screen.getByRole("img");
      expect(icon).toHaveClass("brightness-0", "invert");
    });
  });

  describe("Responsive Design", () => {
    it("has responsive text sizing with specific pixel values", () => {
      const heading = screen.getByRole("heading", { level: 3 });
      const description = screen.getByText(
        /Comprehensive digital marketing strategies/
      );

      // Check for responsive text classes
      expect(heading).toHaveClass("text-[16px]", "lg:text-[21px]");
      expect(description).toHaveClass("text-[14px]", "lg:text-[18px]");
    });

    it("has proper spacing structure", () => {
      const contentContainer = document.querySelector(".space-y-3");
      expect(contentContainer).toHaveClass("space-y-3");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML structure", () => {
      expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("has descriptive alt text for icon", () => {
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("alt", "Digital Marketing icon");
    });

    it("renders all text content accessibly", () => {
      expect(screen.getByText("Digital Marketing")).toBeInTheDocument();
      expect(
        screen.getByText(/Comprehensive digital marketing strategies/)
      ).toBeInTheDocument();
    });

    it("uses proper heading hierarchy", () => {
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Icon Sizing and Layout", () => {
    it("renders icon with correct 64px dimensions", () => {
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "64");
      expect(icon).toHaveAttribute("height", "64");
    });

    it("has proper container sizing for design specifications", () => {
      // White rectangle: 152px (equivalent to h-38 w-38)
      const whiteContainer = document.querySelector(".bg-background");
      expect(whiteContainer).toHaveClass("h-38", "w-38");

      // Circular container: 143px (equivalent to h-36 w-36)
      const iconContainer = document.querySelector(".bg-primary");
      expect(iconContainer).toHaveClass("h-36", "w-36");
    });
  });
});
