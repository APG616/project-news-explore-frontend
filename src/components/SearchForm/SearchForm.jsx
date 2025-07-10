import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
    const [input, setInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        setIsSubmitting(true);
        onSearch(input);
        setIsSubmitting(false);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-form__input"
                placeholder="Buscar noticias..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
            />
            <button 
                type="submit" 
                className="search-form__button"
                disabled={isSubmitting || !input.trim()}
            >
                {isSubmitting ? 'Buscando...' : 'Buscar'}
            </button>
        </form>
    );
}

export default SearchForm;