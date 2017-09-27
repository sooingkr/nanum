import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
} from 'react-router-dom';

import Navigation from "../../components/Navigation/Navigation.js";

import Home from "../Home/Home.js";
import Dashboard from "../Dashboard/Dashboard.js";
import { LoginPage } from '../Login/LoginPage';

import './App.scss';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation/>
          <main>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route path="/dashboard" component={ Dashboard } />
              <Route path="/login" component={LoginPage}/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}
