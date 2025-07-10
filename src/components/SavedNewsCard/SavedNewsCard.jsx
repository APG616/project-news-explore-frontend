import React from "react";
import "./SavedNewsCard.css";

function SavedNewsCard({ article, onDeleteArticle }) {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteArticle(article);
  };

  // Formatear fecha para mejor legibilidad
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="saved-card">
      <img
        src={article.urlToImage || 'https://via.placeholder.com/400x272'}
        alt={article.title}
        className="saved-card__image"
        loading="lazy"
      />
      <div className="saved-card__keyword">{article.keyword}</div>
      <button
        className="saved-card__delete-button"
        onClick={handleDelete}
        aria-label={`Eliminar "${article.title}" de guardados`}
        title="Eliminar de guardados"
      />
      <div className="saved-card__content">
        <time className="saved-card__date" dateTime={article.publishedAt}>
          {formattedDate}
        </time>
        <h3 className="saved-card__title">{article.title}</h3>
        <p className="saved-card__text">{article.description}</p>
        <p className="saved-card__source">{article.source?.name || 'Fuente desconocida'}</p>
      </div>
    </article>
  );
}

export default React.memo(SavedNewsCard);