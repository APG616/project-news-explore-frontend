import React, { useMemo } from "react";
import "./SavedNews.css";
import Footer from "../components/Footer/Footer";
import SavedNewsCard from "../components/SavedNewsCard/SavedNewsCard";
import SavedNewsHeader from "../components/SavedNewsHeader/SavedNewsHeader";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SavedNews({ savedArticles = [], onDeleteArticle }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const displayName = currentUser?.username || "Usuario";

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      window.dispatchEvent(new Event('auth-change'));
    } catch (error) {
      console.error("Error en logout:", error);
      alert('Ocurrió un error al cerrar sesión. Por favor intenta nuevamente.');
    }
  };

  const { keywordString, keywordsCount } = useMemo(() => {
    if (savedArticles.length === 0) return { keywordString: "", keywordsCount: 0 };
    
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
    <div className="saved-news-page">
      <SavedNewsHeader onLogout={handleLogout} />

      <main className="saved-news-content">
        <section className="saved-news" aria-labelledby="saved-news-title">
          <div className="saved-news__header">
            <p className="saved-news__label">Artículos guardados</p>
            <h2 id="saved-news-title" className="saved-news__title">
              {displayName}, tienes {savedArticles.length} {savedArticles.length === 1 ? 'artículo' : 'artículos'} guardados
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
                <SavedNewsCard
                  key={`${article.url}-${article.publishedAt}`}
                  article={article}
                  onDeleteArticle={onDeleteArticle}
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