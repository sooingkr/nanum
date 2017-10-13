import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Navigation from "../../components/Navigation/Navigation.js";

import Home from "../Home/Home.js";
import Dashboard from "../Dashboard/Dashboard.js";
import FoodDetailsContainer from "../FoodInfoInquiry/FoodDetailsContainer";
import PrivateRoute from '../../components/PrivateRoute';
import Login from '../Login/Login.js';
import { AppDuck } from './AppDuck';
// import SearchResultList from '../../components/FoodSearch/SearchResultList.js';

export class App extends Component {
  componentWillMount() {
    this.props.initialize();
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Router>
        <div className="App" id="nanum">
          <Navigation/>
          <main>
            <Switch>
              <Route exact path="/" component={ Home }/>
              <Route path="/product" component={FoodDetailsContainer}/>
              <PrivateRoute path="/dashboard" component={ Dashboard } isAuthenticated={isAuthenticated}/>
              <Route exact path="/login" component={Login}/>
              {/*<Route path="/search" component={SearchResultList}/>*/}
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state[AppDuck.storeName].isAuthenticated,
});

const mapDispatchToProps = {
  initialize: AppDuck.actions.initialize,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);