import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  Col,
  Row,
} from 'react-bootstrap';
import Dialog from '../../components/Dashboard/Dialog';
import { AddFoodForm } from '../../components/Dashboard/AddFoodForm';
import FoodIntakeProgress from '../../components/Dashboard/FoodIntakeProgress';
import FoodIntakeList from '../../components/Dashboard/FoodIntakeList';
import { DashboardDuck, selectors } from './DashboardDuck';
import './FoodIntake.scss';

export class FoodIntakeTrackingContainer extends Component {
  handleAddFood = (formData) => {
    const payload = this.constructAddFoodPayload(formData);
    this.props.addFood(payload);
  }

  constructAddFoodPayload = (formData) => {
    const { whichDialog } = this.props;
    return {
      mealTime: whichDialog,
      foodDetails: formData.food.value,
    }
  }

  render() {
    const { foodIntakeTracking, showDialog, openDialog, closeDialog } = this.props;

    if(!foodIntakeTracking || isEmpty(foodIntakeTracking)) {
      return <div/>;
    }

    const { calories, when } = foodIntakeTracking;
    if(isEmpty(calories) || isEmpty(when)) {
      return <div/>;
    }
    
    return (
      <div className="food-intake" >
        <FoodIntakeProgress 
          max={calories.target}
          current={calories.current}
        />

        <div className="food-intake__meals">
          <Row>
          {
            Object.keys(when).map((mealTime, idx) => (
              <Col xs={12} md={4} key={mealTime}>
                <FoodIntakeList 
                  mealTime={mealTime} 
                  foods={when[mealTime]}
                  openDialog={openDialog}
                />
              </Col>
            ))
          }

            <Dialog 
              show={showDialog} 
              onClose={closeDialog} 
            >
              <AddFoodForm onSubmit={this.handleAddFood} />
            </Dialog>
          </Row>
        </div>
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
    })
  })
}

const mapStateToProps = (state) => ({
  showDialog: selectors.getShowDialog(state),
  foodIntakeTracking: selectors.getFoodIntakeTracking(state),
  whichDialog: selectors.getWhichDialog(state),
});

const mapDispatchToProps = {
  openDialog: DashboardDuck.actions.openDialog,
  closeDialog: DashboardDuck.actions.closeDialog,
  addFood: DashboardDuck.actions.addFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodIntakeTrackingContainer);