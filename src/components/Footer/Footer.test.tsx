import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock react-icons
jest.mock("react-icons/fa", () => ({
  FaFacebook: () => <div data-testid="facebook-icon">Facebook Icon</div>,
  FaInstagram: () => <div data-testid="instagram-icon">Instagram Icon</div>,
  FaLinkedin: () => <div data-testid="linkedin-icon">LinkedIn Icon</div>,
}));

describe("Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText("What are you waiting for?")).toBeInTheDocument();
  });

  it("renders the main CTA heading", () => {
    render(<Footer />);
    expect(screen.getByText("What are you waiting for?")).toBeInTheDocument();
  });

  it("renders the CTA description text", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "Register now to get the best delivery experience for you and your clients in Iraq!"
      )
    ).toBeInTheDocument();
  });

  it("renders the email input field", () => {
    render(<Footer />);
    const emailInput = screen.getByPlaceholderText("Your email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toBeRequired();
  });

  it("renders the register button", () => {
    render(<Footer />);
    const registerButtons = screen.getAllByText(/register now/i);
    expect(registerButtons.length).toBeGreaterThan(0);
  });

  it("handles email input changes", () => {
    render(<Footer />);
    const emailInput = screen.getByPlaceholderText("Your email");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("renders the company logo", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Paint Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo/logo.svg");
  });

  it("renders navigation links", () => {
    render(<Footer />);

    const navLinks = [
      "The company",
      "Who are we",
      "Services",
      "Jobs",
      "Branches",
    ];

    navLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders jobs link with badge", () => {
    render(<Footer />);
    expect(screen.getByText("Jobs")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders help center links", () => {
    render(<Footer />);

    const helpLinks = [
      "Help center",
      "Common questions",
      "Contact us",
      "Register as merchant",
    ];

    helpLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it("renders social media buttons", () => {
    render(<Footer />);

    const socialButtons = ["Facebook", "Instagram", "LinkedIn"];

    socialButtons.forEach((social) => {
      expect(screen.getByText(social)).toBeInTheDocument();
    });
  });

  it("renders React Icons for social media", () => {
    render(<Footer />);

    // Check that React Icons are rendered
    expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-icon")).toBeInTheDocument();
    expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
  });

  it("social media buttons have correct attributes", () => {
    render(<Footer />);

    const facebookLink = screen.getByText("Facebook").closest("a");
    const instagramLink = screen.getByText("Instagram").closest("a");
    const linkedinLink = screen.getByText("LinkedIn").closest("a");

    expect(facebookLink).toHaveAttribute("target", "_blank");
    expect(facebookLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "© 2024 Leader Express Delivery Company. All rights reserved."
      )
    ).toBeInTheDocument();
  });

  it("has proper footer semantic structure", () => {
    render(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("applies correct CSS classes for primary background", () => {
    render(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer).toHaveClass("bg-primary");
  });

  it("has responsive design classes", () => {
    render(<Footer />);

    // Check for responsive grid classes on the main grid container
    const gridContainer = document.querySelector(".lg\\:grid.lg\\:grid-cols-4");
    expect(gridContainer).toBeInTheDocument();
  });

  it("email input has proper styling classes", () => {
    render(<Footer />);
    const emailInput = screen.getByPlaceholderText("Your email");

    expect(emailInput).toHaveClass("rounded-full", "bg-background/95");
  });

  it("prevents form submission with empty email", () => {
    render(<Footer />);
    const form = document.querySelector("form");
    const emailInput = screen.getByPlaceholderText("Your email");

    expect(emailInput).toBeRequired();

    // Try to submit empty form
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    form?.dispatchEvent(submitEvent);

    // Form should not submit due to HTML5 validation
    expect(emailInput).toBeInvalid();
  });

  it("renders navigation links with hover styles", () => {
    render(<Footer />);
    const companyLink = screen.getByText("The company");

    expect(companyLink).toHaveClass(
      "text-background",
      "hover:text-background",
      "transition-colors"
    );
  });

  it("social buttons have proper styling", () => {
    render(<Footer />);
    const facebookButton = screen.getByText("Facebook").closest("a");

    expect(facebookButton).toHaveClass(
      "flex",
      "items-center",
      "gap-3",
      "bg-white/20",
      "hover:bg-white/30",
      "rounded-full"
    );
  });

  describe("Responsive behavior", () => {
    it("shows grid layout on desktop", () => {
      render(<Footer />);

      // Desktop layout should use CSS Grid
      const gridContainer = document.querySelector(
        ".lg\\:grid.lg\\:grid-cols-4"
      );
      expect(gridContainer).toHaveClass("lg:grid", "lg:grid-cols-4");
    });
  });

  describe("Form validation", () => {
    it("requires valid email format", () => {
      render(<Footer />);
      const emailInput = screen.getByPlaceholderText("Your email");

      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      expect(emailInput).toBeInvalid();

      fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
      expect(emailInput).toBeValid();
    });
  });
});
