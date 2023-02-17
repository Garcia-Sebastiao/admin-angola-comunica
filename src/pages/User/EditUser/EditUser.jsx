/* eslint-disable import/no-anonymous-default-export */
import React from "react";

/*----------------- CSS -------------------*/
import "./editUser.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";

/*-------------- Components --------------*/
import Title from "../../../components/UI/Title/Title";
import UserForm from "../../../components/UserForm/UserForm";
import { useParams } from "react-router-dom";

export default () => {
    const {id} = useParams();

  return (
    <div className="page-auth">
      <aside>
        <img src={logoHero} alt="logoImage" />
      </aside>

      <main>
        <Title value="Editar Usuário" />

        <UserForm id={id ? Number.parseInt(id, 10) : null} />
        <br />
      </main>
    </div>
  );
};
