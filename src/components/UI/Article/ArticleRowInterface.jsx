import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./articleRowInterface.css";
import editIcon from "../../../assets/images/icons/edit.svg";
import hideIcon from "../../../assets/images/icons/hide.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import showIcon from "../../../assets/images/icons/icons8_eye.svg";
import Modal from "react-modal";
import { api } from "../../../services/api";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";

Modal.setAppElement("#root");

const ArticleRowInterface = ({ article }) => {
  const navigate = useNavigate();
  const token = getUserLocalStorage().token;
  const [state, setState] = useState(true);
  const [modalisOpen, setIsOpen] = useState(false);

  async function deleteArticle(id) {
    let url = "";

    if (localStorage.getItem("state") == "Admin") {
      url = `/blog/admin/article/delete-post/${id}`;
    } else {
      url = `/blog/editor/article/delete-post/${id}`;
    }

    await api
      .delete(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Artigo deletado com sucesso");
        navigate("/articles_page");
        window.location.href = window.location.href;
      });

    setIsOpen(false);
  }

  async function switchVisbility(id) {
    if (state == true) {
      console.log(token)
      await api
        .put(`/blog/admin/article/hide-post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setState(false);
        });
    } else if (state == false) {
      await api
        .put(`/blog/admin/article/show-post/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setState(true);
        });
    }
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      <tr>
        <td className="date-row">{article.create_at}</td>
        <td className="categorie-row">{article.category}</td>
        <td className="subtitle-row">{article.title}</td>

        <td className="articles-buttons">
          <button onClick={() => switchVisbility(article.idArticle)}>
            <img
              className="show-hide"
              src={state ? showIcon : hideIcon}
              alt=""
            />
          </button>

          <Link to={`/edit_articles/${article.idArticle}`}>
            <button>
              <img src={editIcon} alt="" />
            </button>
          </Link>

          <button onClick={handleOpenModal}>
            <img src={deleteIcon} alt="" />
          </button>
        </td>
      </tr>

      <Modal
        isOpen={modalisOpen}
        onRequestClose={handleCloseModal}
        className="modal"
      >
        <div className="modal-text">
          <h3>Apagar Artigo</h3>
          <p>Tem a certeza que pretende efectuar esta operação?</p>
        </div>

        <div className="modal-buttons">
          <button
            className="validateButton"
            onClick={() => deleteArticle(article.idArticle)}
          >
            Sim
          </button>

          <button className="denyButton" onClick={handleCloseModal}>
            Não
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ArticleRowInterface;
