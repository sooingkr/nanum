import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';
import CheckboxField from './CheckboxField';

class MultiCheckboxField extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentValues = this.getCurrentValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCurrentValues() {
    const {field} = this.props;
    const {value, initialValue} = field;
    let previousValues = [];

    if (!isUndefined(value) && value !== '') {
      previousValues = value;
    } else if (!isUndefined(initialValue) && initialValue !== '') {
      previousValues = initialValue;
    }

    let currentValues = isArray(previousValues) ? [...previousValues] : [previousValues];    
    return currentValues;
  }

  handleChange(event, option) {
    const {field} = this.props;
    const {onChange} = field;
    const values = this.getCurrentValues();
    let afterChange = values;
    
    if (event.target.checked) {
      afterChange.push(option);
    } else {
      afterChange = afterChange.filter(value => value.id !== option.id);
    }

    return onChange(afterChange);
  }

  isDisabledValue(value) {
    return value === '다이어트' || value === '수험생';
  }

  render() {
    const {options, field} = this.props;
    const values = this.getCurrentValues();
    const ids = values.map(value => value.id);
    return (
      <div className="multi-checkbox form-group">
        {options.map(option => {
          const isChecked = ids.indexOf(option.id) > -1;
          const isDisabledValue = this.isDisabledValue(option.name);
          const className = isChecked && !isDisabledValue 
            ? "multi-checkbox__box checked" 
            : "multi-checkbox__box";

          const checkboxProps = {
            field,
            option,
            checked: isChecked && !isDisabledValue,
            disabled: isDisabledValue,
            handleChange: this.handleChange,
          }
          
          return (
            <div className={className} key={option.id}>
              <CheckboxField {...checkboxProps} />
            </div>
          );
        })}
      </div>
    );
  }
}

MultiCheckboxField.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
      ]).isRequired
    })
  ).isRequired,
  field: PropTypes.object.isRequired,
};

export default MultiCheckboxField;