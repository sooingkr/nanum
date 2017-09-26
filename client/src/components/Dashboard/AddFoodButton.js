import React from 'react';
import PropTypes from 'prop-types';

const AddFoodButton = ({ onAddFood }) => (
  <button className="button--add-food" onClick={onAddFood}>
    <span>Add</span>
  </button>
)

AddFoodButton.propTypes = {
  onAddFood: PropTypes.func.isRequired,
}

export default AddFoodButton;