import { NewsItem } from "@/types/NewsTypes";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SecondaryNewsCard from "./SecondaryNewsCard";

const mockNewsItem: NewsItem = {
  id: "test-secondary-1",
  title: "Eco-Friendly Paint Solutions Gain Popularity",
  description:
    "Environmental consciousness drives demand for sustainable painting solutions in residential and commercial projects.",
  image: "/news/news-1.png",
  tags: ["Sustainability", "Environment", "Green", "Eco-Friendly"],
  publishedAt: "2024-05-12",
  author: "Mike Chen",
  readTime: "3 min read",
};

describe("SecondaryNewsCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Structure and Layout", () => {
    it("renders the main article container with correct classes", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveClass(
        "flex",
        "h-[180px]",
        "w-full",
        "cursor-pointer",
        "items-start",
        "overflow-hidden",
        "rounded-lg",
        "shadow-sm",
        "transition-shadow",
        "duration-200",
        "hover:shadow-md",
        "lg:h-[246px]"
      );
    });

    it("renders the image container with correct responsive classes", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const imageContainer = document.querySelector(
        ".relative.h-\\[115px\\].w-\\[115px\\]"
      );
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass(
        "relative",
        "h-[115px]",
        "w-[115px]",
        "flex-shrink-0",
        "overflow-hidden",
        "rounded-lg",
        "lg:h-[246px]",
        "lg:w-[221px]"
      );
    });

    it("renders the content container with correct classes", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const contentContainer = document.querySelector(
        ".flex.h-full.flex-1.flex-col"
      );
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass(
        "flex",
        "h-full",
        "flex-1",
        "flex-col",
        "justify-start",
        "p-4",
        "lg:py-6",
        "lg:pr-6",
        "lg:pl-8"
      );
    });
  });

  describe("Content Rendering", () => {
    it("renders the news image with correct attributes", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const image = screen.getByAltText(mockNewsItem.title);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockNewsItem.image);
    });

    it("renders the title with correct text and styling", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const title = screen.getByRole("heading", { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(mockNewsItem.title);
      expect(title).toHaveClass(
        "text-background",
        "mb-3",
        "line-clamp-2",
        "text-[16px]",
        "leading-tight",
        "font-medium",
        "lg:mb-4",
        "lg:line-clamp-3",
        "lg:text-[24px]",
        "lg:font-medium"
      );
    });

    it("renders only first 2 tags when there are more than 2", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      // Should show first 2 tags
      expect(screen.getByText("Sustainability")).toBeInTheDocument();
      expect(screen.getByText("Environment")).toBeInTheDocument();

      // Should show +2 indicator for remaining tags
      expect(screen.getByText("+2")).toBeInTheDocument();

      // Should not show the 3rd and 4th tags directly
      expect(screen.queryByText("Green")).not.toBeInTheDocument();
      expect(screen.queryByText("Eco-Friendly")).not.toBeInTheDocument();
    });

    it("renders all tags when there are 2 or fewer", () => {
      const newsWithFewTags = { ...mockNewsItem, tags: ["Tag1", "Tag2"] };
      render(<SecondaryNewsCard news={newsWithFewTags} />);

      expect(screen.getByText("Tag1")).toBeInTheDocument();
      expect(screen.getByText("Tag2")).toBeInTheDocument();
      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
    });

    it("renders meta information on desktop only", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const metaContainer = document.querySelector(
        ".mt-auto.hidden.items-center.gap-3"
      );
      expect(metaContainer).toBeInTheDocument();
      expect(metaContainer).toHaveClass("hidden", "lg:flex");
    });
  });

  describe("Responsive Design", () => {
    it("applies correct responsive image dimensions", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const imageContainer = document.querySelector(
        ".h-\\[115px\\].w-\\[115px\\].lg\\:h-\\[246px\\].lg\\:w-\\[221px\\]"
      );
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass(
        "h-[115px]",
        "w-[115px]",
        "lg:h-[246px]",
        "lg:w-[221px]"
      );
    });

    it("applies correct responsive card height", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("h-[180px]", "lg:h-[246px]");
    });

    it("applies correct responsive title styling", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const title = screen.getByRole("heading", { level: 3 });
      expect(title).toHaveClass(
        "text-[16px]",
        "lg:text-[24px]",
        "line-clamp-2",
        "lg:line-clamp-3"
      );
    });

    it("applies correct responsive padding", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const contentContainer = document.querySelector(
        ".p-4.lg\\:py-6.lg\\:pr-6.lg\\:pl-8"
      );
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass(
        "p-4",
        "lg:py-6",
        "lg:pr-6",
        "lg:pl-8"
      );
    });
  });

  describe("Tag Handling", () => {
    it("handles empty tags array", () => {
      const newsWithoutTags = { ...mockNewsItem, tags: [] };
      render(<SecondaryNewsCard news={newsWithoutTags} />);

      const tagsContainer = document.querySelector(".flex.flex-wrap.gap-2");
      expect(tagsContainer).toBeInTheDocument();
      expect(tagsContainer?.children).toHaveLength(0);
    });

    it("applies correct styling to tag elements", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const firstTag = screen.getByText("Sustainability");
      expect(firstTag).toHaveClass(
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

    it("applies correct styling to overflow indicator", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const overflowIndicator = screen.getByText("+2");
      expect(overflowIndicator).toHaveClass(
        "bg-background/10",
        "text-background/60",
        "inline-block",
        "rounded-full",
        "px-2",
        "py-1",
        "text-[14px]",
        "font-medium",
        "lg:text-sm"
      );
    });

    it("calculates overflow count correctly", () => {
      const newsWithManyTags = {
        ...mockNewsItem,
        tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
      };
      render(<SecondaryNewsCard news={newsWithManyTags} />);

      expect(screen.getByText("+3")).toBeInTheDocument();
    });
  });

  describe("Meta Information", () => {
    it("formats date correctly in meta section", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const expectedDate = new Date(
        mockNewsItem.publishedAt
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });

    it("displays read time in meta section", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      expect(screen.getByText(mockNewsItem.readTime!)).toBeInTheDocument();
    });

    it("handles missing published date gracefully", () => {
      const newsWithoutDate = { ...mockNewsItem, publishedAt: "" };
      expect(() =>
        render(<SecondaryNewsCard news={newsWithoutDate} />)
      ).not.toThrow();
    });

    it("handles missing read time gracefully", () => {
      const newsWithoutReadTime = { ...mockNewsItem, readTime: undefined };
      render(<SecondaryNewsCard news={newsWithoutReadTime} />);

      expect(screen.queryByText(/min read/)).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses semantic article element", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
    });

    it("has proper heading hierarchy", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H3");
    });

    it("provides proper alt text for image", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const image = screen.getByAltText(mockNewsItem.title);
      expect(image).toBeInTheDocument();
    });

    it("has cursor pointer for interactivity indication", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("cursor-pointer");
    });
  });

  describe("Visual Effects", () => {
    it("applies hover effects", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toHaveClass(
        "shadow-sm",
        "hover:shadow-md",
        "transition-shadow",
        "duration-200"
      );
    });

    it("applies transition effects to tags", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const firstTag = screen.getByText("Sustainability");
      expect(firstTag).toHaveClass("transition-colors", "duration-200");
    });

    it("applies rounded corners to image", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const imageContainer = document.querySelector(
        ".overflow-hidden.rounded-lg"
      );
      expect(imageContainer).toBeInTheDocument();
    });
  });

  describe("Layout Behavior", () => {
    it("uses flex layout for horizontal arrangement", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const article = screen.getByRole("article");
      expect(article).toHaveClass("flex", "items-start");
    });

    it("prevents image from shrinking", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const imageContainer = document.querySelector(".flex-shrink-0");
      expect(imageContainer).toBeInTheDocument();
    });

    it("allows content to fill remaining space", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const contentContainer = document.querySelector(".flex-1");
      expect(contentContainer).toBeInTheDocument();
    });

    it("positions meta information at bottom", () => {
      render(<SecondaryNewsCard news={mockNewsItem} />);

      const metaContainer = document.querySelector(".mt-auto");
      expect(metaContainer).toBeInTheDocument();
    });
  });
});
