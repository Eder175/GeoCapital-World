'use client';
import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('geo-token');
    setToken(storedToken);
    setLoading(false);
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('geo-token', newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('geo-token');
    setToken(null);
  }, []);

  const isAuthenticated = !!token;

  return {
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };
};
