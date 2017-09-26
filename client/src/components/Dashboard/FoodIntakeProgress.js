import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

const FoodIntakeProgress = ({ min, max, current }) => (
  <div className="food-intake__progress">
    <span>Start:{min} calories</span>
    <ProgressBar now={calculateProgress(current, max)}/>
    <span>Target:{max} calories</span>
  </div>
)

function calculateProgress(current, max) {
  return (current / max * 100);
}

FoodIntakeProgress.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default FoodIntakeProgress;