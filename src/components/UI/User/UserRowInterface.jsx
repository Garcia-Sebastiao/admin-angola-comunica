import React from "react";
import { Link } from "react-router-dom";

import "./userRowInterface.css";

import editIcon from "../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";

const ArticleCard = ({ user }) => {
  return (
    <>
      <tr>
        <td className="user-state">{user.state}</td>
        <td className="user-name">{user.name}</td>
        <td className="user-email">{user.email}</td>

        <td className="admin-buttons">
          <Link to={`/edit_user/${user.id}`}>
            <button>
              <img src={editIcon} alt="" />
            </button>
          </Link>

          <Link to={`/delete`}>
            <button>
              <img src={deleteIcon} alt="" />
            </button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ArticleCard;
