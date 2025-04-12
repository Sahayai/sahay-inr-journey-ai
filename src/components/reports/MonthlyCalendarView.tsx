
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}

interface MonthlyCalendarViewProps {
  transactions: Transaction[];
}

const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({ transactions }) => {
  // Group transactions by date
  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date.split('T')[0]; // Extract just the date part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  // Get amounts by date
  const amountsByDate = Object.entries(transactionsByDate).reduce((acc, [date, txns]) => {
    const totalAmount = txns.reduce((sum, t) => sum + t.amount, 0);
    acc[date] = totalAmount;
    return acc;
  }, {} as Record<string, number>);

  // Function to determine the modifier class for a date based on transaction amounts
  const getDayClassNames = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    const amount = amountsByDate[dateString];
    
    if (amount === undefined) return "";
    
    if (amount > 0) return "bg-sahay-soft-green text-green-600 font-bold";
    if (amount < 0) return "bg-sahay-soft-orange text-orange-600 font-bold";
    return "";
  };

  // Function to add transaction info to day cells
  const renderDayContent = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    const amount = amountsByDate[dateString];
    
    if (amount === undefined) return null;
    
    return (
      <div className="text-xs mt-1">
        {amount > 0 ? '+' : ''}₹{Math.abs(amount).toLocaleString()}
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            className="rounded-md border"
            dayClassName={getDayClassNames}
            components={{
              Day: ({ day, ...props }) => (
                <div className="w-full h-full p-2 flex flex-col items-center">
                  <div {...props}>{day.getDate()}</div>
                  {renderDayContent(day)}
                </div>
              ),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyCalendarView;
