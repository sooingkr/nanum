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
  name: "김레클",
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

class Dashboard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6} md={4}>
            <UserInfoContainer user={mockUserInfo}/>
          </Col>
          <Col sm={6} md={8}>
            <FoodIntakeTrackingContainer />
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
