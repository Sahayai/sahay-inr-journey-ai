
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface IncomeLineChartProps {
  data: Array<{ month: string; amount: number }>;
  height?: number;
}

const IncomeLineChart: React.FC<IncomeLineChartProps> = ({ data, height = 400 }) => {
  const config = {
    income: {
      label: "Income",
      theme: {
        light: "#33C3F0",
        dark: "#33C3F0",
      },
    },
  };

  return (
    <ChartContainer config={config} className="h-full w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
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
          <Line
            type="monotone"
            dataKey="amount"
            name="income"
            stroke="var(--color-income)"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default IncomeLineChart;
