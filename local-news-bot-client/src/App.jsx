import React, { useEffect, useState } from "react";
import TmaProvider from "./component/tma/provider";

function App() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://news-tele-miniapp.vercel.app/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching news', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error.message}</div>;
  }

  return (
    <TmaProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Web 3 Technology News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {article.image && (
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TmaProvider>
  );
}

export default App;
