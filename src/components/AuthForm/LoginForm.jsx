// LoginForm.jsx
import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';
import '../PopupWithForm/PopupWithForm.css'; 

function LoginForm({ isOpen, onClose, onLogin, switchToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Sign in"
            onSubmit={handleSubmit}
            submitText="Sign in"
            alternativeText="Sign up"
            onAlternativeClick={switchToSignup}
        >
            <div className="popup__input-group">
                <label className="popup__label">Email</label>
<input
  type="email"
  className="popup__input"
  placeholder="Enter email"
  autoComplete="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
            </div>
            <div className="popup__input-group">
                <label className="popup__label">Password</label>
<input
  type="password"
  className="popup__input"
  placeholder="Enter password"
  autoComplete="current-password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
            </div>
        </PopupWithForm>
    );
}

export default LoginForm;