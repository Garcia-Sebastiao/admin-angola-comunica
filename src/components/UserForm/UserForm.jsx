import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

/*----------------- CSS -------------------*/
import "./userForm.css";

/*-------------- Components --------------*/
import Button from '../UI/Button/Button'

const initialValue = {
    state: "",
    name: "",
    email: "",
}

export default ({ id }) => {
  const [values, setValues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/users/${id}`).then((response) => {
        setValues(response.data);
        console.log(response.data)
      });
    }
    else
    {
        console.log(id)
    }
  }, []);

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const method = id ? "put" : "post";
    const url = id
      ? `http://localhost:5000/users/${id}`
      : `http://localhost:5000/users`;

    axios[method](url, values).then((response) => {
      navigate("/users");
    });
  }

  return (
    <>
      <form className="user-form" onSubmit={onSubmit} action="">
        <input
          placeholder="Nome"
          name="name"
          type="text"
          value={values.name}
          onChange={onChange}
        />

        <input
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />

        <input
          placeholder="Senha"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />

        <input
          placeholder="Funcão"
          name="state"
          type="text"
          value={values.state || "Editor"}
          onChange={onChange}
        />

        <input placeholder="Foto" type="file" />

        <Button value="Salvar" />
      </form>
    </>
  );
};
