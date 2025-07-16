import React, { useState } from 'react';
import './NewsCard.css';

function NewsCard({ article, isSaved, isLoggedIn, onSave = () => {}, onDelete = () => {} }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const handleButtonClick = () => {
        if (!isLoggedIn) return;
        isSaved ? onDelete(article) : onSave(article);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
        setImageError(false);
    };

    const handleImageError = (e) => {
        setImageError(true);
        e.target.src = 'https://via.placeholder.com/400x272?text=Imagen+no+disponible';
    };

    // URL de imagen segura
    const safeImageUrl = imageError 
        ? 'https://via.placeholder.com/400x272?text=Imagen+no+disponible'
        : article.urlToImage;

    return (
        <li className={`news-card ${isSaved ? 'news-card_saved' : ''}`}>
            <div className="news-card__image-container">
                {!imageLoaded && !imageError && (
                    <div className="news-card__image-placeholder"></div>
                )}
                <img 
                    src={safeImageUrl}
                    alt={article.title}
                    className={`news-card__image ${imageLoaded ? 'news-card__image--loaded' : ''}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                />
            </div>
            <div className='news-card__content'>
                <p className='news-card__date'>{formatDate(article.publishedAt)}</p>
                <h3 className='news-card__title'>{article.title}</h3>
                <p className='news-card__text'>{article.description || 'Descripción no disponible'}</p>
                <p className='news-card__source'>{article.source?.name || 'Fuente desconocida'}</p>
            </div>
            <button 
                className={`news-card__button 
                    ${isSaved ? 'news-card__button_saved' : ''}
                    ${!isLoggedIn ? 'news-card__button_unauthorized' : ''}
                `}
                onClick={handleButtonClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label={isSaved ? 'Eliminar de guardados' : 'Guardar artículo'}
            >
                {!isLoggedIn && isHovered && (
                    <span className="news-card__tooltip">Inicia sesión para guardar artículos</span>
                )}
                {isLoggedIn && (isSaved ? 'Guardado' : 'Guardar')}
            </button>
        </li>
    );
}

export default React.memo(NewsCard);