import React from 'react';
import './About.css';

function About() {
    return (
        <section className="about" aria-labelledby="about-heading">
            <div className="about__container">
                <img 
                    src={'../../../images/aboutAuthor.jpg'} 
                    alt="Foto del autor" 
                    className="about__image" 
                />
                <div className="about__info">
                    <h2 id="about-title" className="about__title">Sobre el Autor</h2>
                    <p className="about__text">
                        Eterno explorador del desarrollo web con experiencia en HTML, CSS, JavaScript y React. 
                        Actualmente aprendiendo Node.js y MongoDB para aplicaciones full stack.
                    </p>
                    <p className="about__text">
                        Apasionado por la creación de experiencias web intuitivas y accesibles.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default About;