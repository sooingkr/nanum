import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import FoodInfoInquiry from "../FoodInfoInquiry/FoodInfoInquiry";
import { ErrorModal } from '../../components/Common/ErrorModal';
import Login from '../Login/Login';
import FoodSearch from '../FoodSearch/FoodSearch';
import { AppDuck } from './AppDuck';

export class App extends Component {
  componentWillMount() {
    this.props.initialize();
  }

  render() {
    const { initializeError } = this.props;
    return (
      <Router>
        <div className="App" id="nanum">
          <main>
            <Switch>
              <Route exact path="/" component={ Home }/>
              <Route path="/foods/:id" component={FoodInfoInquiry}/>
              <Route path="/dashboard" component={ Dashboard }/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/search" component={FoodSearch}/>
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
    initializeError: appState.initializeError,
  }
};

const mapDispatchToProps = {
  initialize: AppDuck.actions.initialize,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);