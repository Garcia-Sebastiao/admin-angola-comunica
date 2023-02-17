/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Link } from 'react-router-dom';

import './css/linkComponent.css';

export default (props) => (
    <div className='link'>
        <Link to={props.href}>
            <a className='link-component'>{props.value || 'Default'}</a>
        </Link>
    </div>
)