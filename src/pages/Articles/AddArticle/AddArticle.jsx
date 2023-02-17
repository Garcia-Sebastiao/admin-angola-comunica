/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Link } from "react-router-dom";

/*----------------- CSS -------------------*/
import "./addArticle.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";
import iconHome from "../../../assets/images/icons-home.svg";
import iconBlog from "../../../assets/images/icons-blog.svg";
import iconNotification from "../../../assets/images/icons-notification.svg";

/*-------------- Components --------------*/
import Form from '../../../components/Form/Form';
import Navbar from "../../../components/UI/Navbar/Navbar";
import Header from "../../../components/UI/Header/Header";
import Sidebar from "../../../components/UI/Sidebar/Sidebar";

export default () => (
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

      <h3>Postar Artigo</h3>

      <Form />
    </main>

    <Sidebar />
  </div>
);
