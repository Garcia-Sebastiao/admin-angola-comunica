import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

/*------------ CSS ------------*/
import "./css/categories.css";

export default (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/categorie").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <>
      <nav className="categories">
        <ul className="container">
          <li>
            <Link to={`/articles_page`}>
              <a>Todas</a>
            </Link>
          </li>

          {categories.map((categorie) => (
            <li>
              <Link to={`/filterArticle/${categorie.id}`}>
                <a>{categorie.categorie}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
