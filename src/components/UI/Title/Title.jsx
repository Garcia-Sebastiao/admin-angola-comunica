/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import './title.css';

export default (props) => (
    <div className='title-area'>
        <h2 className='title'>{props.value}</h2>
    </div>
)