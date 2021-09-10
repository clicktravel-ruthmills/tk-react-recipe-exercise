import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import ListRecipes from './screens/ListRecipes/ListRecipes';
import CreateRecipe from './screens/CreateRecipe/CreateRecipe';

import Nav from './components/Nav/Nav';
import NavList from './components/NavList/NavList';
import NavEntry from './components/NavEntry/NavEntry';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <div>
              <Nav>
                  <NavList>
                      <NavEntry>
                          <Link to="/">List Recipes</Link>
                      </NavEntry>
                      <NavEntry>
                          <Link to="/create">Create Recipe</Link>
                      </NavEntry>
                  </NavList>
              </Nav>
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
