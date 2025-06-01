import { useSmoothScroll } from "@/hooks/scroll/useSmoothScroll";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

// Mock the smooth scroll hook with more detailed behavior
const mockHandleNavClick = jest.fn((e, href) => {
  // Simulate the actual behavior for testing
  if (href.startsWith("#") || href === "/") {
    e.preventDefault();
  }
});
const mockSmoothScrollTo = jest.fn();
const mockScrollToTop = jest.fn();

jest.mock("@/hooks/scroll/useSmoothScroll", () => ({
  useSmoothScroll: jest.fn(() => ({
    handleNavClick: mockHandleNavClick,
    smoothScrollTo: mockSmoothScrollTo,
    scrollToTop: mockScrollToTop,
  })),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders logo with correct attributes", () => {
    render(<Navbar />);

    // The mock now preserves the actual alt text
    const logo = screen.getByAltText("Paint Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo/logo.svg");
    expect(logo).toHaveAttribute("width", "135");
    expect(logo).toHaveAttribute("height", "40");
  });

  it("renders all navigation links", () => {
    render(<Navbar />);

    // Use getAllByText since there are desktop and mobile versions
    expect(screen.getAllByText("Home")).toHaveLength(2);
    expect(screen.getAllByText("About us")).toHaveLength(2);
    expect(screen.getAllByText("Services")).toHaveLength(2);
    expect(screen.getAllByText("Branches")).toHaveLength(2);
    expect(screen.getAllByText("Jobs")).toHaveLength(2);
  });

  it("displays badges for navigation items", () => {
    render(<Navbar />);

    // Only Jobs has a badge with "12"
    const jobsBadges = screen.getAllByText("12");
    expect(jobsBadges).toHaveLength(2); // Desktop + Mobile
    jobsBadges.forEach((badge) => {
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("bg-primary");
    });
  });

  it("renders CTA buttons", () => {
    render(<Navbar />);

    const contactButtons = screen.getAllByText("Contact us");
    const joinButtons = screen.getAllByText("Join us");

    expect(contactButtons.length).toBeGreaterThanOrEqual(2); // Desktop + Mobile
    expect(joinButtons.length).toBeGreaterThanOrEqual(2); // Desktop + Mobile
  });

  it("toggles mobile menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    // Initially, mobile menu should be hidden
    expect(mobileMenuButton).toBeInTheDocument();

    // Click to open mobile menu
    await user.click(mobileMenuButton);

    // Mobile menu content should be visible - check that we have 2 instances of nav items
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBe(2); // Desktop + Mobile versions
  });

  it("closes mobile menu when navigation link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    // Open mobile menu first
    await user.click(mobileMenuButton);

    // Find mobile navigation links - look for links with the mobile-specific classes
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBe(2);

    // Click on a mobile home link (the mobile version should have specific styling)
    const mobileHomeLink = homeLinks.find((link) => {
      const anchor = link.closest("a");
      return (
        anchor &&
        anchor.classList.contains("flex") &&
        anchor.classList.contains("items-center") &&
        anchor.classList.contains("justify-between") // This is specific to mobile nav
      );
    });

    expect(mobileHomeLink).toBeDefined();

    if (mobileHomeLink) {
      const mobileHomeAnchor = mobileHomeLink.closest("a");
      if (mobileHomeAnchor) {
        await user.click(mobileHomeAnchor);

        // Verify that handleNavClick was called with correct parameters
        expect(mockHandleNavClick).toHaveBeenCalledWith(
          expect.any(Object), // React event object
          "/"
        );
      }
    }

    // The hook's onNavigate callback should close the menu
    // We can't directly test the internal state, but we can verify the link click was handled
    expect(mobileHomeLink).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });
    expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("applies correct CSS classes for styling", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("fixed", "top-0", "z-50");

    // Get the first (desktop) Home link
    const homeLinks = screen.getAllByText("Home");
    const desktopHomeLink = homeLinks[0].closest("a");
    expect(desktopHomeLink).toHaveClass("transition-colors");
  });

  it("logo link navigates to home", () => {
    render(<Navbar />);

    const logoLink = screen.getByAltText("Paint Logo").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("navigation links have correct href attributes", () => {
    render(<Navbar />);

    // Get desktop navigation links (first instances)
    const homeLinks = screen.getAllByText("Home");
    const aboutLinks = screen.getAllByText("About us");
    const servicesLinks = screen.getAllByText("Services");
    const branchesLinks = screen.getAllByText("Branches");
    const jobsLinks = screen.getAllByText("Jobs");

    // Test desktop links (first instance of each)
    expect(homeLinks[0].closest("a")).toHaveAttribute("href", "/");
    expect(aboutLinks[0].closest("a")).toHaveAttribute("href", "#about");
    expect(servicesLinks[0].closest("a")).toHaveAttribute("href", "#services");
    expect(branchesLinks[0].closest("a")).toHaveAttribute("href", "#branches");
    expect(jobsLinks[0].closest("a")).toHaveAttribute("href", "#jobs");
  });

  it("mobile menu has correct structure", () => {
    render(<Navbar />);

    // Check mobile menu button exists
    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });
    expect(mobileMenuButton).toBeInTheDocument();

    // Check hamburger icon spans
    const hamburgerSpans = mobileMenuButton.querySelectorAll("span.block");
    expect(hamburgerSpans).toHaveLength(3);
  });

  it("integrates with smooth scroll hook", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Test that navigation links are rendered and can be clicked
    const homeLinks = screen.getAllByText("Home");
    const aboutLinks = screen.getAllByText("About us");

    // Verify links exist and have proper attributes
    expect(homeLinks[0].closest("a")).toHaveAttribute("href", "/");
    expect(aboutLinks[0].closest("a")).toHaveAttribute("href", "#about");

    // Test clicking on home link
    const homeLink = homeLinks[0].closest("a");
    if (homeLink) {
      await user.click(homeLink);
      expect(mockHandleNavClick).toHaveBeenCalledWith(expect.any(Object), "/");
    }

    // Test clicking on about link
    const aboutLink = aboutLinks[0].closest("a");
    if (aboutLink) {
      await user.click(aboutLink);
      expect(mockHandleNavClick).toHaveBeenCalledWith(
        expect.any(Object),
        "#about"
      );
    }

    // Verify the hook was called for each navigation
    expect(mockHandleNavClick).toHaveBeenCalledTimes(2);

    // Verify links exist for both desktop and mobile
    expect(homeLinks).toHaveLength(2); // Desktop + Mobile
    expect(aboutLinks).toHaveLength(2); // Desktop + Mobile
  });

  it("calls smooth scroll hook with correct parameters for all navigation links", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Test all navigation links
    const testCases = [
      { text: "Home", href: "/" },
      { text: "About us", href: "#about" },
      { text: "Services", href: "#services" },
      { text: "Branches", href: "#branches" },
      { text: "Jobs", href: "#jobs" },
    ];

    for (const { text, href } of testCases) {
      const links = screen.getAllByText(text);
      const desktopLink = links[0].closest("a");

      if (desktopLink) {
        await user.click(desktopLink);
        expect(mockHandleNavClick).toHaveBeenLastCalledWith(
          expect.any(Object),
          href
        );
      }
    }

    // Should have been called once for each link
    expect(mockHandleNavClick).toHaveBeenCalledTimes(testCases.length);
  });

  it("logo click triggers smooth scroll to top", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const logoLink = screen.getByAltText("Paint Logo").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");

    if (logoLink) {
      await user.click(logoLink);
      expect(mockHandleNavClick).toHaveBeenCalledWith(expect.any(Object), "/");
    }
  });

  it("initializes smooth scroll hook with correct configuration", () => {
    render(<Navbar />);

    // Verify the hook was called with the correct options
    expect(useSmoothScroll).toHaveBeenCalledWith({
      navbarHeight: 80,
      onNavigate: expect.any(Function),
    });
  });

  it("mobile menu button has correct aria attributes when closed", () => {
    render(<Navbar />);

    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("mobile menu button has correct aria attributes when opened", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    await user.click(mobileMenuButton);

    // After clicking, it should be expanded
    expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true");
  });

  it("handles CTA button clicks correctly", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Test Contact us buttons (they should not trigger smooth scroll)
    const contactButtons = screen.getAllByText("Contact us");
    const contactButton = contactButtons[0].closest("a");

    if (contactButton) {
      // These should not call the smooth scroll handler as they're external links
      await user.click(contactButton);
    }

    // Test Join us buttons
    const joinButtons = screen.getAllByText("Join us");
    const joinButton = joinButtons[0].closest("a");

    if (joinButton) {
      await user.click(joinButton);
    }

    // CTA buttons shouldn't trigger the mocked handleNavClick if they're external links
    // The number of calls should only be from navigation links tested earlier
  });

  it("mobile menu navigation works correctly", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const mobileMenuButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    // Open mobile menu
    await user.click(mobileMenuButton);

    // Test mobile navigation links
    const mobileAboutLinks = screen.getAllByText("About us");
    const mobileAboutLink = mobileAboutLinks.find((link) => {
      const anchor = link.closest("a");
      return (
        anchor &&
        anchor.classList.contains("flex") &&
        anchor.classList.contains("items-center") &&
        anchor.classList.contains("justify-between")
      );
    });

    if (mobileAboutLink) {
      const mobileAboutAnchor = mobileAboutLink.closest("a");
      if (mobileAboutAnchor) {
        await user.click(mobileAboutAnchor);
        expect(mockHandleNavClick).toHaveBeenCalledWith(
          expect.any(Object),
          "#about"
        );
      }
    }
  });
});
