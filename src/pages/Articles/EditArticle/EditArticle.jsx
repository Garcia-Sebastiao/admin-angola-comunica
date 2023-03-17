/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import FormData from "form-data";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";

import ReactHtmlParser from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
/*----------------- CSS -------------------*/
import "./editArticle.css";

/*----------------- Images -------------------*/
import logoHero from "../../../assets/images/logo-hero.svg";
import iconHome from "../../../assets/images/icons-home.svg";
import menu from "../../../assets/images/icons/icons8_menu.svg";
import close from "../../../assets/images/icons/icons8_close.svg";
import left from "../../../assets/images/icons/icons8_left_1.svg";
import right from "../../../assets/images/icons/icons8_right.svg";
import iconBlog from "../../../assets/images/icons-blog.svg";
import iconNotification from "../../../assets/images/icons-notification.svg";

/*-------------- Components --------------*/
import User from "../../../components/UI/User/User";
import Button from "../../../components/UI/Button/Button";
import Header from "../../../components/UI/Header/Header";
import Navbar from "../../../components/UI/Navbar/Navbar";
import { api } from "../../../services/api";
import Sidebar from "../../../components/UI/Sidebar/Sidebar";

export default () => {
  const { idArticle } = useParams();
  const form = new FormData();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [values, setValues] = useState([]);
  const token = getUserLocalStorage().token;
  const [state, setState] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [richValue, setRich] = useState("");
  const richtextToolbarConfig = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "blockQuote",
      "link",
      "numberedList",
      "bulletedList",
      "insertTable",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "|",
      "undo",
      "redo",
    ],
  };

  function navToogle() {
    !state ? setState(true) : setState(false);
    sidebar ? setSidebar(false) : "";
  }
  function sidebarToggle() {
    !sidebar ? setSidebar(true) : setSidebar(false);
    state ? setState(false) : "";
  }

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function handleOnChange(ev, editor) {
    setRich(editor.getData());
  }

  const editor = new CKEditor;

  useEffect(() => {
    if (idArticle) {
      api.get(`/blog/global/view_article/${idArticle}`).then((response) => {
        setValues(response.data);
        setRich(response.data.body)
      });
    }
  }, []);

  function onSubmit(ev) {
    ev.preventDefault();
    const method = "put";
    let url = ``;

    if (localStorage.getItem("state") == "Admin") {
      url = `/blog/admin/article/update-post/${idArticle}`;
    } else {
      url = `/blog/editor/article/update-post/${idArticle}`;
    }

    const image = imageRef.current.files[0];

    const headersForm = form.getHeaders;
    form.append("title", values.title);
    form.append("subtitle", values.subtitle);
    form.append("body", richValue);
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

        <h3
          style={{
            fontFamily: "Poppins-Semi-Bold",
          }}
        >
          Editar Artigo
        </h3>

        <div className="add-article-form">
          <CKEditor
            className="richtext"
            editor={ClassicEditor}
            placeholder="Descrição"
            onChange={handleOnChange}
            data={richValue}
            config={richtextToolbarConfig}
            required
          />

          <form
            onSubmit={onSubmit}
            method="POST"
            encType="multipart/form-data"
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

              <input
                name="font"
                placeholder="Fontes"
                onChange={onChange}
                value={values.font}
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
                ref={imageRef}
                type="file"
                placeholder="Fotos"
                accept="image/*"
                multiple={false}
                required
              />

              <Button
                onClick={onSubmit}
                name="btnSetArticle"
                value="Atualizar"
              />
            </div>
          </form>
        </div>
      </main>

      <Sidebar className={sidebar ? "appear" : ""} />
    </div>
  );
};
