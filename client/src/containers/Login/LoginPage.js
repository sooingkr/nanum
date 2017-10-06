/**
 * Created by manhvu on 9/26/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components/Login/LoginForm';
import { LoginDuck } from './LoginDuck';

const mapDispatchToProps = {
  login: LoginDuck.actions.login
};

export const LoginPage = connect(null, mapDispatchToProps)(
  ({ className, children, login }) => (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-3"/>

        <div className="col-md-4 col-sm-6 text-center">
          <h3>Welcome</h3>
          <hr/>
          <LoginForm onSubmit={login}/>
        </div>
      </div>
    </div>
  )
);
