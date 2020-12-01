/* eslint-disable no-unused-vars */
import React from 'react';
import './GoBackStyles.css';
import { useHistory } from "react-router-dom";


const GoBack = () => {
    let history = useHistory();
    return (<div className='home'>
        <button className="button" onClick={history.goBack}>Movie Maker</button>
    </div>
    )
}

export default GoBack;