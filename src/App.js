/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import './Styles.css';
import Routes from  './Route'
import Header from './components/header/Header'


const App = () =>{
    return ( 
      <div className = "App" >
        <Header/>
        <Routes/>
      </div>
    );
  }

export default App;
