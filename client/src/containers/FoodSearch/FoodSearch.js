import React, { Component } from 'react';
import FoodSearchResultContainer from './FoodSearchResultContainer';
import FoodSearchBoxContainer from './FoodSearchBoxContainer';

class FoodSearch extends Component {
  render() {
    return (
      <div className="food-search">
        <FoodSearchBoxContainer />
        <FoodSearchResultContainer />
      </div>
    );
  }
}

export default FoodSearch;