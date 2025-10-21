import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { supabase } from '../lib/supabaseClient';
import type { AuthSession } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          if (session?.user) {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (error) {
              console.error("Error fetching profile, signing out:", error);
              await supabase.auth.signOut();
              setUser(null);
            } else if (profile) {
              setUser({
                id: session.user.id,
                name: profile.full_name,
                email: session.user.email!,
                role: profile.role as UserRole,
                avatarUrl: profile.avatar_url,
              });
            } else {
              console.error("Profile not found for authenticated user, signing out.");
              await supabase.auth.signOut();
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (err) {
            console.error("Caught error in auth state change handler:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};