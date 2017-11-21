import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isArray from 'lodash/isArray';

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
    }
    else if (!isUndefined(initialValue) && initialValue !== '') {
      previousValues = initialValue;
    }

    const currentValues = isArray(previousValues) ? [...previousValues] : [previousValues];

    return currentValues;
  }

  handleChange(event, id) {
    const {field} = this.props;
    const {onChange} = field;
    const values = this.getCurrentValues();

    if (event.target.checked) {
      values.push(id);
    }
    else {
      values.splice(values.indexOf(id), 1);
    }

    return onChange(values);
  }

  render() {
    const {label, options, field} = this.props;
    const {onBlur} = field;
    const values = this.getCurrentValues();

    return (
      <div className="multi-checkbox form-group">
        {options.map(option => {
          const isChecked = values.indexOf(option.id) > -1;

          return (
            <div
              key={option.id}
              className={isChecked ? "multi-checkbox__box checked" : "multi-checkbox__box"}
            >
              <label>{option.label}</label>
              <input
                {...field}
                type="checkbox"
                onChange={event => this.handleChange(event, option.id)}
                onBlur={() => onBlur(values)}
                checked={isChecked}
                value={option.id}
              />
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
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
      ]).isRequired
    })
  ).isRequired,
  field: PropTypes.object.isRequired
};

export default MultiCheckboxField;