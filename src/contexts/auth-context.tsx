
"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = "client" | "psychologist" | "admin";

export type User = {
  name: string;
  email: string;
  role: UserRole;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const login = useCallback((user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
     // Default redirect, can be overridden where logout is called
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
