/* eslint-disable no-unused-vars */
import React from 'react';
import {BrowserRouter, Switch ,Route} from 'react-router-dom';
import Page from './components/pages/Index';
import Detail from './components//pages/Details';


const routes = () => (
<BrowserRouter>
<Switch>
<Route exact path='/' component= {Page}/>
<Route path='/detail/:id' component= {Detail}/>
</Switch>
</BrowserRouter>

);

export default routes;
