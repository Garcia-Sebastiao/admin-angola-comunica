import User from "../User/User";
import React from "react";
import "./sidebar.css";
import iconLogout from "../../../assets/images/icons-logout.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = async () => {
    try {
      auth.logout();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <aside className="users-side">
        <h2>Bem-vindo de volta</h2>
        <span className="user-task">{auth.email}</span>

        <img className="online-user" src="" alt="userImage" />
        <span></span>

        <div className="others-users">
          <h4>Outros Usuários</h4>

          <div className="users">
            
          </div>

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
