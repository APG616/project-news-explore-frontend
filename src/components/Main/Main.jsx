import React from 'react';
import './Main.css';

function Main({ children }) {
  return (
    <main className="main">
      <section className="main__content">
        {children}
      </section>
    </main>
  );
}

export default Main;