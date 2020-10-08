//eslint-disable-next-line
import React, {Component} from 'react';
import './Styles.css';
import Header from "./components/Header/Index";
import Page from './components/pages/Index'

const App = () =>{
    return ( 
      <div className = "App" >
        <Header/>
        <Page/>
      </div>
    );
  }

export default App;
