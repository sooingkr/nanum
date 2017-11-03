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
import DiagnosticContainer from './DiagnosticContainer';
import FoodSearchBoxContainer from '../FoodSearch/FoodSearchBoxContainer';
import { DashboardDuck } from './DashboardDuck';

class Dashboard extends Component {
  componentWillMount() {
    const { init } = this.props;
    init();
  }
  
  render() {
    return (
      <div className="dashboard">
        <Grid>
          <Row className="dashboard-search">
            <Col sm={12}>
              <FoodSearchBoxContainer />
            </Col>
          </Row>
          <Row className="dashboard-diagnostic section">
            <Col sm={12}>
              <DiagnosticContainer />
            </Col>
          </Row>
          <Row className="dashboard-tracking section section--sm-shadow">
            <Col sm={6} md={4}>
              <UserInfoContainer />
            </Col>
            <Col sm={6} md={8}>
              <FoodIntakeTrackingContainer />
            </Col>
          </Row>
          <Row className="dashboard-suggestion section section--shadow">
            <Col sm={12} md={12}>
              <FoodSuggestionContainer />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = {
  init: DashboardDuck.actions.initialize,
};

export default connect(null, mapDispatchToProps)(Dashboard);
