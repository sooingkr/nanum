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
import TimeSelectorContainer from './TimeSelectorContainer';
import FoodSearchBoxContainer from '../FoodSearch/FoodSearchBoxContainer';
import IngredientsChartContainer from './IngredientsChartContainer';
import NutritionLogContainer from './NutritionLogContainer';
import Alert from '../../components/Common/Alert';
import Loader from '../../components/Common/Loader';
import { DashboardDuck, selectors } from './DashboardDuck';
import {FoodSearchDuck} from '../FoodSearch/FoodSearchDuck.js';
import {isMobileVersion} from '../../utils/AppUtils';

class Dashboard extends Component {
  componentWillMount() {
    this.props.resetSearch();
    this.props.init();
  }

  render() {
    const { alert, isLoading } = this.props;
    if (isLoading) return <Loader />;

    return (
      <div className="dashboard">
        {!isMobileVersion() &&
        <Alert message={alert.message} type={alert.type}/>
        }
        <Grid>
          <Row className="dashboard-search">
            <Col sm={12}>
              <FoodSearchBoxContainer />
            </Col>
          </Row>
          {isMobileVersion() &&
          <Alert message={alert.message} type={alert.type}/>
          }
          <Row className="dashboard-timeSelector section">
            <Col sm={12}>
              <TimeSelectorContainer />
            </Col>
          </Row>
          <Row className="dashboard-tracking section section--shadow with-spacer">
            <Col md={4}>
              <UserInfoContainer />
            </Col>
            <Col md={8}>
              <FoodIntakeTrackingContainer />
            </Col>
          </Row>
          <Row className="dashboard-suggestion section section--shadow">
            <Col sm={12}>
              <FoodSuggestionContainer />
            </Col>
          </Row>
          <Row className="dashboard-ingredients-chart">
            <Col sm={12} md={6} className="section section--shadow">
              <IngredientsChartContainer />
            </Col>
            <Col sm={12} md={6} className="section section--shadow">
              <NutritionLogContainer />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  alert: selectors.getAlert(state),
  isLoading: selectors.getLoadingStatus(state),
});

const mapDispatchToProps = {
  init: DashboardDuck.actions.initialize,
  resetSearch: FoodSearchDuck.actions.resetSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
);
