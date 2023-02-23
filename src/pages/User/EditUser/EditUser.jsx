/* eslint-disable import/no-anonymous-default-export */
import { Link } from "react-router-dom";
import { api } from "../../../services/api";
import React, { useRef, useState, useEffect } from "react";
/*----------------- CSS -------------------*/
import "./editUser.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";

/*-------------- Components --------------*/
import Title from "../../../components/UI/Title/Title";
import UserForm from "../../../components/UserForm/UserForm";
import Button from "../../../components/UI/Button/Button";
import { useParams } from "react-router-dom";
import FormData from "form-data";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";

export default () => {
  const { id_editor } = useParams();
  const form = new FormData();
  const [values, setValues] = useState("");
  const imageRef = useRef();
  const token = getUserLocalStorage().token;

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    api
      .get(`/blog/admin/view_editor/${id_editor}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setValues(response.data);
      });
  }, []);

  function onSubmit(ev) {
    ev.preventDefault();

    console.log('respondendo')
    const method = "put";
    const url = `/blog/admin/update_info_of_editor/${id_editor}`;

    const image = imageRef.current.files[0];
    const headersForm = form.getHeaders;

    form.append("yourname", values.yourname);
    form.append("username", values.username);
    form.append("email", values.email);
    form.append("password", values.password);
    form.append("confirm_password", values.confirm_password);
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
    <div className="add-user">
      <aside className="aside">
        <Link to="/home">
          <img src={logoHero} alt="logoImage" />
        </Link>
      </aside>

      <main>
        <Title value="Editar Usuário" />

        <div className="form-box">
          <form
            className="user-form"
            autoComplete="off"
            encType="multipart/form-data"
            onSubmit={onSubmit}
            action=""
          >
            <input
              placeholder="Nome"
              name="yourname"
              type="text"
              value={values.yourname}
              onChange={onChange}
            />

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
              placeholder="Confirmar Senha"
              name="confirm_password"
              type="password"
              value={values.confirm_password}
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
          </form>

          <Button onClick={onSubmit} value="Salvar" />
        </div>
        <br />
      </main>
    </div>
  );
};
