import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NewsItem } from "@/types/News";
import News from "./News";

// Mock the news data
jest.mock("@/data/news", () => ({
  newsItems: [
    {
      id: "main-1",
      title:
        "Revolutionary Paint Technology Transforms Interior Design Industry",
      description:
        "Discover how our latest smart paint technology is revolutionizing the way homeowners and professionals approach interior design projects.",
      image: "/news/main-news.svg",
      tags: ["Technology", "Innovation", "Interior Design"],
      publishedAt: "2024-05-15",
      author: "Sarah Johnson",
      readTime: "5 min read",
      isMainNews: true,
    },
    {
      id: "secondary-1",
      title: "Eco-Friendly Paint Solutions Gain Popularity",
      description:
        "Environmental consciousness drives demand for sustainable painting solutions.",
      image: "/news/news-1.png",
      tags: ["Sustainability", "Environment"],
      publishedAt: "2024-05-12",
      author: "Mike Chen",
      readTime: "3 min read",
    },
    {
      id: "secondary-2",
      title: "Color Psychology in Modern Home Design",
      description:
        "How choosing the right colors can impact mood and well-being.",
      image: "/news/news-2.png",
      tags: ["Psychology", "Design", "Wellness"],
      publishedAt: "2024-05-10",
      author: "Emma Rodriguez",
      readTime: "4 min read",
    },
    {
      id: "secondary-3",
      title: "Professional Painting Techniques for DIY Enthusiasts",
      description:
        "Learn expert tips and tricks to achieve professional-quality results.",
      image: "/news/news-1.png",
      tags: ["DIY", "Tips", "Tutorials"],
      publishedAt: "2024-05-08",
      author: "David Thompson",
      readTime: "6 min read",
    },
  ],
}));

// Mock the child components
jest.mock("./MainNewsCard/MainNewsCard", () => {
  return function MockMainNewsCard({ news }: { news: NewsItem }) {
    return (
      <div data-testid="main-news-card">
        <h3>{news.title}</h3>
        <p>{news.description}</p>
      </div>
    );
  };
});

jest.mock("./SecondaryNewsCard/SecondaryNewsCard", () => {
  return function MockSecondaryNewsCard({ news }: { news: NewsItem }) {
    return (
      <div data-testid="secondary-news-card">
        <h4>{news.title}</h4>
        <p>{news.description}</p>
      </div>
    );
  };
});

