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
import { dashboardDuck, selectors } from './duck';

class Dashboard extends Component {
  componentWillMount() {
    const { init } = this.props;
    init();
  }
  
  render() {
    const { currentUser, foodIntakeTracking } = this.props;
    return (
      <Grid>
        <Row>
          <Col sm={6} md={4}>
            <UserInfoContainer user={currentUser}/>
          </Col>
          <Col sm={6} md={8}>
            <FoodIntakeTrackingContainer 
              foodIntakeTracking={foodIntakeTracking}
            />
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

const mapStateToProps = state => ({
  currentUser: selectors.getCurrentUser(state),
  foodIntakeTracking: selectors.getFoodIntakeTracking(state),
});

const mapDispatchToProps = {
  init: dashboardDuck.actions.initialize,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
