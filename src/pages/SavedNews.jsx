import React, { useMemo } from "react";
import "./SavedNews.css";
import SavedNewsCard from "../components/SavedNewsCard/SavedNewsCard";
import SavedNewsHeader from "../components/SavedNewsHeader/SavedNewsHeader";

function SavedNews({ username = "Usuario", savedArticles = [], onDeleteArticle, onLogout }) {
  // Memoize keywords calculation
  const { keywordString, keywordsCount } = useMemo(() => {
    const keywordSet = new Set(savedArticles.map(article => article.keyword));
    const keywords = Array.from(keywordSet);
    const extraCount = Math.max(keywords.length - 2, 0);

    return {
      keywordString: keywords.length <= 2
        ? keywords.join(", ")
        : `${keywords.slice(0, 2).join(", ")} y ${extraCount} más`,
      keywordsCount: keywords.length
    };
  }, [savedArticles]);

  return (
    <>
      <SavedNewsHeader userName={username} onLogout={onLogout} />

      <section className="saved-news" aria-labelledby="saved-news-title">
        <div className="saved-news__header">
          <p className="saved-news__label">Artículos guardados</p>
          <h2 id="saved-news-title" className="saved-news__title">
            {username}, tienes {savedArticles.length} {savedArticles.length === 1 ? 'artículo' : 'artículos'} guardados
          </h2>
          {keywordsCount > 0 && (
            <p className="saved-news__keywords">
              Por palabras clave:{" "}
              <span className="saved-news__keywords-bold">{keywordString}</span>
            </p>
          )}
        </div>

        {savedArticles.length > 0 ? (
          <ul className="saved-news__cards">
            {savedArticles.map((article) => (
              <li key={`${article.url}-${article.publishedAt}`}>
                <SavedNewsCard
                  article={article}
                  onDeleteArticle={onDeleteArticle}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="saved-news__empty">No tienes artículos guardados todavía</p>
        )}
      </section>
    </>
  );
}

export default React.memo(SavedNews);
