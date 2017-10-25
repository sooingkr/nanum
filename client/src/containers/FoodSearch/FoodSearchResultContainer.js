import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResultList from '../../components/FoodSearch/SearchResultList';
import { FoodSearchDuck } from '../FoodSearch/FoodSearchDuck';

export class FoodSearchResultContainer extends Component {
  componentWillMount() {
    this.props.load(this.props.foodQuery);
  }

  render() {
    const { data, isLoading, hasError, error, page, load } = this.props;

    return (
      <SearchResultList 
        data={data} 
        isLoading={isLoading}
        hasError={hasError}
        error={error}
        page={page}
        onPaginateLoad={load}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  foodQuery: state[FoodSearchDuck.storeName].foodQuery,
  data: state[FoodSearchDuck.storeName].hits,
  page: state[FoodSearchDuck.storeName].page,
  isLoading: state[FoodSearchDuck.storeName].isLoading,
  hasError: state[FoodSearchDuck.storeName].hasError,
  error: state[FoodSearchDuck.storeName].error,
});

const mapDispatchToProps = {
  load: FoodSearchDuck.actions.searchFood,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodSearchResultContainer);