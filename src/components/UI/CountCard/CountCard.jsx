/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import './countCard.css';

export default (props) => (
    <div className="count-card">
        <img src={props.icon} alt="icon" />

        <div className="text-count">
            <span>{props.length || '0'}</span>
            <small>{props.type || 'Default'}</small>
        </div>
    </div>
);