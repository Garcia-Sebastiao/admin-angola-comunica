import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./searcharticle.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";
import iconHome from "../../../assets/images/icons-home.svg";
import iconBlog from "../../../assets/images/icons-blog.svg";
import dark from "../../../assets/images/icons/dark_mode.svg";
import light from "../../../assets/images/icons/light_mode.svg";
import menu from "../../../assets/images/icons/icons8_menu.svg";
import close from "../../../assets/images/icons/icons8_close.svg";
import left from "../../../assets/images/icons/icons8_left_1.svg";
import right from "../../../assets/images/icons/icons8_right.svg";
import iconNotification from "../../../assets/images/icons-notification.svg";

/*-------------- Components --------------*/
import Form from "../../../components/Form/Form";
import Navbar from "../../../components/UI/Navbar/Navbar";
import Header from "../../../components/UI/Header/Header";
import Sidebar from "../../../components/UI/Sidebar/Sidebar";
import Article from "../../../components/UI/Article/Article";
import Carrousel from "../../../components/Carrousel/Carrousel";
import ArticleRowInterface from "../../../components/UI/Article/ArticleRowInterface";

export default () => {
  const [state, setState] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [theme, setTheme] = useState("dark");
  const themeState = localStorage.getItem("theme");
  const [search, setSearch] = useState("");
  const [articles, setArticle] = useState([]);
  const newSearch = search[0]?.toUpperCase() + search?.substring(1);

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

  function handleSearch() {
    setArticle([]);
    if (search != "1" && search != " ") {
      axios
        .get(
          `https://apiblogdb.onrender.com/blog/global/search_article/query=${newSearch}`
        )
        .then((resp) => {
          setArticle(resp.data);
        });
      return true;
    } else {
      return false;
    }
  }

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
        <Header title="Pesquisar Artigos" text="Pesquise os artigos desejados">
          <div className="search-form-area">
            <form onSubmit={handleSearch} autoComplete="off" action="">
              <input
                name="search"
                onChange={(event) => setSearch(event.target.value)}
                type="search"
                placeholder="Procurar"
              />
            </form>

            <button onClick={handleSearch}>Procurar</button>
          </div>
        </Header>

        <br /><br />
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
            {search.length ? (
              articles.map((article) => (
                <ArticleRowInterface article={article} />
              ))
            ) : (
              <p style={{ padding: "1rem" }} className="warning">
                Sem Correspondências...
              </p>
            )}
          </tbody>
        </table>
      </main>

      <Sidebar className={sidebar ? "appear" : ""} />
    </div>
  );
};
