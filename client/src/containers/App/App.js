import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// import {Grid, Row, Col} from "react-bootstrap";

import { Navigation } from "../../components/Navigation/Navigation";
// import { HomePage } from "../containers/HomePage";
import { DashboardPage } from "../DashboardPage/index";


import './App.scss';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Router>
          <main>
            <Route path="/dashboard" component={ DashboardPage } />
          </main>
        </Router>
      </div>
    );
  }
}
