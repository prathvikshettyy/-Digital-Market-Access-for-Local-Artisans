import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artisan } from '../types';

interface AuthContextType {
  artisan: Artisan | null;
  login: (phone: string, pin: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artisan, setArtisan] = useState<Artisan | null>(() => {
    try {
      const saved = localStorage.getItem('kalaconnect_artisan');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (phone: string, pin: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/artisans/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, pin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setArtisan(data.artisan);
        localStorage.setItem('kalaconnect_artisan', JSON.stringify(data.artisan));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch {
      setIsLoading(false);
      return { success: false, error: 'Network error connecting to artisan portal' };
    }
  };

  const logout = () => {
    setArtisan(null);
    localStorage.removeItem('kalaconnect_artisan');
  };

  return (
    <AuthContext.Provider value={{ artisan, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
