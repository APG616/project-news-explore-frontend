import React from 'react';
import './About.css';



function About() {
    const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiB2aWV3Qm94PSIwIDAgMjgwIDI4MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==';
    return (
        <section className="about" aria-labelledby="about-heading">
<img 
  src={'../../../images/aboutAuthor.jpg' || placeholder} 
  alt="Foto del autor" 
  className="about__image" 
/>
            <div className="about__info">
                <h2 id="about-heading" className="about__title">Sobre el Autor</h2>
                <p className="about__text">
                    Eterno explorador del desarrollo web con experiencia en HTML, CSS, JavaScript y React. 
                    Actualmente aprendiendo Node.js y MongoDB para aplicaciones full stack.
                </p>
                <p className="about__text">
                    Apasionado por la creación de experiencias web intuitivas y accesibles.
                </p>
            </div>
        </section>
    );
}

export default About;