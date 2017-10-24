import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResultList from '../../components/FoodSearch/SearchResultList';
import { FoodSearchDuck } from '../FoodSearch/FoodSearchDuck';

export class FoodSearchResultContainer extends Component {
  componentWillMount() {
    this.props.initialize(this.props.foodQuery);
  }

  render() {
    return (
      <SearchResultList data={this.props.searchResults} />
    );
  }
}

const mapStateToProps = (state) => ({
  foodQuery: state[FoodSearchDuck.storeName].foodQuery,
  searchResults: state[FoodSearchDuck.storeName].results,
});

const mapDispatchToProps = {
  initialize: FoodSearchDuck.actions.searchFood,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodSearchResultContainer);