import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { selectors } from './DashboardDuck';
import DiagnosticMessage from '../../components/Dashboard/DiagnosticMessage';

export class DiagnosticContainer extends Component {
  render() {
    const { diagnostic } = this.props;
    if(!diagnostic || isEmpty(diagnostic)) {
      return <div/>;
    }

    const { type, message } = diagnostic;
    
    return (
      <div className="diagnostic">
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
});

export default connect(mapStateToProps)(DiagnosticContainer);