import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import { AuthProvider } from '../../contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default React.memo(App);