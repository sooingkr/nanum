import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import FoodSelectOption from './FoodSelectOption';
import FoodService from '../../service/FoodService';
import 'react-select/dist/react-select.css';

class FoodSelectField extends Component {
  fetchFoodOptions = async (name) => {
    if (name === "") {
      return Promise.resolve(new Error('Food name must not be empty'));
    }
    const results = await FoodService.suggestFood(name);
    return results.data;
  }

  render() {
    const { onAddFood, mealTime } = this.props;
    return (
      <Select.Async
        type="text"
        onChange={(selectedOption) => {
          onAddFood(selectedOption, mealTime);
        }}
        onBlurResetsInput={false}
        optionComponent={FoodSelectOption}
        loadOptions={this.fetchFoodOptions}
        placeholder="식품명을 입력하세요."
        clearable={false}
        filterOption={() => true}
      />
    );
  }
};

FoodSelectField.PropTypes = {
  onAddFood: PropTypes.func,
}

export default FoodSelectField;