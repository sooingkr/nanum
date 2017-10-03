/**
 * Created by manhvu on 9/26/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {Form, Button} from 'react-bootstrap';
import { FieldGroupView } from '../FieldGroupView';

const LoginFormView = ({ handleSubmit, pristine, reset, submitting }) => (
  <Form horizontal onSubmit={handleSubmit}>
    <Field component={FieldGroupView} label="Email *" type="email" name="username" placeholder="Email" required/>
    <Field component={FieldGroupView} label="Password *" type="password" name="password" placeholder="Password" required/>

    <Button bsStyle="default" type="submit" className="pull-right" disabled={pristine || submitting}>Login</Button>
  </Form>
);

const validate = values => {
  const errors = {};
  const {username, password} = values;

  if (!username) {
    errors.username = 'Please input your email';
  }

  if (!password) {
    errors.password = 'Please input password';
  }

  return errors;
};

export const LoginForm = reduxForm({
  form: 'LoginForm',
  validate
})(LoginFormView);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};