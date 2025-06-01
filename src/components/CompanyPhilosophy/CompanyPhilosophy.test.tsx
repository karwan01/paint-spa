import { STATS } from "@/data/statItems";
import { useCountUpAnimation } from "@/hooks/animations/countUp/useCountUpAnimation";
import { render, screen } from "@testing-library/react";
import CompanyPhilosophy from "./CompanyPhilosophy";

// Mock the useCountUpAnimation hook since we test it separately
jest.mock("@/hooks/animations/countUp/useCountUpAnimation", () => ({
  useCountUpAnimation: jest.fn(() => ({
    sectionRef: { current: null },
    animatedValues: STATS.reduce(
      (acc, stat) => {
        acc[stat.id] = 0;
        return acc;
      },
      {} as { [key: number]: number }
    ),
    isVisible: false,
    triggerAnimation: jest.fn(),
  })),
}));

describe("CompanyPhilosophy", () => {
  it("renders without crashing", () => {
    render(<CompanyPhilosophy />);
    expect(screen.getByText("The company's philosophy")).toBeInTheDocument();
  });

  it("renders the main heading correctly", () => {
    render(<CompanyPhilosophy />);
    expect(
      screen.getByText("We bear the responsibility of developing the sector.")
    ).toBeInTheDocument();
  });

  it("renders the description text correctly", () => {
    render(<CompanyPhilosophy />);
    expect(
      screen.getByText(
        /Elevate your brand with our comprehensive marketing solutions/
      )
    ).toBeInTheDocument();
  });

  it("renders all stat items from STATS data", () => {
    render(<CompanyPhilosophy />);

    STATS.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it("initializes with zero values for all animated numbers", () => {
    render(<CompanyPhilosophy />);

    // Check that all stats start with 0
    const zeroElements = screen.getAllByText("0+");
    expect(zeroElements).toHaveLength(STATS.length);
  });

  it("renders stats with correct structure", () => {
    render(<CompanyPhilosophy />);

    STATS.forEach((stat) => {
      // Check label exists
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });

    // Check all initial numbers with suffix exist
    const zeroElements = screen.getAllByText("0+");
    expect(zeroElements).toHaveLength(STATS.length);
  });

  it("applies correct CSS classes for responsive design", () => {
    render(<CompanyPhilosophy />);

    const section = document.querySelector("section");
    expect(section).toHaveClass(
      "min-h-screen",
      "w-full",
      "px-[20px]",
      "lg:mt-[100px]",
      "lg:min-h-[828px]",
      "lg:px-[72px]"
    );
  });

  it("has proper semantic structure", () => {
    render(<CompanyPhilosophy />);

    // Check for main heading
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();

    // Check for section element
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders the philosophy indicator correctly", () => {
    render(<CompanyPhilosophy />);

    const philosophyText = screen.getByText("The company's philosophy");
    expect(philosophyText).toBeInTheDocument();
    expect(philosophyText).toHaveClass("text-primary", "text-[14px]");
  });

  it("applies staggered animation delays correctly", () => {
    render(<CompanyPhilosophy />);

    STATS.forEach((stat, index) => {
      const statElement = screen.getByText(stat.label).closest("div");
      expect(statElement).toHaveStyle(`animation-delay: ${index * 0.2}s`);
    });
  });

  it("uses the useCountUpAnimation hook with correct parameters", () => {
    render(<CompanyPhilosophy />);

    // Verify the hook was called with the correct transformed data
    expect(useCountUpAnimation).toHaveBeenCalledWith({
      items: STATS.map((stat) => ({ id: stat.id, value: stat.number })),
      animationDuration: 2000,
      staggerDelay: 200,
      intersectionThreshold: 0.3,
    });
  });
});
