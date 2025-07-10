import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">
                © {new Date().getFullYear()} Daniel Patiño, Powered by News API
            </p>
            <nav className="footer__nav" aria-label="Enlaces del pie de página">
                <a href="/" className="footer__link">Home</a>
                <a 
                    href="https://practicum.yandex.com/" 
                    className="footer__link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Practicum by Yandex
                </a>
                <a 
                    href="https://github.com/" 
                    className="footer__link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <span className="footer__icon footer__icon_github"></span>
                </a>
            </nav>
        </footer>
    );
}

export default Footer;