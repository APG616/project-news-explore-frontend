class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  _getDate(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  }

  async searchNews(keyword) {
    const today = this._getDate(0);
    const weekAgo = this._getDate(7);
    
    try {
      const response = await fetch(
        `${this._baseUrl}/everything?` +
        `q=${encodeURIComponent(keyword)}&` +
        `from=${weekAgo}&` +
        `to=${today}&` +
        `pageSize=8&` +
        `sortBy=publishedAt&` +
        `apiKey=${this._apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.articles.map(article => ({
        ...article,
        keyword: keyword.toLowerCase(),
        id: `${article.url}-${article.publishedAt}`,
        // Aseguramos que siempre haya una URL de imagen válida
        urlToImage: article.urlToImage || 'https://via.placeholder.com/400x272?text=Noticia'
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Lo sentimos, algo ha salido mal durante la solicitud. Por favor, inténtalo más tarde.');
    }
  }
}

const newsApi = new NewsApi({
  baseUrl: import.meta.env.VITE_NEWS_API_URL || 'https://newsapi.org/v2',
  apiKey: import.meta.env.VITE_NEWS_API_KEY || '30649e914eba48f584835d058121a233'
});

export default newsApi;