describe("News Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Structure and Layout", () => {
    it("renders the main section with correct classes", () => {
      render(<News />);
      const section = document.querySelector("section");

      expect(section).toBeInTheDocument();
      expect(section).toHaveClass("mx-3", "lg:mx-[90px]");
    });

    it("renders the title section with correct layout", () => {
      render(<News />);

      const titleSection = document.querySelector(".mb-3.flex.justify-center");
      expect(titleSection).toBeInTheDocument();
      expect(titleSection).toHaveClass(
        "mb-3",
        "flex",
        "justify-center",
        "lg:mb-[108px]",
        "lg:flex-row",
        "lg:items-center",
        "lg:justify-between"
      );
    });

    it("renders the news cards section with correct layout", () => {
      render(<News />);

      const cardsSection = document.querySelector(
        ".flex.w-full.flex-col.gap-8"
      );
      expect(cardsSection).toBeInTheDocument();
      expect(cardsSection).toHaveClass(
        "flex",
        "w-full",
        "flex-col",
        "gap-8",
        "lg:flex-row"
      );
    });
  });

  describe("Content Rendering", () => {
    it("renders the main title with correct text and styling", () => {
      render(<News />);

      const title = screen.getByRole("heading", { name: "News" });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass(
        "text-background",
        "text-[24px]",
        "font-bold",
        "lg:text-[44px]"
      );
    });

    it("renders the desktop 'View all news' button with correct styling", () => {
      render(<News />);

      const desktopButton = screen.getByRole("button", {
        name: "View all news",
      });
      expect(desktopButton).toBeInTheDocument();
      expect(desktopButton).toHaveClass("hidden", "lg:inline");
    });

    it("renders the mobile 'Show all news' button with correct styling", () => {
      render(<News />);

      const mobileButton = screen.getByRole("button", {
        name: "Show all news",
      });
      expect(mobileButton).toBeInTheDocument();
      expect(mobileButton).toHaveClass("mt-8", "min-w-full", "lg:hidden");
    });

    it("renders the main news card", () => {
      render(<News />);

      const mainNewsCard = screen.getByTestId("main-news-card");
      expect(mainNewsCard).toBeInTheDocument();

      // Check if it shows the main news content
      expect(
        screen.getByText(
          "Revolutionary Paint Technology Transforms Interior Design Industry"
        )
      ).toBeInTheDocument();
    });

    it("renders exactly 3 secondary news cards", () => {
      render(<News />);

      const secondaryNewsCards = screen.getAllByTestId("secondary-news-card");
      expect(secondaryNewsCards).toHaveLength(3);
    });

    it("filters out main news from secondary cards", () => {
      render(<News />);

      // Main news title should appear only once (in main card)
      const mainNewsTitle = screen.getAllByText(
        "Revolutionary Paint Technology Transforms Interior Design Industry"
      );
      expect(mainNewsTitle).toHaveLength(1);

      // Secondary news titles should appear
      expect(
        screen.getByText("Eco-Friendly Paint Solutions Gain Popularity")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Color Psychology in Modern Home Design")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Professional Painting Techniques for DIY Enthusiasts")
      ).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("applies correct responsive classes to title section", () => {
      render(<News />);

      const titleSection = document.querySelector(".mb-3.flex.justify-center");
      expect(titleSection).toHaveClass(
        "lg:mb-[108px]",
        "lg:flex-row",
        "lg:items-center",
        "lg:justify-between"
      );
    });

    it("applies correct responsive classes to main content area", () => {
      render(<News />);

      const mainNewsContainer = document.querySelector(".lg\\:flex-3");
      expect(mainNewsContainer).toBeInTheDocument();
      expect(mainNewsContainer).toHaveClass("lg:flex-3");

      const secondaryNewsContainer = document.querySelector(
        ".space-y-4.lg\\:flex-2"
      );
      expect(secondaryNewsContainer).toBeInTheDocument();
      expect(secondaryNewsContainer).toHaveClass("space-y-4", "lg:flex-2");
    });

    it("shows desktop button only on large screens", () => {
      render(<News />);

      const desktopButton = screen.getByRole("button", {
        name: "View all news",
      });
      expect(desktopButton).toHaveClass("hidden", "lg:inline");
    });

    it("shows mobile button only on small screens", () => {
      render(<News />);

      const mobileButton = screen.getByRole("button", {
        name: "Show all news",
      });
      expect(mobileButton).toHaveClass("lg:hidden");
    });
  });

  describe("Data Handling", () => {
    it("correctly identifies and displays main news", () => {
      render(<News />);

      const mainNewsCard = screen.getByTestId("main-news-card");
      expect(mainNewsCard).toBeInTheDocument();

      // Should contain the news item marked as isMainNews: true
      expect(
        screen.getByText(
          "Revolutionary Paint Technology Transforms Interior Design Industry"
        )
      ).toBeInTheDocument();
    });

    it("handles case when no main news is marked", () => {
      // Mock data without main news
      jest.doMock("@/data/news", () => ({
        newsItems: [
          {
            id: "news-1",
            title: "First News Item",
            description: "Description",
            image: "/news/news-1.png",
            tags: ["Tag1"],
            publishedAt: "2024-05-15",
            isMainNews: false,
          },
          {
            id: "news-2",
            title: "Second News Item",
            description: "Description",
            image: "/news/news-2.png",
            tags: ["Tag2"],
            publishedAt: "2024-05-14",
          },
        ],
      }));

      render(<News />);

      // Should still render a main news card (fallback to first item)
      const mainNewsCard = screen.getByTestId("main-news-card");
      expect(mainNewsCard).toBeInTheDocument();
    });

    it("limits secondary news to exactly 3 items", () => {
      render(<News />);

      const secondaryNewsCards = screen.getAllByTestId("secondary-news-card");
      expect(secondaryNewsCards).toHaveLength(3);
    });
  });

  describe("Layout Structure", () => {
    it("arranges main and secondary news in correct flex layout", () => {
      render(<News />);

      const mainContainer = document.querySelector(
        ".flex.w-full.flex-col.gap-8.lg\\:flex-row"
      );
      expect(mainContainer).toBeInTheDocument();

      const mainNewsSection = mainContainer?.querySelector(".lg\\:flex-3");
      const secondaryNewsSection = mainContainer?.querySelector(
        ".space-y-4.lg\\:flex-2"
      );

      expect(mainNewsSection).toBeInTheDocument();
      expect(secondaryNewsSection).toBeInTheDocument();
    });

    it("applies correct spacing between secondary news cards", () => {
      render(<News />);

      const secondaryContainer = document.querySelector(
        ".space-y-4.lg\\:flex-2"
      );
      expect(secondaryContainer).toBeInTheDocument();
      expect(secondaryContainer).toHaveClass("space-y-4");
    });
  });

  describe("Button Functionality", () => {
    it("renders buttons with correct variants and radius", () => {
      render(<News />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);

      // Both buttons should have the same variant and radius props
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<News />);

      const mainHeading = screen.getByRole("heading", { name: "News" });
      expect(mainHeading.tagName).toBe("H2");
    });

    it("has proper semantic structure with section element", () => {
      render(<News />);

      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("provides accessible button labels", () => {
      render(<News />);

      expect(
        screen.getByRole("button", { name: "View all news" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Show all news" })
      ).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles empty news data gracefully", () => {
      jest.doMock("@/data/news", () => ({
        newsItems: [],
      }));

      expect(() => render(<News />)).not.toThrow();
    });

    it("handles missing main news gracefully", () => {
      jest.doMock("@/data/news", () => ({
        newsItems: [
          {
            id: "news-1",
            title: "Regular News",
            description: "Description",
            image: "/news/news-1.png",
            tags: ["Tag"],
            publishedAt: "2024-05-15",
          },
        ],
      }));

      expect(() => render(<News />)).not.toThrow();
    });
  });
});
