import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import UserInfoContainer from './UserInfoContainer';
import FoodIntakeTrackingContainer from './FoodIntakeTrackingContainer';
import FoodSuggestionContainer from './FoodSuggestionContainer';
import IngredientsSuggestionContainer from './IngredientsSuggestionContainer';
import { DashboardDuck } from './DashboardDuck';

class Dashboard extends Component {
  componentWillMount() {
    const { init } = this.props;
    init();
  }
  
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

const mapDispatchToProps = {
  init: DashboardDuck.actions.initialize,
};

export default connect(null, mapDispatchToProps)(Dashboard);
