import React, { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  content: string;
}

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/articles")
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch articles");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      {articles.map((article) => (
        <div key={article.id} className="mb-4 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
