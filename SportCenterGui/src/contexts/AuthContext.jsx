// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setUnauthorizedHandler } from '../services/api.js'
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: null,
    roles: []
  });


  useEffect(() => {
    if (jwt) {
      try {
        const decoded = jwtDecode(jwt);
        setUserData({
          id: decoded.id,
          roles: decoded.roles
            ? Array.isArray(decoded.roles)
              ? decoded.roles
              : decoded.roles.split(",")
            : []
        });
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        logout();
      }
    } else {
      setUserData({ id: null, roles: [] });
    }
    setLoading(false);
  }, [jwt]);

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

  // Helper functions for roles and ownership
  const hasRole = (role) => {
    return userData.roles.includes(role);
  };

  const isCurrentUser = (userId) => {
    return userData.id === userId;
  };
  

  return (
    <AuthContext.Provider
      value={{ 
        jwt,
        isAuthorized,
        loading,
        hasRole,
        isCurrentUser,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
