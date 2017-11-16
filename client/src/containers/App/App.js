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
import ServiceIntro from "../../components/ServiceIntroduction/ServiceIntro";
import Login from '../Login/Login';
import { ErrorModal } from '../../components/Common/ErrorModal';
import FoodSearch from '../FoodSearch/FoodSearch';
import { AppDuck } from './AppDuck';
import ChatBoxContainer from "../Home/ChatBoxContainer";

export class App extends Component {
  componentWillMount() {
    this.props.initialize();
  }

  render() {
    const { initializeError } = this.props;

    const userId = '1';

    const messages = [
      {
        id: '1',
        content: '.......',
        admes: 'HACCP 교육 일정을 알려주세요.'
      },
      {
        id: '2',
        content: '무엇을 도와드릴까요?\n 무엇을 도와드릴까요?\n무엇을 도와드릴까요?',
        admes: 'HACCP 교육 일정을 알려주세요.'
      },
      {
        id: '3',
        content: '와드릴까요?',
        admes: ''
      },
      {
        id: '1',
        content: '무엇을 도와드릴까요?',
        admes: '알려주세요.'
      },
      {
        id: '1',
        content: '무엇을 도와드릴까요?',
        admes: 'ad message 2 ad message 2 ad message 2 ad message 2 ad message 2 ad message 2 ad message 2'
      },
      {
        id: '1',
        content: '무엇을 도와드릴까요?',
        admes: ''
      }
    ];

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
              <Route path="/introduce" component={ ServiceIntro }/>
            </Switch>

            <ChatBoxContainer userId={userId} messages={messages}/>

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