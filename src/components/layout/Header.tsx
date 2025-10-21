
import React, { useState } from 'react';
import { User } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  title: string;
  user: User;
}

const Header: React.FC<HeaderProps> = ({ title, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="bg-primary text-secondary shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2">
            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full border-2 border-secondary" />
            <span className="hidden md:inline">{user.name}</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-1 text-gray-800 z-20">
              <div className="px-4 py-2 border-b">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
              <a href="#/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
              <a href="#/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-left block px-4 py-2 text-sm text-accent-danger hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;