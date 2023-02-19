/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Link } from "react-router-dom";
import iconSearch from "../../../assets/images/icons-search.svg";

/*----------------- CSS -------------------*/
import "./header.css";

export default (props) => (
  <>
    <header>
      <div className="header-text">
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>

      {props.state ? (
        <div className="search-area">
          <Link to={`/pesquisar_artigo`} className="search-button">
            <img src={iconSearch} alt="" />
          </Link>
        </div>
      ) : (
        ""
      )}

      {props.children}
    </header>
  </>
);
