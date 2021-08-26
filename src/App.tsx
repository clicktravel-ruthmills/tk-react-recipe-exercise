import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import ListRecipes from './screens/ListRecipes/ListRecipes';
import CreateRecipe from './screens/CreateRecipe/CreateRecipe';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">List Recipes</Link>
                      </li>
                      <li>
                          <Link to="/create">Create Recipe</Link>
                      </li>
                  </ul>
              </nav>
          </div>
          <Switch>
              <Route path="/create">
                  <CreateRecipe />
              </Route>
              <Route path="/">
                  <ListRecipes />
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
