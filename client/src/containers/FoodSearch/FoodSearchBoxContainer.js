import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchForm from '../../components/Common/SearchForm';
import { FoodSearchDuck } from './FoodSearchDuck';

class FoodSearchBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    }
  }
  
  handleSubmit = (values) => {
    const currentLocation = this.props.location.pathname;
    this.props.searchFood(values.foodQuery);

    // If already in search result page
    if (currentLocation !== '/search') {
      // Navigate to search result page
      this.props.history.push('/search');
    }
  }

  onExpand = () => {
    this.setState({ isExpanded: true });
  }

  onClose = () => {
    this.setState({ isExpanded: false });
  }

  render() {
    const { total, foodQuery } = this.props;
    return (
      <div className="food-search__box">
        <SearchForm 
          onSubmit={this.handleSubmit} 
          isExpanded={this.state.isExpanded}
          onExpand={this.onExpand}
          onClose={this.onClose}
        />
        { total &&
          foodQuery !== '' &&
          <p className="food-search__total">
            <span>{`"${foodQuery}"`}</span>
            &nbsp;
            <span>에 대한 검색결과 총</span>
            &nbsp;
            <span>{`"${total}"건`}</span>
          </p>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodQuery: state[FoodSearchDuck.storeName].foodQuery,
  total: state[FoodSearchDuck.storeName].list.total,
});

const mapDispatchToProps = {
  searchFood: FoodSearchDuck.actions.searchFood,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FoodSearchBoxContainer));