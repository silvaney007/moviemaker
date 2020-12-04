/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react';
import './GoBackStyles.css';
import { useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/HomeRounded';



function GoBack() {

    let history = useHistory();

    function handleClick() {
        history.goBack();
    }
    return (<div className='goBack'>
        <button className="button" onClick={handleClick}>
            <HomeIcon id="icon"/>
        </button>
    </div>
    )
}

export default GoBack;