
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ExpenseBarChartProps {
  data: Array<{ month: string; amount: number }>;
  height?: number;
}

const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ data, height = 400 }) => {
  const config = {
    expenses: {
      label: "Expenses",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5",
      },
    },
  };

  return (
    <ChartContainer config={config} className="h-full w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
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
          <Bar
            dataKey="amount"
            name="expenses"
            fill="var(--color-expenses)"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ExpenseBarChart;
