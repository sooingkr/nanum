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
    const classNames = this.state.isExpanded ? "food-search__box is-expanded" : "food-search__box";
    return (
      <div className={classNames}>
        <SearchForm 
          onSubmit={this.handleSubmit} 
          isExpanded={this.state.isExpanded}
          onExpand={this.onExpand}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  searchFood: FoodSearchDuck.actions.searchFood,
}

export default withRouter(connect(null, mapDispatchToProps)(FoodSearchBoxContainer));