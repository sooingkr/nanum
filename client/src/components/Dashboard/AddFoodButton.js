import React from 'react';
import PropTypes from 'prop-types';

const AddFoodButton = ({ onAddFood, mealTime, disabled }) => (
  <button 
    className="button button--plus" 
    onClick={() => onAddFood(mealTime)}
    disabled={disabled}
  >
    <span>Add</span>
  </button>
)

AddFoodButton.propTypes = {
  onAddFood: PropTypes.func,
}

export default AddFoodButton;