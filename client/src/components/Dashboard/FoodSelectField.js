import React, { Component } from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';
import FoodService from '../../service/FoodService';
import 'react-select/dist/react-select.css';

class FoodSelectField extends Component {
  render() {
    return (
      <Field 
        name="food"
        component={props => 
          <Select.Async
            value={props.input.value}
            onChange={props.input.onChange}
            onBlur={() => props.input.onBlur(props.input.value)}
            loadOptions={() => FoodService.searchFood(props.input.value)}
            placeholder="Search for your food"
          />
        }
      />
    );
  }
};

export default FoodSelectField;