import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";

import FoodInfoInquiry from "../FoodInfoInquiry/FoodInfoInquiry";
import ServiceIntro from "../../components/ServiceIntroduction/ServiceIntro";
import Login from '../Login/Login';
import { ErrorModal } from '../../components/Common/ErrorModal';
import FoodSearch from '../FoodSearch/FoodSearch';
import UserSettings from '../UserSettings/UserSettings';
import { AppDuck } from './AppDuck';
import { isMobileVersion } from '../../utils/AppUtils';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };
  }

  componentWillMount() {
    this.props.initialize();
  }

  componentDidMount() {
    this.setState({isMobile: isMobileVersion()});
  }

  render() {
    const { initializeError } = this.props;
    const { isMobile } = this.state;
    const appClasses = isMobile ? 'App App--mobile' : 'App';

    return (
      <div className={appClasses} id="nanum">
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/foods/:id" component={FoodInfoInquiry}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/search" component={FoodSearch}/>
            <Route exact path="/introduce" component={() => <ServiceIntro isMobile={isMobile}/>}/>
            <Route exact path="/user/setting" component={UserSettings} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));