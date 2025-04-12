
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SavingsAreaChartProps {
  data: Array<{ month: string; amount: number }>;
  height?: number;
}

const SavingsAreaChart: React.FC<SavingsAreaChartProps> = ({ data, height = 400 }) => {
  const config = {
    savings: {
      label: "Savings",
      theme: {
        light: "#F97316",
        dark: "#F97316",
      },
    },
  };

  return (
    <ChartContainer config={config} className="h-full w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis 
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            domain={[0, 'auto']}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `₹${Number(value).toLocaleString()}`}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="amount"
            name="savings"
            fill="var(--color-savings)"
            stroke="var(--color-savings)"
            fillOpacity={0.3}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SavingsAreaChart;
