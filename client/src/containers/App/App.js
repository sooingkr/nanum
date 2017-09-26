import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
} from 'react-router-dom';

import Navigation from "../../components/Navigation/Navigation.js";

import Home from "../Home/Home.js";
import Dashboard from "../Dashboard/Dashboard.js";

import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Router>
          <main>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route path="/dashboard" component={ Dashboard } />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}
