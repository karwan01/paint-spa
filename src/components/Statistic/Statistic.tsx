"use client";
import {
  CHART_COLORS,
  monthlyData,
  PIE_CHART_COLORS,
  serviceData,
} from "@/data/chartData";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Statistic: React.FC = () => {
  // Custom tooltip for bar chart
  const CustomBarTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; dataKey: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border-secondary/20 bg-on-background rounded-lg border p-3 shadow-lg">
          <p className="text-on-background font-medium">{`Month: ${label}`}</p>
          <p className="text-background">{`Projects: ${payload[0].value}`}</p>
          <p className="text-accent">{`Revenue: $${payload[1].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border-secondary/20 bg-on-background rounded-lg border p-3 shadow-lg">
          <p className="text-background font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="mx-3 my-[60px] lg:mx-[90px] lg:my-[80px]">
      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <h2 className="text-background text-center text-[24px] font-medium lg:text-start lg:text-[32px] lg:font-bold">
          Business Analytics
        </h2>
        <p className="text-secondary mt-2 text-center text-base lg:text-start lg:text-lg">
          Track our performance and service distribution with interactive charts
        </p>
      </div>

      {/* Charts Grid */}
      <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-y-[48px]">
        {/* Bar Chart - Monthly Performance */}
        <div className="h-[300px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={CHART_COLORS.secondary + "30"}
              />
              <XAxis
                dataKey="month"
                stroke={CHART_COLORS.secondary}
                fontSize={12}
                fontFamily="var(--font-primary)"
              />
              <YAxis
                yAxisId="projects"
                orientation="left"
                stroke={CHART_COLORS.primary}
                fontSize={12}
                fontFamily="var(--font-primary)"
              />
              <YAxis
                yAxisId="revenue"
                orientation="right"
                stroke={CHART_COLORS.accent}
                fontSize={12}
                fontFamily="var(--font-primary)"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                yAxisId="projects"
                dataKey="projects"
                fill={CHART_COLORS.primary}
                radius={[4, 4, 0, 0]}
                name="Projects"
              />
              <Bar
                yAxisId="revenue"
                dataKey="revenue"
                fill={CHART_COLORS.accent}
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Service Distribution */}
        <div className="h-[300px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="45%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
                fontSize={12}
                fontFamily="var(--font-primary)"
              >
                {serviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "12px",
                  fontFamily: "var(--font-primary)",
                  color: CHART_COLORS.onSurface,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
