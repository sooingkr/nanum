import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FoodSuggestionCarousel from '../../components/Dashboard/FoodSuggestionCarousel';

const mockFoodSuggestions = [
  {
    id: "1234",
    name: "chiecken",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "123",
    name: "chiecken 1",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "14",
    name: "chiecken 2",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "155",
    name: "chiecken 3",
    imageUrl: "http://via.placeholder.com/200x150",
  },
  {
    id: "14545",
    name: "chiecken 4",
    imageUrl: "http://via.placeholder.com/200x150",
  }
];

class FoodSuggestionContainer extends Component {
  render() {
    return (
      <div className="food-suggestion">
        <FoodSuggestionCarousel data={mockFoodSuggestions}/>
      </div>
    );
  }
}

// Uncomment this after connecting to Redux store
// FoodSuggestionContainer.propTypes = {
//   foodSuggestions: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     imageUrl: PropTypes.string.isRequired,
//   })).isRequired,
// }

export default FoodSuggestionContainer;