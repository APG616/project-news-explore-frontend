import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import LoginForm from '../AuthForm/LoginForm';
import SignupForm from '../AuthForm/SignupForm';
import './Header.css';

function Header({ isLoggedIn, onLogout, userName, onLogin, onSignup }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === '/saved-news';
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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

  const handleSuccessfulLogin = (userData) => {
    onLogin(userData);
    closeAllPopups();
  };

  const handleSuccessfulSignup = (userData) => {
    onSignup(userData);
    closeAllPopups();
  };

  return (
    <>
      <header className={`header ${isSavedNewsPage ? 'header_saved-news' : ''}`}>
        <div className="header__container">
          <Link to="/" className="header__logo">
            News Explorer
          </Link>
          <Navigation 
            isLoggedIn={isLoggedIn} 
            onLogout={onLogout} 
            userName={userName}
            onLoginClick={handleLoginClick}
          />
        </div>
      </header>

      <LoginForm
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        onLogin={handleSuccessfulLogin}
        switchToSignup={handleSignupClick}
      />

      <SignupForm
        isOpen={isSignupOpen}
        onClose={closeAllPopups}
        onSignup={handleSuccessfulSignup}
        switchToLogin={handleLoginClick}
      />
    </>
  );
}

export default Header;