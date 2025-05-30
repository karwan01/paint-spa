import { CompanyService } from "@/types/CompanyServiceTypes";
import { render, screen } from "@testing-library/react";
import CompanyServices from "./CompanyServices";

// Mock ServiceCard component
jest.mock("./ServiceCard/ServiceCard", () => {
  return function MockServiceCard({ service }: { service: CompanyService }) {
    return (
      <div data-testid={`service-card-${service.id}`}>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div
          data-testid="mock-service-icon"
          data-src={service.img}
          data-alt={`${service.name} icon`}
          role="img"
          aria-label={`${service.name} icon`}
        />
      </div>
    );
  };
});

const mockServices: CompanyService[] = [
  {
    id: 1,
    name: "Digital Marketing",
    description: "Comprehensive digital marketing strategies",
    img: "/icons/marketing.svg",
  },
  {
    id: 2,
    name: "Social Media Management",
    description: "Expert social media management",
    img: "/icons/social-media.svg",
  },
  {
    id: 3,
    name: "Content Creation",
    description: "High-quality content creation",
    img: "/icons/content.svg",
  },
];

describe("CompanyServices Component", () => {
  describe("Structure and Layout", () => {
    it("renders the main section with correct classes", () => {
      render(<CompanyServices services={mockServices} />);
      const section = document.querySelector("section");
      expect(section).toHaveClass("py-16", "lg:py-24");
    });

    it("renders the container with proper responsive classes", () => {
      render(<CompanyServices services={mockServices} />);
      const container = document.querySelector(".mx-auto.max-w-7xl");
      expect(container).toHaveClass(
        "mx-auto",
        "max-w-7xl",
        "px-4",
        "sm:px-6",
        "lg:px-8"
      );
    });

    it("renders services grid with responsive classes", () => {
      render(<CompanyServices services={mockServices} />);
      const grid = document.querySelector(".grid");
      expect(grid).toHaveClass(
        "grid",
        "gap-y-7",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "lg:gap-x-8",
        "lg:gap-y-[122px]"
      );
    });
  });

  describe("Section Header", () => {
    it("renders the main heading with correct text and styling", () => {
      render(<CompanyServices services={mockServices} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Our Services");
      expect(heading).toHaveClass(
        "text-background",
        "mb-[4px]",
        "text-[18px]",
        "font-bold",
        "lg:mb-[32px]",
        "lg:text-[48px]"
      );
    });

    it("renders the section description", () => {
      render(<CompanyServices services={mockServices} />);
      const description = screen.getByText(
        /Transforming your online presence with innovative digital strategies/
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass(
        "text-secondary",
        "mx-auto",
        "max-w-3xl",
        "text-lg",
        "lg:text-xl"
      );
    });

    it("has proper spacing for header section", () => {
      render(<CompanyServices services={mockServices} />);
      const headerContainer = document.querySelector(".mb-12.text-center");
      expect(headerContainer).toHaveClass("mb-12", "text-center", "lg:mb-16");
    });
  });

  describe("Services Rendering", () => {
    it("renders all provided services", () => {
      render(<CompanyServices services={mockServices} />);

      expect(screen.getByTestId("service-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("service-card-2")).toBeInTheDocument();
      expect(screen.getByTestId("service-card-3")).toBeInTheDocument();
    });

    it("renders default services when no services prop provided", () => {
      render(<CompanyServices />);

      // Should render default services from companyServices data
      expect(screen.getByText("Video Making")).toBeInTheDocument();
      expect(screen.getByText("Branding")).toBeInTheDocument();
      expect(screen.getByText("Marketing Strategy")).toBeInTheDocument();
      expect(screen.getByText("Email Marketing")).toBeInTheDocument();
      expect(screen.getByText("Social Media Management")).toBeInTheDocument();
      expect(screen.getByText("Content Writing")).toBeInTheDocument();
    });

    it("passes correct service data to ServiceCard components", () => {
      render(<CompanyServices services={mockServices} />);

      expect(screen.getByText("Digital Marketing")).toBeInTheDocument();
      expect(
        screen.getByText("Comprehensive digital marketing strategies")
      ).toBeInTheDocument();
      expect(screen.getByText("Social Media Management")).toBeInTheDocument();
      expect(
        screen.getByText("Expert social media management")
      ).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("has responsive padding for section", () => {
      render(<CompanyServices services={mockServices} />);
      const section = document.querySelector("section");
      expect(section).toHaveClass("py-16", "lg:py-24");
    });

    it("has responsive text sizes for heading", () => {
      render(<CompanyServices services={mockServices} />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-[18px]", "lg:text-[48px]");
    });

    it("has responsive grid layout", () => {
      render(<CompanyServices services={mockServices} />);
      const grid = document.querySelector(".grid");
      expect(grid).toHaveClass("sm:grid-cols-2", "lg:grid-cols-3");
    });

    it("has responsive spacing", () => {
      render(<CompanyServices services={mockServices} />);
      const headerContainer = document.querySelector(".mb-12.text-center");
      expect(headerContainer).toHaveClass("mb-12", "lg:mb-16");

      const grid = document.querySelector(".grid");
      expect(grid).toHaveClass("gap-y-7", "lg:gap-x-8", "lg:gap-y-[122px]");
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML structure", () => {
      render(<CompanyServices services={mockServices} />);
      expect(document.querySelector("section")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("renders all text content accessibly", () => {
      render(<CompanyServices services={mockServices} />);
      expect(screen.getByText("Our Services")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Transforming your online presence with innovative digital strategies/
        )
      ).toBeInTheDocument();
    });
  });

  describe("Props Handling", () => {
    it("accepts and uses custom services prop", () => {
      const customServices: CompanyService[] = [
        {
          id: 99,
          name: "Custom Service",
          description: "Custom description",
          img: "/custom-icon.svg",
        },
      ];

      render(<CompanyServices services={customServices} />);
      expect(screen.getByTestId("service-card-99")).toBeInTheDocument();
      expect(screen.getByText("Custom Service")).toBeInTheDocument();
    });

    it("handles empty services array gracefully", () => {
      render(<CompanyServices services={[]} />);
      const grid = document.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(grid?.children).toHaveLength(0);
    });
  });
});
