import Modal from "react-modal";
import React, { useState, useEffect } from "react";

import "./modal.css";

Modal.setAppElement("#root");

export default (props) => {
  const [modalisOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    handleOpenModal();
  }, []);

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalisOpen}
      onRequestClose={handleCloseModal}
      className="modal-message"
      overlayClassName="overlay"
    >
      <div className="modal-text">
        <h3 
          style={
            props.type == "Error" ? 
            { color: "#de2727" } 
            : ""
        }>
          {props.title}
        </h3>
        
        <p>{props.message}</p>
      </div>

      <div className="modal-buttons">
        <button className="validateButton" onClick={handleCloseModal}>
          Ok
        </button>
      </div>
    </Modal>
  );
};
