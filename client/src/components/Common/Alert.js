import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type }) => {
  const classes = `alert alert--${type}`;
  return (
    <div className={classes}>
      <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
      <p>{message}</p>
    </div>
  );
}
  
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['danger', 'warning']),
}

Alert.defaultProps = {
  type: 'danger',
}

export default Alert;