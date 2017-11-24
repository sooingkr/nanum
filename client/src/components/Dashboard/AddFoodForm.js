import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  if (!foods || foods.length === 0) return null;
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

FoodOptionList = connect(mapStateToProps)(FoodOptionList);

export const AddFoodForm = ({ 
  onSubmit, 
  onAddFood, 
  mealTime, 
}) => (
  <Form horizontal onSubmit={onSubmit} className="add-food-form">
    <legend>무엇을 드셨나요?</legend>
    <FoodSelectField onAddFood={onAddFood} mealTime={mealTime} />
    <FoodOptionList />
    <Button bsStyle="default" 
      type="submit" 
      className="pull-right" 
    >
      확인
    </Button>
  </Form>
);

AddFoodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onAddFood: PropTypes.func.isRequired,
  mealTime: PropTypes.string.isRequired,
}