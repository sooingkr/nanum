import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FoodIntakeItem from './FoodIntakeItem';
import AddFoodButton from './AddFoodButton';

class FoodIntakeList extends Component {
  render() {
    const { mealTime, foods, openDialog } = this.props;
    return (
      <div className="food-intake-list">
        <h3 className="food-intake-list__heading">{mapMealToLabel(mealTime)}</h3>
        <div className="food-intake-list__content">
          { foods.map(food => (
            <FoodIntakeItem 
              key={food.id} 
              name={food.name}
              imageUrl={food.imageUrl}
              quantity={food.quantity}
            />
          ))}

          <AddFoodButton onAddFood={openDialog} mealTime={mealTime}/>
        </div>
      </div>
    )
  }
}

function mapMealToLabel(mealTime) {
  switch(mealTime) {
    case 'breakfast':
      return '아침';
    case 'lunch':
      return '점심';
    case 'dinner':
      return '저녁';
    default:
      return mealTime;
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