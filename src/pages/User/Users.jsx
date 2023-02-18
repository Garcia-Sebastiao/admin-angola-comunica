/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { Link } from "react-router-dom";

/*----------------- CSS -------------------*/
import "./users.css";

/*----------------- Icons ------------------*/
import iconHome from "../../assets/images/icons-home.svg";
import iconBlog from "../../assets/images/icons-blog.svg";
import menu from "../../assets/images/icons/icons8_menu.svg";
import close from "../../assets/images/icons/icons8_close.svg";
import left from "../../assets/images/icons/icons8_left_1.svg";
import right from "../../assets/images/icons/icons8_right.svg";
import iconNotification from "../../assets/images/icons-notification.svg";

/*----------------- Images -------------------*/
import logoHero from "../../assets/images/logo-hero.svg";

/*-------------- Components --------------*/
import Navbar from "../../components/UI/Navbar/Navbar";
import Header from "../../components/UI/Header/Header";
import UserRow from "../../components/User/UserRow";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import LinkComponent from "../../components/LinkComponent";

export default () => {
  const [state, setState] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  function navToogle() {
    !state ? setState(true) : setState(false);
    sidebar ? setSidebar(false) : '';
  }
  function sidebarToggle() {
    !sidebar ? setSidebar(true) : setSidebar(false);
    state ? setState(false) : '';
  }

  return (
    <div className="main-page">
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

        <h3>Usuários</h3>

        <table className="users-table">
          <thead>
            <tr>
              <th className="state-column">Função</th>
              <th className="name-column">Nome</th>
              <th className="email-column">Email</th>
              <th className="admin-column"></th>
            </tr>
          </thead>

          <tbody>
            <UserRow />
          </tbody>
        </table>

        <LinkComponent href="/add_user" value="Adicionar" />
      </main>

      <Sidebar className={sidebar ? 'appear' : ''}/>
    </div>
  );
};
