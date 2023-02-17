/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

/*----------------- CSS -------------------*/
import "./ilterArticle.css";

/*----------------- Images -------------------*/
import logoHero from "../assets/images/logo-hero.svg";
import iconHome from "../assets/images/icons-home.svg";
import iconBlog from "../assets/images/icons-blog.svg";
import authorImage from "../assets/images/user-photo.svg";
import iconLogout from "../assets/images/icons-logout.svg";
import iconNotification from "../assets/images/icons-notification.svg";

/*-------------- Components --------------*/
import User from "../../../components/User";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Categories from "../../../components/Categories";
import LinkComponent from "../../../components/LinkComponent";
import ArticleRowInterface from "../../../components/ArticleRowInterface";

export default () => {
  const [categorie, setCategorie] = useState([]);
  const [articles, setArticle] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/categorie/${id}?_embed=articles`)
      .then((response) => {
        setCategorie(response.data);

        setArticle(response.data.articles);
      });
  }, [id]);

  return (
    <div className="main-page">
      <aside className="menu-side">
        <div>
          <img className="logo-hero" src={logoHero} alt="logoImage" />
        </div>

        <Navbar>
          <ul>
            <li>
              <Link to={`/home`}>
                <a>
                  <img src={iconHome} alt="" />
                </a>
              </Link>
            </li>
            <li>
              <Link to={`/articles_page`}>
                <a className="active">
                  <img src={iconBlog} alt="" />
                </a>
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <a href="/">
                <img src={iconNotification} alt="" />
              </a>
            </li>
          </ul>
        </Navbar>
      </aside>

      <main>
        <Header
          title="Gerenciamento de Artigos"
          text="Gerencie os seus artigos com as operações disponíveis."
        />

        <h3>Artigos Postados</h3>

        <Categories />

        <table className="articles-table">
          <thead>
            <tr>
              <th className="date-column">Data</th>
              <th className="categorie-column">Categoria</th>
              <th className="title-column">Titulo do Artigo</th>
            </tr>
          </thead>

          <tbody>
            {articles.length ? (
              articles.map((article) => (
                <ArticleRowInterface article={article} />
              ))
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
          </tbody>
        </table>

        <LinkComponent href="/add_article" value="Adicionar" />
      </main>

      <aside className="users-side">
        <h2>Bem-vindo de volta</h2>
        <span className="user-task">Admin</span>

        <img className="online-user" src={authorImage} alt="userImage" />
        <span>Garcia Pedro</span>

        <div className="others-users">
          <h4>Outros Usuários</h4>

          <div className="users">
            <User />
          </div>

          <a href="/users">Ver todos</a>
        </div>

        <a className="logoff" href="/">
          <img src={iconLogout} alt="logout" />
          Logout
        </a>
      </aside>
    </div>
  );
};
