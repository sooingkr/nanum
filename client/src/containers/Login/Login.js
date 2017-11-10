/**
 * Created by manhvu on 9/26/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginForm } from '../../components/Login/LoginForm';
import { LoginDuck } from './LoginDuck';
import { AppDuck } from '../App/AppDuck';

export const Login = ({login, history}) => {
  return (
    <div className="container">
      <div style={{height: '50px'}}>{' '}</div>

      <div className="row">
        <div className="col-md-4 col-sm-3"/>

        <div className="col-md-4 col-sm-6 text-center">
          <h3>Welcome</h3>
          <hr/>
          <LoginForm onSubmit={ (formData) => login(formData, history) }/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state[AppDuck.storeName].isAuthenticated,
});

const mapDispatchToProps = {
  login: LoginDuck.actions.login,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));