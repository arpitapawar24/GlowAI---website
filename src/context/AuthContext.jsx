import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('glowai_token');
      if (token) {
        try {
          const profile = await api.getProfile();
          setUser(profile);
        } catch (error) {
          console.warn('Session expired or invalid:', error.message);
          localStorage.removeItem('glowai_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    localStorage.setItem('glowai_token', data.token);
    setUser(data);
    return data;
  };

  const register = async (userData) => {
    const data = await api.register(userData);
    localStorage.setItem('glowai_token', data.token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('glowai_token');
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const updated = await api.updateProfile(updates);
    setUser(prev => ({ ...prev, ...updated }));
    return updated;
  };

  const toggleRoutine = async (period) => {
    const res = await api.toggleRoutineCheck(period);
    setUser(prev => ({
      ...prev,
      dailyRoutineLog: res.dailyRoutineLog,
      routineStreak: res.routineStreak
    }));
    return res;
  };

  const quickDemoLogin = async () => {
    return login('sophia@example.com', 'password123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        toggleRoutine,
        quickDemoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
