import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  displayName: string;
  gender: 'male' | 'female' | 'other';
  mobile: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string, gender: 'male' | 'female' | 'other', mobile: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('vibespace_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, use Firebase Auth
    const savedUser = localStorage.getItem('vibespace_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
    } else {
      // fallback for legacy users
      const mockUser: User = {
        id: '1',
        email,
        displayName: email.split('@')[0],
        gender: 'other',
        mobile: '',
      };
      setUser(mockUser);
      localStorage.setItem('vibespace_user', JSON.stringify(mockUser));
    }
  };

  const signup = async (email: string, password: string, displayName: string, gender: 'male' | 'female' | 'other', mobile: string) => {
    // Mock signup - in production, use Firebase Auth
    const mockUser: User = {
      id: '1',
      email,
      displayName,
      gender,
      mobile,
    };
    setUser(mockUser);
    localStorage.setItem('vibespace_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vibespace_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};