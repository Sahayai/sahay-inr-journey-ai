
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart, ChartPie, AreaChart, Calendar } from "lucide-react";
import ExpenseBarChart from '@/components/reports/ExpenseBarChart';
import SpendingPieChart from '@/components/reports/SpendingPieChart';
import IncomeLineChart from '@/components/reports/IncomeLineChart';
import SavingsAreaChart from '@/components/reports/SavingsAreaChart';
import MonthlyCalendarView from '@/components/reports/MonthlyCalendarView';
import { Label } from "@/components/ui/label";

// Mock data - in a real app, this would come from a database or API
const mockFinancialData = {
  monthlyExpenses: [
    { month: 'Jan', amount: 32000 },
    { month: 'Feb', amount: 28000 },
    { month: 'Mar', amount: 36000 },
    { month: 'Apr', amount: 29000 },
    { month: 'May', amount: 34000 },
    { month: 'Jun', amount: 31000 },
  ],
  categorizedSpending: [
    { name: 'Food', value: 12000 },
    { name: 'Housing', value: 15000 },
    { name: 'Transport', value: 7000 },
    { name: 'Entertainment', value: 5000 },
    { name: 'Utilities', value: 3000 },
  ],
  monthlyIncome: [
    { month: 'Jan', amount: 50000 },
    { month: 'Feb', amount: 50000 },
    { month: 'Mar', amount: 55000 },
    { month: 'Apr', amount: 55000 },
    { month: 'May', amount: 60000 },
    { month: 'Jun', amount: 60000 },
  ],
  monthlySavings: [
    { month: 'Jan', amount: 18000 },
    { month: 'Feb', amount: 22000 },
    { month: 'Mar', amount: 19000 },
    { month: 'Apr', amount: 26000 },
    { month: 'May', amount: 26000 },
    { month: 'Jun', amount: 29000 },
  ],
  recentTransactions: [
    { id: 1, name: "Grocery Shopping", amount: -2500, date: "2025-06-12", category: "Food" },
    { id: 2, name: "Salary Deposit", amount: 60000, date: "2025-06-10", category: "Income" },
    { id: 3, name: "Netflix", amount: -649, date: "2025-06-09", category: "Entertainment" },
    { id: 4, name: "Electricity Bill", amount: -1200, date: "2025-06-08", category: "Utilities" },
    { id: 5, name: "Restaurant", amount: -1800, date: "2025-06-07", category: "Food" },
    { id: 6, name: "Online Shopping", amount: -3200, date: "2025-06-05", category: "Shopping" },
    { id: 7, name: "Mobile Recharge", amount: -999, date: "2025-06-04", category: "Utilities" },
    { id: 8, name: "Uber Ride", amount: -350, date: "2025-06-03", category: "Transport" },
    { id: 9, name: "Freelance Payment", amount: 15000, date: "2025-06-02", category: "Income" },
    { id: 10, name: "Office Supplies", amount: -750, date: "2025-06-01", category: "Office" },
  ],
};

type TimeRange = 'week' | 'month' | '3months' | '6months' | 'year' | 'all';

