import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DashboardDuck, selectors } from './DashboardDuck';
import TimeSelector from '../../components/Dashboard/TimeSelector';

export const TimeSelectorContainer = ({ refetch, startDate }) => (
  <div className="diagnostic">
    <TimeSelector startDate={startDate} onTimeChange={refetch} />
  </div>
);

TimeSelectorContainer.propTypes = {
  alert: PropTypes.object,
}

const mapStateToProps = (state) => ({
  alert: selectors.getAlert(state),
  startDate: new Date(selectors.getTime(state)), // bc time in redux store is string
});

const mapDispatchToProps = {
  refetch: DashboardDuck.actions.initialize,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelectorContainer);