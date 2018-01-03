import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { withRouter } from 'react-router-dom';
import SearchForm from '../../components/Common/SearchForm';
import { FoodSearchDuck } from './FoodSearchDuck';
import { isMobileVersion } from '../../utils/AppUtils';
import QueryString from 'query-string';
import {isEmpty} from 'lodash';

class FoodSearchBoxContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const queryParams = QueryString.parse(this.props.location.search);
    if (!isEmpty(queryParams)) {
      this.props.searchFoodFirstPage(queryParams.foodKeyword);
    }

    if (!isSearchRoute(this.props.location.pathname)) {
      this.props.reset('SearchForm');
    }
  }

  handleSubmit = (values) => {
    const currentLocation = this.props.location.pathname;
    const nextPageLink = isMobileVersion()
      ? `/mobile/search?foodKeyword=${values.foodQuery}`
      : `/search?foodKeyword=${values.foodQuery}`;

    const queryParams = QueryString.parse(this.props.location.search);
    if (queryParams.foodKeyword !== values.foodQuery) {
      this.props.history.push(nextPageLink);
    }

    this.props.searchFoodFirstPage(values.foodQuery);

    // If not in search result page
    if (!isSearchRoute(currentLocation)) {
      // Navigate to search result page
      this.props.cacheQuery(values.foodQuery);
    }
  }

  render() {
    const { total, foodQuery } = this.props;

    return (
      <div className="food-search__box">
        <SearchForm onSubmit={this.handleSubmit} />
        { foodQuery !== '' &&
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
  searchFoodScroll: FoodSearchDuck.actions.searchFoodScroll,
  searchFoodFirstPage: FoodSearchDuck.actions.searchFoodFirstPage,
  reset,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FoodSearchBoxContainer));

function isSearchRoute (route) {
  return route === '/search'
}