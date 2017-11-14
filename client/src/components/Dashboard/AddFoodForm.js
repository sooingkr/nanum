import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { 
  Form, 
  Button,
  Media,
  Image,
} from 'react-bootstrap';
import FoodSelectField from './FoodSelectField';
import { DashboardDuck } from '../../containers/Dashboard/DashboardDuck';

const FoodOptionItem = ({ imageUrl, name, manufacturer, calories }) => (
  <Media>
    <Media.Left>
      <Image src={imageUrl} width={60} height={60} alt={name} circle />
    </Media.Left>
    <Media.Body>
      <Media.Heading>{name}</Media.Heading>
      <p>{manufacturer}</p>
    </Media.Body>
    <Media.Right>
      <p>{calories}kcal</p>
    </Media.Right>
  </Media>
)

let FoodOptionList = ({ foods }) => {
  if (!foods) return null;
  return (
    <div className="food-option-list">
      { foods.map((food) => {
        return (
          <div className="food-option-item" key={food.value.id}>
            <FoodOptionItem {...food.value} />
          </div>
        )
      })
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  foods: state[DashboardDuck.storeName].toBeAdded.foods,
});
// Connect FoodOptionList to store
FoodOptionList = connect(mapStateToProps)(FoodOptionList);

const AddFoodFormView = ({ handleSubmit, onAddFood, mealTime, pristine, reset, submitting }) => (
  <Form horizontal onSubmit={handleSubmit} className="add-food-form">
    <legend>무엇을 드셨나요?</legend>
    <FoodSelectField onAddFood={onAddFood} mealTime={mealTime} />
    <FoodOptionList />
    <Button bsStyle="default" 
            type="submit" 
            className="pull-right" 
            disabled={submitting} >
      확인
    </Button>
  </Form>
);

const validate = values => {
  const errors = {};
  const { food } = values;

  if (!food) {
    errors.food = 'Please type a food name';
  }

  return errors;
};

export const AddFoodForm = reduxForm({
  form: 'AddFoodForm',
  validate
})(AddFoodFormView);

AddFoodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};