import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FoodIntakeProgress from '../../components/Dashboard/FoodIntakeProgress';
import FoodIntakeList from '../../components/Dashboard/FoodIntakeList';

const mockFoodIntake = {
  foodIntakeTracking: {
    calories: {
      start: 780,
      target: 1800,
      current: 1560,
    },
    meals: {
      breakfast: [
        { 
          id: '123', 
          name: 'Banana', 
          imageUrl: 'http://via.placeholder.com/20x20',
          quantity: 'A truckload (15k kcal)',
        },
        { 
          id: '123asd', 
          name: 'Milk', 
          imageUrl: 'http://via.placeholder.com/20x20',
          quantity: 'A truckload (15k kcal)',
        },

      ],
      lunch: [
        { 
          id: 'qwe', 
          name: 'Pizza', 
          imageUrl: 'http://via.placeholder.com/20x20',
          quantity: 'A truckload (15k kcal)',
        },
      ],
      dinner: []
    }
  }
};

class FoodIntakeTrackingContainer extends Component {
  onAddFood = () => {
    // TODO
  }

  render() {
    const { foodIntakeTracking: { calories, meals } } = mockFoodIntake;

    return (
      <div className="food-intake" >
        <FoodIntakeProgress 
          min={calories.start} 
          max={calories.target}
          current={calories.current}
        />

        {
          Object.keys(meals).map((mealTime, idx) => (
            <FoodIntakeList 
              mealTime={mealTime} 
              foods={meals[mealTime]}
              onAddFood={this.onAddFood}
            />
          ))
        }

      </div>
    );
  }
}

// Uncomment this after connecting to Redux store
// FoodIntakeTrackingContainer.propTypes = {
//   foodIntakeTracking: PropTypes.objectOf(PropTypes.shape({
//     calories: PropTypes.shape({
//       start: PropTypes.number.isRequired,
//       target: PropTypes.number.isRequired,
//       current: PropTypes.number.isRequired,
//     }).isRequired,
//     meals: {
//       breakfast: PropTypes.array,
//       lunch: PropTypes.array,
//       dinner: PropTypes.array,
//     }
//   }))
// }

export default FoodIntakeTrackingContainer;