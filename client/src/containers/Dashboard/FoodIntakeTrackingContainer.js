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

export class FoodIntakeTrackingContainer extends Component {
  componentWillMount() {
    console.log(this.props.foodIntakeTracking);
  }

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

  renderEditButtons = () => {
    if (this.props.isEditMode) {
      return (
        <div className="food-intake__edit">
          <button
            className="button button--link"
            type="button"
            onClick={() => {
              this.props.clearRemoveFood();
              this.props.quitEdit();
            }}
            >
            Cancel
          </button>
          <button
            className="button button--link"
            type="button"
            onClick={this.props.removeFoods}
            >
            Ok
          </button>
        </div>
      );
    } 

    return (
      <div className="food-intake__edit">
        <button 
          className="button button--link"
          type="button"
          onClick={this.props.enterEdit}
          >
          Edit
        </button>
      </div>
    )
  }

  render() {
    const { 
      foodIntakeTracking, 
      showDialog, 
      openDialog, 
      closeDialog,
      markRemoveFood,
      isEditMode,
    } = this.props;

    if(!foodIntakeTracking || isEmpty(foodIntakeTracking)) {
      return <div/>;
    }

    const { caloriesTarget, caloriesCurrent, when } = foodIntakeTracking;

    return (
      <div className="food-intake" >
        {this.renderEditButtons()}

        <FoodIntakeProgress 
          max={caloriesTarget}
          current={caloriesCurrent}
        />

        <div className="food-intake__meals">
          <Row>
          {
            Object.keys(when).map((mealTime) => (
              <Col xs={12} md={4} key={mealTime}>
                <FoodIntakeList 
                  isEditMode={isEditMode}
                  mealTime={mealTime} 
                  foods={when[mealTime]}
                  openDialog={openDialog}
                  markRemoveFood={markRemoveFood}
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
    caloriesTarget: PropTypes.number,
    caloriesCurrent: PropTypes.number,
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
  isEditMode: selectors.getEditMode(state),
});

const mapDispatchToProps = {
  openDialog: DashboardDuck.actions.openDialog,
  closeDialog: DashboardDuck.actions.closeDialog,
  addFood: DashboardDuck.actions.addFood,
  enterEdit: DashboardDuck.actions.enterEdit,
  quitEdit: DashboardDuck.actions.quitEdit,
  markRemoveFood: DashboardDuck.actions.markRemoveFood,
  removeFoods: DashboardDuck.actions.removeFoods,
  clearRemoveFood: DashboardDuck.actions.clearRemoveFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodIntakeTrackingContainer);