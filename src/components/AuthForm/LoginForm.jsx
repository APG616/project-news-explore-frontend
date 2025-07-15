// LoginForm.jsx
import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Auth from '../../utils/auth';
import '../PopupWithForm/PopupWithForm.css';

function LoginForm({ isOpen, onClose, onLoginSuccess, switchToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

// Add validation functions
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        setEmailError('Please enter a valid email address');
        return false;
    }
    setEmailError('');
    return true;
};

const validatePassword = (password) => {
    if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return false;
    }
    setPasswordError('');
    return true;
};

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate email and password
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
        setIsLoading(false);
        return;
    }

    try {
        const userData = await Auth.signin(email, password);
        onLoginSuccess(userData);
        onClose();
    } catch (error) {
        // More specific error messages
        if (error.message.includes('401')) {
            setError('Invalid email or password');
        } else if (error.message.includes('network')) {
            setError('Network error - please try again later');
        } else {
            setError(error.message || "Error al iniciar sesión");
        }
    } finally {
        setIsLoading(false);
    }
};

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Sign in"
            onSubmit={handleSubmit}
            submitText={isLoading ? "Iniciando sesión..." : "Sign in"}
            alternativeText="Sign up"
            onAlternativeClick={switchToSignup}
            isSubmitDisabled={!email || !password || isLoading}
        >
            {error && <div className="popup__error-message">{error}</div>}
            <div className="popup__input-group">
                <label className="popup__label">Email</label>
                <input
                    type="email"
                    className="popup__input"
                    placeholder="Enter email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
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
                    disabled={isLoading}
                />
                
            </div>
        </PopupWithForm>
    );
}

export default LoginForm;