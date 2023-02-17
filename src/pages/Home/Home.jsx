/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

/*----------------- CSS -------------------*/
import "./home.css";

/*----------------- Images -------------------*/
import logoHero from "../../assets/images/logo-hero.svg";
import iconHome from "../../assets/images/icons-home.svg";
import iconBlog from "../../assets/images/icons-blog.svg";
import iconMessage from "../../assets/images/icons-message.svg";
import iconNotification from "../../assets/images/icons-notification.svg";
import iconUsers from "../../assets/images/icons-users.svg";

/*-------------- Components --------------*/
import Navbar from "../../components/UI/Navbar/Navbar";
import Header from "../../components/UI/Header/Header";
import Article from "../../components/UI/Article/Article";
import CountCard from "../../components/UI/CountCard/CountCard";
import Carrousel from "../../components/Carrousel/Carrousel";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import { api } from "../../services/api";

export default () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [articles, setArticle] = useState([]);

  const params = {};

  if (search) {
    params.subtitle_like = search;
  }

  useEffect(() => {
    api.get("https://apiblogdb.onrender.com/blog/global/view_article_all", {params}).then((response) => {
      setArticle(response.data);
    });

    // axios.get("http://localhost:5000/articles", { params }).then((response) => {
    //   setArticle(response.data);
    // });
  }, [search]);

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
                <a className="active">
                  <img src={iconHome} alt="" />
                </a>
              </Link>
            </li>
            <li>
              <Link to={`/articles_page`}>
                <a>
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
          title="Overview"
          text="Tenha uma vista geral das oiperações realizadas."
          state={true}
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />

        <div className="counter-cards">
          <CountCard
            length={articles.length}
            icon={iconBlog}
            type={articles.length > 1 ? "Artigos postados" : "Artigo postado"}
          />

          <CountCard 
            length={users.length} 
            icon={iconUsers} 
            type="Usuários" 
          />
        </div>

        <div className="recents-articles">
          <h2>Artigos Recentes</h2>

          <Carrousel>
            {articles.length ? (
              articles.map((article) => <Article article={article} />)
            ) : (
              <p style={{ color: "whitesmoke", filter: "brightness(0.9)" }}>
                Sem Artigos...
              </p>
            )}
          </Carrousel>
        </div>
      </main>

      <Sidebar />
    </div>
  );
};
