/* eslint-disable no-unused-vars */
import React from 'react';
import {BrowserRouter, Switch ,Route} from 'react-router-dom';
import Details from './components/pages/details/Index';
import Page from './components/pages/Index';


const routes = () => (
<BrowserRouter>
<Switch>
<Route exact path='/' component= {Page}/>
<Route path='/movie/:id' component= {Details}/>

</Switch>
</BrowserRouter>

);

export default routes;
