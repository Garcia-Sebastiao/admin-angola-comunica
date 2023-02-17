import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './css/message.css';

import readMessage from "../assets/images/icons/icons8_feedback.svg";
import deleteIcon from "../assets/images/icons/delete.svg";

const Message = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/messages")
        .then((response) => {
            setMessages(response.data);
        })
    }, [])

  return (
    <>
        {
            messages.map((message) => (
                <tr>
                <td className="date-row">{message.date}</td>
                <td className="sender-row">{message.sender}</td>
                <td className="message-row">{message.message}</td>
        
                <td className="options-buttons">
                  <Link to={`/watch/${message.id}`}>
                    <button>
                      <img src={readMessage} alt="" />
                    </button>
                  </Link>
        
                  <Link to={`/delete/${message.id}`}>
                    <button>
                      <img src={deleteIcon} alt="" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
        }
    </>
  );
};

export default Message;