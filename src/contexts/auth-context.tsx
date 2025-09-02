
"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { users, User as AppUser, UserRole } from '@/lib/users';
import { useToast } from '@/hooks/use-toast';

export type { UserRole };
export type User = AppUser;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>(users);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const foundUser = userList.find(u => u.email === email && u.password === password);
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  }, [userList]);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
      const existingUser = userList.find(u => u.email === email);
      if (existingUser) {
          return false; // User already exists
      }
      const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          role: 'client',
      };
      // In a real app, this would be an API call.
      // Here, we just update the in-memory list for the session.
      setUserList(prev => [...prev, newUser]);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
  }, [userList]);


  const logout = useCallback(() => {
    const role = user?.role;
    localStorage.removeItem('user');
    setUser(null);
    // Redirect based on the role of the user who logged out.
    if (role === 'admin') {
      router.push('/admin/login');
    } else if (role === 'psychologist') {
      router.push('/psychologist/login');
    } else {
      router.push('/login');
    }
  }, [router, user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
