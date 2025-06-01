export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period?: string;
  buttonText: string;
  isFeatured?: boolean;
  badge?: string;
  features?: string[];
}
