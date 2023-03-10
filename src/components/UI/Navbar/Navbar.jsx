/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

/*----------------- CSS -------------------*/
import './navbar.css';

export default (props) => (
    <>
        <nav className={props.className}>
            {props.children}
        </nav>
    </>
);