const Reports = () => {
  const [reportType, setReportType] = useState<string>('expenses');
  const [timeRange, setTimeRange] = useState<TimeRange>('6months');
  const [visualizationType, setVisualizationType] = useState<string>('bar');

  const renderVisualization = () => {
    switch (reportType) {
      case 'expenses':
        if (visualizationType === 'bar') {
          return <ExpenseBarChart data={mockFinancialData.monthlyExpenses} />;
        } else if (visualizationType === 'pie') {
          return <SpendingPieChart data={mockFinancialData.categorizedSpending} />;
        } else if (visualizationType === 'calendar') {
          return <MonthlyCalendarView transactions={mockFinancialData.recentTransactions} />;
        }
        return <ExpenseBarChart data={mockFinancialData.monthlyExpenses} />;
      
      case 'income':
        if (visualizationType === 'line') {
          return <IncomeLineChart data={mockFinancialData.monthlyIncome} />;
        } else if (visualizationType === 'bar') {
          return <ExpenseBarChart data={mockFinancialData.monthlyIncome} />;
        } else if (visualizationType === 'calendar') {
          return <MonthlyCalendarView transactions={mockFinancialData.recentTransactions} />;
        }
        return <IncomeLineChart data={mockFinancialData.monthlyIncome} />;
      
      case 'savings':
        if (visualizationType === 'area') {
          return <SavingsAreaChart data={mockFinancialData.monthlySavings} />;
        } else if (visualizationType === 'line') {
          return <IncomeLineChart data={mockFinancialData.monthlySavings} />;
        } else if (visualizationType === 'bar') {
          return <ExpenseBarChart data={mockFinancialData.monthlySavings} />;
        }
        return <SavingsAreaChart data={mockFinancialData.monthlySavings} />;
      
      case 'all':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpenseBarChart data={mockFinancialData.monthlyExpenses} height={200} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <SpendingPieChart data={mockFinancialData.categorizedSpending} height={200} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
              </CardHeader>
              <CardContent>
                <IncomeLineChart data={mockFinancialData.monthlyIncome} height={200} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <SavingsAreaChart data={mockFinancialData.monthlySavings} height={200} />
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return <ExpenseBarChart data={mockFinancialData.monthlyExpenses} />;
    }
  };

  const getAvailableVisualizations = (reportType: string) => {
    switch (reportType) {
      case 'expenses':
        return [
          { value: 'bar', label: 'Bar Chart', icon: <BarChart className="h-4 w-4" /> },
          { value: 'pie', label: 'Pie Chart', icon: <ChartPie className="h-4 w-4" /> },
          { value: 'calendar', label: 'Calendar View', icon: <Calendar className="h-4 w-4" /> },
        ];
      case 'income':
        return [
          { value: 'line', label: 'Line Chart', icon: <LineChart className="h-4 w-4" /> },
          { value: 'bar', label: 'Bar Chart', icon: <BarChart className="h-4 w-4" /> },
          { value: 'calendar', label: 'Calendar View', icon: <Calendar className="h-4 w-4" /> },
        ];
      case 'savings':
        return [
          { value: 'area', label: 'Area Chart', icon: <AreaChart className="h-4 w-4" /> },
          { value: 'line', label: 'Line Chart', icon: <LineChart className="h-4 w-4" /> },
          { value: 'bar', label: 'Bar Chart', icon: <BarChart className="h-4 w-4" /> },
        ];
      default:
        return [
          { value: 'bar', label: 'Bar Chart', icon: <BarChart className="h-4 w-4" /> },
        ];
    }
  };

  // Set default visualization when changing report type
  const handleReportTypeChange = (value: string) => {
    setReportType(value);
    if (value === 'expenses') {
      setVisualizationType('bar');
    } else if (value === 'income') {
      setVisualizationType('line');
    } else if (value === 'savings') {
      setVisualizationType('area');
    } else {
      setVisualizationType('mixed');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <p className="text-muted-foreground">Visualize your financial data in different ways</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-auto md:flex-1">
          <CardHeader>
            <CardTitle>Report Settings</CardTitle>
            <CardDescription>Customize how you view your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label>Report Type</Label>
                <Tabs 
                  value={reportType} 
                  onValueChange={handleReportTypeChange}
                  className="mt-2"
                >
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="savings">Savings</TabsTrigger>
                    <TabsTrigger value="all">Overview</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {reportType !== 'all' && (
                <div>
                  <Label>Visualization Type</Label>
                  <Select 
                    value={visualizationType} 
                    onValueChange={setVisualizationType}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select visualization type" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableVisualizations(reportType).map(viz => (
                        <SelectItem key={viz.value} value={viz.value}>
                          <div className="flex items-center gap-2">
                            {viz.icon}
                            <span>{viz.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div>
                <Label>Time Range</Label>
                <Select 
                  value={timeRange} 
                  onValueChange={(value) => setTimeRange(value as TimeRange)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {reportType === 'expenses' && 'Expense Report'}
            {reportType === 'income' && 'Income Report'}
            {reportType === 'savings' && 'Savings Report'}
            {reportType === 'all' && 'Financial Overview'}
          </CardTitle>
          <CardDescription>
            {timeRange === 'week' && 'Last 7 days'}
            {timeRange === 'month' && 'Last 30 days'}
            {timeRange === '3months' && 'Last 3 months'}
            {timeRange === '6months' && 'Last 6 months'}
            {timeRange === 'year' && 'Last 12 months'}
            {timeRange === 'all' && 'All time'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[400px] w-full">
            {renderVisualization()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
