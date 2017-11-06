import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';

const FoodIntakeItem = ({ 
  name, 
  foodId, 
  mealTime, 
  imageUrl, 
  quantity, 
  isEditMode, 
  action 
}) => {
  const classes = isEditMode 
    ? 'food-intake-item food-intake-item--removable'
    : 'food-intake-item';

  return (
    <div className={classes} onClick={() => action(foodId, mealTime)}>
      <Media>
        <Media.Left>
          <figure className="food-intake-item__image">
            <img src={imageUrl} alt={name} />
          </figure>
        </Media.Left>
        <Media.Body>
          <Media.Heading className="food-intake-item__name">{name}</Media.Heading>
          <p className="food-intake-item__quantity">{quantity}</p>
        </Media.Body>
      </Media>
    </div>
  );
}

FoodIntakeItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
}

export default FoodIntakeItem;