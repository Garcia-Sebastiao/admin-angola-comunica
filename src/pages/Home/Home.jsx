/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

/*----------------- CSS -------------------*/
import "./home.css";

/*----------------- Images -------------------*/
import logoHero from "../../assets/images/logo-hero.svg";
import iconHome from "../../assets/images/icons-home.svg";
import menu from "../../assets/images/icons/icons8_menu.svg";
import left from "../../assets/images/icons/icons8_left_1.svg";
import right from "../../assets/images/icons/icons8_right.svg";
import close from "../../assets/images/icons/icons8_close.svg";
import iconBlog from "../../assets/images/icons-blog.svg";
import iconNotification from "../../assets/images/icons-notification.svg";
import iconUsers from "../../assets/images/icons-users.svg";
import light from "../../assets/images/icons/light_mode.svg";
import dark from "../../assets/images/icons/dark_mode.svg";

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
  const [state, setState] = useState(false);
  const [articles, setArticle] = useState([]);
  const [theme, setTheme] = useState("light");
  const [sidebar, setSidebar] = useState(false);
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

  useEffect(() => {
    api
      .get("https://apiblogdb.onrender.com/blog/global/view_article_all")
      .then((response) => {
        setArticle(response.data);
      });

      api.get('/blog/global/all_editors_and_admin')
      .then(response => {
        console.log(response.data);
      })
  }, []);

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
        />

        <div className="counter-cards">
          <CountCard
            length={articles.length}
            icon={iconBlog}
            type={articles.length > 1 ? "Artigos postados" : "Artigo postado"}
          />

          <CountCard length={users.length} icon={iconUsers} type="Usuários" />
        </div>

        <div className="recents-articles">
          <h2>Artigos Recentes</h2>

          <Carrousel>
            {articles.length ? (
              articles.map((article) => <Article article={article} />)
            ) : (
              <p style={{ padding: "0rem" }} className="warning">
                Sem Artigos...
              </p>
            )}
          </Carrousel>
        </div>
      </main>

      <Sidebar className={sidebar ? "appear" : ""} />
    </div>
  );
};
