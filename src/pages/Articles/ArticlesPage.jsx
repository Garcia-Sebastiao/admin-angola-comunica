/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

/*----------------- CSS -------------------*/
import "./articlesPage.css";

/*----------------- Images -------------------*/
import logoHero from "../../assets/images/logo-hero.svg";
import menu from "../../assets/images/icons/icons8_menu.svg";
import light from "../../assets/images/icons/light_mode.svg";
import dark from "../../assets/images/icons/dark_mode.svg";
import close from "../../assets/images/icons/icons8_close.svg";
import left from "../../assets/images/icons/icons8_left_1.svg";
import right from "../../assets/images/icons/icons8_right.svg";
import iconHome from "../../assets/images/icons-home.svg";
import iconBlog from "../../assets/images/icons-blog.svg";
import iconNotification from "../../assets/images/icons-notification.svg";

/*-------------- Components --------------*/
import Navbar from "../../components/UI/Navbar/Navbar";
import Header from "../../components/UI/Header/Header";
import ArticleRowInterface from "../../components/UI/Article/ArticleRowInterface";
import LinkComponent from "../../components/LinkComponent";
import { api } from "../../services/api";
import Sidebar from "../../components/UI/Sidebar/Sidebar";

export default () => {
  const [search, setSearch] = useState("");
  const [articles, setArticle] = useState([]);
  const [state, setState] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [theme, setTheme] = useState("dark");
  const themeState = localStorage.getItem("theme");

  function switchTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    localStorage.setItem("theme", theme);
  }

  function navToogle() {
    !state ? setState(true) : setState(false);
    sidebar ? setSidebar(false) : "";
  }
  function sidebarToggle() {
    !sidebar ? setSidebar(true) : setSidebar(false);
    state ? setState(false) : "";
  }

  const params = {};

  if (search) {
    params.subtitle_like = search;
  }

  useEffect(() => {
    api
      .get("/blog/global/view_article_all?_order=desc&_sort=id", { params })
      .then((response) => {
        setArticle(response.data);
      });
  }, [search]);

  return (
    <div className="main-page dark-mode" data-theme={themeState}>
      <aside className="menu-side">
        <div>
          <img className="logo-hero" src={logoHero} alt="logoImage" />
        </div>

        <div className="nav-options">
          <div className="side-toggle">
            <img onClick={sidebarToggle} src={sidebar ? right : left} alt="" />
          </div>

          <div className="nav-toggle">
            <img onClick={navToogle} src={state ? close : menu} alt="" />
          </div>
        </div>

        <Navbar className={state ? "appear" : ""}>
          <ul>
            <button className="switch-theme" onClick={switchTheme}>
              {themeState == "light" ? (
                <img src={light} alt="" />
              ) : (
                <img src={dark} alt="" />
              )}{" "}
            </button>

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
          state={true}
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />

        <h3
          style={{
            fontFamily: "Poppins-Semi-Bold",
          }}
        >
          Artigos Postados
        </h3>

        <table className="articles-table">
          <thead>
            <tr>
              <th className="date-column">Data</th>
              <th className="categorie-column">Categoria</th>
              <th className="title-column">Titulo do Artigo</th>
              <th></th>
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
                }}
                className="warning"
              >
                Sem Artigos...
              </p>
            )}
          </tbody>
        </table>

        <LinkComponent href="/add_articles" value="Adicionar" />
      </main>

      <Sidebar className={sidebar ? "appear" : ""} />
    </div>
  );
};
