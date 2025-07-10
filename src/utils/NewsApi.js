class NewsApi {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getNews(keyboard) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);
    const toDate = new Date();

    const response = await fetch(
      `${this._baseUrl}/everything?` +
      `q=${keyword}&` +
      `from=${fromDate.toISOString()}&` +
      `to=${toDate.toISOString()}&` +
      `pageSize=100&` +
      `apiKey=${this._apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.articles;
  }
}

const newsApi = new NewsApi({
    baseUrl: 'https://newsapi.org/v2' || import.meta.env.VITE_NEWS_API_URL,
    apiKey: 'YOUR_API_KEY' || import.meta.env.VITE_NEWS_API_KEY,
})

export default newsApi;