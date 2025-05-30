import { render, screen } from "@testing-library/react";
import AboutUs from "./AboutUs";

describe("AboutUs Component", () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  describe("Structure and Layout", () => {
    it("renders the main section with correct classes", () => {
      const section = document.querySelector("section");
      expect(section).toHaveClass(
        "text-background",
        "item-center",
        "relative",
        "flex",
        "min-h-screen",
        "justify-center",
        "overflow-hidden",
        "lg:min-h-[626px]"
      );
    });

    it("renders the content container with proper responsive classes", () => {
      const contentContainer = document.querySelector(".relative.z-10");
      expect(contentContainer).toHaveClass(
        "relative",
        "z-10",
        "flex",
        "min-h-screen",
        "items-center",
        "justify-center",
        "px-4",
        "sm:px-6",
        "lg:min-h-fit",
        "lg:px-8"
      );
    });
  });

  describe("Background Elements", () => {
    it("renders background for small screens with correct styling", () => {
      const smallScreenBg = document.querySelector(".lg\\:hidden");

      expect(smallScreenBg).toBeInTheDocument();
      expect(smallScreenBg).toHaveStyle({
        backgroundImage: "url('/about-us/lines-bg-sm.svg')",
      });
      expect(smallScreenBg).toHaveClass(
        "absolute",
        "h-full",
        "w-full",
        "bg-contain",
        "bg-no-repeat",
        "lg:hidden"
      );
    });

    it("renders background for large screens with correct styling", () => {
      const largeScreenBg = document.querySelector(".lg\\:block");

      expect(largeScreenBg).toBeInTheDocument();
      expect(largeScreenBg).toHaveStyle({
        backgroundImage: "url('/about-us/lines-bg.svg')",
      });
      expect(largeScreenBg).toHaveClass(
        "absolute",
        "hidden",
        "h-full",
        "w-full",
        "bg-contain",
        "bg-no-repeat",
        "lg:block"
      );
    });
  });

  describe("Content Elements", () => {
    it("renders the main heading with correct text and styling", () => {
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("About Us");
      expect(heading).toHaveClass(
        "text-background",
        "mb-[4px]",
        "text-[18px]",
        "font-bold",
        "lg:mb-[32px]",
        "lg:text-[48px]"
      );
    });

    it("renders the description paragraph with correct styling", () => {
      const paragraph = screen.getByText(/Welcome to/);
      expect(paragraph).toHaveClass(
        "text-justify",
        "text-[16px]",
        "leading-[2]",
        "lg:text-[20px]",
        "lg:leading-[1.5]"
      );
    });

    it("renders the complete description text", () => {
      expect(screen.getByText(/Welcome to/)).toBeInTheDocument();
      expect(
        screen.getByText("Focus Marketing Solutions!")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We're a creative team dedicated to driving/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/From digital marketing to social media management/)
      ).toBeInTheDocument();
      expect(
        screen.getByText("Let's build something extraordinary together.")
      ).toBeInTheDocument();
    });

    it("renders highlighted text spans with primary color class", () => {
      const primarySpans = screen.getAllByText((content, element) => {
        return element?.classList.contains("text-primary") || false;
      });

      expect(primarySpans).toHaveLength(2);
      expect(primarySpans[0]).toHaveTextContent("Focus Marketing Solutions!");
      expect(primarySpans[1]).toHaveTextContent(
        "Let's build something extraordinary together."
      );
    });
  });

  describe("Button Component", () => {
    it("renders the OutlinedButton with correct props", () => {
      const button = screen.getByTestId("outlined-button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Read more");
      expect(button).toHaveAttribute("data-variant", "primary");
      expect(button).toHaveAttribute("data-size", "lg");
      expect(button).toHaveAttribute("data-radius", "full");
    });

    it("renders button container with correct responsive flex classes", () => {
      const buttonContainer = screen
        .getByTestId("outlined-button")
        .closest(".flex");
      expect(buttonContainer).toHaveClass(
        "flex",
        "flex-col",
        "lg:flex-row",
        "lg:justify-center"
      );
    });
  });

  describe("Responsive Design", () => {
    it("has different margin bottom classes for description on mobile and desktop", () => {
      const descriptionContainer = screen
        .getByText(/Welcome to/)
        .closest("div");
      expect(descriptionContainer).toHaveClass("mb-[80px]", "lg:mb-10");
    });

    it("has responsive text sizes for the heading", () => {
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-[18px]", "lg:text-[48px]");
    });

    it("has responsive text sizes for the paragraph", () => {
      const paragraph = screen.getByText(/Welcome to/);
      expect(paragraph).toHaveClass("text-[16px]", "lg:text-[20px]");
    });

    it("has responsive line heights for the paragraph", () => {
      const paragraph = screen.getByText(/Welcome to/);
      expect(paragraph).toHaveClass("leading-[2]", "lg:leading-[1.5]");
    });

    it("has responsive padding for content container", () => {
      const contentContainer = document.querySelector(".relative.z-10");
      expect(contentContainer).toHaveClass("px-4", "sm:px-6", "lg:px-8");
    });

    it("has responsive minimum heights", () => {
      const section = document.querySelector("section");
      expect(section).toHaveClass("min-h-screen", "lg:min-h-[626px]");

      const contentContainer = document.querySelector(".relative.z-10");
      expect(contentContainer).toHaveClass("min-h-screen", "lg:min-h-fit");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML structure", () => {
      expect(document.querySelector("section")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("has proper text contrast classes", () => {
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-background");
    });

    it("renders all text content accessibly", () => {
      expect(screen.getByText("About Us")).toBeInTheDocument();
      expect(screen.getByText("Read more")).toBeInTheDocument();
      expect(screen.getByText(/Welcome to/)).toBeInTheDocument();
      expect(
        screen.getByText("Focus Marketing Solutions!")
      ).toBeInTheDocument();
    });
  });
});
