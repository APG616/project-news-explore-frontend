import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import LoginForm from '../AuthForm/LoginForm';
import SignupForm from '../AuthForm/SignupForm';
import Auth from '../../../src/utils/auth';
import './Header.css';

function Header({ currentUser, onLogin, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSavedNewsPage = location.pathname === '/saved-news';
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [localUser, setLocalUser] = useState(currentUser); // Estado local sincronizado
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Sincronizar con el currentUser del padre
  useEffect(() => {
    setLocalUser(currentUser);
    console.log('CurrentUser actualizado:', currentUser); // Para depuración
  }, [currentUser]);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const handleSignupClick = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const closeAllPopups = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };


  const handleSuccessfulAuth = async (userData) => {
    setIsAuthLoading(true);
    try {
      await onLogin(userData);
      closeAllPopups();
      navigate('/');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      Auth.logout();
      onLogout();
      if (isSavedNewsPage) navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  // Verificación de estado en tiempo real
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('jwt');
      console.log('Cambio en almacenamiento detectado. Token existe:', !!token);
      if (!token) {
        setLocalUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Agregar listener para auth-storage-changed
  useEffect(() => {
  const handleAuthChange = (e) => {
    console.log('Auth storage changed:', e.detail);
    checkAuth();
  };
  
  window.addEventListener('auth-storage-changed', handleAuthChange);
  return () => window.removeEventListener('auth-storage-changed', handleAuthChange);
}, []);

const handleSignupSuccess = (userData) => {
    setIsAuthLoading(true);
    try {
      // Guardar en localStorage como respaldo
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Cerrar SignupForm y abrir LoginForm
      setIsSignupOpen(false);
      setIsLoginOpen(true);
      
      // Limpiar el formulario de registro
      setFormData({ email: '', password: '', username: '' });
      
      // Mostrar mensaje de éxito (opcional)
      alert('¡Registro exitoso! Por favor inicia sesión');
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <>
      <header className={`header ${isSavedNewsPage ? 'header_saved-news' : ''}`}>
        <div className="header__content">
          <Link to="/" className="header__logo">News Explorer</Link>
          <Navigation 
            isLoggedIn={!!localUser} // Usar estado local
            userName={localUser?.name || ''}
            onLogout={handleLogout}
            onLoginClick={handleLoginClick}
          />
        </div>
      </header>

      <LoginForm
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        onLoginSuccess={handleSuccessfulAuth}
        switchToSignup={() => {
          setIsSignupOpen(true);
          setIsLoginOpen(false);
        }}
      />

      <SignupForm
        isOpen={isSignupOpen}
        onClose={closeAllPopups}
        onSignupSuccess={handleSignupSuccess}
        switchToLogin={() => {
          setIsLoginOpen(true);
          setIsSignupOpen(false);
        }}
      />
    </>
  );
}

export default Header;