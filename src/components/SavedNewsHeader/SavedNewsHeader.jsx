import React from 'react';
import { NavLink } from 'react-router-dom';
import './SavedNewsHeader.css';
import { useAuth } from '../../contexts/AuthContext';

function SavedNewsHeader({ onLogout }) {
  const { currentUser } = useAuth();
  
  // More robust display name handling
  const displayName = currentUser?.username 
    || currentUser?.name 
    || "Usuario";


  const handleLogoutClick = (e) => {
    e.preventDefault();
    if (window.confirm(`¿Estás seguro que deseas cerrar sesión, ${displayName}?`)) {
      try {
        onLogout();
      } catch (error) {
        console.error('Error durante el logout:', error);
        alert('Ocurrió un error al cerrar sesión. Por favor intenta nuevamente.');
      }
    }
  };

  return (
    <header className="saved-header">
      <div className="saved-header__container">
        <NavLink to="/" className="saved-header__logo" aria-label="NewsExplorer - Inicio">
          NewsExplorer
        </NavLink>
        
        <nav className="saved-header__nav" aria-label="Navegación principal">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `saved-header__link ${isActive ? 'saved-header__link_active' : ''}`
            }
            aria-current={({ isActive }) => isActive ? "page" : undefined}
          >
            Home
          </NavLink>
          
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `saved-header__link ${isActive ? 'saved-header__link_active' : ''}`
            }
            aria-current={({ isActive }) => isActive ? "page" : undefined}
          >
            Saved articles
          </NavLink>
          
      <button 
        className="saved-header__button" 
        onClick={handleLogoutClick}
        aria-label={`Cerrar sesión (Usuario: ${displayName})`}
      >
        {displayName}
        <span className="saved-header__logout-icon">⇨</span>
      </button>
        </nav>
      </div>
    </header>
  );
}

export default SavedNewsHeader;