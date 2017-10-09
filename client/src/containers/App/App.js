import React, { Component } from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
} from 'react-router-dom';

import Navigation from "../../components/Navigation/Navigation.js";

import Home from "../Home/Home.js";
import Dashboard from "../Dashboard/Dashboard.js";
import PrivateRoute from '../../components/PrivateRoute';
import { LoginPage } from '../Login/LoginPage';
import Security from '../../lib/Security';
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" id="nanum">
          <Navigation/>
          <main>
            <Switch>
              <Route exact path="/" component={ Home } />
              <PrivateRoute path="/dashboard" component={ Dashboard } requireAuth={Security.requireAuth}/>
              <Route path="/login" component={LoginPage}/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}
