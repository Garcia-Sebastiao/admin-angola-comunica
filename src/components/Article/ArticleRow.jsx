import axios from "axios";
import ArticleRowInterface from "../UI/Article/ArticleRowInterface";
import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

export default () => {
  const [articles, setArticle] = useState([]);

  useEffect(() => {
    api
      .get("/blog/global/view_article_all?_order=desc$_sort=id")
      .then((response) => {
        setArticle(response.data);
      });
  }, []);

  return (
    <>
      {articles.length ? (
        articles.map((article) => <ArticleRowInterface article={article} />)
      ) : (
        <p
          style={{
            padding: "1rem",
            color: "rgba(255, 255, 255, 0.463)",
            fontSize: "0.8rem",
          }}
          className="warning"
        >
          Sem Artigos...
        </p>
      )}
    </>
  );
};
