// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setUnauthorizedHandler } from '../services/api.js'
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || null);
  const [loading, setLoading] = useState(true);

  // Po starcie sprawdzamy, czy JWT jest w localStorage
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) setJwt(token);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authAPI.login(credentials); // zwraca { token }
      localStorage.setItem('jwt', data.token);
      setJwt(data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);
      localStorage.setItem('jwt', data.token);
      setJwt(data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setJwt(null);
  };

  // Podpinamy handler 401 → wywoła logout
  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, []);

  // isAuthorized = true jeśli mamy JWT
  const isAuthorized = !!jwt;

  return (
    <AuthContext.Provider
      value={{ jwt, isAuthorized, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
