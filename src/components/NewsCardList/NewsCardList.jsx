import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import './NewsCardList.css';

function NewsCardList({ articles, isLoggedIn, savedArticles = [], onSaveArticle, onDeleteArticle }) {
    return (
        <ul className='news-card-list'>
            {articles.map((article) => {
                const isSaved = savedArticles.some((savedArticle) => savedArticle.url === article.url);

                return (
                    <NewsCard 
                        key={article.url || article.title} 
                        article={article} 
                        isSaved={isSaved} 
                        onSave={onSaveArticle} 
                        onDelete={onDeleteArticle}  
                        isLoggedIn={isLoggedIn} 
                    />
                );
            })}
        </ul>
    );
}

export default NewsCardList;