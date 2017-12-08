import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResultList from '../../components/FoodSearch/SearchResultList';
import { FoodSearchDuck } from '../FoodSearch/FoodSearchDuck';

export class FoodSearchResultContainer extends Component {
  onPaginateLoad = () => {
    this.props.loadNextPage(this.props.foodQuery);
  }
  render() {
    const {
      hasNextPage,
      isLoading,
      list,
      hasError,
    } = this.props;
    console.log(list);

    return (
      <SearchResultList
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        hasError={hasError}
        list={list}
        onPaginateLoad={this.onPaginateLoad}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  foodQuery: state[FoodSearchDuck.storeName].foodQuery,
  hasNextPage: state[FoodSearchDuck.storeName].list.hasNextPage,
  isLoading: state[FoodSearchDuck.storeName].isLoading,
  list: state[FoodSearchDuck.storeName].list.hits,
  hasError: state[FoodSearchDuck.storeName].hasError,
  error: state[FoodSearchDuck.storeName].error,
});

const mapDispatchToProps = {
  loadNextPage: FoodSearchDuck.actions.searchFoodScroll,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodSearchResultContainer);
