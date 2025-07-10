import React from 'react';
import './NewsCard.css';

function NewsCard({ article, savedArticles = [], onSave, onDelete }) {
    const isSaved = savedArticles.some((savedArticle) => savedArticle.id === article.id);

    return (
        <li className={`news-card ${isSaved ? 'news-card_saved' : ''}`}>
            <img 
                src={article.urlToImage || 'https://via.placeholder.com/400x272'}
                alt={article.title}
                className='news-card__image' 
            />
            <div className='news-card__content'>
                <p className='news-card__date'>{new Date(article.publishedAt).toLocaleDateString()}</p>
                <h3 className='news-card__title'>{article.title}</h3>
                <p className='news-card__text'>{article.description}</p>
                <p className='news-card__source'>{article.source.name}</p>
            </div>
            <button 
                className={`news-card__button ${isSaved ? 'news-card__button_saved' : ''}`}
                onClick={isSaved ? () => onDelete(article) : () => onSave(article)}
            >
                {isSaved ? 'Guardado' : 'Guardar'}
            </button>
        </li>
    );
}

export default NewsCard;