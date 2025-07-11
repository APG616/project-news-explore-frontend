// Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Header/Header.css';

const Navigation = ({ isLoggedIn, onLogout, userName, onLoginClick }) => {
  return (
    <nav className="header__nav">
      <NavLink
        to="/"
        className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link_active active' : ''}`}
      >
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink
            to="/saved-news"
            className={({ isActive }) => `header__nav-link ${isActive ? 'header__nav-link_active active' : ''}`}
          >
            Artículos guardados
          </NavLink>
          <button className="header__user-button" onClick={onLogout}>
            {userName}
            <span className="header__logout-icon">⇨</span>
          </button>
        </>
      ) : (
        <button
          className="header__login-button"
          onClick={onLoginClick}
        >
          Iniciar sesión
        </button>
      )}
    </nav>
  );
};

export default Navigation;