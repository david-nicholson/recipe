import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import RecipeApp from './recipe-app/container';
import RecipeViewApp from './recipe-view-app/container';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={RecipeApp} />
        <Route path="/recipe/:name" component={RecipeViewApp} />
      </Router>
    );
  }
}

export default Routes;
