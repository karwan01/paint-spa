import { ClientFeedBack } from "@/types/ClientFeedBack";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ClientFeedbackCard from "./FeedBackCard";

// Mock React Icons
jest.mock("react-icons/bi", () => ({
  BiSolidQuoteAltLeft: () => <div data-testid="quote-icon">Quote Icon</div>,
}));

describe("ClientFeedbackCard Component", () => {
  const mockFeedbackWithImage: ClientFeedBack = {
    id: 1,
    name: "John Doe",
    image: "/test-profile.jpg",
    quote:
      "This is a fantastic service that exceeded all my expectations. Highly recommended!",
  };

  const mockFeedbackWithoutImage: ClientFeedBack = {
    id: 2,
    name: "Jane Smith",
    quote:
      "Professional and reliable service. The team went above and beyond to help me.",
  };

  const mockFeedbackLongName: ClientFeedBack = {
    id: 3,
    name: "Alexander Benjamin Christopher Davidson",
    quote: "Great experience overall.",
  };

  describe("Structure and Layout", () => {
    it("renders the main card container with correct classes", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer).toHaveClass(
        "bg-on-background",
        "relative",
        "flex",
        "flex-col",
        "overflow-hidden",
        "rounded-2xl",
        "p-6",
        "shadow-xl",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });

    it("renders content with proper z-index and layout", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const contentContainer = document.querySelector(".relative.z-10");
      expect(contentContainer).toHaveClass(
        "relative",
        "z-10",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });

    it("renders profile section with correct flex layout", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const profileSection = document.querySelector(".mb-4.flex.flex-col");
      expect(profileSection).toHaveClass(
        "mb-4",
        "flex",
        "flex-col",
        "items-start",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });
  });

  describe("Profile Image Rendering", () => {
    it("renders profile image when image prop is provided", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const profileImage = screen.getByRole("img");
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute("src", "/test-profile.jpg");
      expect(profileImage).toHaveAttribute("alt", "John Doe");
      expect(profileImage).toHaveAttribute("width", "48");
      expect(profileImage).toHaveAttribute("height", "48");
      expect(profileImage).toHaveClass("h-12", "w-12");
    });

    it("renders avatar with initials when no image is provided", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithoutImage} />);

      // Should show avatar with initials
      const avatar = document.querySelector(".bg-gradient-to-br");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass(
        "flex",
        "h-12",
        "w-12",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-gradient-to-br",
        "from-gray-300",
        "to-gray-500",
        "text-sm",
        "font-semibold",
        "text-gray-700",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );

      // Should display initials "JS" for "Jane Smith"
      expect(avatar).toHaveTextContent("JS");
    });

    it("generates correct initials from name", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackLongName} />);

      const avatar = document.querySelector(".bg-gradient-to-br");
      // Should display "ABCD" for "Alexander Benjamin Christopher Davidson"
      expect(avatar).toHaveTextContent("ABCD");
    });

    it("renders quote icon overlay for avatar", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithoutImage} />);

      const quoteIcon = screen.getByTestId("quote-icon");
      expect(quoteIcon).toBeInTheDocument();

      const quoteOverlay = quoteIcon.closest(".absolute");
      expect(quoteOverlay).toHaveClass(
        "absolute",
        "top-[-2px]",
        "right-[-10px]",
        "flex",
        "h-5",
        "w-5",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-teal-400",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });
  });

  describe("Text Content", () => {
    it("renders client name with correct styling", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const clientName = screen.getByText("John Doe");
      expect(clientName).toBeInTheDocument();
      expect(clientName).toHaveClass(
        "text-background",
        "text-base",
        "font-bold",
        "transition-all",
        "duration-300",
        "ease-in-out"
      );
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className prop", () => {
      const customClass = "custom-test-class";
      render(
        <ClientFeedbackCard
          clientFeedBack={mockFeedbackWithImage}
          className={customClass}
        />
      );

      const cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer).toHaveClass(customClass);
    });

    it("handles empty className prop", () => {
      render(
        <ClientFeedbackCard
          clientFeedBack={mockFeedbackWithImage}
          className=""
        />
      );

      const cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer).toBeInTheDocument();
    });

    it("handles undefined className prop", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive text sizing for quote", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const blockquote = document.querySelector("blockquote");
      expect(blockquote).toHaveClass("text-[16px]", "lg:text-[18px]");
    });

    it("maintains proper spacing and padding across breakpoints", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer).toHaveClass("p-6");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML structure", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      // Should use proper heading for name
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("John Doe");

      // Should use blockquote for quote
      const blockquote = document.querySelector("blockquote");
      expect(blockquote).toBeInTheDocument();
    });

    it("provides proper alt text for profile images", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const profileImage = screen.getByRole("img");
      expect(profileImage).toHaveAttribute("alt", "John Doe");
    });

    it("maintains readable text contrast", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const name = screen.getByText("John Doe");
      const quote = document.querySelector("blockquote");

      expect(name).toHaveClass("text-background");
      expect(quote).toHaveClass("text-background");
    });
  });

  describe("Animation and Transitions", () => {
    it("applies transition classes to all animated elements", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const cardContainer = document.querySelector(".bg-on-background");
      const contentContainer = document.querySelector(".relative.z-10");
      const profileSection = document.querySelector(".mb-4.flex.flex-col");
      const name = screen.getByText("John Doe");
      const blockquote = document.querySelector("blockquote");

      [
        cardContainer,
        contentContainer,
        profileSection,
        name,
        blockquote,
      ].forEach((element) => {
        expect(element).toHaveClass(
          "transition-all",
          "duration-300",
          "ease-in-out"
        );
      });
    });

    it("applies hover and focus states correctly", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer).toHaveClass("transition-all");
    });
  });

  describe("Edge Cases", () => {
    it("handles very long names correctly", () => {
      const feedbackLongName: ClientFeedBack = {
        id: 6,
        name: "This Is A Very Very Long Name That Might Cause Layout Issues If Not Handled Properly",
        quote: "Test quote",
      };

      render(<ClientFeedbackCard clientFeedBack={feedbackLongName} />);

      const name = screen.getByText(feedbackLongName.name);
      expect(name).toBeInTheDocument();

      // Should not break layout
      const cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer).toBeInTheDocument();
    });

    it("handles single character names for initials", () => {
      const feedbackSingleChar: ClientFeedBack = {
        id: 8,
        name: "A",
        quote: "Short name test",
      };

      render(<ClientFeedbackCard clientFeedBack={feedbackSingleChar} />);

      const avatar = document.querySelector(".bg-gradient-to-br");
      expect(avatar).toHaveTextContent("A");
    });
  });

  describe("Integration", () => {
    it("works correctly with Next.js Image component", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />);

      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "/test-profile.jpg");
      expect(image).toHaveAttribute("width", "48");
      expect(image).toHaveAttribute("height", "48");
    });

    it("works correctly with React Icons", () => {
      render(<ClientFeedbackCard clientFeedBack={mockFeedbackWithoutImage} />);

      const quoteIcon = screen.getByTestId("quote-icon");
      expect(quoteIcon).toBeInTheDocument();
    });

    it("maintains consistent styling across different data scenarios", () => {
      const { rerender } = render(
        <ClientFeedbackCard clientFeedBack={mockFeedbackWithImage} />
      );

      let cardContainer = document.querySelector(".bg-on-background");
      const initialClasses = cardContainer?.className;

      rerender(
        <ClientFeedbackCard clientFeedBack={mockFeedbackWithoutImage} />
      );

      cardContainer = document.querySelector(".bg-on-background");
      expect(cardContainer?.className).toBe(initialClasses);
    });
  });
});
