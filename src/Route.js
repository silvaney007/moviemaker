import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Details from "./components/pages/details/Details";
import Home from "./components/pages/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component = {Home}/>
        <Route path="/movie/:id" component={Details} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
