/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import './button.css';

export default (props) => (
    <>
        <button  onClick={props.onClick} className="button" type={props.type || 'submit'}>{props.value || 'Default'}</button>
    </>
)