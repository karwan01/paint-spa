"use client";
import React from "react";
import PricingExpansionPanel from "./PricingExpansionPanel/PricingExpansionPanel";

const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="mx-6 my-[50px] flex flex-col gap-y-8 lg:mx-[87px] lg:my-[130px] lg:flex-row lg:justify-between lg:gap-x-[60px]"
    >
      <div className="flex-1 text-center lg:text-start">
        <h2 className="text-background mb-3 text-[24px] leading-[1.2] font-bold lg:text-[65px] lg:leading-[1.1]">
          Simple pricing for your Business
        </h2>
        <p className="text-background text-[16px] lg:text-[18px]">
          We have several powerful plans to showcase your business and get
          discovered as a creative entrepreneurs. Everything you need.
        </p>
      </div>
      <div className="flex flex-1 justify-center lg:justify-end">
        <PricingExpansionPanel />
      </div>
    </section>
  );
};

export default Pricing;
