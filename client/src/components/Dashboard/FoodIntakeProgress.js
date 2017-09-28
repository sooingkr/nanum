import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

const FoodIntakeProgress = ({ max, current }) => (
  <div className="food-intake__progress">
    <span>Target:{max} kcal</span>
    <ProgressBar now={calculateProgress(current, max)}/>
    <span>Current:{current} kcal</span>
  </div>
)

function calculateProgress(current, max) {
  return (current / max * 100);
}

FoodIntakeProgress.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default FoodIntakeProgress;