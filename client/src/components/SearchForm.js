import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'react-bootstrap';

class SearchFormView extends Component {
  handleEnter = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      this.props.handleSubmit(this.props.values);
    }
  }
  
  render() {
    const { handleSubmit, 
      reset, 
      theme="light", 
      onExpand,
      onClose, 
      isExpanded } = this.props;

    const expandClass = isExpanded ? 'is-expanded' : ''; 

    return (
      <div className={`search-form search-form--${theme} ${expandClass}`}>
        <Form horizontal onSubmit={handleSubmit}>
          <Field name="foodQuery"
                className="search-form__input"
                component="input"
                type="text"
                onKeyDown={this.handleEnter}
          />
          <Button bsStyle="default" 
                  type="button"
                  className="search-form__submit" 
                  onClick={onExpand} >
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
          <Button bsStyle="default"
                  type="button"
                  className="search-form__close" 
                  onClick={() => { reset(); onClose();} }>
            <i className="fa fa-times" aria-hidden="true"></i>
          </Button>
          <Button type="submit" style={{visibility: "hidden", padding: 0, border:'none'}}/>
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
  theme: PropTypes.oneOf(["light", "dark"]),
}

export default SearchForm;