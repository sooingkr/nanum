import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { mockFoodSuggestions } from '../../service/mockAPI/responses';
import FoodSuggestionCarousel from '../../components/Dashboard/FoodSuggestionCarousel';
import NoInfo from '../../components/Dashboard/NoInfo';
import { selectors } from './DashboardDuck';

export class FoodSuggestionContainer extends Component {
  render() {
    const { reason, foodSuggestions } = this.props;

    return (
      <div className="food-suggestion">
        <div className="food-suggestion__reason">
          <div>
            <h3>오늘의 식품</h3>
            <p>{reason}</p>
          </div>
        </div>
        <div className="food-suggestion__carousel">
          <FoodSuggestionCarousel data={foodSuggestions}/>
        </div>
      </div>
    );
  }
}

const noInfoCondition = (props) => {
  return !props.foodSuggestions || isEmpty(props.foodSuggestions)
}

FoodSuggestionContainer = NoInfo(noInfoCondition, mockFoodSuggestions)(FoodSuggestionContainer);

FoodSuggestionContainer.propTypes = {
  foodSuggestions: PropTypes.arrayOf(PropTypes.object),
  reason: PropTypes.string
}

const mapStateToProps = (state) => ({
  foodSuggestions: selectors.getFoodSuggestions(state),
  reason: selectors.getReason(state),
});

export default connect(mapStateToProps)(FoodSuggestionContainer);
