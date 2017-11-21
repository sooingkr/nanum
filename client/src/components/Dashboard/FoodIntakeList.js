import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FoodIntakeItem from './FoodIntakeItem';
import AddFoodButton from './AddFoodButton';

class FoodIntakeList extends Component {
  render() {
    const { 
      mealTime, 
      foods, 
      openDialog, 
      markRemoveFood,
      isEditMode,
    } = this.props;

    // if in edit mode, action is remove
    // else do nothing
    const foodItemAction = isEditMode 
      ? markRemoveFood
      : () => {};

    return (
      <div className="food-intake-list">
        <h3 className="food-intake-list__heading">{mapMealToLabel(mealTime)}</h3>
        <div className="food-intake-list__content">
          { foods.map(food => (
            <FoodIntakeItem 
              key={food.id} 
              name={food.foodInfo.name}
              intakeId={food.id}
              mealTime={mealTime}
              imageUrl={food.foodInfo.imageUrl}
              quantity={food.quantity}
              servingSize={food.servingSize}
              isEditMode={isEditMode}
              action={foodItemAction}
            />
          ))}

          <AddFoodButton 
            onClick={openDialog}
            mealTime={mealTime}
            disabled={isEditMode}
          />
        </div>
      </div>
    )
  }
}

FoodIntakeList.propTypes = {
  mealTime: PropTypes.string.isRequired,
  foods: PropTypes.arrayOf(PropTypes.object),
  isEditMode: PropTypes.bool,
  openDialog: PropTypes.func,
  markRemoveFood: PropTypes.func,
}

export default FoodIntakeList;

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
