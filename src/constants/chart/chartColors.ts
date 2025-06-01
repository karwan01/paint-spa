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
