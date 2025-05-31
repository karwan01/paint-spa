// Chart data for statistics visualization

export interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface BarChartDataItem {
  month: string;
  projects: number;
  revenue: number;
}

// Mock data for bar chart - Monthly projects and revenue
export const monthlyData: BarChartDataItem[] = [
  { month: "Jan", projects: 12, revenue: 45000 },
  { month: "Feb", projects: 19, revenue: 52000 },
  { month: "Mar", projects: 15, revenue: 48000 },
  { month: "Apr", projects: 22, revenue: 61000 },
  { month: "May", projects: 28, revenue: 72000 },
  { month: "Jun", projects: 25, revenue: 68000 },
  { month: "Jul", projects: 30, revenue: 78000 },
  { month: "Aug", projects: 27, revenue: 75000 },
  { month: "Sep", projects: 32, revenue: 85000 },
  { month: "Oct", projects: 35, revenue: 92000 },
  { month: "Nov", projects: 29, revenue: 79000 },
  { month: "Dec", projects: 38, revenue: 98000 },
];

// Mock data for pie chart - Service distribution
export const serviceData: ChartDataItem[] = [
  { name: "Web Design", value: 35 },
  { name: "Digital Marketing", value: 25 },
  { name: "Brand Identity", value: 20 },
  { name: "Mobile Apps", value: 15 },
  { name: "Consulting", value: 5 },
];

// Theme colors for charts
export const CHART_COLORS = {
  primary: "#7d4283",
  secondary: "#646a69",
  accent: "#e879f9",
  accentVariant: "#7951b3",
  warning: "#f3722c",
  surface: "#ffffff",
  onSurface: "#161616",
  background: "#ffffff",
  onBackground: "#161616",
} as const;

// Color palette for pie chart segments
export const PIE_CHART_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.secondary,
  CHART_COLORS.accentVariant,
  CHART_COLORS.warning,
];
