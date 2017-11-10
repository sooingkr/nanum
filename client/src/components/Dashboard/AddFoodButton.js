import React from 'react';
import PropTypes from 'prop-types';

const AddFoodButton = ({ onClick, mealTime, disabled }) => (
  <button 
    className="button button--plus" 
    onClick={() => onClick(mealTime)}
    disabled={disabled}
  >
    <span>Add</span>
  </button>
)

AddFoodButton.propTypes = {
  onClick: PropTypes.func,
}

export default AddFoodButton;