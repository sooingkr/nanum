import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';

const FoodIntakeItem = ({ 
  name, 
  intakeId, 
  mealTime, 
  imageUrl, 
  servingSize, 
  isEditMode, 
  action 
}) => {
  const classes = isEditMode 
    ? 'food-intake-item food-intake-item--removable'
    : 'food-intake-item';

  return (
    <div className={classes} onClick={() => action(intakeId, mealTime)}>
      <Media>
        <Media.Left>
          <figure className="food-intake-item__image">
            <img src={imageUrl} alt={name} />
          </figure>
        </Media.Left>
        <Media.Body>
          <Media.Heading className="food-intake-item__name">{name}</Media.Heading>
          <p className="food-intake-item__quantity">{servingSize}</p>
        </Media.Body>
      </Media>
    </div>
  );
}

FoodIntakeItem.propTypes = {
  intakeId: PropTypes.string,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  quantity: PropTypes.number,
  servingSize: PropTypes.string,
  isEditMode: PropTypes.bool,
}

export default FoodIntakeItem;