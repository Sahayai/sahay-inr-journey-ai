
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Target, 
  CreditCard, 
  Users, 
  Settings, 
  Menu, 
  X,
  IndianRupee,
  MessageSquareText,
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItem = {
  path: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/expenses', label: 'Expenses', icon: IndianRupee },
  { path: '/budgets', label: 'Budgets', icon: BarChart3 },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/reports', label: 'Reports', icon: PieChart },
  { path: '/cards', label: 'Cards', icon: CreditCard },
  { path: '/circles', label: 'Circles', icon: Users },
  { path: '/ai-chat', label: 'AI Chat', icon: MessageSquareText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden fixed top-4 left-4 z-50" 
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold sahay-gradient-text">Sahay</h1>
            <p className="text-sm text-gray-500 mt-1">Your AI Savings Navigator</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-sahay-soft-purple text-sahay-primary font-medium" 
                    : "text-gray-600 hover:text-sahay-primary hover:bg-gray-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="sahay-gradient-bg rounded-lg p-4 shadow-sm">
              <p className="text-sm font-medium">Need help?</p>
              <p className="text-xs opacity-90 mt-1">Ask your AI assistant for guidance</p>
              <Button variant="outline" size="sm" className="mt-2 bg-white/20 hover:bg-white/30 text-white border-white/30 w-full">
                <MessageSquareText className="mr-2 h-4 w-4" />
                Chat with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarNav;
