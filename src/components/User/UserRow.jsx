import axios from "axios";
import React, { useState, useEffect } from "react";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";
import { api } from "../../services/api";

import UserRowInterface from "../UI/User/UserRowInterface";

export default () => {
  const [users, setUsers] = useState([]);
  const token = getUserLocalStorage().token;

  useEffect(() => {
    api
      .get("", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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
            color: "rgba(255, 255, 255, 0.463)",
            fontSize: "0.8rem",
          }}
        >
          Sem usuários disponíveis...
        </p>
      )}
    </>
  );
};
