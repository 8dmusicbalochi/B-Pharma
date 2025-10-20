import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import BottomTabBar from './BottomTabBar';
import Header from './Header';
import { SideMenu } from './SideMenu';

const MainLayout: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return null; // Or a redirect, handled by App.tsx
  }
  
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/pos')) return 'Point of Sale';
    if (path.includes('/inventory')) return 'Inventory';
    if (path.includes('/sales')) return 'Sales History';
    if (path.includes('/products')) return 'Products';
    if (path.includes('/categories')) return 'Categories';
    if (path.includes('/suppliers')) return 'Suppliers';
    if (path.includes('/purchase-orders')) return 'Purchase Orders';
    if (path.includes('/users')) return 'Users';
    if (path.includes('/settings')) return 'Settings';
    return 'B-Pharma POS';
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header title={getTitle()} user={user} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20">
        <Outlet />
      </main>
      <BottomTabBar onMenuClick={() => setIsMenuOpen(true)} />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default MainLayout;