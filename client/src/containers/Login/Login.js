/**
 * Created by manhvu on 9/26/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components/Login/LoginForm';
import { LoginDuck } from './LoginDuck';

export const Login = ({ login }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-4 col-sm-3"/>

      <div className="col-md-4 col-sm-6 text-center">
        <h3>Welcome</h3>
        <hr/>
        <LoginForm onSubmit={ login }/>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = {
  login: LoginDuck.actions.login
};

export default connect(null, mapDispatchToProps)(Login);