/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import './input.css';

export default (props) => (
    <>
        <input name={props.name} id={props.id} className="input-text" type={props.type || 'text'} placeholder={props.placeholder} />
    </>
)