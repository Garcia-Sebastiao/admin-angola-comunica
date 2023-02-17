/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import './article.css';

export default ({article}) => (
    <>
        <div className="article-card">
            <div className="article-head">
                <img src={`https://apiblogdb.onrender.com/blog/global/view_article/image/${article.idArticle}`} alt="articleImage" />
            </div>
            
            <div className="article-body">
                <small className="categorie">{article.category}</small>

                <h4>{article.title}</h4>
            </div>

            <div className="article-footer">
                <div className="author-inf">
                    <img src={article.authorImage} alt="authorImage" />
                    <span>{article.author}</span>
                </div>

                <div>
                    <span className="date">{article.date}</span>
                </div>
            </div>
        </div>
    </>
);