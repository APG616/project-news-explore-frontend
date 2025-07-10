import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Hero.css';

function Hero({ onSearch }) {
  return (
    <section className="hero" aria-label="News search section">
      <div className="hero__content">
        <h1 className="hero__title">What's going on in the world?</h1>
        <p className="hero__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <SearchForm onSearch={onSearch} />
      </div>
    </section>
  );
}

export default Hero;