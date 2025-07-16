import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import { AuthProvider } from '../../contexts/AuthContext';
import './App.css';

function App() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar estado inicial
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    const user = localStorage.getItem('currentUser');
    
    if (saved) setSavedArticles(JSON.parse(saved));
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  // Persistir cambios
  useEffect(() => {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleSaveArticle = (article) => {
    setSavedArticles(prev => {
      const newArticle = { 
        ...article, 
        isSaved: true,
        savedAt: new Date().toISOString() 
      };
      return prev.some(a => a.id === article.id) ? prev : [...prev, newArticle];
    });
  };

  const handleDeleteArticle = (articleToDelete) => {
    setSavedArticles(prev => prev.filter(article => article.id !== articleToDelete.id));
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <AuthProvider value={{ currentUser, handleLogin, handleLogout }}>
      <Router future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        <AppContent 
          currentUser={currentUser}
          savedArticles={savedArticles}
          onSaveArticle={handleSaveArticle}
          onDeleteArticle={handleDeleteArticle}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </Router>
    </AuthProvider>
  );
}

export default React.memo(App);