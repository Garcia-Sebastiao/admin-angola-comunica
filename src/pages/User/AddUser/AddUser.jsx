/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Link } from "react-router-dom";

/*----------------- CSS -------------------*/
import "./addUser.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";

/*-------------- Components --------------*/
import Title from "../../../components/UI/Title/Title";
import UserForm from "../../../components/UserForm/UserForm";

export default () => {
  return (
    <div className="add-user">
      <aside className="aside">
        <Link to="/home">
          <img src={logoHero} alt="logoImage" />
        </Link>
      </aside>

      <main>
        <Title value="Cadastrar Usuário" />

        <UserForm />
        <br />
      </main>
    </div>
  );
};
