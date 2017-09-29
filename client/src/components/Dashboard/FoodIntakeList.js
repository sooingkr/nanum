import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FoodIntakeItem from './FoodIntakeItem';
import AddFoodButton from './AddFoodButton';
import Dialog from './Dialog';

class FoodIntakeList extends Component {
  render() {
    const { mealTime, foods, showDialog, toggleDialog } = this.props;
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
          <AddFoodButton onAddFood={toggleDialog}/>
        </div>
        <Dialog 
          show={showDialog} 
          onClose={toggleDialog} 
        >
          <p>Please add more food lah</p>
        </Dialog>
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