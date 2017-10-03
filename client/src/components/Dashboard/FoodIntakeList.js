import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FoodIntakeItem from './FoodIntakeItem';
import AddFoodButton from './AddFoodButton';

class FoodIntakeList extends Component {
  render() {
    const { mealTime, foods, openDialog } = this.props;
    return (
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
          <AddFoodButton onAddFood={openDialog} mealTime={mealTime}/>
        </div>

      </div>
    )
  }
}

FoodIntakeList.propTypes = {
  mealTime: PropTypes.string.isRequired,
  foods: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
  })).isRequired,
}

export default FoodIntakeList;