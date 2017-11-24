import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { withRouter } from 'react-router-dom';
import SearchForm from '../../components/Common/SearchForm';
import { FoodSearchDuck } from './FoodSearchDuck';

class FoodSearchBoxContainer extends Component {
  componentWillMount() {
    if (!isSearchRoute(this.props.location.pathname)) {
      this.props.reset('SearchForm');
    }
  }

  handleSubmit = (values) => {
    const currentLocation = this.props.location.pathname;
    this.props.searchFood(values.foodQuery);
    
    // If not in search result page
    if (!isSearchRoute(currentLocation)) {
      // Navigate to search result page
      this.props.cacheQuery(values.foodQuery);
      this.props.history.push('/search');
    }
  }

  render() {
    const { total, foodQuery } = this.props;

    return (
      <div className="food-search__box">
        <SearchForm onSubmit={this.handleSubmit} />
        { total &&
          foodQuery !== '' &&
          isSearchRoute(this.props.location.pathname) &&
          <div className="food-search__total">
            <span className="content">
              <strong>{`"${foodQuery}"`}</strong>
              &nbsp;
              <strong>에 대한 검색결과 총</strong>
              &nbsp;
              <strong>{`"${total}"건`}</strong>
            </span>
          </div>
        }
      </div>
    );
  }
}

FoodSearchBoxContainer.propTypes = {
  total: PropTypes.number,
  foodQuery: PropTypes.string,
  theme: PropTypes.oneOf(['dark']),
}

const mapStateToProps = (state) => {
  const foodState = state[FoodSearchDuck.storeName];

  return {
    foodQuery: foodState.foodQuery,
    total: foodState.list.total,
  }
};

const mapDispatchToProps = {
  cacheQuery: FoodSearchDuck.actions.requestSearch,
  searchFood: FoodSearchDuck.actions.searchFood,
  reset,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FoodSearchBoxContainer));

function isSearchRoute (route) {
  return route === '/search'
}