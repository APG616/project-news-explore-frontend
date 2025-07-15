import { createContext, useContext, useCallback, useState, useEffect, useMemo } from 'react';
import Auth from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const logout = useCallback(() => {
    Auth.logout();
    setCurrentUser(null);
    window.dispatchEvent(new Event('auth-change'));
  }, []);

const checkAuth = useCallback(async () => {
  try {
    const token = localStorage.getItem('jwt');
    if (token) {
      const userData = await Auth.checkToken();
      console.log('User data from API:', userData); // Debug
      
      // Estructura consistente para el usuario
      setCurrentUser({
        email: userData.email || '',
        username: userData.username || '', // Asegurar campo username
        ...userData
      });
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    logout();
  } finally {
    setIsLoading(false);
  }
}, [logout]);


const login = useCallback(async (credentials) => {
  setIsLoading(true);
  try {
    const response = await Auth.login(credentials);
    console.log('Login response:', response); // Debug log
    
    // Handle both possible response structures
    const userData = response.user || response.data || response;
    
    setCurrentUser({
      email: userData.email || '',
      username: userData.username || '',
      ...userData
    });
    
    window.dispatchEvent(new Event('auth-change'));
    return response;
  } finally {
    setIsLoading(false);
  }
}, []);

  useEffect(() => {
    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [checkAuth]);

  const value = useMemo(() => ({
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser
  }), [currentUser, isLoading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};