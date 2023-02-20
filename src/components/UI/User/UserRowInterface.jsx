import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

import "./userRowInterface.css";

import editIcon from "../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import Modal from "react-modal";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";

Modal.setAppElement("#root");

const ArticleCard = ({ user }) => {
  const navigate = useNavigate();
  const [modalisOpen, setIsOpen] = useState(false);
  const token = getUserLocalStorage().token;

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  async function deleteUser(id) {
    const url = `/blog/admin/delete_editor/${id}`;

    await api
      .delete(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert('Usuário deletado com sucesso!');
        window.location.href = window.location.href; 
        navigate("/users_page");
      });

    setIsOpen(false);
  }

  return (
    <>
      <tr>
        <td>{user.state}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>

        <td className="admin-buttons">
          <Link to={`/edit_user/${user.id_editor}`}>
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
          <h3>Apagar Editor</h3>
          <p>Tem a certeza que pretende efectuar esta operação?</p>
        </div>

        <div className="modal-buttons">
          <button
            className="validateButton"
            onClick={() => deleteUser(user.id_editor)}
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

export default ArticleCard;
