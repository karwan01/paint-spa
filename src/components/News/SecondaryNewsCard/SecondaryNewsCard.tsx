import { NewsItem } from "@/types/NewsTypes";
import Image from "next/image";

interface SecondaryNewsCardProps {
  news: NewsItem;
}

export default function SecondaryNewsCard({ news }: SecondaryNewsCardProps) {
  return (
    <article className="flex h-[180px] w-full cursor-pointer items-start overflow-hidden rounded-lg shadow-sm transition-shadow duration-200 hover:shadow-md lg:h-[246px]">
      {/* News Image */}
      <div className="relative h-[115px] w-[115px] flex-shrink-0 overflow-hidden rounded-lg lg:h-[246px] lg:w-[221px]">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 115px, 221px"
        />
      </div>

      {/* Content */}
      <div className="flex h-full flex-1 flex-col justify-start p-4 lg:py-6 lg:pr-6 lg:pl-8">
        {/* Title */}
        <h3 className="text-background mb-3 line-clamp-2 text-[16px] leading-tight font-medium lg:mb-4 lg:line-clamp-3 lg:text-[24px] lg:font-medium">
          {news.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {news.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-on-background bg-background inline-block rounded-full border px-3 py-1 text-[14px] font-medium transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
          {news.tags.length > 2 && (
            <span className="bg-background/10 text-background/60 inline-block rounded-full px-2 py-1 text-[14px] font-medium lg:text-sm">
              +{news.tags.length - 2}
            </span>
          )}
        </div>

        {/* Meta Information - Hidden on mobile to save space */}
        <div className="text-background/60 mt-auto hidden items-center gap-3 text-xs lg:flex">
          {news.publishedAt && (
            <span>
              {new Date(news.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {news.readTime && <span>{news.readTime}</span>}
        </div>
      </div>
    </article>
  );
}
