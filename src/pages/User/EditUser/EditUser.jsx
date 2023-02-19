/* eslint-disable import/no-anonymous-default-export */
import React, { useRef, useState } from "react";
import { api } from "../../../services/api";
/*----------------- CSS -------------------*/
import "./editUser.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";

/*-------------- Components --------------*/
import Title from "../../../components/UI/Title/Title";
import UserForm from "../../../components/UserForm/UserForm";
import { useParams } from "react-router-dom";
import FormData from "form-data";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";

export default () => {
  const { id } = useParams();
  const form = new FormData();
  const [values, setValues] = useState("");
  const imageRef = useRef();
  const token = getUserLocalStorage().token;

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const method = "put";
    const url = ``;

    const image = imageRef.current.files[0];
    const headersForm = form.getHeaders;

    form.append("username", values.username);
    form.append("email", value.email);
    form.append("password", value.password);
    form.append("image", image);

    api[method](url, form, {
      headers: {
        ...headersForm,
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Dados atualizados com sucesso!");
      navigate("/users_page");
    });
  }

  return (
    <div className="page-auth">
      <aside>
        <img src={logoHero} alt="logoImage" />
      </aside>

      <main>
        <Title value="Editar Usuário" />

        <form
          className="user-form"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={onSubmit}
          action=""
        >
          <input
            placeholder="Nome"
            name="username"
            type="text"
            value={values.username}
            onChange={onChange}
          />

          <input
            placeholder="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
          />

          <input
            placeholder="Senha"
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
          />

          <input
            ref={imageRef}
            type="file"
            placeholder="Fotos"
            accept="image/*"
            multiple={false}
            required
          />

          <Button value="Salvar" />
        </form>
        <br />
      </main>
    </div>
  );
};
