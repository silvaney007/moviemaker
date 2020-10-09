//eslint-disable-next-line
import React, {Component} from 'react';
import './Styles.css';
import Header from "./components/header/Index";
import Routes from  './Route'

const App = () =>{
    return ( 
      <div className = "App" >
        <Header/>
        <Routes/>
      </div>
    );
  }

export default App;
