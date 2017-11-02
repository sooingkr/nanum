import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'react-bootstrap';

class SearchFormView extends Component {
  render() {
    const { 
      handleSubmit, 
      onExpand,
    } = this.props;

    return (
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
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </Form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  const { foodQuery } = values;

  if (!foodQuery) {
    errors.foodQuery = 'Please type a food name';
  }

  return errors;
};

const SearchForm = reduxForm({
  form: 'search',
  validate,
})(SearchFormView);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SearchForm;