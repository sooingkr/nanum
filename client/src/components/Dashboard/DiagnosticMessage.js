import React from 'react';
import PropTypes from 'prop-types';

const DiagnosticMessage = ({ type, message }) => (
  <div className={`diagnostic-message diagnostic-message--${type}`}>
    <p>{message}</p>
  </div>
);

DiagnosticMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
}

DiagnosticMessage.defaultProps = {
  type: "danger",
}

export default DiagnosticMessage;