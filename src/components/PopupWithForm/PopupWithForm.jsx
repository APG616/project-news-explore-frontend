import { useEffect } from 'react';
import './PopupWithForm.css';

function PopupWithForm({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onSubmit, 
  submitText = 'Registrarse',
  alternativeText,
  onAlternativeClick 
}) {
    useEffect(() => {
        if(!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
            <div className="popup__container">
                <button 
                  className="popup__close-button" 
                  type="button" 
                  onClick={onClose} 
                  aria-label="Cerrar popup"
                  >
                  <svg className="popup__close-icon" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" onSubmit={onSubmit}>
                    {children}
                    <button className="popup__submit-button" type="submit">
                        {submitText}
                    </button>
                </form>
                {alternativeText && (
                    <p className="popup__alternative">
                        or{' '}
                        <button 
                            type="button" 
                            className="popup__alternative-button"
                            onClick={onAlternativeClick}
                        >
                            {alternativeText}
                        </button>
                    </p>
                )}
            </div>
            
        </div>
    );
}

export default PopupWithForm;