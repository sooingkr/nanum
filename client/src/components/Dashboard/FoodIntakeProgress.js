import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

const FoodIntakeProgress = ({ max, current }) => (
  <div className="food-intake__progress">
    <div className="food-intake__progress-heading">
      <span className="target">목표량 {max} kcal</span>
      <span className="current"> / {current} kcal 남음</span>
    </div>
    <ProgressBar now={calculateProgress(current, max)}/>
    <button className="button button--link">Edit</button>
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