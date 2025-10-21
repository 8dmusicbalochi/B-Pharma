import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { ChartBarIcon, TagIcon, FolderIcon, TruckIcon, DocumentTextIcon, UsersIcon, Cog6ToothIcon, XMarkIcon, ArrowLeftOnRectangleIcon } from '../icons/Icons';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuLink: React.FC<{ to: string; icon: React.ReactNode; label: string; onClick: () => void; }> = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-gray-600 hover:bg-gray-100'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);


export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    
    const handleLogout = () => {
        onClose();
        logout();
    }

    if (!user) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            ></div>

            {/* Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-bold text-lg text-primary">Menu</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                        <XMarkIcon className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <MenuLink to="/sales" icon={<ChartBarIcon className="h-6 w-6"/>} label="Sales History" onClick={onClose} />
                    <MenuLink to="/products" icon={<TagIcon className="h-6 w-6"/>} label="Products" onClick={onClose} />
                    <MenuLink to="/categories" icon={<FolderIcon className="h-6 w-6"/>} label="Categories" onClick={onClose} />
                    <MenuLink to="/suppliers" icon={<TruckIcon className="h-6 w-6"/>} label="Suppliers" onClick={onClose} />
                    <MenuLink to="/purchase-orders" icon={<DocumentTextIcon className="h-6 w-6"/>} label="Purchase Orders" onClick={onClose} />
                    
                    {user.role === UserRole.SuperAdmin && (
                        <MenuLink to="/users" icon={<UsersIcon className="h-6 w-6"/>} label="Users" onClick={onClose} />
                    )}
                    
                    <MenuLink to="/settings" icon={<Cog6ToothIcon className="h-6 w-6"/>} label="Settings" onClick={onClose} />
                </nav>
                 <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-accent-danger hover:bg-red-50 w-full transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};