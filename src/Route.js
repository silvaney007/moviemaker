/* eslint-disable no-unused-vars */
import React from 'react';
import {BrowserRouter,Switch ,Route, withRouter} from 'react-router-dom';
import Details from './components/pages/details/Details';
import Page from './components/pages/Home';




const routes = () => (
<BrowserRouter>
<Switch>
<Route exact path='/' component= {Page}/>
<Route path='/movie/:id' component= {Details}/>
</Switch>
</BrowserRouter>
);

export default routes;
