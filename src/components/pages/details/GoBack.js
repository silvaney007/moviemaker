/* eslint-disable no-unused-vars */
import React from 'react';
import './GoBackStyles.css';
import { useHistory } from "react-router-dom";


const Home = () =>{
let history = useHistory();
return  (<div className= 'home'>
<button class="button button1" onClick={() => history.goBack()}>Movie Maker</button>
</div>
)}

export default Home;