import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'react-bootstrap';
import { FoodSearchDuck } from '../../containers/FoodSearch/FoodSearchDuck';

let SearchForm = ({ handleSubmit, onExpand }) => (
  <div className="search-form">
    <Form horizontal onSubmit={handleSubmit}>
      <Field name="foodQuery"
            className="search-form__input"
            component="input"
            type="text"
      />
      <Button bsStyle="default" 
              type="submit"
              className="search-form__submit" 
              onClick={onExpand} >
      </Button>
    </Form>
  </div>
);

const validate = values => {
  const errors = {};
  const { foodQuery } = values;

  if (!foodQuery) {
    errors.foodQuery = 'Please type a food name';
  }

  return errors;
};

SearchForm = reduxForm({
  form: 'SearchForm',
  validate,
})(SearchForm);

// Get initial input value from redux store
const mapStateToProps = (state) => ({
  initialValues: { 
    foodQuery: state[FoodSearchDuck.storeName].foodQuery,
  }
});

SearchForm = connect(mapStateToProps)(SearchForm);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SearchForm;