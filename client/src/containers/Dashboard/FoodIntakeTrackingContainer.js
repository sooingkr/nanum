import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  Col,
  Row,
} from 'react-bootstrap';
import FoodIntakeProgress from '../../components/Dashboard/FoodIntakeProgress';
import FoodIntakeList from '../../components/Dashboard/FoodIntakeList';
import { dashboardDuck, selectors } from './duck';

export class FoodIntakeTrackingContainer extends Component {
  render() {
    const { foodIntakeTracking, showDialog, toggleDialog } = this.props;

    if(!foodIntakeTracking || isEmpty(foodIntakeTracking)) {
      return <div/>;
    }

    const { calories, when } = foodIntakeTracking;

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
                showDialog={showDialog}
                toggleDialog={toggleDialog}
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
      target: PropTypes.number,
      current: PropTypes.number,
    }),
    when: PropTypes.shape({
      breakfast: PropTypes.array,
      lunch: PropTypes.array,
      dinner: PropTypes.array,
    }),
  }),
}

const mapStateToProps = (state) => ({
  showDialog: selectors.getShowDialog(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleDialog: () => { 
    dispatch(dashboardDuck.actions.toggleDialog()); 
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodIntakeTrackingContainer);