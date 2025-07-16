import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';  
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header/Header';
import Home from '../../pages/Home';
import SavedNews from '../../pages/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function AppContent({ 
  currentUser, 
  savedArticles, 
  onSaveArticle, 
  onDeleteArticle,
  onLogin,
  onLogout
}) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === '/saved-news';

  return (
    <div className="app">
      {isSavedNewsPage ? (
        <SavedNewsHeader 
          currentUser={currentUser} 
          onLogout={onLogout} 
        />
      ) : (
        <Header 
          currentUser={currentUser}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      )}

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              currentUser={currentUser}
              savedArticles={savedArticles}
              onSaveArticle={onSaveArticle}
              onDeleteArticle={onDeleteArticle}
            />
          } 
        />
        <Route
          path="/saved-news"
          element={
            currentUser ? (
              <SavedNews 
                savedArticles={savedArticles}
                onDeleteArticle={onDeleteArticle}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default AppContent;