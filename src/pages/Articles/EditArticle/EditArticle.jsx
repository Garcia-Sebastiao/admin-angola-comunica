/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import FormData from "form-data";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";
/*----------------- CSS -------------------*/
import "./editArticle.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";
import iconHome from "../../../assets/images/icons-home.svg";
import iconBlog from "../../../assets/images/icons-blog.svg";
import authorImage from "../../../assets/images/user-photo.svg";
import iconLogout from "../../../assets/images/icons-logout.svg";
import iconNotification from "../../../assets/images/icons-notification.svg";

/*-------------- Components --------------*/
import User from "../../../components/UI/User/User";
import Button from "../../../components/UI/Button/Button";
import Header from "../../../components/UI/Header/Header";
import Navbar from "../../../components/UI/Navbar/Navbar";
import { api } from "../../../services/api";

export default () => {
  const { idArticle } = useParams();
  const form = new FormData();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [values, setValues] = useState([]);
  const token = getUserLocalStorage().token;

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    if (idArticle) {
      api.get(`/blog/global/view_article/${idArticle}`).then((response) => {
        setValues(response.data);
      });
    }
  }, []);

  function onSubmit(ev) {
    ev.preventDefault();
    const method = idArticle ? "put" : "post";
    const url = `/blog/editor/article/update-post/${idArticle}`;

    const image = imageRef.current.files[0];

    const headersForm = form.getHeaders;
    form.append("title", values.title);
    form.append("subtitle", values.subtitle);
    form.append("body", values.body);
    form.append("image", image);
    form.append("font", values.font);
    form.append("category", values.category);

    api[method](url, form, {
      headers: {
        ...headersForm,
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Dados atualizados com sucesso!");
      navigate("/articles_page");
    });
  }

  return (
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

        <h3>Editar Artigo</h3>

        <form
          onSubmit={onSubmit}
          method="POST"
          enctype="multipart/form-data"
          className="new-article-form"
          autoComplete="off"
          action=""
        >
          <div>
            <input
              name="title"
              placeholder="Título"
              onChange={onChange}
              value={values.title}
              required
            />

            <input
              name="category"
              placeholder="Categoria"
              list="categories"
              onChange={onChange}
              required
              value={values.category}
            />
            <datalist id="categories">
              <option value="Mundo" />
              <option value="Desporto" />
              <option value="Política" />
              <option value="Economia" />
              <option value="Saúde" />
              <option value="Diversos" />
            </datalist>

            <textarea
              rows="10"
              cols="30"
              name="body"
              className="description"
              placeholder="Descrição"
              onChange={onChange}
              value={values.body}
              required
            />
          </div>

          <div>
            <input
              name="subtitle"
              placeholder="Subtítulo"
              onChange={onChange}
              value={values.subtitle}
              required
            />

            <input
              name="font"
              placeholder="Fontes"
              onChange={onChange}
              value={values.font}
              required
            />

            <input
              ref={imageRef}
              type="file"
              placeholder="Fotos"
              accept="image/*"
              multiple={false}
              required
            />

            <Button name="btnSetArticle" value="Atualizar" />
          </div>
        </form>
      </main>

      <aside className="users-side">
        <h2>Bem-vindo de volta</h2>
        <span className="user-task">Admin</span>

        <img className="online-user" src={authorImage} alt="userImage" />
        <span>Garcia Pedro</span>

        <div className="others-users">
          <h4>Outros Usuários</h4>

          <div className="users">
            <User />
          </div>

          <a href="/users">Ver todos</a>
        </div>

        <a className="logoff" href="/">
          <img src={iconLogout} alt="logout" />
          Logout
        </a>
      </aside>
    </div>
  );
};
