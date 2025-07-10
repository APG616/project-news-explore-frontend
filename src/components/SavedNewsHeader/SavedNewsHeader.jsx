import React from 'react';
import { NavLink } from 'react-router-dom';
import './SavedNewsHeader.css';

function SavedNewsHeader({ userName, onLogout }) {
  return (
    <header className="saved-header">
      <div className="saved-header__container">
        <NavLink to="/" className="saved-header__logo">
          NewsExplorer
        </NavLink>
        <nav className="saved-header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `saved-header__link ${isActive ? 'saved-header__link_active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `saved-header__link ${isActive ? 'saved-header__link_active' : ''}`
            }
          >
            Artículos guardados
          </NavLink>
          <button className="saved-header__button" onClick={onLogout}>
            {userName}
            <span className="saved-header__logout-icon">⇨</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
