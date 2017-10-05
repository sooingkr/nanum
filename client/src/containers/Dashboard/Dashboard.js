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
import { DashboardDuck } from './DashboardDuck';
import './Dashboard.scss';

class Dashboard extends Component {
  componentWillMount() {
    const { init } = this.props;
    init();
  }
  
  render() {
    return (
      <div className="dashboard">
        <Grid>
          <Row className="dashboard-tracking section--shadow">
            <Col sm={6} md={4}>
              <UserInfoContainer />
            </Col>
            <Col sm={6} md={8}>
              <FoodIntakeTrackingContainer />
            </Col>
          </Row>
          <Row className="dashboard-suggestion section--shadow-mobile">
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
