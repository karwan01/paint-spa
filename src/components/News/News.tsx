"use client";
import Button from "@/components/Buttons/PrimaryButton";
import { newsItems } from "@/data/news";
import React from "react";
import MainNewsCard from "./MainNewsCard/MainNewsCard";
import SecondaryNewsCard from "./SecondaryNewsCard/SecondaryNewsCard";

const News: React.FC = () => {
  return (
    <section id="news" className="mx-3 lg:mx-[90px]">
      {/* Title Section */}
      <div className="mb-3 flex justify-center lg:mb-[108px] lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-background text-[24px] font-bold lg:text-[44px]">
          News
        </h2>
        <Button className="hidden lg:inline" variant="primary" radius="full">
          View all news
        </Button>
      </div>

      {/* News Cards Section */}
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        {/* Single Focus News */}
        <div className="lg:flex-3">
          <MainNewsCard
            news={newsItems.find((item) => item.isMainNews) || newsItems[0]}
          />
        </div>
        {/* showing three top news */}
        <div className="space-y-4 lg:flex-2">
          {newsItems
            .filter((item) => !item.isMainNews)
            .slice(0, 3)
            .map((news) => (
              <SecondaryNewsCard key={news.id} news={news} />
            ))}
        </div>
      </div>
      {/* Button Section */}
      <Button
        className="mt-8 min-w-full lg:hidden"
        variant="primary"
        radius="full"
      >
        Show all news
      </Button>
    </section>
  );
};

export default News;
