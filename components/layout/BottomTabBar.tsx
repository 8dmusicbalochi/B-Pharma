import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, ArchiveBoxIcon, Bars3Icon } from '../icons/Icons';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const activeClass = 'text-primary';
  const inactiveClass = 'text-gray-500 hover:text-primary';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const BottomTabBar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex md:hidden z-10">
      <NavItem to="/dashboard" icon={<HomeIcon />} label="Dashboard" />
      <NavItem to="/pos" icon={<ShoppingCartIcon />} label="POS" />
      <NavItem to="/inventory" icon={<ArchiveBoxIcon />} label="Inventory" />
      <button onClick={onMenuClick} className="flex flex-col items-center justify-center w-full text-gray-500 hover:text-primary">
          <Bars3Icon />
          <span className="text-xs mt-1">More</span>
      </button>
    </nav>
  );
};

export default BottomTabBar;