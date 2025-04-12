
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

  // Function to determine the class for a date based on transaction amounts
  const getDayClass = (date: Date): string => {
    const dateString = date.toISOString().split('T')[0];
    const amount = amountsByDate[dateString];
    
    if (amount === undefined) return "";
    
    if (amount > 0) return "bg-sahay-soft-green text-green-600 font-bold";
    if (amount < 0) return "bg-sahay-soft-orange text-orange-600 font-bold";
    return "";
  };

  // Custom render function for each day cell
  const renderDay = (day: React.ComponentProps<typeof Calendar>["components"]["day"]) => {
    return function DayWithTransaction(props: any) {
      const date = props.date;
      if (!date) return null;
      
      const dateString = date.toISOString().split('T')[0];
      const amount = amountsByDate[dateString];
      const className = getDayClass(date);
      
      return (
        <div className={`w-full h-full p-2 flex flex-col items-center ${className}`}>
          {/* Render the original day component with its props */}
          {day && React.cloneElement(day(props), {})}
          {/* Add transaction amount if exists */}
          {amount !== undefined && (
            <div className="text-xs mt-1">
              {amount > 0 ? '+' : ''}₹{Math.abs(amount).toLocaleString()}
            </div>
          )}
        </div>
      );
    };
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            className="rounded-md border"
            modifiers={{
              highlighted: (date) => {
                const dateString = date.toISOString().split('T')[0];
                return amountsByDate[dateString] !== undefined;
              }
            }}
            modifiersClassNames={{
              highlighted: "bg-opacity-20" // Using a string value as required
            }}
            components={{
              day: renderDay(undefined)
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyCalendarView;
