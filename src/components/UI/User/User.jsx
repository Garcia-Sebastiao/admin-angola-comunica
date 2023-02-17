/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import React, { useState, useEffect } from "react";

import "./user.css";

export default () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <>
      {users.map((user) => (
        <div className="user">
          <img src={user.image} alt="userImage" />

          <div className="user-datas">
            <span>{user.name}</span>
            <small>{user.state}</small>
          </div>
        </div>
      ))}
    </>
  );
};
