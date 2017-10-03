import React from 'react';
import PropTypes from 'prop-types';

const AddFoodButton = ({ onAddFood, mealTime }) => (
  <button className="button--add-food" onClick={() => onAddFood(mealTime)}>
    <span>Add</span>
  </button>
)

AddFoodButton.propTypes = {
  onAddFood: PropTypes.func,
}

export default AddFoodButton;