import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/header';
import Home from '../../pages/Home';
import SavedNews from '../../pages/SavedNews';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '' });

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser({ name: userData.username || 'Usuario' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: '' });
  };

  const handleSignup = (userData) => {
    handleLogin(userData);
  };

  return (
    <Router>
      <div className="app">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          userName={currentUser.name}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
        
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/saved-news" element={<SavedNews isLoggedIn={isLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;