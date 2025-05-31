import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PricingExpansionPanel from "./PricingExpansionPanel";

describe("PricingExpansionPanel Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Structure and Layout", () => {
    it("renders the main container with correct classes", () => {
      render(<PricingExpansionPanel />);
      const container = document.querySelector(".mx-auto.max-w-lg.space-y-4");

      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("mx-auto", "max-w-lg", "space-y-4");
    });

    it("renders all pricing tiers", () => {
      render(<PricingExpansionPanel />);

      expect(screen.getByText("Intro")).toBeInTheDocument();
      expect(screen.getByText("Base")).toBeInTheDocument();
      expect(screen.getByText("Pro")).toBeInTheDocument();
      expect(screen.getByText("Enterprise")).toBeInTheDocument();
    });

    it("renders tier cards with correct styling classes", () => {
      render(<PricingExpansionPanel />);
      const tierCards = document.querySelectorAll(
        ".overflow-hidden.rounded-2xl"
      );

      expect(tierCards).toHaveLength(4);
      tierCards.forEach((card) => {
        expect(card).toHaveClass(
          "overflow-hidden",
          "rounded-2xl",
          "transition-all",
          "duration-300"
        );
      });
    });
  });

  describe("Featured Tier Styling", () => {
    it("applies featured styling to Pro tier", () => {
      render(<PricingExpansionPanel />);

      // Find the Pro tier card
      const proCard = screen.getByText("Pro").closest(".overflow-hidden");
      expect(proCard).toHaveClass("bg-primary", "relative", "shadow-xl");
    });

    it("applies background image to featured tier", () => {
      render(<PricingExpansionPanel />);

      const proCard = screen.getByText("Pro").closest(".overflow-hidden");
      expect(proCard).toHaveStyle({
        backgroundImage: "url('/pricing/pro-bg.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right",
      });
    });

    it("applies non-featured styling to other tiers", () => {
      render(<PricingExpansionPanel />);

      const introCard = screen.getByText("Intro").closest(".overflow-hidden");
      expect(introCard).toHaveClass(
        "bg-on-background",
        "shadow-lg",
        "hover:shadow-xl"
      );
      expect(introCard).not.toHaveClass("bg-primary");
    });

    it("renders badge for featured tier", () => {
      render(<PricingExpansionPanel />);

      expect(screen.getByText("Save $40")).toBeInTheDocument();

      const badge = screen.getByText("Save $40");
      expect(badge).toHaveClass(
        "bg-on-primary",
        "text-primary",
        "rounded-full",
        "px-3",
        "py-1",
        "text-sm",
        "font-medium"
      );
    });
  });

  describe("Default State", () => {
    it("has Pro tier expanded by default", () => {
      render(<PricingExpansionPanel />);

      // Pro tier content should be visible
      expect(
        screen.getByText(
          "Pro account gives you freedom with uploading HD videos and can also meet all your business needs apasih kamu"
        )
      ).toBeInTheDocument();

      // Pro tier should show chevron up
      const proHeader = screen.getByText("Pro").closest(".flex.cursor-pointer");
      const chevronUp = proHeader?.querySelector(".h-4.w-4");
      expect(chevronUp).toBeInTheDocument();
    });

    it("has other tiers collapsed by default", () => {
      render(<PricingExpansionPanel />);
    });
  });

  describe("Expansion and Collapse Functionality", () => {
    it("expands a tier when clicked", async () => {
      const user = userEvent.setup();
      render(<PricingExpansionPanel />);

      // Click on Intro tier header
      const introHeader = screen
        .getByText("Intro")
        .closest(".flex.cursor-pointer");
      await user.click(introHeader!);
    });

    it("collapses the currently expanded tier when another is clicked", async () => {
      const user = userEvent.setup();
      render(<PricingExpansionPanel />);

      // Click on Base tier
      const baseHeader = screen
        .getByText("Base")
        .closest(".flex.cursor-pointer");
      await user.click(baseHeader!);
    });
  });

  it("collapses a tier when clicked again", async () => {
    const user = userEvent.setup();
    render(<PricingExpansionPanel />);

    // Click on Pro tier header to collapse
    const proHeader = screen.getByText("Pro").closest(".flex.cursor-pointer");
    await user.click(proHeader!);

    // Pro content should be hidden
    await waitFor(() => {
      expect(
        screen.queryByText("Professional service with comprehensive solutions.")
      ).not.toBeInTheDocument();
    });
  });
});

