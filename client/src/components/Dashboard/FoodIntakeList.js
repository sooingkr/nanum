import React from 'react';
import PropTypes from 'prop-types';
import FoodIntakeItem from './FoodIntakeItem';
import AddFoodButton from './AddFoodButton';

const FoodIntakeList = ({ mealTime, foods, onAddFood }) => (
  <div className="food-intake-list">
    <h3 className="food-intake-list__label">{mealTime}</h3>
    { foods.map(food => (
      <FoodIntakeItem 
        key={food.id} 
        name={food.name}
        imageUrl={food.imageUrl}
        quantity={food.quantity}
      />
    ))}
    <div className="food-intake-list__add">
      <AddFoodButton onAddFood={onAddFood}/>
    </div>
  </div>
)

FoodIntakeList.propTypes = {
  mealTime: PropTypes.string.isRequired,
  foods: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  })).isRequired,
  onAddFood: PropTypes.func.isRequired,
}

export default FoodIntakeList;