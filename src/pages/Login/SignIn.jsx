/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
/*----------------- CSS -------------------*/
import "./signIn.css";

/*----------------- Images -------------------*/
import logoHero from "../../assets/images/logo-hero.svg";
import iconLogin from "../../assets/images/icons-login.svg";

/*-------------- Components --------------*/
import Title from "../../components/UI/Title/Title";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import FormData from "form-data";

export default () => {
  const [values, setValues] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();
  const form = new FormData();

  function handleOnChange(event) {
    event.preventDefault();

    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }

  const handleFormSubmit = async () => {
    try {
      form.append("username", values.username);
      form.append("password", values.password);

      await auth.authenticate(form);
      
      navigate("/home");
      window.location.href = window.location.href;

    } catch (error) {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="page-auth">
      <aside>
        <img src={logoHero} alt="logoImage" />
      </aside>

      <main>
        <Title value="LOGIN" />

        <img src={iconLogin} alt="login-logo" />

        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Nome"
            type="text"
            name="username"
            required
            onChange={handleOnChange}
            value={values.username}
          />
          <input
            placeholder="Senha"
            type="password"
            name="password"
            onChange={handleOnChange}
            value={values.password}
          />
        </form>

        <button onClick={handleFormSubmit} type="submit">
          Login
        </button>
      </main>
    </div>
  );
};
