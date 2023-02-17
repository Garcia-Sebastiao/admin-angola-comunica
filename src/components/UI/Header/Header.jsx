/* eslint-disable import/no-anonymous-default-export */
import React from "react";
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
          <input type="search" name="search" placeholder="Procurar Artigo" value={props.value} onChange={props.onChange} />
          <button>
            <img src={iconSearch} alt="" />
          </button>
        </div>
      ) : (
        ""
      )}
    </header>
  </>
);
