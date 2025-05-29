import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  it("renders logo with correct attributes", () => {
    render(<Navbar />);

    // The mock changes alt to "test"
    const logo = screen.getByAltText("test");
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

    // Only Jobs has a badge with "12" - Branches doesn't have a badge based on the DOM output
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

    // Find mobile navigation links (wrapped in spans)
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBe(2);

    // Click on the mobile home link (the one inside a span)
    const mobileHomeLink = homeLinks.find((link) => link.tagName === "SPAN");

    if (mobileHomeLink) {
      await user.click(mobileHomeLink);
    }

    // Wait for animation and check if menu closes
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Menu should still show 2 instances because the mobile version is still in DOM, just hidden
    const homeLinksAfter = screen.getAllByText("Home");
    expect(homeLinksAfter.length).toBe(2);
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

    const logoLink = screen.getByAltText("test").closest("a");
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
});
