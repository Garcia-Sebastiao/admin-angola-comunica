import User from "../User/User";
import React, { useEffect, useState } from "react";
import "./sidebar.css";
import iconLogout from "../../../assets/images/icons-logout.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../services/api";
import { getUserLocalStorage } from "../../../contexts/AuthProvider/util";

export default (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const token = getUserLocalStorage()?.token;

  const handleLogout = async () => {
    try {
      auth.logout();
      localStorage.setItem("state", " ");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    let url = "";

    if (localStorage.getItem("state") == "Admin") {
      url = "/blog/admin/view_info_admin";
    } else {
      url = "/blog/editor/view_info_editor";
    }

    api
      .get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setUser(resp.data);
      });
  }, []);

  return (
    <div>
      <aside className={`${props.className} users-side`}>
        <h2>Bem-vindo de volta</h2>
        <span className="user-task">{auth.email}</span>

        <div className="sidebar_img">
          <img
            className="user-img"
            src={
              localStorage.getItem("state") == "Admin"
                ? `https://apiblogdb.onrender.com/blog/admin/view_image_admin/${token}`
                : `https://apiblogdb.onrender.com/blog/editor/view_image/${user.id_editor}`
            }
            alt="userImage"
          />
        </div>
        <span>{user.yourname}</span>

        <div className="others-users">
          <h4>Outros Usuários</h4>

          <div className="users"></div>

          <Link to={`/users_page`}>Ver Todos</Link>
        </div>

        <a onClick={handleLogout} className="logoff">
          <img src={iconLogout} alt="logout" />
          Logout
        </a>
      </aside>
    </div>
  );
};
