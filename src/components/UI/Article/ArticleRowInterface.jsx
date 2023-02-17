import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./articleRowInterface.css";
import editIcon from "../../../assets/images/icons/edit.svg";
import hideIcon from "../../../assets/images/icons/hide.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import Modal from "react-modal";
import { api } from "../../../services/api";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";

Modal.setAppElement("#root");

const ArticleRowInterface = ({ article }) => {
  const navigate = useNavigate();
  const token = getUserLocalStorage().token;
  const [modalisOpen, setIsOpen] = useState(false);

  async function deleteArticle(id) {
    console.log(id);

    await api
      .delete(`/blog/editor/article/delete-post/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        navigate("/articles_page");
      });

    setIsOpen(false);
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
          <button>
            <img src={hideIcon} alt="" />
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

          <button 
            className="denyButton" 
            onClick={handleCloseModal}
          >
            Não
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ArticleRowInterface;
