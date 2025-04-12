
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface SpendingPieChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
}

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#E5DEFF'];

const SpendingPieChart: React.FC<SpendingPieChartProps> = ({ data, height = 400 }) => {
  // Create a config object for the chart
  const config = data.reduce((acc, item, index) => {
    return {
      ...acc,
      [item.name]: {
        label: item.name,
        color: COLORS[index % COLORS.length],
      },
    };
  }, {});

  return (
    <ChartContainer config={config} className="h-full w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `₹${Number(value).toLocaleString()}`}
              />
            }
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={height > 300 ? 140 : 80}
            innerRadius={height > 300 ? 90 : 50}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartLegend
            content={<ChartLegendContent />}
            layout={height > 300 ? "horizontal" : "vertical"}
            verticalAlign="bottom"
            align="center"
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SpendingPieChart;
