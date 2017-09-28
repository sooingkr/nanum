import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-bootstrap';
import FoodIntakeProgress from '../../components/Dashboard/FoodIntakeProgress';
import FoodIntakeList from '../../components/Dashboard/FoodIntakeList';

class FoodIntakeTrackingContainer extends Component {
  onAddFood = () => {
    // TODO
  }

  render() {
    const { foodIntakeTracking: { calories, when } } = this.props;

    return (
      <div className="food-intake" >
        <FoodIntakeProgress 
          max={calories.target}
          current={calories.current}
        />

        <Row className="food-intake__meals">
        {
          Object.keys(when).map((mealTime, idx) => (
            <Col xs={12} md={4} key={mealTime}>
              <FoodIntakeList 
                mealTime={mealTime} 
                foods={when[mealTime]}
                onAddFood={this.onAddFood}
              />
            </Col>
          ))
        }
        </Row>
      </div>
    );
  }
}

FoodIntakeTrackingContainer.propTypes = {
  foodIntakeTracking: PropTypes.shape({
    calories: PropTypes.shape({
      target: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
    }).isRequired,
    when: PropTypes.shape({
      breakfast: PropTypes.array,
      lunch: PropTypes.array,
      dinner: PropTypes.array,
    }),
  })
}

export default FoodIntakeTrackingContainer;