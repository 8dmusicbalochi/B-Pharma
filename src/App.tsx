import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './types';

import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import SalesHistory from './pages/SalesHistory';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';
import PurchaseOrders from './pages/PurchaseOrders';
import Users from './pages/Users';
import Settings from './pages/Settings';

// Fix: Updated ProtectedRoute to accept and render children, or an Outlet if no children are provided.
const ProtectedRoute: React.FC<{ allowedRoles: UserRole[]; children?: React.ReactNode }> = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to a more appropriate page if the user is logged in but doesn't have access
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children ?? <Outlet />}</>;
};

const AppRoutes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-xl font-semibold text-primary">Loading B-Pharma POS...</div>
        </div>;
    }

    return (
        <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
            
            {/* Protected Routes */}
            <Route 
              element={
                <ProtectedRoute allowedRoles={[UserRole.SuperAdmin, UserRole.StockManager, UserRole.Cashier]}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pos" element={<POS />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/sales" element={<SalesHistory />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/purchase-orders" element={<PurchaseOrders />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Nested protection for SuperAdmin only */}
                <Route element={<ProtectedRoute allowedRoles={[UserRole.SuperAdmin]} />}>
                    <Route path="/users" element={<Users />} />
                </Route>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;