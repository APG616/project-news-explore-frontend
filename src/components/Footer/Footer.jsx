import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <p className="footer__copyright">© 2023 News Explorer</p>
        </div>
        <nav className="footer__nav">
          <a href="/" className="footer__link">Home</a>
          <a href="https://practicum.com" className="footer__link">Practicum</a>
          <a 
            href="https://github.com" 
            className="footer__link footer__icon footer__icon_github"
            aria-label="GitHub"
          ></a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;