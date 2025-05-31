import { NewsItem } from "@/types/News";
import Image from "next/image";

interface MainNewsCardProps {
  news: NewsItem;
}

export default function MainNewsCard({ news }: MainNewsCardProps) {
  return (
    <article className="mx-auto w-full max-w-[696px]">
      {/* News Image */}
      <div className="relative mb-4 h-[226px] w-full overflow-hidden rounded-lg lg:mb-6 lg:h-[460px]">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 696px"
          priority
        />
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2 lg:mb-6">
        {news.tags.map((tag, index) => (
          <span
            key={index}
            className="text-on-background bg-background inline-block rounded-full border px-3 py-1 text-[14px] font-medium transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-background mb-4 text-[18px] leading-[1.5] font-bold lg:text-[32px] lg:leading-tight">
        {news.title}
      </h2>

      {/* Description */}
      <p className="text-secondary mb-4 text-[16px] leading-relaxed lg:text-[18px]">
        {news.description}
      </p>

      {/* Meta Information */}
      <div className="text-background/60 flex items-center gap-4 text-sm">
        {news.author && <span className="font-medium">By {news.author}</span>}
        {news.publishedAt && (
          <span>
            {new Date(news.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
        {news.readTime && <span>{news.readTime}</span>}
      </div>
    </article>
  );
}
