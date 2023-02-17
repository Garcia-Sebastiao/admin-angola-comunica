/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Link } from "react-router-dom";

/*----------------- CSS -------------------*/
import "./users.css";

/*----------------- Icons ------------------*/
import iconHome from "../../assets/images/icons-home.svg";
import iconBlog from "../../assets/images/icons-blog.svg";
import iconMessage from "../../assets/images/icons-message.svg";
import iconNotification from "../../assets/images/icons-notification.svg";

/*----------------- Images -------------------*/
import logoHero from "../../assets/images/logo-hero.svg";

/*-------------- Components --------------*/
import Navbar from "../../components/UI/Navbar/Navbar";
import Header from "../../components/UI/Header/Header";
import UserRow from "../../components/User/UserRow";
import Sidebar from '../../components/UI/Sidebar/Sidebar';
import LinkComponent from "../../components/LinkComponent";

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
          <li>
            <Link to={`/messages_page`}>
              <a>
                <img src={iconMessage} alt="" />
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

    <Sidebar />
  </div>
);
