import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import FoodSuggestionCarousel from '../../components/Dashboard/FoodSuggestionCarousel';
import { selectors } from './DashboardDuck';
import './FoodSuggestion.scss';

class FoodSuggestionContainer extends Component {
  render() {
    const { foodSuggestions } = this.props;
    if(!foodSuggestions || isEmpty(foodSuggestions)) {
      return <div/>;
    }

    return (
      <div className="food-suggestions">
        <div className="food-suggestions__reason">
          <p>{foodSuggestions.reason}</p>
        </div>
        <div className="food-suggestions__carousel">
          <FoodSuggestionCarousel data={foodSuggestions.foods}/>
        </div>
      </div>
    );
  }
}

FoodSuggestionContainer.propTypes = {
  foodSuggestions: PropTypes.shape({
    foods: PropTypes.array,
    reason: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  foodSuggestions: selectors.getFoodSuggestions(state),
});

export default connect(mapStateToProps)(FoodSuggestionContainer);