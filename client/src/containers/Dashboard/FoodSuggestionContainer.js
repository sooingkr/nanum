import React, { Component } from 'react';
import FoodSuggestionCarousel from '../../components/Dashboard/FoodSuggestionCarousel';

class FoodSuggestionContainer extends Component {
  render() {
    return (
      <div className="food-suggestion">
        <FoodSuggestionCarousel data={this.props.data}/>
      </div>
    );
  }
}

export default FoodSuggestionContainer;