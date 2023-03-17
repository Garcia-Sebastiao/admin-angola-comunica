import "./form.css";
import axios from "axios";
import FormData from "form-data";
import Button from "../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { api } from "../../services/api";
import { getUserLocalStorage } from "../../contexts/AuthProvider/util";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default ({}) => {
  const form = new FormData();
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const [values, setValues] = useState([]);
  const token = getUserLocalStorage().token;
  const [richValue, setRich] = useState("");
  const [loader, setLoader] = useState(true);

  const richtextToolbarConfig = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "blockQuote",
      "link",
      "numberedList",
      "bulletedList",
      "insertTable",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "|",
      "undo",
      "redo",
    ],
  };

  function handleOnChange(ev, editor) {
    setRich(editor.getData());
  }

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const method = "post";

    let url = "";

    if (localStorage.getItem("state") == "Admin") {
      url = `/blog/admin/article/add-post`;
    } else {
      url = `/blog/editor/article/add-post`;
    }

    const image = imageRef.current.files[0];

    const headersForm = form.getHeaders;
    form.append("title", values.title);
    form.append("subtitle", values.subtitle);
    form.append("body", richValue);
    form.append("image", image);
    form.append("font", values.font);
    form.append("category", values.category);

    api[method](url, form, {
      headers: {
        ...headersForm,
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        alert("Artigo postado com sucesso!");
        navigate("/articles_page");
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <div className="add-article-form">
      <div className="richtext">
        <CKEditor
          className="richtext"
          editor={ClassicEditor}
          placeholder="Descrição"
          onChange={handleOnChange}
          value={richValue}
          config={richtextToolbarConfig}
          required
        />
      </div>

      <form
        onSubmit={onSubmit}
        method="POST"
        enctype="multipart/form-data"
        className="new-article-form"
        autoComplete="off"
        action=""
      >
        <div>
          <input
            name="title"
            placeholder="Título"
            onChange={onChange}
            value={values.title}
            required
          />

          <input
            name="category"
            placeholder="Categoria"
            list="categories"
            onChange={onChange}
            required
          />
          <datalist id="categories">
            <option value="Mundo" />
            <option value="Desporto" />
            <option value="Política" />
            <option value="Economia" />
            <option value="Saúde" />
            <option value="Diversos" />
          </datalist>

          <input
            name="font"
            placeholder="Fontes"
            onChange={onChange}
            value={values.font}
            required
          />
        </div>

        <div>
          <input
            name="subtitle"
            placeholder="Subtítulo"
            onChange={onChange}
            value={values.subtitle}
            required
          />

          <input
            ref={imageRef}
            type="file"
            placeholder="Fotos"
            accept="image/*"
            multiple={false}
            required
          />
          <Button name="btnSetArticle" value="Postar" />
        </div>
      </form>
    </div>
  );
};
