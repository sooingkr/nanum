import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import UserInfoContainer from './UserInfoContainer';
import FoodIntakeTrackingContainer from './FoodIntakeTrackingContainer';
import FoodSuggestionContainer from './FoodSuggestionContainer';
import IngredientsSuggestionContainer from './IngredientsSuggestionContainer';

const mockUserInfo = {
  male: true,
  name: "David Coffee",
  interests: [
    { id: "asdasd1", text: "soccer" },
    { id: "asdd1", text: "Scala" },
    { id: "asdd1asd", text: "penny" },
  ],
  diseases: [
    { id: "123asd", text: "suck shti" },
    { id: "123as2d", text: "psycho" },
    { id: "123asggd", text: "obese" },
  ]
};

const mockFoodIntake = {
  calories: {
    start: 780,
    target: 1800,
    current: 1560,
  },
  when: {
    breakfast: [
      { 
        id: '123', 
        name: 'Banana', 
        imageUrl: 'http://via.placeholder.com/20x20',
        quantity: 'A truckload (15k kcal)',
      },
      { 
        id: '123asd', 
        name: 'Milk', 
        imageUrl: 'http://via.placeholder.com/20x20',
        quantity: 'A truckload (15k kcal)',
      },

    ],
    lunch: [
      { 
        id: 'qwe', 
        name: 'Pizza', 
        imageUrl: 'http://via.placeholder.com/20x20',
        quantity: 'A truckload (15k kcal)',
      },
    ],
    dinner: []
  }
};

class Dashboard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6} md={4}>
            <UserInfoContainer user={mockUserInfo}/>
          </Col>
          <Col sm={6} md={8}>
            <FoodIntakeTrackingContainer foodIntakeTracking={mockFoodIntake} />
          </Col>
        </Row>
        <Row>
          <Col sm={6} md={2}>
            <IngredientsSuggestionContainer />
          </Col>
          <Col sm={6} md={10}>
            <FoodSuggestionContainer />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Dashboard;
