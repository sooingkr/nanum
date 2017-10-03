import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import FoodSelectField from './FoodSelectField';

const AddFoodFormView = ({ handleSubmit, pristine, reset, submitting }) => (
  <Form horizontal onSubmit={handleSubmit}>
    <FoodSelectField />
    <Button bsStyle="default" type="submit" className="pull-right" disabled={pristine || submitting}>Add</Button>
  </Form>
);

const validate = values => {
  const errors = {};
  const { food } = values;

  if (!food) {
    errors.food = 'Please type a food name';
  }

  return errors;
};

export const AddFoodForm = reduxForm({
  form: 'AddFoodForm',
  validate
})(AddFoodFormView);

AddFoodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};