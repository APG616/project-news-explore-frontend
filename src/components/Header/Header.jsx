import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import LoginForm from '../AuthForm/LoginForm';
import SignupForm from '../AuthForm/SignupForm';
import './Header.css';

function Header({ currentUser, onLogin, onLogout }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === '/saved-news';
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);

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

  return (
    <>
      <header className={`header ${isSavedNewsPage ? 'header_saved-news' : ''}`}>
        <div className="header__content">
          <Link to="/" className="header__logo">News Explorer</Link>
          <Navigation 
            isLoggedIn={!!currentUser}
            userName={currentUser?.username || ''}
            onLogout={onLogout}
            onLoginClick={handleLoginClick}
          />
        </div>
      </header>

      <LoginForm
        isOpen={isLoginOpen}
        onClose={closeAllPopups}
        onLoginSuccess={onLogin}
        switchToSignup={handleSignupClick}
      />

      <SignupForm
        isOpen={isSignupOpen}
        onClose={closeAllPopups}
        onSignupSuccess={(userData) => {
          onLogin(userData);
          closeAllPopups();
        }}
        switchToLogin={handleLoginClick}
      />
    </>
  );
}

export default React.memo(Header);