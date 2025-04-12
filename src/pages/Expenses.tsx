
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, Plus, Filter, Search, ArrowDown, ArrowUp } from "lucide-react";
import { toast } from "sonner";

// Sample data - in a real app, this would come from a database
const initialTransactions = [
  { id: 1, name: "Grocery Shopping", amount: -2500, date: "2025-04-12", category: "Food", payee: "BigBasket" },
  { id: 2, name: "Salary Deposit", amount: 60000, date: "2025-04-10", category: "Income", payee: "ABC Corp" },
  { id: 3, name: "Netflix", amount: -649, date: "2025-04-09", category: "Entertainment", payee: "Netflix India" },
  { id: 4, name: "Electricity Bill", amount: -1200, date: "2025-04-08", category: "Utilities", payee: "City Power" },
  { id: 5, name: "Restaurant", amount: -1800, date: "2025-04-07", category: "Food", payee: "Urban Kitchen" },
  { id: 6, name: "Online Shopping", amount: -3200, date: "2025-04-06", category: "Shopping", payee: "Amazon" },
  { id: 7, name: "Mobile Recharge", amount: -999, date: "2025-04-05", category: "Utilities", payee: "Jio" },
  { id: 8, name: "Uber Ride", amount: -350, date: "2025-04-04", category: "Transport", payee: "Uber" },
  { id: 9, name: "Freelance Payment", amount: 15000, date: "2025-04-03", category: "Income", payee: "Client XYZ" },
  { id: 10, name: "Office Supplies", amount: -750, date: "2025-04-02", category: "Office", payee: "Stationery World" },
];

const categories = [
  "Food", "Transport", "Entertainment", "Utilities", "Shopping", 
  "Health", "Education", "Travel", "Income", "Savings", "Office", "Other"
];

type Transaction = {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
  payee: string;
};

const Expenses = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    payee: "",
    isExpense: true
  });

  // Handle creating a new transaction
  const handleCreateTransaction = () => {
    if (!newTransaction.name || !newTransaction.amount || !newTransaction.category) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const amount = parseInt(newTransaction.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const finalAmount = newTransaction.isExpense ? -amount : amount;
    
    const transaction: Transaction = {
      id: transactions.length + 1,
      name: newTransaction.name,
      amount: finalAmount,
      date: newTransaction.date,
      category: newTransaction.category,
      payee: newTransaction.payee || "Not specified"
    };
    
    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      name: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      category: "",
      payee: "",
      isExpense: true
    });
    setIsNewExpenseOpen(false);
    toast.success(`${newTransaction.isExpense ? "Expense" : "Income"} added successfully!`);
  };

  // Filter transactions based on search and category
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.payee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "all" || 
      transaction.category === categoryFilter ||
      (categoryFilter === "expense" && transaction.amount < 0) ||
      (categoryFilter === "income" && transaction.amount > 0);
    
    return matchesSearch && matchesCategory;
  });

  // Calculate summary data
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track and manage your financial transactions</p>
        </div>
        <Dialog open={isNewExpenseOpen} onOpenChange={setIsNewExpenseOpen}>
          <DialogTrigger asChild>
            <Button className="sahay-gradient-bg">
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Transaction</DialogTitle>
              <DialogDescription>
                Record a new expense or income
              </DialogDescription>
            </DialogHeader>
            
            <Tabs 
              defaultValue="expense" 
              onValueChange={(value) => setNewTransaction({
                ...newTransaction, 
                isExpense: value === "expense"
              })}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expense">Expense</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Description*</Label>
                <Input
                  id="name"
                  placeholder="e.g., Grocery Shopping"
                  value={newTransaction.name}
                  onChange={(e) => setNewTransaction({...newTransaction, name: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (₹)*</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="1000"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category*</Label>
                <Select 
                  value={newTransaction.category}
                  onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="payee">Payee/Payer (Optional)</Label>
                <Input
                  id="payee"
                  placeholder="e.g., Amazon, Office"
                  value={newTransaction.payee}
                  onChange={(e) => setNewTransaction({...newTransaction, payee: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewExpenseOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTransaction}>
                Save Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sahay-soft-green text-green-600 rounded-full">
                <ArrowUp className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sahay-soft-orange text-orange-600 rounded-full">
                <ArrowDown className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-orange-600">₹{totalExpense.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-sahay-soft-purple text-sahay-primary rounded-full">
                <IndianRupee className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-sahay-primary">₹{balance.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and filter your financial activities</CardDescription>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="expense">All Expenses</SelectItem>
                  <SelectItem value="income">All Income</SelectItem>
                  <SelectItem value="divider" disabled>
                    ----------
                  </SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-1">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredTransactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.amount > 0 ? 'bg-sahay-soft-green text-green-600' : 'bg-sahay-soft-orange text-orange-600'
                    }`}>
                      {transaction.amount > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })} • {transaction.category} • {transaction.payee}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-gray-700'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
