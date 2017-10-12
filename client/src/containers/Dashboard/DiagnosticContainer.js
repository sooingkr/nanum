import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { DashboardDuck, selectors } from './DashboardDuck';
import DiagnosticMessage from '../../components/Dashboard/DiagnosticMessage';
import TimeSelector from '../../components/Dashboard/TimeSelector';

export class DiagnosticContainer extends Component {
  render() {
    const { diagnostic, refetch, startDate } = this.props;
    if(!diagnostic || isEmpty(diagnostic)) {
      return <div/>;
    }

    const { type, message } = diagnostic;
    
    return (
      <div className="diagnostic">
        <TimeSelector startDate={startDate} onTimeChange={refetch} />
        <DiagnosticMessage type={type} message={message} />
      </div>
    );
  }
}

DiagnosticContainer.propTypes = {
  diagnostic: PropTypes.object,
}

const mapStateToProps = (state) => ({
  diagnostic: selectors.getDiagnostic(state),
  startDate: new Date(selectors.getTime(state)), // bc time in redux store is string
});

const mapDispatchToProps = {
  refetch: DashboardDuck.actions.initialize,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticContainer);