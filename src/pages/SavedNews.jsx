import React from 'react';
import "./SavedNews.css";
import Footer from "../components/Footer/Footer";
import NewsCard from "../components/NewsCard/NewsCard";
import SavedNewsHeader from "../components/SavedNewsHeader/SavedNewsHeader";

function SavedNews({ savedArticles = [], onDeleteArticle }) {
  const { keywordString, keywordsCount } = React.useMemo(() => {
    if (savedArticles.length === 0) return { keywordString: "", keywordsCount: 0 };
    
    const keywordCounts = savedArticles.reduce((acc, article) => {
      const keyword = article.keyword?.toLowerCase() || 'general';
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
    
    const sortedKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([keyword]) => keyword);
    
    let displayString;
    if (sortedKeywords.length <= 3) {
      displayString = sortedKeywords.join(', ');
    } else {
      displayString = `${sortedKeywords.slice(0, 2).join(', ')} y ${sortedKeywords.length - 2} más`;
    }
    
    return {
      keywordString: displayString,
      keywordsCount: sortedKeywords.length
    };
  }, [savedArticles]);

  return (
    <div className="saved-news-page">
      <main className="saved-news-content">
        <section className="saved-news" aria-labelledby="saved-news-title">
          <div className="saved-news__header">
            <p className="saved-news__label">Artículos guardados</p>
            <h2 id="saved-news-title" className="saved-news__title">
              {savedArticles.length === 1 ? '1 artículo guardado' : `${savedArticles.length} artículos guardados`}
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
                <NewsCard
                  key={article.id}
                  article={article}
                  isSaved={true}
                  isLoggedIn={true}
                  onDelete={() => onDeleteArticle(article)}
                />
              ))}
            </ul>
          ) : (
            <p className="saved-news__empty">No tienes artículos guardados todavía</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default React.memo(SavedNews);