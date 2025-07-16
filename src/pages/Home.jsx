import { useState } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Hero from "../components/Hero/Hero";
import Preloader from "../components/Preloader/Preloader";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import "./Home.css";
import newsApi from "../utils/NewsApi";

function Home({ currentUser, savedArticles, onSaveArticle, onDeleteArticle }) {
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [error, setError] = useState(null);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    const handleSearch = async (keyword) => {
        if (!keyword.trim()) {
            setError('Por favor, introduce una palabra clave');
            return;
        }

        setIsLoading(true);
        setSearchKeyword(keyword);
        setArticles([]);
        setError(null);
        setIsSearchPerformed(true);

        try {
            const data = await newsApi.searchNews(keyword);
            setArticles(data);
            
            if (data.length < 3) {
                setError(`Solo encontramos ${data.length} artículos. Prueba con otro término.`);
            }
        } catch (err) {
            setError(err.message);
            setArticles([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page">
            <Main>
                <Hero onSearch={handleSearch} />
                
                {isLoading ? (
                    <Preloader />
                ) : error && articles.length < 3 ? (
                    <section className="no-results" aria-live="polite">
                        <div className="no-results__icon"></div>
                        <h2 className="no-results__title">Resultados limitados</h2>
                        <p className="no-results__text">{error}</p>
                        {articles.length > 0 && (
                            <NewsCardList 
                                articles={articles} 
                                isLoggedIn={!!currentUser}
                                savedArticles={savedArticles}
                                onSaveArticle={onSaveArticle}
                                onDeleteArticle={onDeleteArticle}
                            />
                        )}
                    </section>
                ) : articles.length > 0 ? (
                    <>
                        <h2 className="results-title">Mostrando {articles.length} resultados para: {searchKeyword}</h2>
                        <NewsCardList 
                            articles={articles} 
                            isLoggedIn={!!currentUser}
                            savedArticles={savedArticles}
                            onSaveArticle={onSaveArticle}
                            onDeleteArticle={onDeleteArticle}
                        />
                    </>
                ) : isSearchPerformed ? (
                    <section className="no-results" aria-live="polite">
                        <div className="no-results__icon"></div>
                        <h2 className="no-results__title">No se encontraron resultados</h2>
                        <p className="no-results__text">
                            Intenta con otro término de búsqueda
                        </p>
                    </section>
                ) : (
                    <section className="no-results" aria-live="polite">
                        <div className="no-results__icon"></div>
                        <h2 className="no-results__title">Comienza tu búsqueda</h2>
                        <p className="no-results__text">
                            Introduce una palabra clave para encontrar artículos
                        </p>
                    </section>
                )}
            </Main>

            <About />
            <Footer />
        </div>
    );
}

export default Home;