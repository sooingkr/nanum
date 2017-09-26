/**
 * Created by manhvu on 9/26/17.
 */
import React from 'react';
import { LoginForm } from '../../components/Login/LoginForm';
import {server} from '../../config/server';

const handleLogin = formData => {
  return server.login(formData).then(res => {
    // TODO navigate to home after login success
  });
};

export const LoginPage = ({ className, children }) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-4"/>

      <div className="col-sm-4 text-center">
        <h3>Welcome</h3>
        <hr/>
        <LoginForm onSubmit={handleLogin}/>
      </div>
    </div>
  </div>
);
