
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Target, Plus, ArrowRight, IndianRupee, Droplet } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Sample data - in a real app, this would come from a database
const initialGoals = [
  { 
    id: 1, 
    name: "Gaming PC", 
    target: 80000, 
    current: 24000, 
    deadline: "Sep 2025", 
    description: "High-end gaming setup with RTX graphics", 
    color: "from-indigo-500 to-purple-500",
    createdAt: "Jan 2025" 
  },
  { 
    id: 2, 
    name: "Thailand Trip", 
    target: 120000, 
    current: 48000, 
    deadline: "Dec 2025", 
    description: "2-week vacation in Bangkok and Phuket", 
    color: "from-emerald-500 to-teal-500",
    createdAt: "Feb 2025" 
  },
  { 
    id: 3, 
    name: "Emergency Fund", 
    target: 300000, 
    current: 75000, 
    deadline: "Mar 2026", 
    description: "6 months of essential expenses", 
    color: "from-amber-500 to-orange-500",
    createdAt: "Dec 2024" 
  },
];

const SavingsJar: React.FC<{ goal: any }> = ({ goal }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addAmount, setAddAmount] = useState<string>("");
  
  const progress = (goal.current / goal.target) * 100;
  const fillHeight = `${progress}%`;
  
  const handleSave = () => {
    const amount = parseInt(addAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // In a real app, this would update the database
    toast.success(`Added ₹${amount.toLocaleString()} to ${goal.name}`);
    setIsDialogOpen(false);
    setAddAmount("");
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>{goal.name}</CardTitle>
        <CardDescription>{goal.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="relative w-full flex justify-center mb-4">
          <div className="savings-jar-container">
            <div className="savings-jar-outline">
              <div className="savings-jar-neck" />
              <div className="savings-jar-body">
                <div 
                  className={`savings-jar-fill bg-gradient-to-t ${goal.color}`} 
                  style={{ height: fillHeight }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Droplet
                      key={i}
                      className="savings-jar-bubble opacity-70"
                      size={10 + Math.random() * 8}
                      style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-xl font-bold">₹{goal.current.toLocaleString()}</div>
              <div className="text-sm text-gray-500">of ₹{goal.target.toLocaleString()}</div>
              <div className="mt-2 text-sm font-semibold">
                {progress.toFixed(0)}% complete
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mt-6">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>By {goal.deadline}</span>
          </div>
          <div>Started {goal.createdAt}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sahay-gradient-bg">
              <IndianRupee className="h-4 w-4 mr-2" />
              Add Savings
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to {goal.name}</DialogTitle>
              <DialogDescription>
                Add money to your savings goal. This doesn't move actual money, just tracks your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="1000"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const Goals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [isNewGoalDialogOpen, setIsNewGoalDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    deadline: "",
    description: ""
  });

  const handleCreateGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const target = parseInt(newGoal.target);
    if (isNaN(target) || target <= 0) {
      toast.error("Please enter a valid target amount");
      return;
    }
    
    // In a real app, this would save to the database
    const colors = [
      "from-indigo-500 to-purple-500",
      "from-emerald-500 to-teal-500",
      "from-amber-500 to-orange-500",
      "from-pink-500 to-rose-500",
      "from-blue-500 to-cyan-500"
    ];
    
    const newGoalObj = {
      id: goals.length + 1,
      name: newGoal.name,
      target: target,
      current: 0,
      deadline: newGoal.deadline,
      description: newGoal.description || `Saving for ${newGoal.name}`,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    
    setGoals([...goals, newGoalObj]);
    setNewGoal({ name: "", target: "", deadline: "", description: "" });
    setIsNewGoalDialogOpen(false);
    toast.success("New savings goal created!");
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Savings Goals</h1>
          <p className="text-muted-foreground">Track your progress towards financial milestones</p>
        </div>
        <Dialog open={isNewGoalDialogOpen} onOpenChange={setIsNewGoalDialogOpen}>
          <DialogTrigger asChild>
            <Button className="sahay-gradient-bg">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Savings Goal</DialogTitle>
              <DialogDescription>
                Set a new financial target to work towards
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Goal Name*</Label>
                <Input
                  id="name"
                  placeholder="e.g., New Laptop"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Target Amount (₹)*</Label>
                <Input
                  id="target"
                  type="number"
                  placeholder="50000"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Target Date*</Label>
                <Input
                  id="deadline"
                  placeholder="e.g., Dec 2025"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="What are you saving for?"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewGoalDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <SavingsJar key={goal.id} goal={goal} />
        ))}
        
        <Card className="border-dashed border-2 flex items-center justify-center h-full min-h-[300px]">
          <CardContent className="text-center">
            <div className="rounded-full bg-gray-100 p-4 inline-flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">Create a new goal</h3>
            <p className="text-sm text-gray-500 mb-4">Track progress towards your financial aspirations</p>
            <Button 
              variant="outline" 
              onClick={() => setIsNewGoalDialogOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Goals;
