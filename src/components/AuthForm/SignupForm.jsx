import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Auth from '../../utils/auth';
import '../PopupWithForm/PopupWithForm.css';

function SignupForm({ isOpen, onClose, onSignupSuccess, switchToLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Clean form when opening/closing
    useEffect(() => {
        if (!isOpen) {
            setFormData({ email: '', password: '', username: '' });
            setError('');
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validations
        if (!formData.email) {
            setError("Email es requerido");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Por favor ingresa un email válido");
            return;
        }
        if (!formData.password) {
            setError("Contraseña es requerida");
            return;
        }
        if (formData.password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }
        if (!formData.username) {
            setError("Nombre de usuario es requerido");
            return;
        }

        setIsLoading(true);

        try {
        const result = await Auth.signup(
            formData.email,
            formData.password,
            formData.username
        );

        if (result.success) {
            const userWithUsername = {
                ...result.user,
                username: formData.username
            };
            
            // Solo notificar éxito sin cerrar el popup completo
            onSignupSuccess(userWithUsername);
            
            // Limpiar el formulario
            setFormData({ email: '', password: '', username: '' });
            
            // Mostrar mensaje de éxito en el formulario
            setError('¡Registro exitoso! Por favor inicia sesión');
        }
        } catch (error) {
            console.error("Registration error:", error);
            let errorMessage = "Error durante el registro";
            
            if (error.message.includes("registrado")) {
                errorMessage = "Este email ya está registrado. ¿Quieres iniciar sesión?";
            } else if (error.message.includes("inválido")) {
                errorMessage = "Por favor verifica los datos ingresados";
            } else if (error.message.includes("servidor")) {
                errorMessage = "Error en el servidor. Por favor intenta más tarde.";
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Registrarse"
            onSubmit={handleSubmit}
            submitText={isLoading ? "Registrando..." : "Registrarse"}
            alternativeText="Iniciar sesión"
            onAlternativeClick={switchToLogin}
            isSubmitDisabled={!formData.email || !formData.password || !formData.username || isLoading}
        >
            {error && <div className="popup__error-message">{error}</div>}
            <div className="popup__input-group">
                <label className="popup__label">Email</label>
                <input
                    name="email"
                    type="email"
                    className="popup__input"
                    placeholder="example@test.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    autoComplete="username"
                />
            </div>
            <div className="popup__input-group">
                <label className="popup__label">Contraseña</label>
                <input 
                    name="password"
                    className="popup__input" 
                    placeholder="**********" 
                    required 
                    type="password" 
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={isLoading}
                />
            </div>
            <div className="popup__input-group">
                <label className="popup__label">Nombre de Usuario</label>
                <input
                    name="username"
                    type="text"
                    className="popup__input"
                    placeholder="Tu nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                />
            </div>
        </PopupWithForm>
    );
}

export default SignupForm;