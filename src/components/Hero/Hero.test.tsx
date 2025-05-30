import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero Component", () => {
  beforeEach(() => {
    render(<Hero />);
  });

  describe("Text Content", () => {
    it("renders the main heading correctly", () => {
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      // The actual rendered text includes a space between Creative and Marketing
      expect(heading).toHaveTextContent(
        "Transform your business with our Creative Marketing Solutions!"
      );
    });

    it("renders the description paragraph", () => {
      const description = screen.getByText(
        /Welcome to Focus Marketing Solutions!/
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(
        "Welcome to Focus Marketing Solutions! We're a creative team dedicated to driving your business forward with innovative marketing strategies. From digital marketing to social media management, we're here to help you succeed. Let's build something extraordinary together"
      );
    });

    it('highlights "Creative" and "Marketing Solutions" text with primary color', () => {
      const creativeSpan = screen.getByText("Creative");
      const marketingSolutionsSpan = screen.getByText("Marketing Solutions!");

      expect(creativeSpan).toHaveClass("text-gradient");
      expect(marketingSolutionsSpan).toHaveClass("text-gradient");
    });
  });

  describe("Call-to-Action Buttons", () => {
    it('renders the primary "Join us" button with correct props', () => {
      const joinButton = screen.getByTestId("primary-button");
      expect(joinButton).toBeInTheDocument();
      expect(joinButton).toHaveTextContent("Join us");
      expect(joinButton).toHaveAttribute("data-variant", "primary");
      expect(joinButton).toHaveAttribute("data-size", "lg");
      expect(joinButton).toHaveAttribute("data-radius", "full");
    });

    it('renders the outlined "Contact us" button with correct props', () => {
      const contactButton = screen.getByTestId("outlined-button");
      expect(contactButton).toBeInTheDocument();
      expect(contactButton).toHaveTextContent("Contact us");
      expect(contactButton).toHaveAttribute("data-variant", "surface");
      expect(contactButton).toHaveAttribute("data-size", "lg");
      expect(contactButton).toHaveAttribute("data-radius", "full");
    });
  });

  describe("Images", () => {
    it("renders the main hero image with priority loading", () => {
      // Images now preserve their actual alt text
      const mainHeroImage = screen.getByAltText(
        "Professional painting service showcase"
      );
      expect(mainHeroImage).toBeInTheDocument();
      expect(mainHeroImage).toHaveAttribute("src", "/hero/right-hero.svg");
      expect(mainHeroImage).toHaveAttribute("width", "535");
      expect(mainHeroImage).toHaveAttribute("height", "445");
    });

    it("renders the left bottom decorative image", () => {
      const decorativeImages = screen.getAllByAltText(
        "Decorative design element"
      );
      const leftBottomImage = decorativeImages.find(
        (img) => img.getAttribute("src") === "/hero/left-hero-below-texts.svg"
      );
      expect(leftBottomImage).toBeInTheDocument();
      expect(leftBottomImage).toHaveAttribute(
        "src",
        "/hero/left-hero-below-texts.svg"
      );
      expect(leftBottomImage).toHaveAttribute("width", "488");
      expect(leftBottomImage).toHaveAttribute("height", "356");
    });

    it("renders the right bottom decorative image", () => {
      const decorativeImages = screen.getAllByAltText(
        "Decorative design element"
      );
      const rightBottomImage = decorativeImages.find(
        (img) => img.getAttribute("src") === "/hero/right-hero-bottom.svg"
      );

      expect(rightBottomImage).toBeInTheDocument();
      expect(rightBottomImage).toHaveAttribute("width", "312");
      expect(rightBottomImage).toHaveAttribute("height", "394");
    });
  });

  describe("Layout and Styling", () => {
    it("renders with correct section classes", () => {
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass(
        "relative",
        "flex",
        "min-h-screen",
        "items-center",
        "overflow-hidden"
      );
    });

    it("has responsive layout classes on content containers", () => {
      const leftContent = document.querySelector(".lg\\:order-1");
      const rightContent = document.querySelector(".lg\\:order-2");

      expect(leftContent).toBeInTheDocument();
      expect(rightContent).toBeInTheDocument();
    });

    it("renders the dark gradient overlay with correct styling", () => {
      const gradientOverlay = document.querySelector(
        '[style*="linear-gradient"]'
      );
      expect(gradientOverlay).toBeInTheDocument();
      expect(gradientOverlay).toHaveClass(
        "lg:absolute",
        "bottom-0",
        "h-[220px]"
      );
    });
  });

  describe("Responsive Behavior", () => {
    it("hides decorative images on small screens", () => {
      const leftBottomContainer = document.querySelector(".hidden.lg\\:block");
      const rightContentContainer = document.querySelector(".hidden.lg\\:flex");

      expect(leftBottomContainer).toBeInTheDocument();
      expect(rightContentContainer).toBeInTheDocument();
    });

    it("applies responsive text alignment classes", () => {
      const textContainer = document.querySelector(
        ".text-center.lg\\:text-left"
      );
      expect(textContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it("provides meaningful alt text for all images", () => {
      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
        expect(img.getAttribute("alt")).not.toBe("");
      });
    });

    it("uses semantic HTML structure", () => {
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
    });
  });
});
