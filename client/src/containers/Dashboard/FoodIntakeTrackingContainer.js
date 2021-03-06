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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitFoods(this.props.toBeAdded, this.props.queryTime);
  }

  handleCloseDialog = () => {
    this.props.closeDialog();
    this.props.clearAddFood();
  }

  renderEditButtons = () => {
    const { when: { breakfast, lunch, dinner }} = this.props.foodIntakeTracking;
    const isEditable = breakfast || lunch || dinner;

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
            onClick={() => {
              this.props.removeFoods();
              this.props.quitEdit();
            }}
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
          onClick={() => { isEditable && this.props.enterEdit()}}
          >
          Edit
        </button>
      </div>
    )
  }

  renderProgressBar = ({ foodIntakeTracking: { caloriesTarget, caloriesCurrent }}) => {
    return (
      <FoodIntakeProgress 
        max={caloriesTarget}
        current={caloriesCurrent}
      />
    )
  }
  
  renderAddFoodModal = ({ showDialog, whichDialog, addFood, clearAddFood, submitFoods }) => {
    return (
      <Dialog 
        show={showDialog} 
        onClose={this.handleCloseDialog} 
        container={this}
      >
        <AddFoodForm 
          onSubmit={this.handleSubmit} 
          onAddFood={addFood}
          mealTime={whichDialog}
        />
      </Dialog>
    )
  }

  render() {
    const { 
      foodIntakeTracking, 
      openDialog, 
      markRemoveFood,
      isEditMode,
    } = this.props;

    if(!foodIntakeTracking || isEmpty(foodIntakeTracking)) return <div/>;
    const { when } = foodIntakeTracking;
    return (
      <div className="food-intake modal-container" >
        {this.renderEditButtons()}
        {this.renderProgressBar(this.props)}

        <div className="food-intake__meals">
          <Row>
          {
            Object.keys(when).map((mealTime) => (
              <Col sm={4} key={mealTime}>
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
            {this.renderAddFoodModal(this.props)}
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
  toBeAdded: selectors.getToBeAdded(state),
  queryTime: selectors.getTime(state),
});

const mapDispatchToProps = {
  openDialog: DashboardDuck.actions.openDialog,
  closeDialog: DashboardDuck.actions.closeDialog,
  enterEdit: DashboardDuck.actions.enterEdit,
  quitEdit: DashboardDuck.actions.quitEdit,
  markRemoveFood: DashboardDuck.actions.markRemoveFood,
  removeFoods: DashboardDuck.actions.removeFoods,
  clearRemoveFood: DashboardDuck.actions.clearRemoveFood,
  addFood: DashboardDuck.actions.addFood,
  clearAddFood: DashboardDuck.actions.clearAddFood,  
  submitFoods: DashboardDuck.actions.submitFoods,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodIntakeTrackingContainer);