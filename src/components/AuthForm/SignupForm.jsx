// SignupForm.jsx
import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import '../PopupWithForm/PopupWithForm.css'; 

function SignupForm({ isOpen, onClose, onSignup, switchToLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Sign up"
            onSubmit={(e) => {
                e.preventDefault();
                onSignup({ email, password, username });
            }}
            submitText="Sign up"
            alternativeText="Sign in"
            onAlternativeClick={switchToLogin}
        >
            <div className="popup__input-group">
                <label className="popup__label">Email</label>
                <input
                    type="email"
                    className="popup__input"
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
  placeholder="**********"
  autoComplete="new-password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
            </div>
            <div className="popup__input-group">
                <label className="popup__label">Username</label>
                <input
                    type="text"
                    className="popup__input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {usernameError && <span className="popup__error">{usernameError}</span>}
            </div>
        </PopupWithForm>
    );
}

export default SignupForm;