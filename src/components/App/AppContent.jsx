import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';  
import { useAuth } from '@contexts/AuthContext'; // Ruta corregida
import Header from '../Header/Header';
import Home from '../../pages/Home';
import SavedNews from '../../pages/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
const AppContent = () => {
  const location = useLocation();
  const { currentUser, handleLogin, handleLogout } = useAuth();
  const isSavedNewsPage = location.pathname === '/saved-news';

  useEffect(() => {
    const handleAuthError = (event) => {
      const { error, isUserError, statusCode } = event.detail;
      console.error('Error de autenticación:', error);

      if (statusCode !== 400 && statusCode !== 409) {
        alert(isUserError
          ? `Error: ${error}\nPor favor verifica tus datos.`
          : `Error técnico: ${error}\nPor favor intenta más tarde.`
        );
      }
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  return (
    <div className="app">
      {/* Mostrar Header solo si NO estamos en /saved-news */}
      {!isSavedNewsPage && (
        <Header
          currentUser={currentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route
          path="/saved-news"
          element={
            currentUser
              ? <SavedNews />
              : <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default AppContent;