
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Plus,
  Target,
  TrendingUp,
  IndianRupee,
  Sparkles,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

// Sample data - in a real app, this would come from a database
const mockFinancialData = {
  totalBalance: 45000,
  income: 60000,
  expenses: 42000,
  savings: 18000,
  upcomingBills: 15000,
  budget: {
    total: 47000,
    used: 42000
  },
  recentTransactions: [
    { id: 1, name: "Grocery Shopping", amount: -2500, date: "12 Apr", category: "Food" },
    { id: 2, name: "Salary Deposit", amount: 60000, date: "10 Apr", category: "Income" },
    { id: 3, name: "Netflix", amount: -649, date: "9 Apr", category: "Entertainment" },
    { id: 4, name: "Electricity Bill", amount: -1200, date: "8 Apr", category: "Utilities" },
  ],
  savingsGoals: [
    { id: 1, name: "Gaming PC", target: 80000, current: 24000, deadline: "Sep 2025", color: "bg-sahay-soft-purple" },
    { id: 2, name: "Thailand Trip", target: 120000, current: 48000, deadline: "Dec 2025", color: "bg-sahay-soft-green" },
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate('/expenses/new')}>
            <Plus className="h-4 w-4" />
            <span>Add Expense</span>
          </Button>
          <Button className="sahay-gradient-bg" onClick={() => navigate('/ai-chat')}>
            <Sparkles className="h-4 w-4 mr-2" />
            <span>AI Insights</span>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-fade-in" style={{ animationDelay: '0ms' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹{mockFinancialData.totalBalance.toLocaleString()}</div>
              <div className="p-2 bg-sahay-soft-purple text-sahay-primary rounded-full">
                <IndianRupee className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹{mockFinancialData.income.toLocaleString()}</div>
              <div className="p-2 bg-sahay-soft-green text-green-600 rounded-full">
                <ArrowUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹{mockFinancialData.expenses.toLocaleString()}</div>
              <div className="p-2 bg-sahay-soft-orange text-orange-600 rounded-full">
                <ArrowDown className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-sahay-primary">₹{mockFinancialData.savings.toLocaleString()}</div>
              <div className="p-2 bg-sahay-soft-blue text-blue-600 rounded-full">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Budget Overview</CardTitle>
                <Button variant="ghost" size="sm" className="text-sahay-primary" onClick={() => navigate('/budgets')}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <CardDescription>Your monthly budget breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Budget</span>
                    <span className="font-medium">₹{mockFinancialData.budget.used.toLocaleString()} / ₹{mockFinancialData.budget.total.toLocaleString()}</span>
                  </div>
                  <Progress value={(mockFinancialData.budget.used / mockFinancialData.budget.total) * 100} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="text-sm text-muted-foreground">Safe to Spend</div>
                    <div className="text-xl font-semibold mt-1">₹{(mockFinancialData.budget.total - mockFinancialData.budget.used).toLocaleString()}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="text-sm text-muted-foreground">Upcoming Bills</div>
                    <div className="text-xl font-semibold mt-1">₹{mockFinancialData.upcomingBills.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-sahay-primary" onClick={() => navigate('/expenses')}>
                  View All
                </Button>
              </div>
              <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockFinancialData.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.amount > 0 ? 'bg-sahay-soft-green text-green-600' : 'bg-sahay-soft-orange text-orange-600'
                      }`}>
                        {transaction.amount > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.name}</div>
                        <div className="text-xs text-muted-foreground">{transaction.date} • {transaction.category}</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-gray-700'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Savings Goals</CardTitle>
                <Button variant="ghost" size="sm" className="text-sahay-primary" onClick={() => navigate('/goals')}>
                  <Target className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {mockFinancialData.savingsGoals.map((goal) => (
                  <div key={goal.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{goal.name}</div>
                      <div className="text-xs text-muted-foreground">By {goal.deadline}</div>
                    </div>
                    <div className="mt-2 mb-3">
                      <Progress value={(goal.current / goal.target) * 100} className={`h-2 ${goal.color}`} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">₹{goal.current.toLocaleString()}</span>
                      <span>₹{goal.target.toLocaleString()}</span>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full" onClick={() => navigate('/goals/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Advisor</CardTitle>
              <CardDescription>Personal financial insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg sahay-gradient-bg text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5" />
                  <div className="font-medium">Your AI Advisor says:</div>
                </div>
                <p className="text-sm mb-3">
                  "You've spent 20% less on dining this month compared to last month. Great progress towards your Gaming PC goal!"
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-full"
                  onClick={() => navigate('/ai-chat')}
                >
                  Chat with Advisor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
