"use client";
import { pricingTiers } from "@/data/pricingTiers";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function PricingExpansionPanel() {
  const [expandedTier, setExpandedTier] = useState<string>("pro");

  const toggleTier = (tier: string) => {
    setExpandedTier(expandedTier === tier ? "" : tier);
  };

  return (
    <div className="mx-auto max-w-lg space-y-4">
      {pricingTiers.map((tier) => (
        <div
          key={tier.id}
          className={`overflow-hidden rounded-2xl transition-all duration-300 ${
            tier.isFeatured
              ? "bg-primary relative shadow-xl"
              : "bg-on-background shadow-lg hover:shadow-xl"
          }`}
          style={
            tier.isFeatured
              ? {
                  backgroundImage: "url('/pricing/pro-bg.svg')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center right",
                }
              : {}
          }
        >
          {/* Header */}
          <div
            className={`flex cursor-pointer items-center justify-between p-6 transition-all duration-200 ${
              tier.isFeatured
                ? "relative z-10 hover:bg-white/5"
                : "hover:bg-black/5"
            }`}
            onClick={() => toggleTier(tier.id)}
          >
            <div className="flex items-center gap-3">
              <h3
                className={`text-[18px] font-semibold lg:text-[28px] ${
                  tier.isFeatured ? "text-background" : "text-primary"
                }`}
              >
                {tier.name}
              </h3>
              {tier.badge && (
                <span className="bg-on-primary text-primary rounded-full px-3 py-1 text-sm font-medium">
                  {tier.badge}
                </span>
              )}
            </div>
            {expandedTier === tier.id ? (
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 ${
                  tier.isFeatured
                    ? "text-primary bg-background"
                    : "text-background bg-primary"
                }`}
              >
                <BiChevronUp className={`h-4 w-4`} />
              </div>
            ) : (
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 ${
                  tier.isFeatured
                    ? "text-primary bg-background"
                    : "text-background bg-primary"
                }`}
              >
                <BiChevronDown className={`h-4 w-4`} />
              </div>
            )}
          </div>

          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedTier === tier.id
                ? "max-h-[800px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`relative z-10 px-6 pb-6 ${
                tier.isFeatured ? "text-on-primary" : "text-background"
              }`}
            >
              <p
                className={`mb-6 leading-relaxed ${
                  tier.isFeatured
                    ? "text-background/90 text-[16px] lg:text-[18px]"
                    : "text-background/80 text-sm"
                }`}
              >
                {tier.description}
              </p>

              {/* Features List */}
              {tier.features && (
                <div className="mb-6">
                  <h4
                    className={`mb-3 text-sm font-medium ${
                      tier.isFeatured ? "hidden" : "text-background"
                    }`}
                  >
                    What&apos;s included:
                  </h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`flex items-center text-sm ${
                          tier.isFeatured
                            ? "text-on-primary/90"
                            : "text-background/80"
                        }`}
                      >
                        <span
                          className={`mr-2 h-1.5 w-1.5 rounded-full ${
                            tier.isFeatured ? "bg-on-primary" : "bg-accent"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing and CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className={`text-[18px] font-bold lg:text-[28px] ${
                      tier.isFeatured ? "text-on-primary" : "text-accent"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      className={`ml-1 text-[14px] lg:text-[16px] ${
                        tier.isFeatured
                          ? "text-on-primary/70"
                          : "text-background/60"
                      }`}
                    >
                      {tier.period}
                    </span>
                  )}
                </div>
                <button
                  className={`rounded-md px-3 py-1 font-medium transition-all duration-200 lg:px-4 lg:py-2 ${
                    tier.isFeatured
                      ? "bg-on-primary text-primary hover:bg-on-primary/90 text-[16px] hover:shadow-lg lg:text-[18px]"
                      : "bg-primary text-on-primary hover:bg-accent hover:shadow-lg"
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
