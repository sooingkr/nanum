import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation.js";

import Home from "../Home/Home.js";
import Dashboard from "../Dashboard/Dashboard.js";
import PrivateRoute from '../../components/PrivateRoute';
import Login from '../Login/Login.js';
import { AppDuck } from './AppDuck';
import SearchResultList from '../../components/FoodSearch/SearchResultList.js';
import {ErrorModal} from '../../components/Common/ErrorModal';

export class App extends Component {
  componentWillMount() {
    this.props.initialize();
  }

  render() {
    const { isAuthenticated, initializeError } = this.props;
    return (
      <Router>
        <div className="App" id="nanum">
          <Navigation/>
          <main>
            <Switch>
              <Route exact path="/" component={ Home } />
              <PrivateRoute exact path="/dashboard" component={ Dashboard } isAuthenticated={isAuthenticated}/>
              <Route exact path="/login" component={Login}/>
              <Route path="/search" component={SearchResultList}/>
            </Switch>
          </main>

          {!!initializeError &&
            <ErrorModal modalId={'modal-app-error'}>
              <h4 className="text-danger">{initializeError.msg}</h4>
              <p>
                {`${initializeError.status} - ${initializeError.statusText}`}
              </p>
            </ErrorModal>
          }
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const appState = state[AppDuck.storeName];

  return {
    isAuthenticated: appState.isAuthenticated,
    initializeError: appState.initializeError,
  }
};

const mapDispatchToProps = {
  initialize: AppDuck.actions.initialize,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);