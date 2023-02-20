import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import FormData from "form-data";
import { api } from "../../services/api";

/*----------------- CSS -------------------*/
import "./userForm.css";

/*-------------- Components --------------*/
import Button from "../UI/Button/Button";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";

const initialValue = {
  state: "",
  name: "",
  email: "",
};

export default () => {
  const [values, setValues] = useState([]);
  const navigate = useNavigate();
  const form = new FormData();
  const token = getUserLocalStorage().token;
  const imageRef = useRef(null);

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const method = "post";
    const url = `/blog/admin/create_account_editor`;

    const image = imageRef.current.files[0];
    const headersForm = form.getHeaders;

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
      alert("Editor adicionado com sucesso!");
      navigate("/users_page");
    });
  }

  return (
    <>
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
    </>
  );
};
