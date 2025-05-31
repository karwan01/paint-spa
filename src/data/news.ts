import { NewsItem } from "@/types/News";

export const newsItems: NewsItem[] = [
  {
    id: "main-1",
    title: "Revolutionary Paint Technology Transforms Interior Design Industry",
    description:
      "Discover how our latest smart paint technology is revolutionizing the way homeowners and professionals approach interior design projects with enhanced durability and color-changing capabilities.",
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
      "Environmental consciousness drives demand for sustainable painting solutions in residential and commercial projects.",
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
      "How choosing the right colors can impact mood, productivity, and overall well-being in living spaces.",
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
      "Learn expert tips and tricks to achieve professional-quality results in your home painting projects.",
    image: "/news/news-1.png",
    tags: ["DIY", "Tips", "Tutorials"],
    publishedAt: "2024-05-08",
    author: "David Thompson",
    readTime: "6 min read",
  },
];
