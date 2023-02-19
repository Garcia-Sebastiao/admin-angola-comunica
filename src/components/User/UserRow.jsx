import axios from "axios";
import React, { useState, useEffect } from "react";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";
import { api } from "../../services/api";

import UserRowInterface from "../UI/User/UserRowInterface";

export default () => {
  const [users, setUsers] = useState([]);
  const token = getUserLocalStorage()?.token;

  useEffect(() => {
    api
      .get("/blog/admin/view_editors", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setUsers(response.data);
      });
  }, []);

  return (
    <>
      {users.length > 0 ? (
        users.map((user) => <UserRowInterface user={user} />)
      ) : (
        <p
          style={{
            padding: "1rem",
            color: 'var(--response)'
          }}
          className="warning"
        >
          Sem usuários disponíveis...
        </p>
      )}
    </>
  );
};
