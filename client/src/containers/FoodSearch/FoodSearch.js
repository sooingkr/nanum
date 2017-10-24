import React, { Component } from 'react';
import FoodSearchResultContainer from './FoodSearchResultContainer';

class FoodSearch extends Component {
  render() {
    return (
      <div className="food-search">
        <FoodSearchResultContainer />
      </div>
    );
  }
}

export default FoodSearch;