import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Field } from 'redux-form';
import FoodService from '../../service/FoodService';
import 'react-select/dist/react-select.css';

class FoodSelectField extends Component {
  fetchFoodOptions = async (name) => {
    if (name === "") {
      return Promise.resolve(new Error('Food name must not be empty'));
    }
    const results = await FoodService.suggestFood(name);
    return results;
  }

  render() {
    const { onAddFood, mealTime } = this.props;
    return (
      <Field 
        name="food"
        component={props => 
          <Select.Async
            {...props.input}
            type="text"
            onChange={(selectedOption) => {
              console.log('ONCHANGE', selectedOption);
              onAddFood(selectedOption, mealTime);
            }}
            onBlur={() => props.input.onBlur(props.input.value)}
            onBlurResetsInput={false}
            loadOptions={this.fetchFoodOptions}
            placeholder="Search for your food"
            filterOption={() => true}
          />
        }
      />
    );
  }
};

FoodSelectField.PropTypes = {
  onAddFood: PropTypes.func,
}

export default FoodSelectField;