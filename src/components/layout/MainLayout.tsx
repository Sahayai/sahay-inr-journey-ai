
import React from 'react';
import SidebarNav from './SidebarNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarNav />
      <main className="flex-1 p-4 pt-16 lg:pt-6 lg:pl-72 transition-all duration-300">
        <div className="container mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
