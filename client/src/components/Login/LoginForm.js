/**
 * Created by manhvu on 9/26/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {Form, Button} from 'react-bootstrap';
import { FieldGroupView } from '../Common/FieldGroupView';

const LoginFormView = ({ handleSubmit, pristine, reset, submitting }) => (
  <Form horizontal onSubmit={handleSubmit}>
    <Field component={FieldGroupView} label="dupinfo *" type="text" name="dupinfo" placeholder="text"/>
    <Field component={FieldGroupView} label="memberGroup" type="text" name="memberGroup" placeholder="text"/>
    <Field component={FieldGroupView} label="memberName" type="text" name="memberName" placeholder="text"/>
    <Field component={FieldGroupView} label="memberId" type="text" name="memberId" placeholder="text"/>
    <Field component={FieldGroupView} label="memberGender" type="text" name="memberGender" placeholder="text"/>
    <Field component={FieldGroupView} label="pinNo" type="text" name="pinNo" placeholder="text"/>
    <Field component={FieldGroupView} label="lcnsNo" type="text" name="lcnsNo" placeholder="text"/>

    <Button bsStyle="default" type="submit" className="pull-right" disabled={pristine || submitting}>Login</Button>
  </Form>
);

const validate = values => {
  const errors = {};
  const {email, password} = values;

  if (!email) {
    errors.email = 'Email cannot be blank';
  }

  if (!password) {
    errors.password = 'Please enter your password';
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