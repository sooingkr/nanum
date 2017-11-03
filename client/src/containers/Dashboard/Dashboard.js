import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { isEmpty } from 'lodash';
import UserInfoContainer from './UserInfoContainer';
import FoodIntakeTrackingContainer from './FoodIntakeTrackingContainer';
import FoodSuggestionContainer from './FoodSuggestionContainer';
import TimeSelectorContainer from './TimeSelectorContainer';
import FoodSearchBoxContainer from '../FoodSearch/FoodSearchBoxContainer';
import Alert from '../../components/Common/Alert';
import { DashboardDuck, selectors } from './DashboardDuck';

class Dashboard extends Component {
  componentWillMount() {
    const { init } = this.props;
    init();
  }
  
  render() {
    const { alert } = this.props;

    return (
      <div className="dashboard">
        { !isEmpty(alert) &&
          <Alert message={alert.message} type={alert.type} />
        }
        <Grid>
          <Row className="dashboard-search">
            <Col sm={12}>
              <FoodSearchBoxContainer />
            </Col>
          </Row>
          <Row className="dashboard-timeSelector section">
            <Col sm={12}>
              <TimeSelectorContainer />
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

const mapStateToProps = (state) => ({
  alert: selectors.getAlert(state),
});

const mapDispatchToProps = {
  init: DashboardDuck.actions.initialize,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