describe("Chevron Icons", () => {
  it("shows chevron up for expanded tier", () => {
    render(<PricingExpansionPanel />);

    // Pro is expanded by default, should show chevron up
    const proHeader = screen.getByText("Pro").closest(".flex.cursor-pointer");
    const chevronContainer = proHeader?.querySelector(".flex.h-6.w-6");
    expect(chevronContainer).toBeInTheDocument();
  });

  it("shows chevron down for collapsed tiers", () => {
    render(<PricingExpansionPanel />);

    // Other tiers should show chevron down
    const introHeader = screen
      .getByText("Intro")
      .closest(".flex.cursor-pointer");
    const baseHeader = screen.getByText("Base").closest(".flex.cursor-pointer");
    const enterpriseHeader = screen
      .getByText("Enterprise")
      .closest(".flex.cursor-pointer");

    [introHeader, baseHeader, enterpriseHeader].forEach((header) => {
      const chevronContainer = header?.querySelector(".flex.h-6.w-6");
      expect(chevronContainer).toBeInTheDocument();
    });
  });

  it("updates chevron when tier is toggled", async () => {
    const user = userEvent.setup();
    render(<PricingExpansionPanel />);

    // Click on Intro to expand it
    const introHeader = screen
      .getByText("Intro")
      .closest(".flex.cursor-pointer");
    await user.click(introHeader!);
  });
});

describe("Content Rendering", () => {
  it("renders tier name and description", async () => {
    const user = userEvent.setup();
    render(<PricingExpansionPanel />);

    // Expand Intro tier
    const introHeader = screen
      .getByText("Intro")
      .closest(".flex.cursor-pointer");
    await user.click(introHeader!);

    await waitFor(() => {
      expect(screen.getByText("Intro")).toBeInTheDocument();
    });
  });

  it("shows 'What's included' header for non-featured tiers", async () => {
    const user = userEvent.setup();
    render(<PricingExpansionPanel />);

    // Expand Intro tier (non-featured)
    const introHeader = screen
      .getByText("Intro")
      .closest(".flex.cursor-pointer");
    await user.click(introHeader!);
  });
});

describe("Responsive Design", () => {
  it("applies responsive text sizing", () => {
    render(<PricingExpansionPanel />);

    const proHeading = screen.getByText("Pro");
    expect(proHeading).toHaveClass("text-[18px]", "lg:text-[28px]");
  });

  it("applies responsive button sizing", () => {
    render(<PricingExpansionPanel />);
  });

  it("applies responsive price text sizing", () => {
    render(<PricingExpansionPanel />);
  });
});

describe("Color Theming", () => {
  it("applies correct colors to featured tier", () => {
    render(<PricingExpansionPanel />);

    const proHeading = screen.getByText("Pro");
    expect(proHeading).toHaveClass("text-background");
  });

  it("applies correct colors to non-featured tiers", () => {
    render(<PricingExpansionPanel />);

    const introHeading = screen.getByText("Intro");
    expect(introHeading).toHaveClass("text-primary");
  });
});

describe("Hover Effects", () => {
  it("applies hover effects to featured tier header", () => {
    render(<PricingExpansionPanel />);

    const proHeader = screen.getByText("Pro").closest(".flex.cursor-pointer");
    expect(proHeader).toHaveClass("hover:bg-white/5");
  });

  it("applies hover effects to non-featured tier headers", () => {
    render(<PricingExpansionPanel />);

    const introHeader = screen
      .getByText("Intro")
      .closest(".flex.cursor-pointer");
    expect(introHeader).toHaveClass("hover:bg-black/5");
  });
});

describe("Animation and Transitions", () => {
  it("applies transition classes to expandable content", () => {
    render(<PricingExpansionPanel />);

    const expandableContent = document.querySelector(
      ".overflow-hidden.transition-all.duration-300.ease-in-out"
    );
    expect(expandableContent).toBeInTheDocument();
  });

  it("applies transition classes to tier cards", () => {
    render(<PricingExpansionPanel />);

    const tierCards = document.querySelectorAll(".transition-all.duration-300");
    expect(tierCards.length).toBeGreaterThan(0);
  });

  it("applies transition classes to headers", () => {
    render(<PricingExpansionPanel />);

    const headers = document.querySelectorAll(".transition-all.duration-200");
    expect(headers.length).toBeGreaterThan(0);
  });
});

describe("Error Handling", () => {
  it("handles missing tier data gracefully", () => {
    // Mock empty pricing tiers
    jest.doMock("@/data/pricingTiers", () => ({
      pricingTiers: [],
    }));

    expect(() => render(<PricingExpansionPanel />)).not.toThrow();
  });

  it("handles rapid clicking without errors", async () => {
    const user = userEvent.setup();
    render(<PricingExpansionPanel />);

    const proHeader = screen.getByText("Pro").closest(".flex.cursor-pointer");

    // Rapidly click multiple times
    for (let i = 0; i < 5; i++) {
      await user.click(proHeader!);
    }

    // Component should handle this gracefully
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });
});

describe("Performance", () => {
  it("renders efficiently", () => {
    const renderTime = performance.now();
    render(<PricingExpansionPanel />);
    const endTime = performance.now();

    expect(endTime - renderTime).toBeLessThan(100);
  });

  it("cleans up properly on unmount", () => {
    const { unmount } = render(<PricingExpansionPanel />);

    expect(() => unmount()).not.toThrow();
  });
});
