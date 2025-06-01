import { PricingTier } from "@/types/PricingTierTypes";

export const pricingTiers: PricingTier[] = [
  {
    id: "intro",
    name: "Intro",
    description:
      "Perfect for getting started with basic painting services and limited projects.",
    price: "Free",
    buttonText: "Get Started",
    features: [
      "Basic consultation",
      "1 room painting",
      "Standard paint options",
      "Email support",
    ],
  },
  {
    id: "base",
    name: "Base",
    description:
      "Essential features for homeowners with moderate painting needs.",
    price: "$299",
    period: "/project",
    buttonText: "Choose Base",
    features: [
      "Everything in Intro",
      "Up to 3 rooms",
      "Premium paint options",
      "Color consultation",
      "Phone support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "Pro account gives you freedom with uploading HD videos and can also meet all your business needs apasih kamu",
    price: "$123",
    period: "/month",
    buttonText: "Try 1 Month",
    isFeatured: true,
    badge: "Save $40",
    features: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Advanced solutions for commercial properties and large-scale projects.",
    price: "Custom",
    buttonText: "Contact Sales",
    features: [
      "Everything in Pro",
      "Commercial-grade materials",
      "Project management",
      "Dedicated account manager",
      "Custom scheduling",
      "5-year warranty",
    ],
  },
];
