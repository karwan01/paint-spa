import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Statistic from "./Statistic";

// Mock recharts components
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: ({ dataKey }: { dataKey: string }) => (
    <div data-testid={`bar-${dataKey}`} />
  ),
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: ({ yAxisId }: { yAxisId?: string }) => (
    <div data-testid={`y-axis-${yAxisId || "default"}`} />
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  Legend: () => <div data-testid="legend" />,
}));

// Mock chart data
jest.mock("@/data/chartData", () => ({
  monthlyData: [
    { month: "Jan", projects: 12, revenue: 45000 },
    { month: "Feb", projects: 19, revenue: 52000 },
  ],
  serviceData: [
    { name: "Web Design", value: 35 },
    { name: "Digital Marketing", value: 25 },
  ],
  CHART_COLORS: {
    primary: "#7d4283",
    secondary: "#646a69",
    accent: "#e879f9",
    accentVariant: "#7951b3",
    warning: "#f3722c",
    surface: "#ffffff",
    onSurface: "#161616",
    background: "#ffffff",
    onBackground: "#161616",
  },
  PIE_CHART_COLORS: ["#7d4283", "#e879f9", "#646a69", "#7951b3", "#f3722c"],
}));

describe("Statistic Component", () => {
  beforeEach(() => {
    render(<Statistic />);
  });

  describe("Component Structure", () => {
    it("renders the main section with correct classes", () => {
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass(
        "mx-3",
        "my-[60px]",
        "lg:mx-[90px]",
        "lg:my-[80px]"
      );
    });

    it("renders the header section", () => {
      const header = screen.getByRole("heading", { level: 2 });
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent("Business Analytics");
    });

    it("renders the description text", () => {
      const description = screen.getByText(
        /Track our performance and service distribution/
      );
      expect(description).toBeInTheDocument();
    });
  });

  describe("Charts Section", () => {
    it("renders both chart containers", () => {
      const chartContainers = document.querySelectorAll(
        ".h-\\[300px\\].lg\\:h-\\[400px\\]"
      );
      expect(chartContainers).toHaveLength(2);
    });

    it("renders charts grid with responsive layout", () => {
      const chartsGrid = document.querySelector(
        ".flex.flex-col.gap-y-6.lg\\:flex-row.lg\\:gap-y-\\[48px\\]"
      );
      expect(chartsGrid).toBeInTheDocument();
    });

    it("renders responsive containers for charts", () => {
      const responsiveContainers = screen.getAllByTestId(
        "responsive-container"
      );
      expect(responsiveContainers).toHaveLength(2);
    });

    it("renders bar chart components", () => {
      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
      expect(screen.getByTestId("bar-projects")).toBeInTheDocument();
      expect(screen.getByTestId("bar-revenue")).toBeInTheDocument();
      expect(screen.getByTestId("x-axis")).toBeInTheDocument();
      expect(screen.getByTestId("y-axis-projects")).toBeInTheDocument();
      expect(screen.getByTestId("y-axis-revenue")).toBeInTheDocument();
      expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    });

    it("renders pie chart components", () => {
      expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
      expect(screen.getByTestId("pie")).toBeInTheDocument();
      expect(screen.getByTestId("legend")).toBeInTheDocument();
    });

    it("renders tooltip components", () => {
      const tooltips = screen.getAllByTestId("tooltip");
      expect(tooltips).toHaveLength(2);
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive classes to main section", () => {
      const section = document.querySelector("section");
      expect(section).toHaveClass(
        "mx-3",
        "my-[60px]",
        "lg:mx-[90px]",
        "lg:my-[80px]"
      );
    });

    it("applies responsive classes to header title", () => {
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveClass(
        "text-center",
        "text-[24px]",
        "lg:text-start",
        "lg:text-[32px]",
        "lg:font-bold"
      );
    });

    it("applies responsive classes to description", () => {
      const description = screen.getByText(
        /Track our performance and service distribution/
      );
      expect(description).toHaveClass(
        "text-center",
        "text-base",
        "lg:text-start",
        "lg:text-lg"
      );
    });

    it("applies responsive flex layout to charts container", () => {
      const chartsContainer = document.querySelector(
        ".flex.flex-col.gap-y-6.lg\\:flex-row"
      );
      expect(chartsContainer).toBeInTheDocument();
      expect(chartsContainer).toHaveClass(
        "flex",
        "flex-col",
        "gap-y-6",
        "lg:flex-row",
        "lg:gap-y-[48px]"
      );
    });

    it("applies responsive classes to chart heights", () => {
      const chartHeights = document.querySelectorAll(
        ".h-\\[300px\\].lg\\:h-\\[400px\\]"
      );
      expect(chartHeights).toHaveLength(2);
    });
  });

  describe("Typography and Styling", () => {
    it("applies correct text colors and weights", () => {
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveClass("text-background");

      const description = screen.getByText(
        /Track our performance and service distribution/
      );
      expect(description).toHaveClass("text-secondary");
    });

    it("applies correct spacing and margins", () => {
      const header = document.querySelector(".mb-8.lg\\:mb-12");
      expect(header).toBeInTheDocument();

      const chartsContainer = document.querySelector(
        ".flex.flex-col.gap-y-6.lg\\:flex-row.lg\\:gap-y-\\[48px\\]"
      );
      expect(chartsContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      const h2 = screen.getByRole("heading", { level: 2 });
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent("Business Analytics");
    });

    it("provides descriptive text for the analytics section", () => {
      expect(screen.getByText("Business Analytics")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Track our performance and service distribution with interactive charts/
        )
      ).toBeInTheDocument();
    });
  });

  describe("Theme Integration", () => {
    it("uses theme colors consistently in layout", () => {
      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveClass("text-background");

      const description = screen.getByText(
        /Track our performance and service distribution/
      );
      expect(description).toHaveClass("text-secondary");
    });

    it("applies consistent margin and padding classes", () => {
      const section = document.querySelector("section");
      expect(section).toHaveClass("mx-3", "my-[60px]", "lg:mx-[90px]", "lg:my-[80px]");

      const header = document.querySelector(".mb-8.lg\\:mb-12");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Chart Data Integration", () => {
    it("integrates with chart data imports", () => {
      // Test that the component renders without errors when chart data is imported
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
      
      // Verify that charts are rendered with the mocked data
      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
      expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    });

    it("renders charts with proper responsive containers", () => {
      const responsiveContainers = screen.getAllByTestId("responsive-container");
      expect(responsiveContainers).toHaveLength(2);
      
      // Each container should be within a chart height container
      const chartContainers = document.querySelectorAll(".h-\\[300px\\].lg\\:h-\\[400px\\]");
      expect(chartContainers).toHaveLength(2);
    });
  });
});
