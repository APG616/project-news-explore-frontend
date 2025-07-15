import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Header/Header.css';

const Navigation = ({ isLoggedIn, userName, onLogout, onLoginClick }) => {
  return (
    <nav className="header__nav">
      {/* Contenedor de enlaces */}
      <div className="header__nav-links">
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => 
            `header__nav-link ${isActive ? 'header__nav-link_active' : ''}`
          }
        >
          Home
        </NavLink>
        
        {/* Solo muestra "Artículos guardados" si está logueado */}
        {isLoggedIn && (
          <NavLink 
            to="/saved-news"
            className={({ isActive }) =>
              `header__nav-link ${isActive ? 'header__nav-link_active' : ''}`
            }
          >
            Artículos guardados
          </NavLink>
        )}
      </div>

      {/* Contenedor de botón de autenticación */}
      <div className="header__auth-container">
        {isLoggedIn ? (
          <button 
            className="header__user-button"
            onClick={onLogout}
            aria-label="Cerrar sesión"
          >
            <span className="header__user-name">{userName}</span>
            <span className="header__logout-icon">⇨</span>
          </button>
        ) : (
          <button
            className="header__login-button"
            onClick={onLoginClick}
            aria-label="Iniciar sesión"
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;