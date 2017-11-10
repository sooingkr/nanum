import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import FoodSuggestionCarousel from '../../components/Dashboard/FoodSuggestionCarousel';
import NoInfo from '../../components/Dashboard/NoInfo';
import { selectors } from './DashboardDuck';

export class FoodSuggestionContainer extends Component {
  render() {
    const { reason, foodSuggestions } = this.props;

    return (
      <div className="food-suggestions">
        <div className="food-suggestions__reason">
          <p>{reason}</p>
        </div>
        <div className="food-suggestions__carousel">
          <FoodSuggestionCarousel data={foodSuggestions}/>
        </div>
      </div>
    );
  }
}

const noInfoCondition = (props) => {
  return !props.foodSuggestions || isEmpty(props.foodSuggestions)
}

FoodSuggestionContainer = NoInfo(noInfoCondition)(FoodSuggestionContainer);

FoodSuggestionContainer.propTypes = {
  foodSuggestions: PropTypes.arrayOf(PropTypes.object),
  reason: PropTypes.string
}

const mapStateToProps = (state) => ({
  foodSuggestions: selectors.getFoodSuggestions(state),
  reason: selectors.getReason(state),
});

export default connect(mapStateToProps)(FoodSuggestionContainer);