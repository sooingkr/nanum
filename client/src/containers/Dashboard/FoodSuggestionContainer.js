import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { mockFoodSuggestions } from '../../service/mockAPI/responses';
import FoodSuggestionCarousel from '../../components/Dashboard/FoodSuggestionCarousel';
import NoInfo from '../../components/Dashboard/NoInfo';
import { selectors, DashboardDuck } from './DashboardDuck';

export class FoodSuggestionContainer extends Component {
  render() {
    const { nutrients, foodSuggestions, selectNutrient } = this.props;

    return (
      <div className="food-suggestion">
        <ul className="food-suggestion__nutrient">
          {
            nutrients.map(item => (
              <li key={item.id}>
                <div className={`nutrient-item ${item.selected ? 'selected' : ''}`} onClick={() => selectNutrient(item)}>
                  <span>{item.text}</span> {item.selected && <span>›</span>}
                </div>
              </li>
            ))
          }
        </ul>
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

FoodSuggestionContainer = NoInfo(
  noInfoCondition, 
  mockFoodSuggestions,
  '정보를 입력하시면 오늘의 식품을 추천받으실 수 있습니다',
  '/user/setting',
  false,
)(FoodSuggestionContainer);

FoodSuggestionContainer.propTypes = {
  foodSuggestions: PropTypes.arrayOf(PropTypes.object),
  reason: PropTypes.string
}

const mapStateToProps = (state) => ({
  foodSuggestions: selectors.getFoodSuggestions(state),
  reason: selectors.getReason(state),
  nutrients: selectors.getNutrients(state),
});

const mapDispatchToProps = {
  selectNutrient: DashboardDuck.actions.selectNutrient,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodSuggestionContainer);
