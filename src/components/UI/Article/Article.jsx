/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";

import "./article.css";

export default ({ article }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {

    api
      .get(article.id_admin == null ? `/blog/global/reader/view_info_editor/${article.editor_id}` : `/blog/global/view_info_admin/${article.id_admin}`)
      .then((response) => {
        console.log(response.data)
        setUser(response.data);
      });
  }, []);

  return (
    <>
      <div className="article-card">
        <div className="article-head">
          <img
            src={`https://apiblogdb.onrender.com/blog/global/view_article/image/${article.idArticle}`}
            alt={article.title}
          />
        </div>

        <div className="article-body">
          <small className="categorie">{article.category}</small>

          <h4>{article.title}</h4>
        </div>

        <div className="article-footer">
          <div className="author-inf">
            <div className="editor_image">
              <img
                src={article.id_admin == null ? `https://apiblogdb.onrender.com/blog/global/view_image/${article.editor_id}` : `https://apiblogdb.onrender.com/blog/global/view_image_admin/${article.id_admin}`}
                alt="authorImage"
              />
            </div>
            <span>{user.yourname}</span>
          </div>

          <div>
            <span className="date">{article.create_at}</span>
          </div>
        </div>
      </div>
    </>
  );
};
