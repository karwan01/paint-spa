import { NewsItem } from "@/types/News";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainNewsCard from "./MainNewsCard";

const mockNewsItem: NewsItem = {
  id: "test-1",
  title: "Revolutionary Paint Technology Transforms Interior Design Industry",
  description:
    "Discover how our latest smart paint technology is revolutionizing the way homeowners and professionals approach interior design projects with enhanced durability and color-changing capabilities.",
  image: "/news/main-news.svg",
  tags: ["Technology", "Innovation", "Interior Design"],
  publishedAt: "2024-05-15",
  author: "Sarah Johnson",
  readTime: "5 min read",
  isMainNews: true,
};

describe("MainNewsCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Structure and Layout", () => {
    it("renders the main article container with correct classes", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveClass("mx-auto", "w-full", "max-w-[696px]");
    });

    it("renders the image container with correct responsive classes", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const imageContainer = document.querySelector(
        ".relative.mb-4.h-\\[226px\\]"
      );
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass(
        "relative",
        "mb-4",
        "h-[226px]",
        "w-full",
        "overflow-hidden",
        "rounded-lg",
        "lg:mb-6",
        "lg:h-[460px]"
      );
    });

    it("renders tags container with correct classes", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const tagsContainer = document.querySelector(
        ".mb-4.flex.flex-wrap.gap-2"
      );
      expect(tagsContainer).toBeInTheDocument();
      expect(tagsContainer).toHaveClass(
        "mb-4",
        "flex",
        "flex-wrap",
        "gap-2",
        "lg:mb-6"
      );
    });
  });

  describe("Content Rendering", () => {
    it("renders the news image with correct attributes", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const image = screen.getByAltText(mockNewsItem.title);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockNewsItem.image);
    });

    it("renders the title with correct text and styling", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(mockNewsItem.title);
      expect(title).toHaveClass(
        "text-background",
        "mb-4",
        "text-[18px]",
        "leading-[1.5]",
        "font-bold",
        "lg:text-[32px]",
        "lg:leading-tight"
      );
    });

    it("renders the description with correct text and styling", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const description = screen.getByText(mockNewsItem.description);
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass(
        "text-secondary",
        "mb-4",
        "text-[16px]",
        "leading-relaxed",
        "lg:text-[18px]"
      );
    });

    it("renders all tags with correct styling", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      mockNewsItem.tags.forEach((tag) => {
        const tagElement = screen.getByText(tag);
        expect(tagElement).toBeInTheDocument();
        expect(tagElement).toHaveClass(
          "text-on-background",
          "bg-background",
          "inline-block",
          "rounded-full",
          "border",
          "px-3",
          "py-1",
          "text-[14px]",
          "font-medium",
          "transition-colors",
          "duration-200"
        );
      });
    });

    it("renders meta information with author, date, and read time", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      expect(screen.getByText(`By ${mockNewsItem.author}`)).toBeInTheDocument();
      expect(screen.getByText(mockNewsItem.readTime!)).toBeInTheDocument();

      // Check formatted date
      const formattedDate = new Date(
        mockNewsItem.publishedAt
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("applies correct responsive classes to image container", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const imageContainer = document.querySelector(
        ".h-\\[226px\\].lg\\:h-\\[460px\\]"
      );
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass("h-[226px]", "lg:h-[460px]");
    });

    it("applies correct responsive classes to title", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveClass("text-[18px]", "lg:text-[32px]");
    });

    it("applies correct responsive classes to description", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const description = screen.getByText(mockNewsItem.description);
      expect(description).toHaveClass("text-[16px]", "lg:text-[18px]");
    });

    it("applies correct responsive margins", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const imageContainer = document.querySelector(".mb-4.lg\\:mb-6");
      expect(imageContainer).toHaveClass("mb-4", "lg:mb-6");

      const tagsContainer = document.querySelector(
        ".mb-4.flex.flex-wrap.gap-2.lg\\:mb-6"
      );
      expect(tagsContainer).toHaveClass("mb-4", "lg:mb-6");
    });
  });

  describe("Optional Data Handling", () => {
    it("handles missing author gracefully", () => {
      const newsWithoutAuthor = { ...mockNewsItem, author: undefined };
      render(<MainNewsCard news={newsWithoutAuthor} />);

      expect(screen.queryByText(/By /)).not.toBeInTheDocument();
    });

    it("handles missing read time gracefully", () => {
      const newsWithoutReadTime = { ...mockNewsItem, readTime: undefined };
      render(<MainNewsCard news={newsWithoutReadTime} />);

      expect(screen.queryByText(/min read/)).not.toBeInTheDocument();
    });

    it("handles missing published date gracefully", () => {
      const newsWithoutDate = { ...mockNewsItem, publishedAt: "" };
      render(<MainNewsCard news={newsWithoutDate} />);

      // Should not throw error and should still render other content
      expect(screen.getByText(mockNewsItem.title)).toBeInTheDocument();
    });

    it("handles empty tags array", () => {
      const newsWithoutTags = { ...mockNewsItem, tags: [] };
      render(<MainNewsCard news={newsWithoutTags} />);

      // Should still render the component without tags
      expect(screen.getByText(mockNewsItem.title)).toBeInTheDocument();

      const tagsContainer = document.querySelector(
        ".mb-4.flex.flex-wrap.gap-2"
      );
      expect(tagsContainer).toBeInTheDocument();
      expect(tagsContainer?.children).toHaveLength(0);
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H2");
    });

    it("uses semantic article element", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
    });

    it("provides proper alt text for image", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const image = screen.getByAltText(mockNewsItem.title);
      expect(image).toBeInTheDocument();
    });
  });

  describe("Styling and Visual Design", () => {
    it("applies correct color classes", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveClass("text-background");

      const description = screen.getByText(mockNewsItem.description);
      expect(description).toHaveClass("text-secondary");

      const metaInfo = document.querySelector(".text-background\\/60");
      expect(metaInfo).toBeInTheDocument();
    });

    it("applies correct spacing classes", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const title = screen.getByRole("heading", { level: 2 });
      expect(title).toHaveClass("mb-4");

      const description = screen.getByText(mockNewsItem.description);
      expect(description).toHaveClass("mb-4");
    });

    it("applies transition classes to tags", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const firstTag = screen.getByText(mockNewsItem.tags[0]);
      expect(firstTag).toHaveClass("transition-colors", "duration-200");
    });
  });

  describe("Date Formatting", () => {
    it("formats date correctly", () => {
      render(<MainNewsCard news={mockNewsItem} />);

      const expectedDate = new Date(
        mockNewsItem.publishedAt
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });

    it("handles invalid date gracefully", () => {
      const newsWithInvalidDate = {
        ...mockNewsItem,
        publishedAt: "invalid-date",
      };

      expect(() =>
        render(<MainNewsCard news={newsWithInvalidDate} />)
      ).not.toThrow();
    });
  });
});
