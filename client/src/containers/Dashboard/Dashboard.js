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

class Dashboard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6} md={4}>
            <UserInfoContainer />
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
