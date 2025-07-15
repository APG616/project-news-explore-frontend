import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Hero from "../components/Hero/Hero";
import Preloader from "../components/Preloader/Preloader";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import "./Home.css";

function Home({ currentUser }) {
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [savedArticles, setSavedArticles] = useState([]);
    const [hasError, setHasError] = useState(false);

    const isLoggedIn = !!currentUser;

    const handleSearch = async (keyword) => {
        if (!keyword.trim()) {
            setHasError(true);
            return;
        }

        setIsLoading(true);
        setSearchKeyword(keyword);
        setArticles([]);
        setHasError(false);

        try {
            // Simulación de API
            const mockData = await new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        { 
                            title: "Everyone Needs a Special 'Sit Spot' in Nature",
                            description: "Ever since I read Richard Louv's influential book...",
                            urlToImage: "https://via.placeholder.com/400x272",
                            publishedAt: new Date().toISOString(),
                            source: { name: 'Treehugger' },
                            url: '#1',
                            id: '1'
                        },
                        { 
                            title: "The Healing Power of Nature",
                            description: "New studies confirm that spending time in nature reduces stress...",
                            urlToImage: "https://via.placeholder.com/400x272",
                            publishedAt: new Date(Date.now() - 86400000).toISOString(),
                            source: { name: 'Science Daily' },
                            url: '#2',
                            id: '2'
                        }
                    ]);
                }, 1500);
            });
            
            setArticles(mockData);
        } catch (error) {
            console.error("Error fetching articles:", error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveArticle = (article) => {
        if (!isLoggedIn) {
            alert('Please log in to save articles');
            return;
        }
        
        setSavedArticles(prev => {
            if (prev.some(a => a.id === article.id)) {
                return prev;
            }
            return [...prev, { ...article, isSaved: true }];
        });
    };

    const handleDeleteArticle = (articleToDelete) => {
        setSavedArticles(prev =>
            prev.filter(article => article.id !== articleToDelete.id)
        );
    };

    return (
        <div className="page">
            <Main>
                <Hero onSearch={handleSearch} />
                
                {isLoading ? (
                    <Preloader />
                ) : hasError ? (
                    <section className="no-results" aria-live="polite">
                        <div className="no-results__icon"></div>
                        <h2 className="no-results__title">Nothing found</h2>
                        <p className="no-results__text">
                            Sorry, but nothing matched your search terms.
                        </p>
                    </section>
                ) : articles.length > 0 ? (
                    <>
                        <h2 className="results-title">Search results</h2>
                        <NewsCardList 
                            articles={articles} 
                            isLoggedIn={isLoggedIn}
                            savedArticles={savedArticles}
                            onSaveArticle={handleSaveArticle}
                            onDeleteArticle={handleDeleteArticle}
                            keyword={searchKeyword}
                        />
                    </>
                ) : (
                    <section className="no-results" aria-live="polite">
                        <div className="no-results__icon"></div>
                        <h2 className="no-results__title">Start your search</h2>
                        <p className="no-results__text">
                            Enter a keyword to find news articles
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